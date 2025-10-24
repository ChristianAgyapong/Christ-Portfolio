# EmailJS Setup Guide for Contact Form

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Confirm your email address

## Step 2: Setup Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (you'll need this)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

## Step 5: Update Your Website
Open `script.js` and replace these placeholders:

```javascript
// Line 14: Replace with your Public Key
emailjs.init('YOUR_PUBLIC_KEY');

// Line 35: Replace with your Service ID and Template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

## Step 6: Update Email Address (Optional)
In `script.js`, line 29, you can change the destination email:
```javascript
to_email: 'christianagyapong2023@email.com'  // Change to your preferred email
```

## Testing
1. Save all files
2. Open your portfolio in a browser
3. Fill out the contact form
4. Submit and check your email for the message

## Free Plan Limits
- 200 emails per month
- EmailJS branding in emails
- Perfect for portfolio websites!

## Troubleshooting
- Make sure all IDs are correctly copied
- Check browser console for error messages
- Verify your email service is properly connected
- Test with a simple message first

Your contact form is now ready to receive and forward messages to your email!