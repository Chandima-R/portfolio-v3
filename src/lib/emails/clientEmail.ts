interface ClientEmailProps {
  name: string;
  project: string;
  budget: string;
}

export function clientEmail({ name, project, budget }: ClientEmailProps): string {
  const firstName = name.split(" ")[0];

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Thank you — Chandima Rathnayake</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;1,300;1,400&family=Inter:wght@300;400&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: #f5f4f0;
      font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
      font-weight: 300;
      color: #1a1a18;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      padding: 0;
    }

    .email-wrapper {
      background-color: #f5f4f0;
      padding: 48px 24px;
    }

    .email-card {
      max-width: 580px;
      margin: 0 auto;
      background: #fafaf7;
      border: 1px solid #e8e4dc;
    }

    /* ── HEADER ── */
    .header {
      padding: 48px 48px 40px;
      border-bottom: 1px solid #e8e4dc;
      text-align: center;
      background: #1a1a18;
    }

    .header-logo {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 32px;
    }

    .header-logo-box {
      width: 28px;
      height: 28px;
      border: 1px solid rgba(245,244,240,.3);
      position: relative;
    }

    .header-logo-inner {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 11px; height: 11px;
      background: #f5f4f0;
    }

    .header-wordmark {
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(245,244,240,.5);
      font-weight: 300;
    }

    .header-eyebrow {
      font-family: 'Inter', monospace;
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(245,244,240,.3);
      margin-bottom: 20px;
    }

    .header-headline {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 48px;
      font-weight: 300;
      font-style: italic;
      line-height: 1;
      letter-spacing: -0.03em;
      color: #fafaf7;
      margin: 0;
    }

    .header-sub {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
      font-weight: 300;
      font-style: italic;
      color: rgba(250,250,247,.4);
      margin-top: 8px;
      letter-spacing: -0.02em;
    }

    /* ── BODY ── */
    .body {
      padding: 48px 48px 40px;
    }

    .greeting {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 28px;
      font-weight: 300;
      font-style: italic;
      color: #1a1a18;
      letter-spacing: -0.02em;
      margin-bottom: 24px;
      line-height: 1.2;
    }

    .body-text {
      font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
      font-size: 15px;
      line-height: 1.8;
      color: #6b6b68;
      font-weight: 300;
      margin-bottom: 20px;
    }

    /* ── SUMMARY CARD ── */
    .summary {
      background: #f0ede6;
      border: 1px solid #e8e4dc;
      padding: 32px 36px;
      margin: 32px 0;
    }

    .summary-title {
      font-family: 'Inter', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #9a9a96;
      margin-bottom: 20px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 14px 0;
      border-bottom: 1px solid #e0dcd4;
    }

    .summary-row:last-child { border-bottom: none; }

    .summary-label {
      font-family: 'Inter', monospace;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #9a9a96;
      padding-top: 2px;
    }

    .summary-value {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      color: #1a1a18;
      font-weight: 300;
      text-align: right;
      max-width: 60%;
    }

    /* ── TIMELINE ── */
    .timeline {
      margin: 32px 0;
    }

    .timeline-title {
      font-family: 'Inter', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #9a9a96;
      margin-bottom: 20px;
    }

    .timeline-step {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
    }

    .timeline-step:last-child { margin-bottom: 0; }

    .timeline-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      width: 28px;
    }

    .timeline-dot {
      width: 28px;
      height: 28px;
      border: 1px solid #e8e4dc;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-family: 'Inter', monospace;
      font-size: 9px;
      letter-spacing: 1px;
      color: #9a9a96;
      background: #fafaf7;
    }

    .timeline-line {
      width: 1px;
      flex: 1;
      min-height: 20px;
      background: linear-gradient(to bottom, #e8e4dc, transparent);
      margin-top: 4px;
    }

    .timeline-content { padding-top: 4px; }

    .timeline-step-title {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 400;
      color: #1a1a18;
      margin-bottom: 3px;
    }

    .timeline-step-body {
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      color: #9a9a96;
      font-weight: 300;
      line-height: 1.6;
    }

    /* ── CTA ── */
    .cta-wrap {
      text-align: center;
      margin: 40px 0 32px;
    }

    .cta-btn {
      display: inline-block;
      background: #1a1a18;
      color: #fafaf7 !important;
      font-family: 'Inter', monospace;
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      padding: 16px 40px;
      text-decoration: none;
    }

    /* ── SIGNATURE ── */
    .signature {
      border-top: 1px solid #e8e4dc;
      padding-top: 32px;
      margin-top: 8px;
    }

    .sig-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
      font-weight: 300;
      font-style: italic;
      color: #1a1a18;
      letter-spacing: -0.02em;
      margin-bottom: 4px;
    }

    .sig-role {
      font-family: 'Inter', monospace;
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #9a9a96;
    }

    /* ── FOOTER ── */
    .footer {
      background: #f0ede6;
      border-top: 1px solid #e8e4dc;
      padding: 28px 48px;
      text-align: center;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin-bottom: 20px;
    }

    .footer-link {
      font-family: 'Inter', monospace;
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #9a9a96;
      text-decoration: none;
    }

    .footer-rule {
      width: 40px;
      height: 1px;
      background: #e8e4dc;
      margin: 20px auto;
    }

    .footer-note {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      color: #b8b5ae;
      font-weight: 300;
      line-height: 1.6;
    }

    @media (max-width: 600px) {
      .email-wrapper { padding: 24px 16px; }
      .header, .body, .footer { padding-left: 28px; padding-right: 28px; }
      .header-headline { font-size: 36px; }
      .summary { padding: 24px; }
      .summary-row { flex-direction: column; gap: 4px; }
      .summary-value { text-align: left; max-width: 100%; }
      .footer-links { flex-direction: column; gap: 16px; }
    }
  </style>
