import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, html, text }) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromName = process.env.FROM_NAME || 'Voicify';
  const fromEmail = process.env.FROM_EMAIL || 'no-reply@voicify.app';
  
  // Build a valid "from" value. If FROM_EMAIL is already in "Name <email>" format,
  // use it as-is. Otherwise, combine FROM_NAME and FROM_EMAIL.
  const buildFrom = (name, email) => {
    const raw = (email || '').trim().replace(/^"+|"+$/g, '');
    if (!raw) return name ? `${name} <no-reply@voicify.app>` : 'no-reply@voicify.app';
    if (raw.includes('<') && raw.includes('>')) return raw; // already formatted
    return name ? `${name} <${raw}>` : raw;
  };
  const from = buildFrom(fromName, fromEmail);

  if (!host || !user || !pass) {
    throw new Error('SMTP credentials are not configured');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return info.messageId;
}
