import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MessageCircle, Send, Sparkles, Sun, Moon, CheckCircle, AlertCircle, User, Lock, Mail, Hash, Brain, Edit3, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState('');
  const [emailChecking, setEmailChecking] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [usnChecking, setUsnChecking] = useState(false);
  const [usnExists, setUsnExists] = useState(false);
  const hasInitialized = useRef(false);

  const skills = [
    { id: 'problem_solving', name: 'Problem Solving', emoji: '🧩'},
    { id: 'algebra', name: 'Algebra & Equations', emoji: '📐'},
    { id: 'geometry', name: 'Geometry & Spatial Thinking', emoji: '🔷'},
    { id: 'probability', name: 'Probability & Statistics', emoji: '📊'},
    { id: 'number_theory', name: 'Number Theory', emoji: '🔢'},
    { id: 'algorithms', name: 'Algorithms & Logic Building', emoji: '⚡'},
    { id: 'pattern_recognition', name: 'Pattern Recognition', emoji: '🔍'},
    { id: 'navigation', name: 'Navigation & Pathfinding', emoji: '🧭'},
    { id: 'clue_solving', name: 'Clue Solving & Riddles', emoji: '🔑'},
    { id: 'time_management', name: 'Time Management', emoji: '⏰'},
    { id: 'team_collaboration', name: 'Team Collaboration', emoji: '🤝'},
    { id: 'leadership', name: 'Leadership', emoji: '👑'},
    { id: 'attention_detail', name: 'Attention to Detail', emoji: '🔎'},
    { id: 'endurance', name: 'Endurance & Activeness', emoji: '💪'},
    { id: 'creative_thinking', name: 'Creative Thinking', emoji: '💡'}
  ];

  const registrationSteps = [
    {
      id: 'greeting',
      message: "Hey there! 👋 I'm your AI assistant, and I'm here to help you register for our amazing MCA event! Let's start with your name. What should I call you?",
      type: 'input',
      field: 'name',
      placeholder: 'Enter your full name'
    },
    {
      id: 'usn',
      message: "Great to meet you, {name}! 🎉 Now, I need your USN (University Serial Number). This helps us keep track of all our awesome participants!",
      type: 'input',
      field: 'usn',
      placeholder: 'Enter your USN'
    },
    {
      id: 'email',
      message: "Perfect, {name}! 📧 Now, what's your email address? We'll use this to send you important updates and team information.",
      type: 'input',
      field: 'email',
      placeholder: 'Enter your email address'
    },
    {
      id: 'password',
      message: "Security time, {name}! 🔐 Let's create a strong password to protect your account. Make it something memorable but secure!",
      type: 'password',
      field: 'password',
      placeholder: 'Create a password'
    },
    {
      id: 'confirm_password',
      message: "Just to be sure, {name}! 🔒 Please confirm your password by typing it again.",
      type: 'password',
      field: 'confirmPassword',
      placeholder: 'Confirm your password'
    },
    {
      id: 'skills',
      message: "Awesome, {name}! 🚀 Now for the fun part - let's discover your superpowers! Select all the skills that describe you. You can select multiple skills by clicking on them:",
      type: 'skills',
      field: 'skills'
    },
    {
      id: 'final',
      message: "Fantastic, {name}! 🎯 You're almost there! Let me review what we have and then we can complete your registration. Ready to proceed?",
      type: 'review'
    }
  ];

  useEffect(() => {
    // Initialize with greeting message only once
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      addBotMessage(registrationSteps[0].message);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  // Real-time email verification
  useEffect(() => {
    const checkEmail = async () => {
      if (formData.email && formData.email.includes('@')) {
        setEmailChecking(true);
        try {
          const response = await axios.get(`http://localhost:8000/api/participants/check-email/${encodeURIComponent(formData.email)}`);
          setEmailExists(response.data.exists);
          if (response.data.exists) {
            setErrors(prev => ({ ...prev, email: 'This email is already registered. Please use a different email or login instead.' }));
          } else {
            setErrors(prev => ({ ...prev, email: null }));
          }
        } catch (error) {
          console.error('Email check error:', error);
          // Don't set emailExists to true on error, just clear the error
          setErrors(prev => ({ ...prev, email: null }));
        } finally {
          setEmailChecking(false);
        }
      } else {
        // Clear email validation state when email is empty or invalid
        setEmailExists(false);
        setErrors(prev => ({ ...prev, email: null }));
      }
    };

    const timeoutId = setTimeout(checkEmail, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  // Real-time USN verification
  useEffect(() => {
    const checkUsn = async () => {
      if (formData.usn && formData.usn.trim().length >= 5) {
        setUsnChecking(true);
        try {
          const response = await axios.get(`http://localhost:8000/api/participants/check-usn/${encodeURIComponent(formData.usn.trim())}`);
          setUsnExists(response.data.exists);
          if (response.data.exists) {
            setErrors(prev => ({ ...prev, usn: 'This USN is already registered. Please use a different USN.' }));
          } else {
            setErrors(prev => ({ ...prev, usn: null }));
          }
        } catch (error) {
          console.error('USN check error:', error);
          setErrors(prev => ({ ...prev, usn: null }));
        } finally {
          setUsnChecking(false);
        }
      } else {
        setUsnExists(false);
        setErrors(prev => ({ ...prev, usn: null }));
      }
    };
    const timeoutId = setTimeout(checkUsn, 800);
    return () => clearTimeout(timeoutId);
  }, [formData.usn]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (message, type = 'bot') => {
    setMessages(prev => [...prev, { type, content: message, timestamp: new Date() }]);
  };

  const addUserMessage = (content) => {
    setMessages(prev => [...prev, { type: 'user', content, timestamp: new Date() }]);
  };

  const addSystemMessage = (content, icon = CheckCircle) => {
    setMessages(prev => [...prev, { type: 'system', content, icon, timestamp: new Date() }]);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const currentStepData = registrationSteps[currentStep];
    const userInput = inputValue.trim();
    
    // Add user message
    addUserMessage(userInput);
    setInputValue('');

    // Validate input based on current step
    if (currentStepData.type === 'input' || currentStepData.type === 'password') {
      const validation = validateField(currentStepData.field, userInput);
      if (!validation.isValid) {
        addBotMessage(`Oops! ${validation.error} Let's try that again. ${currentStepData.message}`);
        return;
      }

      // For email field, check if it's already registered
      if (currentStepData.field === 'email') {
        
        // Check if email already exists from real-time validation
        if (emailExists) {
          addBotMessage("❌ This email is already registered. Please use a different email address or login with your existing account.");
          addBotMessage("You have two options:");
          addBotMessage("1️⃣ **Login instead** - Use this email to sign in to your existing account");
          addBotMessage("2️⃣ **Try different email** - Continue registration with a new email address");
          return;
        }
        
        // Double-check email availability before proceeding
        try {
          const response = await axios.get(`http://localhost:8000/api/participants/check-email/${encodeURIComponent(userInput)}`);
          if (response.data.exists) {
            addBotMessage("❌ This email is already registered. Please use a different email address or login with your existing account.");
            addBotMessage("You have two options:");
            addBotMessage("1️⃣ **Login instead** - Use this email to sign in to your existing account");
            addBotMessage("2️⃣ **Try different email** - Continue registration with a new email address");
            setEmailExists(true);
            return;
          }
          
          // Email is valid and not registered, proceed
          setFormData(prev => ({
            ...prev,
            [currentStepData.field]: userInput
          }));
          
          setEmailExists(false);
          addSystemMessage(`✅ Email saved!`);
          
          // Move to next step
          setTimeout(() => {
            moveToNextStep();
          }, 1000);
          return;
        } catch (error) {
          console.error('Email check error:', error);
          addBotMessage("❌ Error checking email. Please try again.");
          return;
        }
      }

      // For USN field, check duplicates similarly
      if (currentStepData.field === 'usn') {
        if (usnExists) {
          addBotMessage('❌ This USN is already registered. Please enter a different USN.');
          return;
        }
        try {
          const response = await axios.get(`http://localhost:8000/api/participants/check-usn/${encodeURIComponent(userInput)}`);
          if (response.data.exists) {
            addBotMessage('❌ This USN is already registered. Please enter a different USN.');
            setUsnExists(true);
            return;
          }
        } catch (error) {
          console.error('USN check error:', error);
        }
      }

      // For non-email fields, proceed normally
      setFormData(prev => ({
        ...prev,
        [currentStepData.field]: userInput
      }));

      // Add success message
      addSystemMessage(`✅ ${currentStepData.field === 'name' ? 'Name saved!' : currentStepData.field === 'usn' ? 'USN saved!' : 'Password saved!'}`);

      // Move to next step
      setTimeout(() => {
        // For name field, ensure we have the name before moving to next step
        if (currentStepData.field === 'name') {
          const nextStep = currentStep + 1;
          if (nextStep < registrationSteps.length) {
            setCurrentStep(nextStep);
            const nextStepData = registrationSteps[nextStep];
            
            // Replace placeholders in message with the user's actual name
            let message = nextStepData.message;
            message = message.replace(/{name}/g, userInput);
            
            addBotMessage(message);
          }
        } else {
          moveToNextStep();
        }
      }, 1000);
    }
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return { isValid: false, error: 'Name is required.' };
        if (value.trim().length < 2) return { isValid: false, error: 'Name must be at least 2 characters long.' };
        return { isValid: true };
      
      case 'usn':
        if (!value.trim()) return { isValid: false, error: 'USN is required.' };
        if (value.trim().length < 5) return { isValid: false, error: 'USN must be at least 5 characters long.' };
        return { isValid: true };
      
      case 'email':
        if (!value.trim()) return { isValid: false, error: 'Email is required.' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return { isValid: false, error: 'Please enter a valid email address.' };
        return { isValid: true };
      
      case 'password':
        if (!value.trim()) return { isValid: false, error: 'Password is required.' };
        if (value.length < 6) return { isValid: false, error: 'Password must be at least 6 characters long.' };
        return { isValid: true };
      
      case 'confirmPassword':
        if (!value.trim()) return { isValid: false, error: 'Please confirm your password.' };
        if (value !== formData.password) return { isValid: false, error: 'Passwords do not match.' };
        return { isValid: true };
      
      default:
        return { isValid: true };
    }
  };

  const moveToNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep < registrationSteps.length) {
      setCurrentStep(nextStep);
      const nextStepData = registrationSteps[nextStep];
      
      // Replace placeholders in message
      let message = nextStepData.message;
      // Replace all {name} placeholders with the user's actual name
      if (formData.name) {
        message = message.replace(/{name}/g, formData.name);
      }
      
      addBotMessage(message);
    }
  };

  const handleSkillToggle = (skillId) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId]
    }));
  };

  const handleSkillsSubmit = () => {
    if (formData.skills.length === 0) {
      addBotMessage("Come on! You must have at least one superpower! 🦸‍♂️ Select at least one skill to continue.");
      return;
    }

    addSystemMessage(`🎯 Great! You've selected ${formData.skills.length} skills. Let's review everything!`);
    
    setTimeout(() => {
      moveToNextStep();
    }, 1000);
  };

  const handleEditField = (field) => {
    setIsEditing(true);
    setEditField(field);
    setInputValue(formData[field] || '');
    
    // Go back to the appropriate step
    const stepIndex = registrationSteps.findIndex(step => step.field === field);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
      addBotMessage(`Let's edit your ${field === 'name' ? 'name' : field === 'usn' ? 'USN' : field === 'email' ? 'email' : field === 'password' ? 'password' : 'skills'}. Please enter the new value:`, 'edit');
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const validation = validateField(editField, inputValue.trim());
    if (!validation.isValid) {
      addBotMessage(`Oops! ${validation.error} Please try again.`);
      return;
    }

    // Update form data
    setFormData(prev => ({
      ...prev,
      [editField]: inputValue.trim()
    }));

    addSystemMessage(`✅ ${editField === 'name' ? 'Name' : editField === 'usn' ? 'USN' : editField === 'email' ? 'Email' : 'Password'} updated successfully!`);

    // Go back to review step
    setCurrentStep(registrationSteps.length - 1);
    setIsEditing(false);
    setEditField('');
    setInputValue('');
    
    setTimeout(() => {
      addBotMessage("Let's review your updated information:");
    }, 1000);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate duplicates just before submit
      const [emailResp, usnResp] = await Promise.all([
        axios.get(`http://localhost:8000/api/participants/check-email/${encodeURIComponent(formData.email)}`),
        axios.get(`http://localhost:8000/api/participants/check-usn/${encodeURIComponent(formData.usn)}`)
      ]);
      if (emailResp.data.exists) {
        setIsSubmitting(false);
        setEmailExists(true);
        addSystemMessage("❌ Oops! Someone with this email is already registered.", AlertCircle);
        return;
      }
      if (usnResp.data.exists) {
        setIsSubmitting(false);
        setUsnExists(true);
        addSystemMessage("❌ Oops! Someone with this USN is already registered.", AlertCircle);
        return;
      }

      const response = await axios.post('http://localhost:8000/api/participants/register', {
        name: formData.name,
        usn: formData.usn,
        email: formData.email,
        password: formData.password,
        skills: formData.skills
      });
      
      addSystemMessage("🎉 Congratulations! Your registration is complete!", CheckCircle);
      addBotMessage("Welcome to the team! You're now ready to create or join teams and start your amazing journey. Let me take you to your dashboard!");
      
      // Store participant info
      localStorage.setItem('participant', JSON.stringify(response.data));
      
      // Redirect after a delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (error) {
      if (error.response?.status === 400) {
        const detail = error.response?.data?.detail || '';
        const isEmail = detail.toLowerCase().includes('email');
        const isUsn = detail.toLowerCase().includes('usn');
        if (isEmail) {
          addSystemMessage("❌ Oops! Someone with this email is already registered.", AlertCircle);
        } else if (isUsn) {
          addSystemMessage("❌ Oops! Someone with this USN is already registered.", AlertCircle);
        } else {
          addSystemMessage("❌ A validation error occurred.", AlertCircle);
        }
        addBotMessage("It looks like this is already in our system. You have two options:");
        
        // Add options for the user
        setTimeout(() => {
          addBotMessage("1️⃣ **Login instead** - Use this email to sign in to your existing account");
          addBotMessage("2️⃣ **Start fresh** - Begin registration with a different email");
          
          // Add the options buttons
          setTimeout(() => {
            addBotMessage("What would you like to do?", 'options');
          }, 1000);
        }, 1000);
      } else {
        addSystemMessage("❌ Something went wrong with the registration.", AlertCircle);
        addBotMessage("Don't worry! Let's try again. Sometimes the server needs a little break. Please try again in a moment.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartFresh = () => {
    // Reset everything and start over
    setMessages([]);
    setCurrentStep(0);
    setFormData({
      name: '',
      usn: '',
      email: '',
      password: '',
      confirmPassword: '',
      skills: []
    });
    setErrors({});
    setInputValue('');
    setIsSubmitting(false);
    setEmailExists(false);
    
    // Reinitialize with greeting
    hasInitialized.current = false;
    addBotMessage(registrationSteps[0].message);
  };

  const handleStartFreshWithNewEmail = () => {
    // Just clear the email and let user try again
    setFormData(prev => ({ ...prev, email: '' }));
    setEmailExists(false);
    setErrors(prev => ({ ...prev, email: null }));
    setInputValue('');
    
    // Go back to email step
    setCurrentStep(2); // Email step index
    addBotMessage("Great! Let's try with a different email address. What's your email?");
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleClearEmail = () => {
    setFormData(prev => ({ ...prev, email: '' }));
    setEmailExists(false);
    setErrors(prev => ({ ...prev, email: null }));
    setInputValue('');
  };

  const renderMessage = (message, index) => {
    const isLastMessage = index === messages.length - 1;
    
    return (
      <div
        key={index}
        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in-up`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div
          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
            message.type === 'user'
              ? isDarkMode
                ? 'bg-indigo-900/60 text-white backdrop-blur-sm'
                : 'bg-amber-200/55 text-amber-800 backdrop-blur-sm'
              : message.type === 'system'
              ? isDarkMode
                ? 'bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-white backdrop-blur-sm'
                : 'bg-gradient-to-r from-green-100/30 to-emerald-100/30 text-green-700 backdrop-blur-sm'
              : message.type === 'options'
              ? isDarkMode
                ? 'bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-slate-100 shadow-xl shadow-black/20'
                : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-amber-800 shadow-xl shadow-gray-200/20'
              : message.type === 'edit'
              ? isDarkMode
                ? 'bg-blue-800/80 backdrop-blur-sm border border-blue-700/50 text-blue-100 shadow-xl shadow-blue-500/20'
                : 'bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 text-blue-800 shadow-xl shadow-blue-500/20'
              : isDarkMode
              ? 'bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-slate-100 shadow-xl shadow-black/20'
              : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-amber-800 shadow-xl shadow-gray-200/20'
          }`}
        >
          {message.type === 'system' && message.icon && (
            <div className="flex items-center space-x-2 mb-1">
              <message.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{message.content}</span>
            </div>
          )}
          {message.type === 'options' && (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{message.content}</p>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleGoToLogin}
                  className={`w-full px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isDarkMode
                      ? 'btn-cosmic'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  🔐 Login with Existing Account
                </button>
                <button
                  onClick={handleStartFresh}
                  className={`w-full px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isDarkMode
                      ? 'btn-cosmic'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/25'
                  }`}
                >
                  🚀 Start Fresh Registration
                </button>
              </div>
            </div>
          )}
          {message.type === 'edit' && (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{message.content}</p>
              <form onSubmit={handleEditSubmit} className="flex space-x-2">
                <input
                  type={editField === 'password' || editField === 'confirmPassword' ? 'password' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
                  placeholder={`Enter new ${editField}`}
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? 'btn-cosmic-sm'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditField('');
                    setInputValue('');
                    setCurrentStep(registrationSteps.length - 1);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}
          {message.type !== 'system' && message.type !== 'options' && message.type !== 'edit' && (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    const currentStepData = registrationSteps[currentStep];
    
    if (currentStepData.type === 'skills') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => handleSkillToggle(skill.id)}
                className={`p-3 rounded-xl border-2 transition-all duration-500 relative overflow-hidden ${
                  formData.skills.includes(skill.id)
                    ? isDarkMode
                      ? 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/25'
                      : 'border-amber-500 bg-amber-500/20 text-amber-700 shadow-lg shadow-amber-500/25'
                    : isDarkMode
                      ? 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-purple-400 hover:bg-slate-600/50 hover:shadow-lg hover:shadow-purple-500/20'
                      : 'border-orange-300 bg-orange-50 text-orange-700 hover:border-amber-400 hover:bg-orange-100 hover:shadow-lg hover:shadow-amber-500/20'
                }`}
              >
                {/* Theme-specific glow effect for selected skills */}
                {formData.skills.includes(skill.id) && (
                  <div className={`absolute inset-0 rounded-xl ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10'
                      : 'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10'
                  } animate-pulse`}></div>
                )}
                
                {/* Theme-specific hover glow effect */}
                <div className={`absolute inset-0 rounded-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5'
                    : 'bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5'
                } opacity-0 hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="text-center relative z-10">
                  <div className="text-2xl mb-1">{skill.emoji}</div>
                  <div className="text-xs font-medium">{skill.name}</div>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={handleSkillsSubmit}
            className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
              isDarkMode
                ? 'btn-cosmic'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-xl hover:shadow-orange-500/30'
            }`}
          >
            Continue with Selected Skills 🚀
          </button>
        </div>
      );
    }
    
    if (currentStepData.type === 'review') {
      return (
        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${
            isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-gray-50 border border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-3 text-center ${isDarkMode ? 'text-white' : 'text-amber-900'}`}>📋 Registration Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-slate-700/50">
                <span className={`${isDarkMode ? 'text-white' : 'text-amber-800'}`}>Name:</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-amber-900'}`}>{formData.name}</span>
                  <button
                    onClick={() => handleEditField('name')}
                    className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-slate-700/50">
                <span className={`${isDarkMode ? 'text-white' : 'text-amber-800'}`}>USN:</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-amber-900'}`}>{formData.usn}</span>
                  <button
                    onClick={() => handleEditField('usn')}
                    className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-slate-700/50">
                <span className={`${isDarkMode ? 'text-white' : 'text-amber-800'}`}>Email:</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-amber-900'}`}>{formData.email}</span>
                  <button
                    onClick={() => handleEditField('email')}
                    className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-slate-700/50">
                <span className={`${isDarkMode ? 'text-white' : 'text-amber-800'}`}>Skills:</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-amber-900'}`}>{formData.skills.length} selected</span>
                  <button
                    onClick={() => handleEditField('skills')}
                    className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'btn-cosmic'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-xl hover:shadow-orange-500/30'
            }`}
          >
            {isSubmitting ? 'Creating Your Account... ✨' : 'Complete Registration 🎉'}
          </button>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={`min-h-screen w-full relative overflow-hidden transition-all duration-500 pt-24 sm:pt-20 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-black via-slate-900 via-purple-900 via-slate-800 to-black dark' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 via-rose-50 via-pink-50 to-white light'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isDarkMode ? (
          <>
            {/* Flowing Galaxy Orbs - Dark mode only */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/25 via-pink-500/20 to-blue-500/25 rounded-full blur-3xl animate-cosmic-float"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/25 via-cyan-500/20 to-indigo-500/25 rounded-full blur-3xl animate-cosmic-float delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/25 via-teal-500/20 to-green-500/25 rounded-full blur-3xl animate-cosmic-float delay-2000"></div>
            
            {/* Additional flowing elements */}
            <div className="absolute top-1/3 left-10 w-32 h-32 rounded-full blur-2xl animate-float delay-500 bg-gradient-to-r from-pink-500/20 via-rose-500/15 to-purple-500/20"></div>
            <div className="absolute bottom-1/3 right-10 w-40 h-40 rounded-full blur-2xl animate-float delay-1500 bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-pink-500/20"></div>
            
            {/* More galaxy elements */}
            <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-indigo-500/20 rounded-full blur-2xl animate-cosmic-float delay-300"></div>
            <div className="absolute bottom-1/3 left-1/5 w-56 h-56 bg-gradient-to-r from-green-500/20 via-teal-500/15 to-cyan-500/20 rounded-full blur-2xl animate-cosmic-float delay-800"></div>
            
            {/* Flowing dark depth layers */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-black/60 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/30 via-transparent to-black/30 animate-pulse delay-1000"></div>
            
            {/* Additional flowing dark orbs */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-slate-800/25 via-gray-800/20 to-slate-700/25 rounded-full blur-3xl animate-float delay-300"></div>
            <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-gradient-to-r from-gray-900/30 via-slate-900/25 to-gray-800/30 rounded-full blur-3xl animate-float delay-700"></div>
            <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-gradient-to-r from-black/35 via-gray-900/30 to-black/35 rounded-full blur-2xl animate-float delay-1200"></div>
            
            {/* Grid Pattern - EXACTLY like Home page */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            
            {/* Darker grid overlay for depth */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.3)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
            
            {/* Hexagon Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 left-20 w-32 h-32 border border-purple-400/15 transform rotate-45"></div>
              <div className="absolute top-40 right-32 w-24 h-24 border border-blue-400/15 transform rotate-45"></div>
              <div className="absolute bottom-32 left-1/4 w-28 h-28 border border-cyan-400/15 transform rotate-45"></div>
            </div>
            
            {/* Geometric shapes for depth */}
            <div className="absolute inset-0 opacity-40">
              <div className={`absolute top-10 left-1/3 w-20 h-20 border transform rotate-12 ${
                isDarkMode ? 'border-slate-700/30' : 'border-amber-300/30'
              }`}></div>
              <div className={`absolute top-60 right-20 w-16 h-16 border transform -rotate-45 ${
                isDarkMode ? 'border-gray-800/40' : 'border-orange-300/40'
              }`}></div>
              <div className={`absolute bottom-40 right-1/3 w-24 h-24 border transform rotate-30 ${
                isDarkMode ? 'border-black/50' : 'border-rose-300/50'
              }`}></div>
            </div>
            
            {/* Animated Lines */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-pulse"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-pulse delay-1000"></div>
              <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse delay-2000"></div>
            </div>
            
            {/* Dark horizontal lines for depth */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/6 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-black/60 to-transparent"></div>
              <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-800/50 to-transparent"></div>
              <div className="absolute bottom-1/6 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-900/70 to-transparent"></div>
            </div>
            
            {/* Enhanced Galaxy Particle System */}
            <div className="absolute inset-0">
              {/* Main particles */}
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 1}s`
                  }}
                />
              ))}
              
              {/* Blue particles */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={`blue-${i}`}
                  className="absolute w-1 h-1 bg-blue-400/18 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${4 + Math.random() * 2}s`
                  }}
                />
              ))}
              
              {/* Cyan particles */}
              {[...Array(18)].map((_, i) => (
                <div
                  key={`cyan-${i}`}
                  className="absolute w-1 h-1 bg-cyan-400/16 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${5 + Math.random() * 2}s`
                  }}
                />
              ))}
              
              {/* Pink particles */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={`pink-${i}`}
                  className="absolute w-1 h-1 bg-pink-400/14 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${6 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            {/* Stable dark depth elements */}
            <div className="absolute inset-0">
              <div className="absolute top-1/5 left-1/5 w-96 h-96 bg-black/25 rounded-full blur-3xl"></div>
              <div className={`absolute bottom-1/5 right-1/5 w-80 h-80 rounded-full blur-3xl ${
              isDarkMode ? 'bg-slate-900/30' : 'bg-orange-200/25'
            }`}></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gray-900/35 rounded-full blur-2xl"></div>
            </div>
            
            {/* Enhanced cosmic streams */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/15 via-transparent to-blue-900/15"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-cyan-900/15 via-transparent to-indigo-900/15"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-pink-900/12 via-transparent to-purple-900/12"></div>
            </div>
            
            {/* Moving cosmic clouds */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-purple-500/8 via-transparent to-blue-500/8 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-1/4 right-0 w-1/2 h-1/2 bg-gradient-to-l from-cyan-500/8 via-transparent to-indigo-500/8 rounded-full blur-3xl animate-float delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-gradient-to-r from-pink-500/6 via-transparent to-purple-500/6 rounded-full blur-2xl animate-float delay-500"></div>
              
              {/* Additional moving clouds */}
              <div className="absolute top-1/6 right-1/4 w-1/4 h-1/4 bg-gradient-to-r from-indigo-500/7 via-transparent to-purple-500/7 rounded-full blur-2xl animate-float delay-1500"></div>
              <div className="absolute bottom-1/6 left-1/3 w-1/5 h-1/5 bg-gradient-to-r from-cyan-500/6 via-transparent to-blue-500/6 rounded-full blur-xl animate-float delay-2000"></div>
            </div>
          </>
        ) : (
          <>
            {/* Light mode background elements - EXACTLY like Home page */}
            {/* Warm earth tone gradients for light theme */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-100/50 via-orange-100/40 to-rose-100/50 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-rose-100/50 via-pink-100/40 to-fuchsia-100/50 rounded-full blur-3xl animate-float delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-teal-100/50 via-emerald-100/40 to-amber-100/50 rounded-full blur-3xl animate-float delay-2000"></div>
            
            {/* Additional warm tone orbs for depth */}
            <div className="absolute top-1/3 left-10 w-32 h-32 rounded-full blur-2xl animate-float delay-500 bg-gradient-to-r from-orange-100/40 via-amber-100/30 to-yellow-100/40"></div>
            <div className="absolute bottom-1/3 right-10 w-40 h-40 rounded-full blur-2xl animate-float delay-1500 bg-gradient-to-r from-teal-100/40 via-emerald-100/30 to-green-100/40"></div>
            
            {/* Warm grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(245,101,101,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,101,101,0.08)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            
            {/* Warm geometric shapes */}
            <div className="absolute inset-0 opacity-25">
              <div className="absolute top-20 left-20 w-32 h-32 border border-amber-200 transform rotate-45"></div>
              <div className="absolute top-40 right-32 w-24 h-24 border border-orange-200 transform rotate-45"></div>
              <div className="absolute bottom-32 left-1/4 w-28 h-28 border border-teal-200 transform rotate-45"></div>
            </div>
            
            {/* Warm tone particles for atmosphere */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={`light-${i}`}
                  className="absolute w-1 h-1 bg-orange-300/30 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 1}s`
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 pt-20 sm:pt-16 pb-4">
        <div className="flex justify-center items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <MessageCircle className={`h-6 w-6 sm:h-8 sm:w-8 ${isDarkMode ? 'text-purple-400' : 'text-amber-700'}`} />
            <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-amber-900'}`}>
              Mathrix Registration Assistant
            </h1>
          </div>
        </div>
        <div className="flex justify-center mt-3 sm:mt-4">
          <Link to="/login" className={`flex items-center space-x-2 text-xs sm:text-sm font-medium transition-colors text-center ${
            isDarkMode ? 'text-slate-300 hover:text-purple-400' : 'text-amber-700 hover:text-amber-800'
          }`}>
            <span>Already have an account?</span>
            <span className="underline">Login here</span>
          </Link>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 w-full px-4 sm:px-8 pb-4 sm:pb-8 flex-1 flex flex-col min-h-0">
        <div className={`w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto h-[calc(100vh-280px)] sm:h-[calc(100vh-200px)] rounded-2xl sm:rounded-3xl ${
          isDarkMode 
            ? 'bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-black/40' 
            : 'bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl shadow-gray-200/40'
        } overflow-hidden flex flex-col`}>
          {/* Chat Header */}
          <div className={`p-4 sm:p-6 border-b ${
            isDarkMode ? 'border-slate-700/50' : 'border-gray-200/50'
          }`}>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                isDarkMode ? 'bg-green-400' : 'bg-green-500'
              } animate-pulse`}></div>
              <span className={`text-xs sm:text-sm font-medium ${
                isDarkMode ? 'text-slate-300' : 'text-amber-700'
              }`}>
                ✨ AI is crafting your journey...
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 min-h-0">
            {messages.map((message, index) => renderMessage(message, index))}
            {renderCurrentStep()}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {registrationSteps[currentStep].type === 'input' || registrationSteps[currentStep].type === 'password' ? (
            <div className={`p-4 sm:p-6 border-t ${
              isDarkMode ? 'border-slate-700/50' : 'border-gray-200/50'
            }`}>
              <form onSubmit={handleInputSubmit} className="space-y-3">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type={registrationSteps[currentStep].type === 'password' ? 'password' : 'text'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={registrationSteps[currentStep].placeholder}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl sm:rounded-2xl border-2 transition-all duration-500 focus:outline-none focus:ring-0 input-modern ${
                        registrationSteps[currentStep].field === 'email' && emailExists
                          ? 'border-red-500 bg-red-900/30 dark:bg-red-900/40 text-red-100 dark:text-red-200 placeholder-red-300 dark:placeholder-red-400'
                          : isDarkMode
                            ? 'bg-slate-900/80 border-slate-600 text-white placeholder-slate-400'
                            : 'bg-amber-50/60 border-amber-200 text-amber-800 placeholder-amber-500'
                      } backdrop-blur-sm relative z-10`}
                    />
                    
                    {/* Clear button for email when there's an error */}
                    {registrationSteps[currentStep].field === 'email' && emailExists && (
                      <button
                        type="button"
                        onClick={handleClearEmail}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="Clear email and try again"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    
                    {/* Theme-specific glowing border effect */}
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                      registrationSteps[currentStep].field === 'email' && emailExists
                        ? 'bg-gradient-to-r from-red-500/20 via-pink-500/20 to-red-500/20'
                        : isDarkMode
                          ? 'bg-gradient-to-r from-purple-500/15 via-blue-500/15 via-cyan-500/15 to-purple-500/15'
                          : 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 via-rose-500/20 to-amber-500/20'
                    } opacity-0 hover:opacity-100 focus-within:opacity-100 animate-gradient-flow`}></div>
                    
                    {/* Theme-specific inner glow */}
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                      registrationSteps[currentStep].field === 'email' && emailExists
                        ? 'bg-gradient-to-r from-red-400/10 via-pink-400/10 to-red-400/10'
                        : isDarkMode
                          ? 'bg-gradient-to-r from-purple-400/8 via-blue-400/8 via-cyan-400/8 to-purple-400/8'
                          : 'bg-gradient-to-r from-amber-400/12 via-orange-400/12 via-rose-400/12 to-amber-400/12'
                    } opacity-0 hover:opacity-100 focus-within:opacity-100 blur-sm`}></div>
                    
                    {/* Theme-specific animated flowing border */}
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden ${
                      registrationSteps[currentStep].field === 'email' && emailExists
                        ? 'opacity-0'
                        : 'opacity-100'
                    }`}>
                      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-purple-500/15 via-blue-500/15 via-cyan-500/15 to-purple-500/15'
                          : 'bg-gradient-to-r from-amber-500/18 via-orange-500/18 via-rose-500/18 to-amber-500/18'
                      } animate-gradient-flow`}></div>
                      
                      {/* Theme-specific moving gradient overlay */}
                      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-transparent via-white/5 to-transparent'
                          : 'bg-gradient-to-r from-transparent via-orange-200/12 to-transparent'
                      } animate-shimmer`}></div>
                    </div>
                    
                    {/* Theme-specific focus glow effect */}
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                      registrationSteps[currentStep].field === 'email' && emailExists
                        ? 'bg-gradient-to-r from-red-500/15 via-pink-500/15 to-red-500/15'
                        : isDarkMode
                          ? 'bg-gradient-to-r from-purple-500/15 via-blue-500/15 via-cyan-500/15 to-purple-500/15'
                          : 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 via-rose-500/20 to-amber-500/20'
                    } opacity-0 focus-within:opacity-100 blur-lg scale-105`}></div>
                    
                    {/* Theme-specific floating particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-0.5 h-0.5 rounded-full animate-float-particle ${
                            isDarkMode
                              ? 'bg-gradient-to-r from-purple-400/30 to-blue-400/30'
                              : 'bg-gradient-to-r from-amber-500/30 to-orange-500/30'
                          }`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${4 + Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Additional warm tone flowing elements for light mode */}
                    {!isDarkMode && (
                      <>
                        {/* Warm flowing lines */}
                        <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-pulse"></div>
                          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent animate-pulse delay-1000"></div>
                          <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-rose-400/30 to-transparent animate-pulse delay-500"></div>
                          <div className="absolute right-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-amber-400/30 to-transparent animate-pulse delay-1500"></div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Send Button - Now positioned next to input like WhatsApp */}
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping || (registrationSteps[currentStep].field === 'email' && emailExists)}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-500 flex-shrink-0 ${
                      inputValue.trim() && !isTyping && !(registrationSteps[currentStep].field === 'email' && emailExists)
                        ? isDarkMode
                          ? 'btn-cosmic'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-xl hover:shadow-orange-500/30'
                        : isDarkMode
                          ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                          : 'bg-gray-200/50 text-amber-600 cursor-not-allowed'
                    }`}
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                
                {/* Email verification status */}
                {registrationSteps[currentStep].field === 'email' && formData.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    {emailChecking ? (
                      <div className="flex items-center space-x-2 text-blue-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        <span>Checking email availability...</span>
                      </div>
                    ) : emailExists ? (
                      <div className="flex items-center space-x-2 text-red-500">
                        <AlertCircle className="h-4 w-4" />
                        <span>This email is already registered. Please use a different email or login instead.</span>
                        <div className="flex space-x-2 ml-2">
                          <button
                            onClick={handleClearEmail}
                            className="px-2 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Clear & Try Again
                          </button>
                          <button
                            onClick={handleStartFreshWithNewEmail}
                            className="px-2 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Try Different Email
                          </button>
                        </div>
                      </div>
                    ) : formData.email.includes('@') ? (
                      <div className="flex items-center space-x-2 text-green-500">
                        <CheckCircle className="h-4 w-4" />
                        <span>Email is available! ✅</span>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* General error display */}
                {errors[registrationSteps[currentStep].field] && (
                  <div className="flex items-center space-x-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors[registrationSteps[currentStep].field]}</span>
                  </div>
                )}
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Registration;
