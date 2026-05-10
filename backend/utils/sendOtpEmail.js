const nodemailer = require('nodemailer');

function isSmtpConfigured() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

/**
 * Sends the OTP to the player's email when SMTP env vars are set.
 * @returns {Promise<boolean>} true if an email was sent
 */
async function sendOtpEmail(toAddress, otp) {
  if (!isSmtpConfigured()) {
    return false;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const from =
    process.env.EMAIL_FROM || `"Combat Coders" <${process.env.SMTP_USER}>`;

  await transporter.sendMail({
    from,
    to: toAddress,
    subject: 'Combat Coders — Password reset code',
    text: `Your verification code is: ${otp}\n\nIt expires in 10 minutes.`,
    html: `<p>Your verification code is:</p>
<p style="font-size:28px;font-weight:bold;letter-spacing:6px;font-family:monospace;">${otp}</p>
<p style="color:#666;font-size:13px;">This code expires in 10 minutes. If you did not request a reset, ignore this email.</p>`
  });

  return true;
}

module.exports = {
  isSmtpConfigured,
  sendOtpEmail
};
