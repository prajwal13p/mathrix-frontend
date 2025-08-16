# 🎨 Mathrix Frontend

AI-Powered Team Formation Platform Frontend

## 🏗️ Architecture

- **Framework**: React.js
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context
- **Deployment**: Render.com (Static Site)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-frontend-repo-url>
   cd mathrix-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   ```bash
   # Create .env file with your backend API URL
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```bash
# Backend API URL (update this for production)
REACT_APP_API_URL=https://mathrix-backend.onrender.com

# Optional: Feature flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG=true
```

## 📱 Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: Automatic theme switching
- **Real-time Validation**: Email and USN availability checks
- **Interactive UI**: Smooth animations and transitions
- **Accessibility**: ARIA labels and keyboard navigation

## 🎨 Components

- **Navbar**: Navigation with theme toggle
- **Registration**: Multi-step AI-guided registration
- **Login**: Secure authentication
- **Dashboard**: User dashboard and team management
- **Theme Context**: Global theme management

## 🔧 Configuration

### API Configuration

Update the API base URL in your environment variables:

```javascript
// For development
REACT_APP_API_URL=http://localhost:8000

// For production (update with your backend URL)
REACT_APP_API_URL=https://mathrix-backend.onrender.com
```

### Build Configuration

The project uses:
- **PostCSS**: For CSS processing
- **Tailwind CSS**: For utility-first styling
- **React Scripts**: For build and development

## 📁 Project Structure

```
mathrix-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts
│   ├── pages/           # Page components
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## 🚀 Deployment

### Render.com (Recommended)

1. **Connect repository** to Render
2. **Create Static Site** service
3. **Configure build**:
   - Build Command: `npm run build`
   - Publish Directory: `build`
4. **Set environment variables**
5. **Deploy**

### Manual Deployment

```bash
# Build the project
npm run build

# Upload build/ folder to your hosting service
```

## 🔒 Security

- Environment variable protection
- API key management
- CORS configuration
- Input validation

## 📊 Performance

- Code splitting with React Router
- Optimized bundle size
- Lazy loading of components
- Efficient state management

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Code Style

- ESLint configuration
- Prettier formatting
- Consistent component structure
- Proper prop types

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (requires 14+)
   - Clear node_modules and reinstall
   - Check for syntax errors

2. **API calls fail**
   - Verify REACT_APP_API_URL
   - Check CORS configuration
   - Verify backend is running

3. **Styling issues**
   - Clear browser cache
   - Check Tailwind CSS compilation
   - Verify PostCSS configuration

## 📞 Support

For deployment help, see the backend repository's [DEPLOYMENT.md](../mathrix-backend/DEPLOYMENT.md)

---

**Built with ❤️ for Mathrix Team Formation Platform**
