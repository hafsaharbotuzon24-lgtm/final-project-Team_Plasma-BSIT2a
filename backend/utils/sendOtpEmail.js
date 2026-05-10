const nodemailer = require('nodemailer');

function isSmtpConfigured() {
  const hasHost = !!process.env.SMTP_HOST;
  const hasUser = !!process.env.SMTP_USER;
  const hasPass = !!process.env.SMTP_PASS;
  console.log('[SMTP] Config check:', { host: hasHost, user: hasUser, pass: hasPass });
  return !!(hasHost && hasUser && hasPass);
}

/**
 * Sends the OTP to the player's email when SMTP env vars are set.
 * @returns {Promise<boolean>} true if an email was sent
 */
async function sendOtpEmail(toAddress, otp) {
  if (!isSmtpConfigured()) {
    console.log('[SMTP] Not configured - skipping email');
    return false;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465;

  console.log('[SMTP] Connecting to:', process.env.SMTP_HOST, 'port:', port, 'secure:', secure);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    requireTLS: !secure
  });

  // Verify connection configuration
  try {
    await transporter.verify();
    console.log('[SMTP] Transporter verified successfully');
  } catch (verifyErr) {
    console.error('[SMTP] Transporter verification failed:', verifyErr.message);
    throw verifyErr;
  }

  const from =
    process.env.EMAIL_FROM || `"Combat Coders" <${process.env.SMTP_USER}>`;

  try {
    const info = await transporter.sendMail({
      from,
      to: toAddress,
      subject: 'Combat Coders — Password reset code',
      text: `Your verification code is: ${otp}\n\nIt expires in 10 minutes.`,
      html: `<p>Your verification code is:</p>
<p style="font-size:28px;font-weight:bold;letter-spacing:6px;font-family:monospace;">${otp}</p>
<p style="color:#666;font-size:13px;">This code expires in 10 minutes. If you did not request a reset, ignore this email.</p>`
    });
    console.log('[SMTP] Email sent successfully:', info.messageId);
    return true;
  } catch (err) {
    console.error('[SMTP] Email send failed:', err.message);
    throw err;
  }
}

module.exports = {
  isSmtpConfigured,
  sendOtpEmail
};
