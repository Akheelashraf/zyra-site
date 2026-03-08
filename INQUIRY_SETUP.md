# Inquiry system setup (Contact form → Email + WhatsApp)

When a user submits the contact form, the site sends the inquiry to your email (via Resend) and optionally sends a WhatsApp notification to your business number.

**For a step-by-step manual checklist** (Resend account, domain/sender, Meta WhatsApp, Netlify credentials, and safe testing), use **INQUIRY_CHECKLIST.md**.

---

## Environment variables (Netlify)

In **Netlify**: Site → **Site configuration** → **Environment variables** → **Add a variable** / **Import from .env**.

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes (for email) | API key from [Resend Dashboard](https://resend.com/api-keys) |
| `INQUIRY_TO_EMAIL` | No (has default) | Where to receive inquiries. Default: `connect@zyrabuilds.com` |
| `RESEND_FROM_EMAIL` | No | Sender address shown in emails. Default: `Zyra Builds <onboarding@resend.dev>` (Resend sandbox) |
| `WHATSAPP_ACCESS_TOKEN` | No | Meta WhatsApp Cloud API access token |
| `WHATSAPP_PHONE_NUMBER_ID` | No | WhatsApp Business phone number ID from Meta |
| `WHATSAPP_TO_NUMBER` | No (has default) | Recipient for notifications. Default: `966566325017` |

- If only `RESEND_API_KEY` and (optionally) `INQUIRY_TO_EMAIL` are set, inquiries will be sent by email and the form will work.
- If WhatsApp vars are set, a short notification is also sent to the business number. If WhatsApp fails, the inquiry still succeeds as long as email succeeded.

---

## Resend configuration

1. **Sign up / log in**: [resend.com](https://resend.com).
2. **Create an API key**: Dashboard → **API Keys** → **Create API Key**. Copy the key and set it as `RESEND_API_KEY` in Netlify.
3. **Sender address**:
   - **Testing**: You can use the default `onboarding@resend.dev` (Resend’s sandbox). You can send to any inbox; the “from” will be Resend’s address.
   - **Production**: Add and verify your own domain in Resend (**Domains** → **Add Domain**), then set `RESEND_FROM_EMAIL` to an address on that domain (e.g. `Zyra Builds <inquiries@yourdomain.com>`).
4. **Recipient**: Inquiries are sent to `INQUIRY_TO_EMAIL` (default `connect@zyrabuilds.com`). No Resend config needed for the recipient.

---

## WhatsApp Cloud API configuration (Meta)

1. **Meta for Developers**: Go to [developers.facebook.com](https://developers.facebook.com) and create or select an app.
2. **Add WhatsApp product**: In the app, add the **WhatsApp** product and use **WhatsApp Business Platform** (Cloud API).
3. **Get credentials**:
   - **Phone number ID**: WhatsApp → **API Setup** (or **Getting started**). Use the “Phone number ID” shown for your test or production number.
   - **Access token**: Use the temporary token from the dashboard for testing, or create a **System User** and generate a permanent token with `whatsapp_business_messaging` and `whatsapp_business_management` (for production).
4. **Recipient number**: The number that receives the notification (e.g. `+966566325017`) must be able to receive messages from your WhatsApp Business account (test numbers must be added in the Meta app’s WhatsApp → “To” field for development).
5. **Set in Netlify**:
   - `WHATSAPP_ACCESS_TOKEN` = the token
   - `WHATSAPP_PHONE_NUMBER_ID` = the Phone number ID (numeric)
   - `WHATSAPP_TO_NUMBER` = recipient without `+` (e.g. `966566325017`)

---

## Local development

1. Copy `.env.example` to `.env.local`.
2. Fill in at least `RESEND_API_KEY` (and optionally `INQUIRY_TO_EMAIL`) to test email.
3. Optionally add WhatsApp variables to test the full flow.
4. Run `npm run dev` and submit the contact form; check the inbox for `INQUIRY_TO_EMAIL` and, if configured, the WhatsApp recipient.

---

## Flow summary

1. User submits the contact form → `POST /api/inquiry` with JSON body.
2. API validates input, sends email via Resend to `INQUIRY_TO_EMAIL`.
3. API then attempts to send a WhatsApp notification to `WHATSAPP_TO_NUMBER` (if WhatsApp env vars are set). Failure here does not fail the request if email succeeded.
4. API returns `{ success: true }` or `{ success: false, error: "..." }`.
5. Frontend redirects to `/[lang]/thank-you` on success, or shows an error message on failure.
