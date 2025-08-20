# Marcus Henriques Portfolio Website

A modern, responsive portfolio website built with Blazor WebAssembly, featuring a clean design, interactive components, and contact form functionality.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <your-repo-url>
cd PortfolioWebsite

# Run setup script (Windows)
.\setup.ps1

# Or manual setup
npm install
dotnet restore
```

## 🖥️ Local Development

For local development, the CSS and JS files are served directly from the `wwwroot/` directory. **No Gulp build is required for local development.**

```bash
# Start the development server
dotnet run

# The app will be available at:
# http://localhost:5000 or https://localhost:5001
# (or another port if those are in use)
```

### Local Development Notes:
- ✅ **CSS files** are served from `wwwroot/css/`
- ✅ **JS files** are served from `wwwroot/js/`
- ✅ **Images** are served from `wwwroot/images/`
- ✅ **No build process required** - just run `dotnet run`
- ✅ **Hot reload** works automatically with Blazor

### If you see 404 errors:
1. Make sure you're not running any Gulp build commands
2. Ensure the `dist/` directory is cleaned up (if it exists)
3. Run `dotnet clean && dotnet build` to refresh the build
4. Check that CSS and JS files exist in `wwwroot/` directories

## 📋 Deployment Checklist

✅ **Ready for Cloudflare Pages deployment** - See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for complete setup guide.

### Required Environment Variables:
- `EMAILJS_SERVICE_ID` - Your EmailJS service ID
- `EMAILJS_TEMPLATE_ID` - Your EmailJS template ID  
- `EMAILJS_USER_ID` - Your EmailJS user ID
- `CONTACT_EMAIL` - Your email address
- `ENVIRONMENT=production`
- `APP_VERSION=1.0.0`

## 🛠️ Tech Stack

- **Frontend**: Blazor WebAssembly
- **UI Framework**: MudBlazor
- **Styling**: CSS3 with custom animations
- **Email Service**: EmailJS
- **Build Tool**: Gulp.js
- **Deployment**: Cloudflare Pages

## 🔧 Development Commands

```bash
# Local Development (no build required)
dotnet run

# Build for production
npm run buildForPages

# Watch for changes (for Gulp-based builds)
npm run watch

# Clean build output
npm run clean

# Deploy to GitHub Pages
npm run build:github-pages
```

## 🚀 Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Components**: Skill dialogs, project showcases, and experience details
- **Contact Form**: EmailJS integration for seamless communication
- **Performance Optimized**: Minified assets, optimized images, and fast loading
- **SEO Ready**: Proper meta tags and structured content

## 🛠️ Tech Stack

- **Frontend**: Blazor WebAssembly
- **UI Framework**: MudBlazor
- **Styling**: CSS3 with custom animations
- **Email Service**: EmailJS
- **Build Tool**: Gulp.js
- **Deployment**: Cloudflare Pages

## 📋 Prerequisites

- Node.js v16+ and npm
- .NET 9.0 SDK
- EmailJS account (for contact form)
- Cloudflare account (for deployment)

## 🔧 Quick Setup

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd PortfolioWebsite
```

### 2. Run Setup Script (Windows)

```powershell
.\setup.ps1
```

### 3. Manual Setup

```bash
# Install dependencies
npm install

# Restore .NET packages
dotnet restore

# Create .env file with your EmailJS credentials
cp .env.example .env
```

### 4. Configure EmailJS

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `from_name`, `from_email`, `subject`, `message`
   - `to_name`, `to_email`, `reply_to`
4. Update your `.env` file with the credentials

## 🚀 Development

### Local Development

```bash
# Start development server
dotnet run

# Watch for changes and rebuild
npm run watch
```

### Build for Production

```bash
# Build optimized assets
npm run build

# Clean build output
npm run clean
```

## 📦 Build Process

The build process includes:

- **CSS Optimization**: Minification, autoprefixing, and source maps
- **JavaScript Optimization**: Uglification and console log removal
- **Image Optimization**: Compression and format optimization
- **HTML Minification**: Whitespace removal and optimization
- **Settings Generation**: Environment-based configuration

### Build Output

