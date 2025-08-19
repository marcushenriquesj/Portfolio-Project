# Cloudflare Pages Deployment Guide

This guide explains how to deploy your portfolio website to Cloudflare Pages with proper EmailJS configuration and optimized assets.

## 🚀 Prerequisites

- Cloudflare account
- GitHub repository with your portfolio code
- EmailJS account with configured service and template
- Node.js (v16+) and npm installed locally

## 📋 Pre-deployment Setup

### Step 1: Install Dependencies

```bash
cd PortfolioWebsite
npm install
```

### Step 2: Set Environment Variables

Create a `.env` file in the PortfolioWebsite directory (this file is gitignored):

```env
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_USER_ID=your_user_id_here
CONTACT_EMAIL=your-email@example.com
ENVIRONMENT=production
APP_VERSION=1.0.0
```

## 🔧 Build Process

### Local Build

1. **Build with Gulp (Recommended):**
   ```bash
   npm run build
   ```

2. **Or use the deployment script:**
   ```powershell
   .\deploy.ps1
   ```

3. **Manual build steps:**
   ```bash
   # Build .NET project
   dotnet build -c Release
   dotnet publish -c Release -o ./dist
   
   # Run Gulp build
   npm run build
   ```

### Build Output

The build process creates a `dist/` directory containing:
- Minified CSS files (`.min.css`)
- Minified JavaScript files (`.min.js`)
- Optimized images
- Generated `settings.json` with environment variables
- All other static assets

## 📋 Deployment Steps

### Step 1: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub repository
4. Configure build settings:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `PortfolioWebsite`

### Step 2: Configure Environment Variables

In your Cloudflare Pages project settings, add these environment variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `EMAILJS_SERVICE_ID` | `your_service_id` | Your EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | `your_template_id` | Your EmailJS template ID |
| `EMAILJS_USER_ID` | `your_user_id` | Your EmailJS user ID |
| `CONTACT_EMAIL` | `your-email@example.com` | Your email address |
| `ENVIRONMENT` | `production` | Deployment environment |
| `APP_VERSION` | `1.0.0` | Application version |

### Step 3: Configure Build Pipeline

Create a `.github/workflows/deploy.yml` file in your repository:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

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
        cache-dependency-path: PortfolioWebsite/package-lock.json
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '9.0.x'
    
    - name: Install dependencies
      working-directory: PortfolioWebsite
      run: npm ci
    
    - name: Build and deploy
      working-directory: PortfolioWebsite
      env:
        EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
        EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
        EMAILJS_USER_ID: ${{ secrets.EMAILJS_USER_ID }}
        CONTACT_EMAIL: ${{ secrets.CONTACT_EMAIL }}
        ENVIRONMENT: production
        APP_VERSION: ${{ github.sha }}
      run: npm run build
    
    - name: Deploy to Cloudflare Pages
      uses: cloudflare/pages-action@v1
      with:
        apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        projectName: your-project-name
        directory: PortfolioWebsite/dist
        gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### Step 4: Set Up GitHub Secrets

In your GitHub repository settings, add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `EMAILJS_SERVICE_ID` | `your_service_id` | Your EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | `your_template_id` | Your EmailJS template ID |
| `EMAILJS_USER_ID` | `your_user_id` | Your EmailJS user ID |
| `CONTACT_EMAIL` | `your-email@example.com` | Your email address |
| `CLOUDFLARE_API_TOKEN` | `your-api-token` | Cloudflare API token |
| `CLOUDFLARE_ACCOUNT_ID` | `your-account-id` | Cloudflare account ID |

### Step 5: Get Cloudflare Credentials

1. **API Token**:
   - Go to Cloudflare Dashboard → **My Profile** → **API Tokens**
   - Create custom token with Pages permissions
   - Copy the token

2. **Account ID**:
   - Go to Cloudflare Dashboard → **My Profile** → **Account Home**
   - Copy the Account ID from the right sidebar

## 🔧 Alternative: Manual Deployment

If you prefer manual deployment without GitHub Actions:

1. **Build locally**:
   ```bash
   cd PortfolioWebsite
   npm run build
   ```

2. **Upload to Cloudflare Pages** via the dashboard:
   - Go to your Cloudflare Pages project
   - Upload the contents of the `dist/` directory

## 🧪 Testing Deployment

### Pre-deployment Testing
1. Test locally with `npm run build`
2. Verify EmailJS configuration loads correctly
3. Test contact form submission
4. Check browser console for any errors

### Post-deployment Testing
1. Visit your deployed site
2. Test contact form functionality
3. Verify emails are received
4. Check EmailJS dashboard for delivery status

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data to your repository
2. **API Tokens**: Use least-privilege tokens for Cloudflare
3. **EmailJS**: Consider rate limiting to prevent spam
4. **HTTPS**: Cloudflare Pages provides automatic HTTPS
5. **Build Process**: All sensitive data is removed from source files

## 🐛 Troubleshooting

### Build Issues
- Check Node.js version (requires v16+)
- Verify all npm dependencies are installed
- Check Gulp build logs for errors
- Ensure .NET build completes successfully

### EmailJS Issues
- Verify environment variables are set correctly
- Check browser console for EmailJS errors
- Test EmailJS configuration in development first

### Deployment Issues
- Verify Cloudflare API token permissions
- Check account ID is correct
- Ensure project name matches Cloudflare Pages project

## 📊 Monitoring

### Cloudflare Analytics
- Page views and performance
- Error rates and logs
- Geographic distribution

### EmailJS Dashboard
- Email delivery status
- Template usage statistics
- Error logs and debugging

## 🎯 Next Steps

1. **Set up monitoring** and alerts
2. **Configure custom domain** if needed
3. **Set up staging environment** for testing
4. **Implement analytics** tracking
5. **Add performance monitoring**

---

**Status**: ✅ Ready for deployment with optimized build process
**Next Action**: Follow the deployment steps above to deploy to Cloudflare Pages
