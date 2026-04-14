import {NextRequest, NextResponse} from "next/server";
import nodemailer from "nodemailer";
import {clientEmail} from "@/lib/emails/clientEmail";
import {ownerEmail} from "@/lib/emails/ownerEmail";

/* ─── types ─── */
interface ContactBody {
    name:    string;
    email:   string;
    project: string;
    budget:  string;
    message: string;
}

/* ─── validation ─── */
function validate(body: Partial<ContactBody>): string | null {
    if (!body.name?.trim())    return "Name is required.";
    if (!body.email?.trim())   return "Email is required.";
    if (!body.message?.trim()) return "Message is required.";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(body.email)) return "Please enter a valid emails address.";
    return null;
}

/* ─── transporter (created once per cold-start) ─── */
function createTransporter() {
    return nodemailer.createTransport({
        host:   process.env.SMTP_HOST   ?? "smtp.gmail.com",
        port:   Number(process.env.SMTP_PORT ?? 465),
        secure: process.env.SMTP_SECURE === "true",       // true = TLS on port 465
        auth: {
            user: process.env.SMTP_USER ?? "",
            pass: process.env.SMTP_PASS ?? "",
        },
    });
}

/* ─── POST handler ─── */
export async function POST(req: NextRequest) {
    /* 1 — parse body */
    let body: Partial<ContactBody>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    /* 2 — validate */
    const validationError = validate(body);
    if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 422 });
    }

    const { name, email, project = "", budget = "", message } = body as ContactBody;

    /* 3 — send emails */
    try {
        const transporter = createTransporter();
        const fromHeader  = `"${process.env.FROM_NAME ?? "Chandima Rathnayake"}" <${process.env.FROM_EMAIL ?? process.env.SMTP_USER}>`;

        /* fire both in parallel */
        await Promise.all([

            /* ── A: thank-you to the client ── */
            transporter.sendMail({
                from:    fromHeader,
                to:      email,
                subject: `Thank you for reaching out, ${name.split(" ")[0]} — Chandima Rathnayake`,
                html:    clientEmail({ name, project, budget }),
                text:    [
                    `Hi ${name.split(" ")[0]},`,
                    "",
                    "Thank you for reaching out. I've received your message and will be in touch personally within 24 hours.",
                    "",
                    `Project type : ${project || "—"}`,
                    `Budget       : ${budget  || "—"}`,
                    "",
                    "— Chandima Rathnayake",
                    "chandimarathnayake.online",
                ].join("\n"),
            }),

            /* ── B: notification to owner ── */
            transporter.sendMail({
                from:    fromHeader,
                to:      process.env.OWNER_EMAIL ?? process.env.SMTP_USER,
                replyTo: email,
                subject: `New enquiry from ${name} — ${project || "Unspecified project"}`,
                html:    ownerEmail({ name, email, project, budget, message }),
                text:    [
                    `NEW ENQUIRY`,
                    `──────────────────────────────`,
                    `Name    : ${name}`,
                    `Email   : ${email}`,
                    `Project : ${project || "—"}`,
                    `Budget  : ${budget  || "—"}`,
                    ``,
                    `MESSAGE`,
                    `──────────────────────────────`,
                    message,
                ].join("\n"),
            }),

        ]);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error("[contact] SMTP error:", err);
        return NextResponse.json(
            { error: "Failed to send message. Please try emailing directly." },
            { status: 500 }
        );
    }
}

/* block other methods */
export function GET() {
    return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
