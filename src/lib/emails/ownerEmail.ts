interface OwnerEmailProps {
  name: string;
  email: string;
  project: string;
  budget: string;
  message: string;
}

export function ownerEmail({ name, email, project, budget, message }: OwnerEmailProps): string {
  const ts = new Date().toLocaleString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #f2f2f0;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 14px;
      color: #1a1a18;
      -webkit-font-smoothing: antialiased;
    }
    .wrap { max-width: 560px; margin: 40px auto; padding: 0 16px 40px; }

    /* ── top strip ── */
    .top-strip {
      background: #1a1a18;
      padding: 16px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .top-strip-label {
      font-size: 10px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: rgba(242,242,240,.35);
      font-family: monospace;
    }
    .top-strip-badge {
      font-size: 10px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #1a1a18;
      background: rgba(242,242,240,.9);
      padding: 3px 10px;
    }

    /* ── card ── */
    .card { background: #fafaf7; border: 1px solid #e4e1da; }

    /* ── section ── */
    .section { padding: 28px 32px; border-bottom: 1px solid #e4e1da; }
    .section:last-child { border-bottom: none; }

    .section-label {
      font-size: 9px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #9a9a96;
      font-family: monospace;
      margin-bottom: 16px;
    }

    /* ── field rows ── */
    .field { margin-bottom: 16px; }
    .field:last-child { margin-bottom: 0; }
    .field-label {
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #b0ada6;
      font-family: monospace;
      margin-bottom: 4px;
    }
    .field-value {
      font-size: 14px;
      color: #1a1a18;
      font-weight: 400;
      line-height: 1.5;
    }
    .field-value a { color: #1a1a18; }

    /* two-col grid for small fields */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    /* message block */
    .message-block {
      background: #f0ede6;
      border: 1px solid #e4e1da;
      padding: 20px 24px;
      font-size: 14px;
      color: #3a3a37;
      line-height: 1.75;
      white-space: pre-wrap;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-weight: 300;
    }

    /* reply button */
    .reply-btn {
      display: inline-block;
      background: #1a1a18;
      color: #fafaf7 !important;
      font-family: monospace;
      font-size: 10px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      padding: 12px 28px;
      text-decoration: none;
      margin-top: 20px;
    }

    /* footer */
    .footer {
      padding: 20px 32px;
      font-size: 11px;
      color: #b0ada6;
      text-align: center;
      line-height: 1.6;
    }
  </style>
</head>
<body>
<div class="wrap">

  <!-- top strip -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a18;padding:14px 28px;">
    <tr>
      <td style="font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(242,242,240,.35);font-family:monospace;">
        chandimarathnayake.online
      </td>
      <td align="right">
        <span style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#1a1a18;background:rgba(242,242,240,.85);padding:3px 10px;">
          New Enquiry
        </span>
      </td>
    </tr>
  </table>

  <div class="card">

    <!-- ── SENDER ── -->
    <div class="section">
      <p class="section-label">Sender</p>
      <div class="grid-2">
        <div class="field">
          <p class="field-label">Name</p>
          <p class="field-value">${name}</p>
        </div>
        <div class="field">
          <p class="field-label">Email</p>
          <p class="field-value"><a href="mailto:${email}">${email}</a></p>
        </div>
      </div>
    </div>

    <!-- ── PROJECT DETAILS ── -->
    <div class="section">
      <p class="section-label">Project Details</p>
      <div class="grid-2">
        <div class="field">
          <p class="field-label">Type</p>
          <p class="field-value">${project || "—"}</p>
        </div>
        <div class="field">
          <p class="field-label">Budget</p>
          <p class="field-value">${budget || "—"}</p>
        </div>
      </div>
    </div>

    <!-- ── MESSAGE ── -->
    <div class="section">
      <p class="section-label">Message</p>
      <div class="message-block">${message.replace(/\n/g, "<br/>")}</div>
      <a href="mailto:${email}?subject=Re: Your enquiry — Chandima Rathnayake&body=Hi ${name},%0A%0AThank you for reaching out..." class="reply-btn">
        Reply to ${name.split(" ")[0]} →
      </a>
    </div>

    <!-- ── META ── -->
    <div class="section">
      <p class="section-label">Meta</p>
      <div class="field">
        <p class="field-label">Received</p>
        <p class="field-value">${ts}</p>
      </div>
    </div>

  </div>

  <div class="footer">
    Sent from chandimarathnayake.online/contact<br/>
    This notification was generated automatically.
  </div>

</div>
</body>
</html>
  `.trim();
}
