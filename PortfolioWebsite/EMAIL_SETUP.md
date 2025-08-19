# Email Setup Guide - EmailJS Implementation

This guide explains how to set up EmailJS for the contact form in your portfolio website.

## Current Implementation

The current implementation uses **EmailJS** for client-side email sending with a fallback to simulation mode. This provides a working email solution that doesn't require a server-side API.

## ✅ What's Already Set Up

- ✅ EmailJS CDN included in index.html
- ✅ JavaScript email service (email-service.js)
- ✅ C# EmailService with JS interop
- ✅ Contact form with validation
- ✅ Success/error feedback
- ✅ Fallback simulation mode

## 🚀 Setting Up EmailJS (Step by Step)

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```html
Subject: Portfolio Contact: {{subject}}

New contact form submission from your portfolio website.

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from: {{from_email}}
Reply to: {{reply_to}}
```

4. Save the template and note your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your User ID

1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (User ID)

### Step 5: Update Configuration

Open `wwwroot/js/email-service.js` and update the configuration:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'service_abc123', // Your EmailJS service ID
    templateId: 'template_xyz789', // Your EmailJS template ID
    userId: 'user_123456789' // Your EmailJS user ID
};
```

## 🧪 Testing the Implementation

### Current Mode (Simulation)
- The form currently runs in simulation mode
- Check browser console for logged contact details
- Perfect for development and testing

### Production Mode (EmailJS)
- Once configured, emails will be sent via EmailJS
- You'll receive actual emails at your configured address
- Form submissions are logged in EmailJS dashboard

## 📧 Email Flow

1. **User fills out contact form**
2. **Form validation** (client-side)
3. **EmailJS sends email** (or simulation)
4. **Success/error feedback** to user
5. **Email received** in your inbox

## 🔧 Configuration Options

### Custom Email Template
You can customize the email template in EmailJS dashboard:

```html
Subject: New Portfolio Contact: {{subject}}

Hi Marcus,

You have a new contact form submission:

**Contact Details:**
- Name: {{from_name}}
- Email: {{from_email}}
- Subject: {{subject}}

**Message:**
{{message}}

---
This email was sent from your portfolio website.
Reply directly to: {{from_email}}
```

### Rate Limiting
- EmailJS free tier: 200 emails/month
- Paid plans available for higher limits
- Consider implementing rate limiting in your form

## 🛡️ Security Considerations

1. **EmailJS is client-side** - credentials are visible in browser
2. **Use environment variables** for production
3. **Implement rate limiting** to prevent spam
4. **Validate all inputs** (already implemented)
5. **Use HTTPS** in production

## 🔄 Alternative: Server-Side API

If you prefer a server-side solution:

1. **Create ASP.NET Core Web API**
2. **Use MailKit or SendGrid**
3. **Update EmailService.cs** to call your API
4. **Deploy API separately**

## 🐛 Troubleshooting

### EmailJS Not Working
1. Check browser console for errors
2. Verify EmailJS credentials
3. Ensure EmailJS CDN is loading
4. Check network connectivity

### Emails Not Received
1. Check spam folder
2. Verify email service configuration
3. Check EmailJS dashboard for delivery status
4. Test with different email providers

### Form Validation Issues
1. Check browser console for validation errors
2. Verify form field names match ContactInfo model
3. Test with different browsers

## 📊 Monitoring

### EmailJS Dashboard
- Track email delivery
- View email templates
- Monitor usage limits
- Check error logs

### Browser Console
- Form submission logs
- EmailJS initialization status
- Error messages
- Validation feedback

## 🎯 Next Steps

1. **Set up EmailJS account** (follow steps above)
2. **Configure email service and template**
3. **Update email-service.js** with your credentials
4. **Test with real email sending**
5. **Monitor and optimize**

## 📞 Support

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Community](https://community.emailjs.com/)
- [EmailJS GitHub](https://github.com/emailjs/emailjs-com)

---

**Current Status**: ✅ Ready for EmailJS configuration
**Next Action**: Follow Step 1-5 above to enable real email sending
