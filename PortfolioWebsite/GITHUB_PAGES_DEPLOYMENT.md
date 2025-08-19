# GitHub Pages Deployment Guide

## 🚀 Deploy Your Blazor WebAssembly Portfolio to GitHub Pages

This guide will help you deploy your portfolio to GitHub Pages for free, keeping all your Blazor functionality, MudBlazor components, and EmailJS integration.

## 📋 Prerequisites

- GitHub account
- Your portfolio repository on GitHub
- EmailJS account (for contact form functionality)

## 🔧 Step-by-Step Deployment

### 1. Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   git push origin main
   ```

### 2. Set Up GitHub Pages

1. **Go to your repository on GitHub**
2. **Navigate to Settings > Pages**
3. **Configure GitHub Pages**:
   - **Source**: Select "GitHub Actions"
   - **Branch**: Leave as default (GitHub Actions will handle deployment)

### 3. Configure Environment Variables

1. **Go to Settings > Secrets and variables > Actions**
2. **Add the following repository secrets**:

   | Secret Name | Description | Example |
   |-------------|-------------|---------|
   | `EMAILJS_SERVICE_ID` | Your EmailJS service ID | `service_abc123` |
   | `EMAILJS_TEMPLATE_ID` | Your EmailJS template ID | `template_xyz789` |
   | `EMAILJS_USER_ID` | Your EmailJS user ID | `user_123456` |
   | `CONTACT_EMAIL` | Your contact email | `marcus@example.com` |

### 4. Enable GitHub Actions

1. **Go to Actions tab** in your repository
2. **The workflow will automatically run** when you push to main/master
3. **Monitor the build process** - it should complete successfully

### 5. Access Your Site

Your portfolio will be available at:
```
https://yourusername.github.io/your-repo-name/
```

## 🔄 Automatic Deployments

- **Every push to main/master** triggers a new deployment
- **Build process**:
  1. Sets up .NET 9.0 and Node.js
  2. Installs npm dependencies
  3. Builds Blazor WebAssembly application
  4. Deploys to GitHub Pages

## 🛠️ Troubleshooting

### Build Failures

1. **Check Actions tab** for error details
2. **Verify environment variables** are set correctly
3. **Ensure all dependencies** are in package.json

### Routing Issues

- The `404.html` file handles client-side routing
- All routes fall back to the main application
- Direct links should work correctly

### EmailJS Issues

1. **Verify EmailJS credentials** in repository secrets
2. **Test contact form** on deployed site
3. **Check EmailJS dashboard** for any errors

## 📁 Repository Structure

```
PortfolioWebsite/
├── .github/workflows/
│   └── deploy-github-pages.yml    # GitHub Actions workflow
├── wwwroot/
│   ├── 404.html                   # SPA routing handler
│   ├── index.html                 # Main Blazor app
│   └── ...                        # Other assets
├── gulpfile.js                    # Build configuration
├── package.json                   # Dependencies
└── ...                            # Blazor components
```

## 🎯 Benefits of GitHub Pages

- ✅ **Free hosting** with SSL certificates
- ✅ **Automatic deployments** from Git
- ✅ **Global CDN** for fast loading
- ✅ **Custom domains** support
- ✅ **Perfect Blazor WASM support**
- ✅ **Keep all functionality** (EmailJS, MudBlazor, etc.)

## 🔒 Security Notes

- **Environment variables** are encrypted in GitHub
- **No sensitive data** in your code
- **EmailJS credentials** are secure
- **Public repository** is fine for portfolio

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify all environment variables
3. Test locally with `npm run build`
4. Check EmailJS configuration

## 🎉 Success!

Once deployed, your portfolio will be:
- **Fully functional** with all Blazor features
- **Responsive** and modern
- **Fast loading** with optimized assets
- **Professional** and ready for visitors
