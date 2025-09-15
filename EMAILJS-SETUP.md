# EmailJS Setup Instructions for Contact Form

## Overview

Your contact form is now configured to work with EmailJS, a free service that allows sending emails from static websites directly to your Gmail.

## Setup Steps

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail"
4. Follow the instructions to connect your Gmail account (aashishadhikari220@gmail.com)
5. Note down the **Service ID** (e.g., "service_xyz123")

### 3. Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent through your portfolio contact form.
```

4. Set the template variables:

   - `from_name`: {{from_name}}
   - `from_email`: {{from_email}}
   - `message`: {{message}}
   - `to_email`: {{to_email}}

5. Note down the **Template ID** (e.g., "template_abc456")

### 4. Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., "user_def789")

### 5. Update Your Code

1. Open `js/contact.js`
2. Replace these placeholders with your actual values:
   - `YOUR_PUBLIC_KEY` → Your EmailJS public key
   - `YOUR_SERVICE_ID` → Your Gmail service ID
   - `YOUR_TEMPLATE_ID` → Your email template ID

### Example:

```javascript
emailjs.init("user_def789"); // Your public key
emailjs.send("service_xyz123", "template_abc456", templateParams); // Your service and template IDs
```

## Testing

1. Save your changes
2. Upload your website to your hosting
3. Test the contact form
4. Check your Gmail inbox for messages

## Free Tier Limits

- EmailJS free tier allows 200 emails per month
- Perfect for portfolio contact forms
- No credit card required

## Troubleshooting

- Make sure all IDs are correct
- Check browser console for error messages
- Verify Gmail service is properly connected
- Test with different email addresses

Your contact form will now send emails directly to your Gmail!
