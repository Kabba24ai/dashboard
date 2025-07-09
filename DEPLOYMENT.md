# Deployment Guide

Complete deployment instructions for the TaskMaster Pro Dashboard across different platforms and environments.

## 🚀 Quick Deployment

### Prerequisites
- Node.js 18+ installed
- Git repository access
- Build artifacts generated (`npm run build`)

### Build Process
```bash
# Install dependencies
npm install

# Run production build
npm run build

# Verify build output
ls -la dist/
```

## 🌐 Platform-Specific Deployments

### 1. Netlify Deployment

#### Option A: Drag & Drop
1. Run `npm run build` locally
2. Go to [Netlify](https://app.netlify.com)
3. Drag the `dist` folder to the deployment area
4. Site will be live immediately

#### Option B: Git Integration
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18
3. Deploy automatically on git push

#### Environment Variables (Netlify)
```env
VITE_API_BASE_URL=https://your-api.com
VITE_ANALYTICS_KEY=your-key-here
```

### 2. Vercel Deployment

#### Automatic Deployment
1. Connect GitHub repository to [Vercel](https://vercel.com)
2. Vercel auto-detects Vite configuration
3. Deploys automatically on git push

#### Manual Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 3. AWS S3 + CloudFront

#### S3 Setup
```bash
# Build the project
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Set bucket policy for public access
aws s3api put-bucket-policy --bucket your-bucket-name --policy file://bucket-policy.json
```

#### CloudFront Configuration
- **Origin**: Your S3 bucket
- **Default Root Object**: `index.html`
- **Error Pages**: Redirect 404 to `index.html` (for SPA routing)

### 4. Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Commands
```bash
# Build image
docker build -t taskmaster-dashboard .

# Run container
docker run -p 80:80 taskmaster-dashboard

# Docker Compose
docker-compose up -d
```

## 🔧 Environment Configuration

### Development Environment
```env
# .env.development
VITE_API_BASE_URL=http://localhost:3001
VITE_ENVIRONMENT=development
VITE_DEBUG_MODE=true
```

### Production Environment
```env
# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_ENVIRONMENT=production
VITE_DEBUG_MODE=false
VITE_ANALYTICS_KEY=your-production-key
```

### Staging Environment
```env
# .env.staging
VITE_API_BASE_URL=https://staging-api.yourdomain.com
VITE_ENVIRONMENT=staging
VITE_DEBUG_MODE=true
```

## 🔒 Security Considerations

### Content Security Policy
```html
<!-- Add to index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;">
```

### HTTPS Configuration
- **Always use HTTPS** in production
- **Redirect HTTP to HTTPS** at server level
- **Update API endpoints** to use HTTPS

### Environment Variables Security
- **Never commit** `.env` files to git
- **Use platform-specific** environment variable systems
- **Rotate API keys** regularly

## 📊 Performance Optimization

### Build Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          icons: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### CDN Configuration
- **Enable gzip compression**
- **Set proper cache headers**
- **Use CDN for static assets**

### Performance Monitoring
```javascript
// Add to main.tsx
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy Dashboard

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build project
      run: npm run build
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### GitLab CI
```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  script:
    - aws s3 sync dist/ s3://$S3_BUCKET --delete
  only:
    - main
```

## 🧪 Testing Before Deployment

### Pre-deployment Checklist
- [ ] All components render correctly
- [ ] Charts display data properly
- [ ] Responsive design works on all devices
- [ ] All interactive elements function
- [ ] Performance metrics are acceptable
- [ ] Security headers are configured
- [ ] Environment variables are set

### Testing Commands
```bash
# Run all tests
npm test

# Build and preview locally
npm run build
npm run preview

# Check bundle size
npm run build -- --analyze

# Lighthouse audit
npx lighthouse http://localhost:4173 --view
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 18+
```

#### Deployment Issues
- **Check environment variables** are properly set
- **Verify build output** exists in `dist/` folder
- **Confirm API endpoints** are accessible
- **Check browser console** for errors

#### Performance Issues
- **Enable gzip compression** on server
- **Optimize images** and assets
- **Use CDN** for static resources
- **Monitor bundle size** with webpack-bundle-analyzer

### Support Resources
- **GitHub Issues**: For bug reports
- **Documentation**: Comprehensive guides
- **Team Chat**: Real-time support
- **Monitoring**: Performance dashboards

---

**Ready for Production Deployment! 🚀**