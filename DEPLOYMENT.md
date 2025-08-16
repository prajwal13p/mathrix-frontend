# 🚀 Mathrix Frontend Deployment Guide

## 📋 Prerequisites

- [Render.com](https://render.com) account
- Git repository with your frontend code
- Backend API deployed and running

## 🌐 Frontend Deployment on Render

### 1. Create Static Site

1. **Go to Render Dashboard**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Static Site"

2. **Connect Repository**
   - Connect your Git repository
   - Select the `mathrix-frontend` repository

3. **Configure Build**
   - **Name**: `mathrix-frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
   - **Branch**: `main` (or your default branch)

4. **Environment Variables**
   ```bash
   # Backend API URL (update with your actual backend URL)
   REACT_APP_API_URL=https://mathrix-backend.onrender.com
   
   # Optional: Feature flags
   REACT_APP_ENABLE_ANALYTICS=false
   REACT_APP_ENABLE_DEBUG=false
   ```

5. **Deploy**
   - Click "Create Static Site"
   - Render will build and deploy automatically

### 2. Update API URLs

Before deploying, update your frontend to use the production backend URL:

1. **Create `.env.production` file**:
   ```bash
   REACT_APP_API_URL=https://mathrix-backend.onrender.com
   ```

2. **Update hardcoded URLs** (if any):
   ```javascript
   // Change from localhost:8000 to your backend URL
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mathrix-backend.onrender.com';
   ```

## 🔧 Configuration Files

### package.json Scripts
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Environment Variables
```bash
# Development
REACT_APP_API_URL=http://localhost:8000

# Production
REACT_APP_API_URL=https://mathrix-backend.onrender.com
```

## 📱 Build Process

### Local Build Test
```bash
# Install dependencies
npm install

# Test build locally
npm run build

# Check build output
ls -la build/
```

### Build Output
The build process creates:
- **`build/`** directory with optimized files
- **Minified JavaScript** and CSS
- **Static assets** (images, fonts)
- **Index.html** with proper paths

## 🌍 CORS Configuration

Your backend should allow requests from your frontend domain:

```python
# In your backend CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://mathrix-frontend.onrender.com",
        "http://localhost:3000"  # For local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔍 Testing Deployment

### 1. Health Check
```bash
# Check if your frontend is accessible
curl -I https://mathrix-frontend.onrender.com
```

### 2. API Connection Test
```bash
# Test if frontend can reach backend
curl -I https://mathrix-backend.onrender.com/health
```

### 3. Browser Testing
- Open your frontend URL
- Test all major features
- Check console for errors
- Verify API calls work

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check build logs in Render
   # Common causes:
   # - Syntax errors in code
   # - Missing dependencies
   # - Node.js version mismatch
   ```

2. **API Calls Fail**
   ```bash
   # Check browser console
   # Verify REACT_APP_API_URL is correct
   # Check CORS configuration in backend
   ```

3. **Styling Issues**
   ```bash
   # Clear browser cache
   # Check if Tailwind CSS compiled correctly
   # Verify build output includes CSS
   ```

### Debug Mode
Enable debug mode temporarily:
```bash
REACT_APP_ENABLE_DEBUG=true
```

## 📊 Monitoring

### Render Dashboard
- **Build Logs**: View build process
- **Deployments**: Track deployment history
- **Performance**: Monitor site performance

### Custom Monitoring
```bash
# Check build status
curl https://mathrix-frontend.onrender.com

# Monitor API connectivity
curl https://mathrix-backend.onrender.com/health
```

## 🔒 Security

### Environment Variables
- Never commit `.env` files to Git
- Use Render's environment variable system
- Rotate sensitive values regularly

### CORS
- Restrict allowed origins in production
- Only allow necessary HTTP methods
- Validate request headers

## 📈 Performance

### Build Optimization
- **Code Splitting**: Automatic with React Router
- **Tree Shaking**: Remove unused code
- **Minification**: Compress JavaScript/CSS
- **Asset Optimization**: Optimize images and fonts

### CDN Benefits
- **Global Distribution**: Faster loading worldwide
- **Caching**: Browser and CDN caching
- **Compression**: Gzip compression

## 🎯 Next Steps

1. **Deploy Backend** first (see backend DEPLOYMENT.md)
2. **Update Frontend** with backend URL
3. **Deploy Frontend** to Render
4. **Test Integration** between frontend and backend
5. **Set Custom Domain** (optional)
6. **Monitor Performance** and logs

## 📞 Support

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **React Docs**: [reactjs.org](https://reactjs.org)
- **Community**: [community.render.com](https://community.render.com)

---

**Happy Deploying! 🚀**
