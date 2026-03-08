/**
 * Inquiry API: POST /api/inquiry
 * Contact form submits here → validate → send email (Resend) → optional WhatsApp notification.
 * No secrets in code. Set env vars in Netlify (see INQUIRY_SETUP.md and INQUIRY_CHECKLIST.md).
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";

const INQUIRY_TO_EMAIL = process.env.INQUIRY_TO_EMAIL ?? "connect@zyrabuilds.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Zyra Builds <onboarding@resend.dev>";

const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_TO_NUMBER = process.env.WHATSAPP_TO_NUMBER ?? "966566325017";

export type InquiryPayload = {
  name: string;
  company?: string;
  phone: string;
  email: string;
  projectType?: string;
  location?: string;
  message: string;
  lang?: string;
  sourcePage?: string;
};

function validateBody(body: unknown): { ok: true; data: InquiryPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Missing body" };
  }
  const o = body as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  if (!name || name.length < 2) {
    return { ok: false, error: "Full name is required (at least 2 characters)" };
  }
  if (!phone || phone.length < 5) {
    return { ok: false, error: "Phone / WhatsApp is required" };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Valid email is required" };
  }
  if (!message || message.length < 10) {
    return { ok: false, error: "Message is required (at least 10 characters)" };
  }

  const data: InquiryPayload = {
    name,
    phone,
    email,
    message,
    company: typeof o.company === "string" ? o.company.trim() || undefined : undefined,
    projectType: typeof o.projectType === "string" ? o.projectType.trim() || undefined : undefined,
    location: typeof o.location === "string" ? o.location.trim() || undefined : undefined,
    lang: typeof o.lang === "string" ? o.lang : undefined,
    sourcePage: typeof o.sourcePage === "string" ? o.sourcePage : undefined,
  };
  return { ok: true, data };
}

function buildEmailHtml(data: InquiryPayload): string {
  const ts = new Date().toISOString();
  const rows = [
    ["Full Name", data.name],
    ["Company Name", data.company || "—"],
    ["Phone / WhatsApp", data.phone],
    ["Email Address", data.email],
    ["Project Type", data.projectType || "—"],
    ["Location", data.location || "—"],
    ["Message", data.message],
    ["Language", data.lang || "—"],
    ["Source Page", data.sourcePage || "—"],
    ["Timestamp", ts],
  ];
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#6b7280;">${label}</td><td style="padding:6px 0;">${escapeHtml(String(value))}</td></tr>`
    )
    .join("");
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;">
  <h2 style="margin-bottom:16px;">New Zyra Builds Inquiry</h2>
  <table style="border-collapse:collapse;">${tableRows}</table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendInquiryEmail(data: InquiryPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!RESEND_API_KEY) {
    return { ok: false, error: "Email not configured (RESEND_API_KEY)" };
  }
  const resend = new Resend(RESEND_API_KEY);
  const html = buildEmailHtml(data);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [INQUIRY_TO_EMAIL],
    subject: "New Zyra Builds Inquiry",
    html,
  });
  if (error) {
    return { ok: false, error: error.message || "Failed to send email" };
  }
  return { ok: true };
}

async function sendWhatsAppNotification(data: InquiryPayload): Promise<void> {
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[inquiry] WhatsApp not configured: WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID missing");
    }
    return;
  }
  const to = WHATSAPP_TO_NUMBER.replace(/\D/g, "").replace(/^0/, "");
  const body = [
    "New Zyra inquiry:",
    `Name: ${data.name}`,
    `Project Type: ${data.projectType || "—"}`,
    `Location: ${data.location || "—"}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    "Please check email for full details.",
  ].join("\n");

  const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { preview_url: false, body },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    if (process.env.NODE_ENV === "development") {
      console.warn("[inquiry] WhatsApp API error:", res.status, errText);
    }
    throw new Error(`WhatsApp ${res.status}: ${errText}`);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
  try {
    const validation = validateBody(body);
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }
    const data = validation.data;

    const emailResult = await sendInquiryEmail(data);
    if (!emailResult.ok) {
      return NextResponse.json({ success: false, error: emailResult.error }, { status: 500 });
    }

    try {
      await sendWhatsAppNotification(data);
    } catch (whatsAppError) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[inquiry] WhatsApp notification failed (email already sent):", whatsAppError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error("[inquiry] Error:", e);
    }
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
