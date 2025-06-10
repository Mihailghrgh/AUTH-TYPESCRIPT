export const verifyEmailTemplate = (url: string, email: string) => ({
  subject: "Verify email address",
  text: `Click on the link to verify the email address ${url}`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .logo {
            width: 60px;
            height: 60px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            text-align: center
        }
        
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #333333;
            margin-bottom: 20px;
        }
        
        .message {
            color: #666666;
            font-size: 16px;
            margin-bottom: 30px;
        }
        
        .verify-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            margin: 20px 0;
            transition: transform 0.2s ease;
        }
        
        .verify-button:hover {
            transform: translateY(-2px);
        }
        
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .alternative-text {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
            color: #f8f9fa
            border-left: 4px solid #667eea;
        }
        
        .alternative-text p {
            margin: 0;
            color: #666666;
            font-size: 14px;
        }
        
        .alternative-text a {
            color: #667eea;
            word-break: break-all;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer p {
            margin: 0;
            color: #888888;
            font-size: 14px;
        }
        
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        
        .security-note {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        
        .security-note p {
            margin: 0;
            color: #856404;
            font-size: 14px;
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 20px;
                border-radius: 8px;
            }
            
            .header, .content, .footer {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .verify-button {
                padding: 14px 28px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>✓</h1>
            <h1>Verify Your Email</h1>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello John Doe,
            </div>
            
            <div class="message">
                <p>Welcome to our platform! We're excited to have you on board.</p>
                <p>To complete your registration and secure your account, please verify your email address by clicking the button below:</p>
            </div>
            
            <div class="button-container">
                <a href=${url} class="verify-button">Verify Email Address</a>
            </div>
            
            <div class="alternative-text">
                <p><strong>Can't click the button?</strong> Copy and paste this link into your browser:</p>
                <p><a href=${url}>${url}</a></p>
            </div>
            
            <div class="security-note">
                <p><strong>Security Note:</strong> This verification link will expire in 24 hours for your security. If you didn't create an account, please ignore this email.</p>
            </div>
            <div class="message">
                <p>If you have any questions or need assistance, feel free to contact our support team.</p>
                <p>Thank you for joining us!</p>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent to <strong>${email}</strong></p>
            <p>© 2025 Your Company Name. All rights reserved.</p>
            <p><a href="#">Privacy Policy</a> | <a href="#">Unsubscribe</a> | <a href="#">Contact Support</a></p>
        </div>
    </div>
</body>
</html>`,
});

export const resetPasswordEmailTemplate = (url: string, email: string) => ({
  subject: "Reset Your Password ",
  text: `Click on the link to reset your password ${url}`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        /* Reset styles for email clients */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
        }

        /* Main styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
        }
        
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 300;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #333333;
            margin-bottom: 20px;
        }
        
        .message {
            color: #666666;
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 15px 35px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .alternative-link {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            word-break: break-all;
            font-size: 14px;
            color: #666666;
        }
        
        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
            font-size: 14px;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer p {
            margin: 5px 0;
            font-size: 14px;
            color: #666666;
        }
        
        .security-icon {
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        /* Responsive design */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            .content, .header, .footer {
                padding: 20px !important;
            }
            .header h1 {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="security-icon">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"/>
                </svg>
            </div>
            <h1>Password Reset Request</h1>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">
                Hello ${email},
            </div>
            
            <div class="message">
                We received a request to reset the password for your account. If you made this request, please click the button below to reset your password.
            </div>
            
            <div class="button-container">
                <a href=${url} class="reset-button">Reset Your Password</a>
            </div>
            
            <div class="message">
                If the button above doesn't work, you can copy and paste the following link into your browser:
            </div>
            
            <div class="alternative-link">
            ${url}
            </div>
            
            <div class="warning">
                <strong>Important:</strong> This password reset link will expire in 30 seconds for security reasons. If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.
            </div>
            
            <div class="message">
                For your security, never share this link with anyone. If you're having trouble, our support team is here to help.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><strong>Regina Olteniei</p>
            <p>Regina Olteniei Ltd</p>
            <p>Need help? Contact us at <a href="reginaOlteniei@gmail.com">reginaOlteniei@gmail.com</a></p>
            <p style="margin-top: 15px; font-size: 12px;">
                This email was sent to ${email}. If you no longer wish to receive these emails, 
                you can <a href="reginaOlteniei@gmail.com">unsubscribe here</a>.
            </p>
        </div>
    </div>
</body>
</html>`,
});
