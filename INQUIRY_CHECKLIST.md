# Inquiry system – manual setup checklist

Use this checklist to set up Resend, domain/sender, Meta WhatsApp, Netlify env vars, and to test the contact flow safely.

---

## 1. Resend account setup

- [ ] Go to **https://resend.com** and sign up (or log in).
- [ ] Verify your email if prompted.
- [ ] In the Resend dashboard, open **API Keys** (left sidebar or **https://resend.com/api-keys**).
- [ ] Click **Create API Key**.
- [ ] Give it a name (e.g. `Zyra Netlify`), leave permissions as default (Send emails).
- [ ] Click **Add** and **copy the key immediately** (it is shown only once). You will paste this into Netlify as `RESEND_API_KEY` in section 4.

**Result:** You have one Resend API key saved somewhere safe (e.g. password manager) to paste into Netlify later.

---

## 2. Domain / sender setup for Resend

**Option A – Testing only (no custom domain yet)**  
- [ ] Skip this section. The app uses the default sender `Zyra Builds <onboarding@resend.dev>`.  
- [ ] Emails will be delivered to `connect@zyrabuilds.com` (or whatever you set as `INQUIRY_TO_EMAIL`). The “From” will show Resend’s address; that’s fine for testing.

**Option B – Production (send from your own domain)**  
- [ ] In Resend dashboard, open **Domains** (left sidebar or **https://resend.com/domains**).
- [ ] Click **Add Domain**.
- [ ] Enter your domain only (e.g. `zyrabuilds.com`), no `www` or `https://`. Click **Add**.
- [ ] Resend shows **DNS records** (e.g. MX, TXT, CNAME). In your domain registrar or DNS provider (e.g. Netlify DNS, Cloudflare, GoDaddy):
  - [ ] Add each record exactly as Resend shows (type, name/host, value).
  - [ ] Save and wait for DNS propagation (often 5–30 minutes; can be up to 48 hours).
- [ ] Back in Resend, click **Verify** (or refresh). When status is **Verified**, you can send from addresses on that domain.
- [ ] Choose a sender address on that domain (e.g. `inquiries@zyrabuilds.com` or `noreply@zyrabuilds.com`). You will set this in Netlify as `RESEND_FROM_EMAIL` in section 4 (e.g. `Zyra Builds <inquiries@zyrabuilds.com>`).

**Result:** Either you’re using the default sender (testing) or you have a verified domain and a chosen “from” address for production.

---

## 3. Meta WhatsApp Cloud API setup

- [ ] Go to **https://developers.facebook.com** and log in with a Facebook account.
- [ ] Click **My Apps** → **Create App** → choose **Other** → **Business** → name it (e.g. `Zyra Builds`) → **Create app**.
- [ ] In the app dashboard, find **Add Products** (or **Set up**). Under **WhatsApp**, click **Set up**.
- [ ] Select **WhatsApp Business Platform** (Cloud API). You’ll land on **WhatsApp → API Setup** (or **Getting started**).
- [ ] **Phone number:** Use the test number Meta provides, or add your own number (requires Meta Business verification for production). For testing, the provided test number is enough.
- [ ] **Phone number ID:** On the same API Setup page, find **Phone number ID** (long numeric id). Copy it; this goes to Netlify as `WHATSAPP_PHONE_NUMBER_ID`.
- [ ] **Access token:** On API Setup you’ll see **Temporary access token** (valid 24 hours). For testing, copy it; this goes to Netlify as `WHATSAPP_ACCESS_TOKEN`. For production, create a **System User** in **Business Settings → Users → System users**, assign it to your app, generate a token with permissions `whatsapp_business_messaging` and `whatsapp_business_management`, and use that token.
- [ ] **Recipient for testing:** In the same WhatsApp section, find **To** or **Send test message**. Add the phone number that should receive the inquiry notification (e.g. +966566325017) in E.164 format. Meta allows sending only to numbers you’ve added for the test app. Click **Send message** once to confirm the channel works.

**Result:** You have:
- **Phone number ID** (numeric) → for Netlify `WHATSAPP_PHONE_NUMBER_ID`.
- **Access token** (temporary or permanent) → for Netlify `WHATSAPP_ACCESS_TOKEN`.
- Confirmation that the recipient number (e.g. +966566325017) can receive a test message from this app.

---

## 4. Credentials to copy into Netlify

In **Netlify**: open your site → **Site configuration** → **Environment variables** → **Add a variable** (or **Import from .env**). Add these one by one:

| Variable name | Where you got it | Value to paste |
|---------------|------------------|----------------|
| `RESEND_API_KEY` | Resend → API Keys → Create API Key (section 1) | The key string (starts with `re_`) |
| `INQUIRY_TO_EMAIL` | Your choice | `connect@zyrabuilds.com` (or the inbox where you want inquiries) |
| `RESEND_FROM_EMAIL` | Only if you verified a domain (section 2) | e.g. `Zyra Builds <inquiries@zyrabuilds.com>`. If not set, app uses default. |
| `WHATSAPP_ACCESS_TOKEN` | Meta → Your app → WhatsApp → API Setup (section 3) | The temporary or permanent token |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta → WhatsApp → API Setup – “Phone number ID” (section 3) | The numeric ID only (no spaces) |
| `WHATSAPP_TO_NUMBER` | Your business number | `966566325017` (no + or spaces) |

- [ ] `RESEND_API_KEY` added in Netlify.
- [ ] `INQUIRY_TO_EMAIL` set (or leave default by not setting it; app uses `connect@zyrabuilds.com`).
- [ ] `RESEND_FROM_EMAIL` set only if you use a custom domain (section 2).
- [ ] `WHATSAPP_ACCESS_TOKEN` added if you want WhatsApp notifications.
- [ ] `WHATSAPP_PHONE_NUMBER_ID` added if you use WhatsApp.
- [ ] `WHATSAPP_TO_NUMBER` set to `966566325017` (or your number without +) if you use WhatsApp.

After changing env vars, **trigger a new deploy** (e.g. **Deploys** → **Trigger deploy** → **Deploy site**) so the new values are used.

---

## 5. How to test the full contact flow safely

**5.1 – Test email only (safest first step)**  
- [ ] Set in Netlify only: `RESEND_API_KEY` and (optional) `INQUIRY_TO_EMAIL`. Do not set any WhatsApp variables yet.
- [ ] Redeploy the site.
- [ ] Open your live site (e.g. `https://yoursite.netlify.app/en/contact`).
- [ ] Fill the form with real-looking but test data (e.g. your own name, a test email you control, a short message).
- [ ] Submit. You should be redirected to the thank-you page.
- [ ] Check the inbox for `INQUIRY_TO_EMAIL` (or `connect@zyrabuilds.com`). You should see “New Zyra Builds Inquiry” with all fields. Check spam if needed.
- [ ] If that works, email is correctly configured.

**5.2 – Test with WhatsApp (after email works)**  
- [ ] Add in Netlify: `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TO_NUMBER` (section 4).
- [ ] Ensure the recipient number is allowed in Meta (section 3 – “To” / test numbers).
- [ ] Redeploy.
- [ ] Submit the contact form again (can use the same or different test data).
- [ ] Confirm: (1) redirect to thank-you page, (2) inquiry email received, (3) WhatsApp message received on the business number.
- [ ] If WhatsApp fails but email arrives, the site still succeeds (by design). Check token and Phone number ID, and that the recipient is added in Meta.

**5.3 – Test validation and errors (optional)**  
- [ ] Submit with empty required fields → you should see a validation message and no redirect.
- [ ] Submit with invalid email → validation error.
- [ ] Temporarily set a wrong `RESEND_API_KEY` in Netlify, redeploy, submit → you should see an error message and no redirect; fix the key and redeploy to restore.

**5.4 – Test both languages**  
- [ ] Submit once from `/en/contact` and once from `/ar/contact`. In both cases you should land on the correct thank-you page (`/en/thank-you` or `/ar/thank-you`) and receive the inquiry email (and WhatsApp if configured).

When all checked, the full contact flow is set up and tested safely.
