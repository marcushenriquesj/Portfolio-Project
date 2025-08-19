# Build Process Guide

This guide explains the build process for the portfolio website using Gulp for asset optimization and deployment preparation.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- .NET 9.0 SDK

### Installation
```bash
cd PortfolioWebsite
npm install
```

### Build Commands
```bash
# Full build (recommended)
npm run build

# Clean build directory
npm run clean

# Watch for changes (development)
npm run watch

# Deploy build
npm run deploy
```

## 🔧 Build Process Overview

The build process consists of several steps:

1. **Clean**: Remove previous build artifacts
2. **Copy Static Assets**: Copy non-processed files
3. **Process CSS**: Minify and optimize CSS files
4. **Process JavaScript**: Minify and optimize JS files
5. **Optimize Images**: Compress images for web
6. **Process HTML**: Minify HTML files
7. **Generate Settings**: Create settings.json from environment variables

## 📁 Build Output

The build creates a `dist/` directory with the following structure:

```
dist/
├── wwwroot/
│   ├── css/
│   │   ├── global.min.css
│   │   ├── hero.min.css
│   │   ├── about.min.css
│   │   ├── contact.min.css
│   │   ├── projects.min.css
│   │   ├── experience.min.css
│   │   ├── navbar.min.css
│   │   └── components.min.css
│   ├── js/
│   │   ├── app.min.js
│   │   ├── background-animation.min.js
│   │   ├── email-service.min.js
│   │   └── scroll-animations.min.js
│   ├── images/
│   │   └── (optimized images)
│   ├── settings.json
│   └── index.html
└── (other .NET build files)
```

## 🛠️ Gulp Tasks

### Available Tasks

- **`gulp clean`**: Remove the dist directory
- **`gulp build`**: Run the complete build process
- **`gulp watch`**: Watch for file changes and rebuild automatically
- **`gulp deploy`**: Prepare for deployment

### CSS Processing
- Minification with `gulp-clean-css`
- Autoprefixer for browser compatibility
- Source maps for debugging
- Output: `.min.css` files

### JavaScript Processing
- Minification with `gulp-uglify`
- Console.log removal in production
- Source maps for debugging
- Output: `.min.js` files

### Image Optimization
- JPEG optimization (75% quality)
- PNG optimization (level 5)
- SVG optimization
- GIF optimization

### HTML Processing
- Whitespace removal
- Comment removal
- CSS/JS minification inline

## 🔐 Environment Variables

The build process uses environment variables to generate `settings.json`:

```env
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_USER_ID=your_user_id
CONTACT_EMAIL=your-email@example.com
ENVIRONMENT=production
APP_VERSION=1.0.0
```

### Generated settings.json
```json
{
  "emailjs": {
    "serviceId": "your_service_id",
    "templateId": "your_template_id",
    "userId": "your_user_id"
  },
  "contact": {
    "recipientName": "Marcus Henriques",
    "recipientEmail": "your-email@example.com"
  },
  "app": {
    "name": "Marcus Henriques Portfolio",
    "version": "1.0.0",
    "environment": "production"
  }
}
```

## 🚀 Deployment

### Local Testing
```bash
# Build the project
npm run build

# Test locally (if you have a local server)
cd dist
python -m http.server 8000
# or
npx serve .
```

### Cloudflare Pages Deployment
1. Build the project: `npm run build`
2. Upload the contents of `dist/` to Cloudflare Pages
3. Set environment variables in Cloudflare Pages dashboard

### GitHub Actions Deployment
The project includes a GitHub Actions workflow that:
1. Sets up Node.js and .NET
2. Installs dependencies
3. Runs the build process
4. Deploys to Cloudflare Pages

## 🔍 Troubleshooting

### Common Issues

**Node.js version error**
```bash
# Check Node.js version
node --version

# Should be v16 or higher
# If not, update Node.js
```

**npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Gulp build fails**
```bash
# Check if all dependencies are installed
npm list

# Reinstall dependencies
npm install

# Check for syntax errors in source files
```

**Missing environment variables**
```bash
# Create .env file
cp .env.example .env

# Edit .env with your values
nano .env
```

### Build Performance

**Optimization Tips:**
- Use `npm run watch` for development (faster rebuilds)
- Exclude large files from processing if not needed
- Use source maps only in development

**File Size Optimization:**
- Images are automatically optimized
- CSS and JS are minified
- Unused CSS/JS should be removed manually

## 📊 Build Statistics

After a successful build, you'll see statistics like:
```
📊 Build Summary:
   Environment: production
   Version: 1.0.0
   Build Directory: dist/

📁 Generated Files:
   CSS Files: 8
   JS Files: 4
   Image Files: 10
   Total Size: 2.45 MB
```

## 🔄 Development Workflow

1. **Development**:
   ```bash
   npm run watch
   # Make changes to source files
   # Build happens automatically
   ```

2. **Testing**:
   ```bash
   npm run build
   # Test the built files locally
   ```

3. **Deployment**:
   ```bash
   npm run deploy
   # Upload dist/ to Cloudflare Pages
   ```

## 📝 Customization

### Adding New Tasks
Edit `gulpfile.js` to add custom tasks:

```javascript
// Example: Add a new task
function customTask() {
    return gulp.src('src/**/*.custom')
        .pipe(/* your processing */)
        .pipe(gulp.dest('dist/'));
}

exports.custom = customTask;
```

### Modifying Build Process
- CSS processing: Edit the `processCSS` function
- JS processing: Edit the `processJS` function
- Image optimization: Edit the `optimizeImages` function

### Environment-Specific Builds
```bash
# Development build
ENVIRONMENT=development npm run build

# Production build
ENVIRONMENT=production npm run build
```

---

**Note**: Always test the build output before deploying to production!