```
dist/
├── wwwroot/
│   ├── css/          # Minified CSS files
│   ├── js/           # Minified JS files
│   ├── images/       # Optimized images
│   ├── settings.json # Generated configuration
│   └── index.html    # Main HTML file
```

## 🚀 Deployment

### Cloudflare Pages Deployment

1. **Follow the complete deployment guide**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

2. **Quick deployment steps**:
   - Connect your GitHub repository to Cloudflare Pages
   - Set build command: `npm run build`
   - Set build output directory: `dist`
   - Configure environment variables in Cloudflare Pages dashboard

### Environment Variables

Set these in Cloudflare Pages:

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAILJS_SERVICE_ID` | Your EmailJS service ID | ✅ |
| `EMAILJS_TEMPLATE_ID` | Your EmailJS template ID | ✅ |
| `EMAILJS_USER_ID` | Your EmailJS user ID | ✅ |
| `CONTACT_EMAIL` | Your email address | ✅ |
| `ENVIRONMENT` | `production` | ✅ |
| `APP_VERSION` | Application version | ✅ |

### GitHub Actions (Optional)

The repository includes a GitHub Actions workflow for automated deployment. Set up these secrets:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_USER_ID`
- `CONTACT_EMAIL`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PROJECT_NAME`

## 📁 Project Structure

```
PortfolioWebsite/
├── Components/           # Blazor components
│   ├── HeroSection.razor
│   ├── SkillDetailsDialog.razor
│   └── ...
├── Pages/               # Blazor pages
├── Services/            # Business logic services
├── Models/              # Data models
├── wwwroot/             # Static assets
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   └── images/         # Images and icons
├── gulpfile.js         # Build configuration
├── package.json        # Node.js dependencies
└── DEPLOYMENT_CHECKLIST.md
```

## 🔧 Configuration

### EmailJS Setup

1. **Service Configuration**:
   ```javascript
   // In email-service.js
   EMAILJS_CONFIG = {
       serviceId: 'your_service_id',
       templateId: 'your_template_id',
       userId: 'your_user_id'
   };
   ```

2. **Template Variables**:
   - `from_name`: Sender's name
   - `from_email`: Sender's email
   - `subject`: Email subject
   - `message`: Email message
   - `to_name`: Recipient name
   - `to_email`: Recipient email
   - `reply_to`: Reply-to email

### Customization

- **Colors**: Update CSS variables in `wwwroot/css/global.css`
- **Content**: Modify data in `Services/PortfolioDataService.cs`
- **Styling**: Edit component-specific CSS files
- **Animations**: Customize in `wwwroot/js/scroll-animations.js`

## 🧪 Testing

### Local Testing

```bash
# Build and test
npm run build

# Serve locally
cd dist
python -m http.server 8000
# or
npx serve .
```

### Contact Form Testing

1. Fill out the contact form
2. Check browser console for EmailJS logs
3. Verify email delivery in EmailJS dashboard
4. Test fallback simulation mode

## 🔒 Security

- **Environment Variables**: All sensitive data is externalized
- **No Hardcoded Secrets**: Credentials are loaded from environment
- **HTTPS**: Automatic SSL with Cloudflare Pages
- **Input Validation**: Contact form validation implemented

## 📊 Performance

### Optimization Features

- **Asset Minification**: CSS and JS files are minified
- **Image Optimization**: Automatic compression and format optimization
- **Lazy Loading**: Images and components load on demand
- **Caching**: Proper cache headers for static assets

### Performance Targets

- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check Node.js version (requires v16+)
   - Verify npm dependencies are installed
   - Check for syntax errors in source files

2. **EmailJS Not Working**:
   - Verify environment variables are set
   - Check EmailJS template configuration
   - Test with fallback simulation mode

3. **Deployment Issues**:
   - Verify Cloudflare API token permissions
   - Check build output directory configuration
   - Review deployment logs

### Support Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Blazor Documentation](https://docs.microsoft.com/en-us/aspnet/core/blazor/)
- [MudBlazor Documentation](https://mudblazor.com/)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

- **Email**: [Your Email]
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]

---

**Status**: ✅ Production Ready
**Last Updated**: [Current Date]
**Version**: 1.0.0
