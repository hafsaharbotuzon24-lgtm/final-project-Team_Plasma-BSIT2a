const nodemailer = require('nodemailer');
const https = require('https');

function isSmtpConfigured() {
  const hasHost = !!process.env.SMTP_HOST;
  const hasUser = !!process.env.SMTP_USER;
  const hasPass = !!process.env.SMTP_PASS;
  console.log('[SMTP] Config check:', { host: hasHost, user: hasUser, pass: hasPass });
  return !!(hasHost && hasUser && hasPass);
}

function isBrevoConfigured() {
  const hasKey = !!process.env.BREVO_API_KEY;
  console.log('[Brevo] Config check:', { apiKey: hasKey });
  return hasKey;
}

function isEmailConfigured() {
  return isBrevoConfigured() || isSmtpConfigured();
}

async function sendViaBrevo(toAddress, otp) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER || 'combatcodersofficial@gmail.com';
  const senderName = process.env.EMAIL_FROM_NAME || 'Combat Coders';

  const body = JSON.stringify({
    sender: { name: senderName, email: senderEmail },
    to: [{ email: toAddress }],
    subject: 'Combat Coders — Password reset code',
    textContent: `Your verification code is: ${otp}\n\nIt expires in 10 minutes.`,
    htmlContent: `<p>Your verification code is:</p>
<p style="font-size:28px;font-weight:bold;letter-spacing:6px;font-family:monospace;">${otp}</p>
<p style="color:#666;font-size:13px;">This code expires in 10 minutes. If you did not request a reset, ignore this email.</p>`
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.brevo.com',
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('[Brevo] Email sent successfully:', res.statusCode);
          resolve(true);
        } else {
          const errMsg = `Brevo API ${res.statusCode}: ${data}`;
          console.error('[Brevo] Email send failed:', errMsg);
          reject(new Error(errMsg));
        }
      });
    });

    req.on('error', (err) => {
      console.error('[Brevo] Request error:', err.message);
      reject(err);
    });

    req.setTimeout(15000, () => {
      req.destroy(new Error('Brevo API request timeout'));
    });

    req.write(body);
    req.end();
  });
}

async function sendViaSmtp(toAddress, otp) {
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

  try {
    await transporter.verify();
    console.log('[SMTP] Transporter verified successfully');
  } catch (verifyErr) {
    console.error('[SMTP] Transporter verification failed:', verifyErr.message);
    throw verifyErr;
  }

  const from =
    process.env.EMAIL_FROM || `"Combat Coders" <${process.env.SMTP_USER}>`;

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
}

/**
 * Sends the OTP to the player's email.
 * Prefers Brevo API (HTTPS) over SMTP to avoid port blocking.
 * @returns {Promise<boolean>} true if an email was sent
 */
async function sendOtpEmail(toAddress, otp) {
  if (!isEmailConfigured()) {
    console.log('[Email] Not configured - skipping email');
    return false;
  }

  if (isBrevoConfigured()) {
    console.log('[Brevo] Sending OTP via Brevo API (HTTPS)...');
    return sendViaBrevo(toAddress, otp);
  }

  console.log('[SMTP] Sending OTP via SMTP...');
  return sendViaSmtp(toAddress, otp);
}

module.exports = {
  isSmtpConfigured,
  sendOtpEmail
};
