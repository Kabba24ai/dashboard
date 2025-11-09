# Deployment Guide

Complete deployment instructions for the TaskMaster Pro Dashboard v2.0 with Reports Section across different platforms and environments.

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
4. Configure redirects for React Router (see SPA Configuration below)
5. Site will be live immediately

#### Option B: Git Integration
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18
3. Add `_redirects` file for SPA routing (see SPA Configuration)
4. Deploy automatically on git push

#### SPA Configuration for Netlify
Create `public/_redirects` file:
```
/*    /index.html   200
```

#### Environment Variables (Netlify)
```env
VITE_API_BASE_URL=https://your-api.com
VITE_ANALYTICS_KEY=your-key-here
```

### 2. Vercel Deployment

#### Automatic Deployment
1. Connect GitHub repository to [Vercel](https://vercel.com)
2. Vercel auto-detects Vite configuration
3. SPA routing is handled automatically
4. Deploys automatically on git push

#### Manual Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
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
- **Custom Error Response**: 404 -> 200 -> `/index.html`

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

# Configure nginx for SPA routing
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf for SPA Routing
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle SPA routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
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

## 🧭 SPA Routing Configuration

### Important for v2.0.0
Since v2.0.0 includes React Router with multiple pages (`/`, `/reports`, `/reports/sales`), proper SPA routing configuration is **CRITICAL** for deployment.

### Platform-Specific SPA Setup

#### Netlify
```
# public/_redirects
/*    /index.html   200
```

#### Vercel
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Apache (.htaccess)
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

#### Nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
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
          router: ['react-router-dom'],
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
name: Deploy Dashboard v2.0

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
    - aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
  only:
    - main
```

## 🧪 Testing Before Deployment

### Pre-deployment Checklist
- [ ] All pages render correctly (Dashboard, Reports, Sales Report)
- [ ] Navigation works between all pages
- [ ] Charts display data properly on all pages
- [ ] Responsive design works on all devices
- [ ] All interactive elements function
- [ ] SPA routing works correctly
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

# Test routing manually
# Navigate to: http://localhost:4173/
# Navigate to: http://localhost:4173/reports
# Navigate to: http://localhost:4173/reports/sales
# Refresh each page to test SPA routing

# Check bundle size
npm run build -- --analyze

# Lighthouse audit
npx lighthouse http://localhost:4173 --view
```

## 🚨 Troubleshooting

### Common Issues

#### SPA Routing Issues (v2.0.0 Specific)
- **Problem**: 404 errors when refreshing `/reports` or `/reports/sales`
- **Solution**: Configure server redirects (see SPA Configuration above)
- **Check**: Ensure `_redirects` or server config is properly set

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
- **Test SPA routing** configuration

#### Performance Issues
- **Enable gzip compression** on server
- **Optimize images** and assets
- **Use CDN** for static resources
- **Monitor bundle size** with webpack-bundle-analyzer

### v2.0.0 Specific Troubleshooting

#### Navigation Issues
- **Check React Router** configuration in App.tsx
- **Verify Layout component** is wrapping all routes
- **Test mobile menu** functionality

#### Reports Section Issues
- **Verify all report pages** are accessible
- **Check data loading** in SalesReport component
- **Test back navigation** from reports to main sections

### Support Resources
- **GitHub Issues**: For bug reports
- **Documentation**: Comprehensive guides
- **Team Chat**: Real-time support
- **Monitoring**: Performance dashboards

---

**Ready for Production Deployment v2.0! 🚀**