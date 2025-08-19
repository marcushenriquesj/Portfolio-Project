# Cloudflare Pages Deployment Guide

This guide explains how to deploy your portfolio website to Cloudflare Pages with proper EmailJS configuration.

## 🚀 Prerequisites

- Cloudflare account
- GitHub repository with your portfolio code
- EmailJS account with configured service and template

## 📋 Deployment Steps

### Step 1: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub repository
4. Configure build settings:
   - **Framework preset**: None
   - **Build command**: `dotnet publish -c Release -o ./dist`
   - **Build output directory**: `dist`
   - **Root directory**: `PortfolioWebsite`

### Step 2: Configure Environment Variables

In your Cloudflare Pages project settings, add these environment variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `EMAILJS_SERVICE_ID` | `service_td7vveh` | Your EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | `template_49mj3c8` | Your EmailJS template ID |
| `EMAILJS_USER_ID` | `cby30yyJZtnR9t472` | Your EmailJS user ID |
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
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '9.0.x'
    
    - name: Restore dependencies
      run: dotnet restore
    
    - name: Build
      run: dotnet build --no-restore
    
    - name: Publish
      run: dotnet publish -c Release -o ./dist
    
    - name: Generate settings.json
      run: |
        cat > dist/wwwroot/settings.json << EOF
        {
          "emailjs": {
            "serviceId": "${{ secrets.EMAILJS_SERVICE_ID }}",
            "templateId": "${{ secrets.EMAILJS_TEMPLATE_ID }}",
            "userId": "${{ secrets.EMAILJS_USER_ID }}"
          },
          "contact": {
            "recipientName": "Marcus Henriques",
            "recipientEmail": "${{ secrets.CONTACT_EMAIL }}"
          },
          "app": {
            "name": "Marcus Henriques Portfolio",
            "version": "${{ github.sha }}",
            "environment": "production"
          }
        }
        EOF
    
    - name: Deploy to Cloudflare Pages
      uses: cloudflare/pages-action@v1
      with:
        apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        projectName: your-project-name
        directory: dist
        gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### Step 4: Set Up GitHub Secrets

In your GitHub repository settings, add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `EMAILJS_SERVICE_ID` | `service_td7vveh` | Your EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | `template_49mj3c8` | Your EmailJS template ID |
| `EMAILJS_USER_ID` | `cby30yyJZtnR9t472` | Your EmailJS user ID |
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
   dotnet publish -c Release -o ./dist
   ```

2. **Create settings.json**:
   ```bash
   cp settings.template.json dist/wwwroot/settings.json
   ```

3. **Replace placeholders** in `dist/wwwroot/settings.json` with your actual values

4. **Upload to Cloudflare Pages** via the dashboard

## 🧪 Testing Deployment

### Pre-deployment Testing
1. Test locally with `dotnet run`
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

## 🐛 Troubleshooting

### Build Issues
- Check .NET version compatibility
- Verify build commands in Cloudflare Pages settings
- Check GitHub Actions logs for errors

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

**Status**: ✅ Ready for deployment
**Next Action**: Follow the deployment steps above to deploy to Cloudflare Pages