</head>
<body>
<div class="email-wrapper">
  <div class="email-card">

    <!-- ── HEADER ── -->
    <div class="header">
      <div class="header-logo">
        <span class="header-wordmark">Chandima Rathnayake</span>
      </div>
      <p class="header-eyebrow">Studio — Colombo, Sri Lanka</p>
      <h1 class="header-headline">Thank you,</h1>
      <p class="header-sub">${firstName}.</p>
    </div>

    <!-- ── BODY ── -->
    <div class="body">
      <p class="greeting">Your message has landed.</p>

      <p class="body-text">
        I genuinely appreciate you taking the time to reach out. Every enquiry gets my personal attention -
        no automated responses, no gatekeepers. I've read your message and I'll be back in touch within
        24 hours.
      </p>

      <p class="body-text">
        In the meantime, here's a summary of what you shared with me:
      </p>

      <!-- Summary card -->
      <div class="summary">
        <p class="summary-title">Enquiry Summary</p>

        <div class="summary-row">
          <span class="summary-label">Name: </span>
          <span class="summary-value">${name}</span>
        </div>
        ${project ? `
        <div class="summary-row">
          <span class="summary-label">Project Type: </span>
          <span class="summary-value">${project}</span>
        </div>` : ""}
        ${budget ? `
        <div class="summary-row">
          <span class="summary-label">Budget Range: </span>
          <span class="summary-value">${budget}</span>
        </div>` : ""}
        <div class="summary-row">
          <span class="summary-label">Submitted: </span>
          <span class="summary-value">${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
      </div>

      <!-- What happens next -->
      <div class="timeline">
        <p class="timeline-title">What Happens Next</p>

        <div class="timeline-step">
          <div class="timeline-left">
            <div class="timeline-dot">01</div>
            <div class="timeline-line"></div>
          </div>
          <div class="timeline-content">
            <p class="timeline-step-title">I review your project</p>
            <p class="timeline-step-body">I read every enquiry personally and consider whether we'd be a genuine fit before responding.</p>
          </div>
        </div>

        <div class="timeline-step">
          <div class="timeline-left">
            <div class="timeline-dot">02</div>
            <div class="timeline-line"></div>
          </div>
          <div class="timeline-content">
            <p class="timeline-step-title">You hear from me directly</p>
            <p class="timeline-step-body">Within 24 hours, you'll receive a personal reply - not a template. We'll discuss scope, timeline, and approach.</p>
          </div>
        </div>

        <div class="timeline-step">
          <div class="timeline-left">
            <div class="timeline-dot">03</div>
          </div>
          <div class="timeline-content">
            <p class="timeline-step-title">We decide together</p>
            <p class="timeline-step-body">If we're a good fit, we'll move to a short discovery call to make sure we're aligned before any commitments are made.</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-wrap">
        <a href="${process.env.SITE_URL}" class="cta-btn">
          View my work →
        </a>
      </div>

      <!-- Signature -->
      <div class="signature">
        <p class="sig-name">Chandima Rathnayake</p>
        <p class="sig-role">Frontend Developer · Colombo</p>
      </div>
    </div>

    <!-- ── FOOTER ── -->
    <div class="footer">
      <div class="footer-links">
        <a href="${process.env.SITE_URL}/work"    class="footer-link">Work</a>
        <a href="${process.env.SITE_URL}/about"   class="footer-link">About</a>
        <a href="${process.env.SITE_URL}/services"class="footer-link">Services</a>
        <a href="${process.env.SITE_URL}/blog"    class="footer-link">Writing</a>
      </div>
      <div class="footer-rule"></div>
      <p class="footer-note">
        You're receiving this because you submitted an enquiry at chandimarathnayake.online.<br/>
        This is an automated confirmation - a personal reply is on its way.
      </p>
    </div>

  </div>
</div>
</body>
</html>
  `.trim();
}
