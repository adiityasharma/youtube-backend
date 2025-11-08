export const verificationMail = (user, token) => {
  return `
<html>
  <head>
    <meta charset="UTF-8">
    <title>Verify your email address</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
      <h2 style="color: #333;">Verify your email address</h2>
      <p>Hi ${user},</p>
      <p>Thank you for signing up with <strong>[Your Company Name]</strong>!</p>
      <p>Please verify your email address by clicking the button below:</p>
      <p style="text-align: center;">
        <a href="http://localhost:5000/api/v1/users/reset-password/${token}"
           style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
           Verify Email
        </a>
      </p>
      <p>If you didn’t create an account with us, you can safely ignore this email.</p>
      <p>Thank you,<br>The [Your Company Name] Team</p>
    </div>
  </body>
</html>

  `
}