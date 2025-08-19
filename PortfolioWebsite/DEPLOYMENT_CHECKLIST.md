# 🚀 Cloudflare Pages Deployment Checklist

## ✅ Pre-Deployment Setup

### 1. EmailJS Configuration
- [ ] Create EmailJS account at https://www.emailjs.com/
- [ ] Set up EmailJS service (Gmail, Outlook, etc.)
- [ ] Create email template with variables:
  - `from_name`
  - `from_email` 
  - `subject`
  - `message`
  - `to_name`
  - `to_email`
  - `reply_to`
- [ ] Note down your EmailJS credentials:
  - Service ID
  - Template ID
  - User ID

### 2. Cloudflare Setup
- [ ] Create Cloudflare account
- [ ] Get your Account ID from Cloudflare Dashboard
- [ ] Create API Token with Pages permissions:
  - Go to **My Profile** → **API Tokens**
  - Create custom token
  - Permissions: **Cloudflare Pages** → **Edit**
  - Resources: **Include** → **All accounts**
- [ ] Note down your API Token

### 3. GitHub Repository Setup
- [ ] Ensure code is pushed to GitHub
- [ ] Set up GitHub Secrets in repository settings:
  - `EMAILJS_SERVICE_ID`
  - `EMAILJS_TEMPLATE_ID`
  - `EMAILJS_USER_ID`
  - `CONTACT_EMAIL`
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_PROJECT_NAME`

## 🔧 Local Testing

### 4. Build Testing
- [ ] Run `npm install` in PortfolioWebsite directory
- [ ] Test build process: `npm run build`
- [ ] Verify `dist/` directory is created
- [ ] Check that `settings.json` is generated correctly
- [ ] Test contact form locally
- [ ] Verify EmailJS integration works

### 5. Security Check
- [ ] Ensure no sensitive data in source code
- [ ] Verify `.env` file is in `.gitignore`
- [ ] Check that `settings.json` is in `.gitignore`
- [ ] Confirm no hardcoded API keys

## 📋 Cloudflare Pages Setup

### 6. Create Cloudflare Pages Project
- [ ] Go to Cloudflare Dashboard → **Pages**
- [ ] Click **Create a project**
- [ ] Connect your GitHub repository
- [ ] Configure build settings:
  - **Framework preset**: None
  - **Build command**: `npm run build`
  - **Build output directory**: `dist`
  - **Root directory**: `PortfolioWebsite`
- [ ] Note down your project name

### 7. Environment Variables
- [ ] Add environment variables in Cloudflare Pages:
  - `EMAILJS_SERVICE_ID`
  - `EMAILJS_TEMPLATE_ID`
  - `EMAILJS_USER_ID`
  - `CONTACT_EMAIL`
  - `ENVIRONMENT=production`
  - `APP_VERSION=1.0.0`

## 🚀 Deployment

### 8. Initial Deployment
- [ ] Push changes to main branch
- [ ] Monitor GitHub Actions workflow
- [ ] Check Cloudflare Pages deployment logs
- [ ] Verify deployment URL works
- [ ] Test contact form on live site
- [ ] Verify emails are received

### 9. Post-Deployment Testing
- [ ] Test all pages load correctly
- [ ] Verify responsive design works
- [ ] Test contact form submission
- [ ] Check EmailJS dashboard for delivery
- [ ] Test on different browsers
- [ ] Verify mobile functionality

## 🔒 Security & Performance

### 10. Security Verification
- [ ] Confirm HTTPS is enabled
- [ ] Test contact form spam protection
- [ ] Verify no sensitive data in browser console
- [ ] Check for any exposed API keys

### 11. Performance Optimization
- [ ] Verify images are optimized
- [ ] Check CSS/JS minification
- [ ] Test page load speeds
- [ ] Verify caching headers

## 📊 Monitoring Setup

### 12. Analytics & Monitoring
- [ ] Set up Cloudflare Analytics
- [ ] Configure error monitoring
- [ ] Set up uptime monitoring
- [ ] Create performance alerts

### 13. EmailJS Monitoring
- [ ] Set up EmailJS dashboard alerts
- [ ] Monitor email delivery rates
- [ ] Check for failed deliveries
- [ ] Set up rate limiting if needed

## 🎯 Final Steps

### 14. Custom Domain (Optional)
- [ ] Add custom domain in Cloudflare Pages
- [ ] Configure DNS settings
- [ ] Set up SSL certificate
- [ ] Test domain functionality

### 15. Documentation
- [ ] Update README with deployment info
- [ ] Document environment variables
- [ ] Create troubleshooting guide
- [ ] Document maintenance procedures

## 🚨 Troubleshooting

### Common Issues:
- **Build fails**: Check Node.js version and dependencies
- **EmailJS not working**: Verify environment variables and template
- **Deployment fails**: Check Cloudflare API token permissions
- **Contact form broken**: Verify EmailJS configuration

### Emergency Contacts:
- Cloudflare Support: https://support.cloudflare.com/
- EmailJS Support: https://www.emailjs.com/support/
- GitHub Actions: Check workflow logs

---

**Status**: ⏳ Ready for deployment
**Last Updated**: [Current Date]
**Next Action**: Follow checklist step by step
