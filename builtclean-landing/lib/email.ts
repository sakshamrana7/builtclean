import nodemailer from "nodemailer";

let _transport: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter {
  if (!_transport) {
    _transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER!,
        pass: process.env.GMAIL_APP_PASSWORD!,
      },
    });
  }
  return _transport;
}

export const FROM_EMAIL = `Built Clean <${process.env.GMAIL_USER}>`;
export const REPLY_TO = process.env.GMAIL_USER!;

export async function sendConfirmationEmail(to: string): Promise<void> {
  await getTransport().sendMail({
    from: FROM_EMAIL,
    replyTo: REPLY_TO,
    to,
    subject: "You're on the Built Clean waitlist",
    html: buildConfirmationEmail(to),
  });
}

function buildConfirmationEmail(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the Built Clean waitlist</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,-apple-system,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;">

          <!-- Wordmark -->
          <tr>
            <td style="padding-bottom:40px;">
              <span style="font-size:13px;font-weight:800;letter-spacing:0.15em;color:#ffffff;text-transform:uppercase;">BUILTCLEAN</span>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #1a1a1a;padding-bottom:40px;"></td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding-bottom:16px;">
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;">
                You&rsquo;re in.
              </h1>
            </td>
          </tr>

          <!-- Body text -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#666666;">
                We&rsquo;ll let you know the moment we launch. You&rsquo;re one of the first &mdash; and that means you&rsquo;ll get free access for life when we open the doors.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#666666;">
                In the meantime, we&rsquo;re heads-down building the most consistent fitness experience ever made. Built around your life. Powered by AI. No guilt, no perfection &mdash; just progress.
              </p>
            </td>
          </tr>

          <!-- Registered as -->
          <tr>
            <td style="padding-bottom:40px;">
              <p style="margin:0;font-size:13px;color:#444444;">
                Registered as: <span style="color:#888888;">${email}</span>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #1a1a1a;padding-bottom:32px;"></td>
          </tr>

          <!-- Footer -->
          <tr>
            <td>
              <p style="margin:0;font-size:12px;color:#333333;line-height:1.6;">
                &copy; 2025 Built Clean. All rights reserved.<br />
                You&rsquo;re receiving this because you joined the Built Clean waitlist.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
