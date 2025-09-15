# Cloudflare Turnstile Setup Guide

## Overview

Cloudflare Turnstile is a privacy-focused CAPTCHA alternative that helps prevent DDoS attacks and spam on your contact form.

## Setup Steps

### 1. Create Cloudflare Account

1. Go to [https://cloudflare.com/](https://cloudflare.com/)
2. Sign up for a free account
3. Verify your email

### 2. Get Turnstile Keys

1. Go to Cloudflare Dashboard
2. Navigate to "Turnstile" in the sidebar
3. Click "Add Site"
4. Enter your domain (e.g., yourdomain.com)
5. Choose "Managed" challenge mode
6. Get your **Site Key** and **Secret Key**

### 3. Update Your Code

1. Open `index.html`
2. Find this line:

```html
<div
  class="cf-turnstile"
  data-sitekey="0x4AAAAAAABkMYinukE_CULj"
  data-callback="onTurnstileSuccess"
></div>
```

3. Replace `0x4AAAAAAABkMYinukE_CULj` with your actual **Site Key**

### 4. Server-Side Verification (Optional)

For complete security, you should verify the Turnstile token on your server:

```javascript
// Example Node.js verification
const response = await fetch(
  "https://challenges.cloudflare.com/turnstile/v0/siteverify",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=YOUR_SECRET_KEY&response=${turnstileToken}`,
  }
);

const result = await response.json();
if (result.success) {
  // Token is valid, proceed with email
} else {
  // Token is invalid, reject request
}
```

## Benefits

✅ **Free Protection** - Cloudflare's free tier
✅ **Privacy-Focused** - No tracking like Google reCAPTCHA
✅ **DDoS Protection** - Prevents automated attacks
✅ **Better UX** - Less intrusive than traditional CAPTCHAs
✅ **Easy Integration** - Simple JavaScript API

## Testing

1. Save your changes with the real Site Key
2. Upload to your hosting
3. Test the contact form
4. You should see a Cloudflare verification challenge

## Current Setup

- **Demo Site Key Used**: `0x4AAAAAAABkMYinukE_CULj` (for testing only)
- **Status**: Ready for production with your real keys
- **Integration**: Client-side validation included

Replace the demo key with your real Cloudflare Turnstile Site Key for production use!
