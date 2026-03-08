# Manual steps only – no coding required

The inquiry system is **fully implemented in code**. You only need to do the following outside the codebase.

---

## 1. External accounts to create (manual)

| Account | Where | Purpose |
|--------|--------|--------|
| **Resend** | https://resend.com | Send inquiry emails to your inbox |
| **Meta for Developers** (optional) | https://developers.facebook.com | Send WhatsApp notification to your business number |

---

## 2. Environment variables to set

In **Netlify**: Site → **Site configuration** → **Environment variables** → add each name and value.

| Variable | Required for email | Required for WhatsApp | Where to get the value |
|----------|--------------------|------------------------|-------------------------|
| `RESEND_API_KEY` | Yes | No | Resend → API Keys → Create API Key → copy |
| `INQUIRY_TO_EMAIL` | No (default used) | No | Your inbox; default is `connect@zyrabuilds.com` |
| `RESEND_FROM_EMAIL` | No | No | Only if you verify a domain in Resend (e.g. `Zyra Builds <inquiries@yourdomain.com>`) |
| `WHATSAPP_ACCESS_TOKEN` | No | Yes | Meta app → WhatsApp → API Setup → token |
| `WHATSAPP_PHONE_NUMBER_ID` | No | Yes | Meta app → WhatsApp → API Setup → Phone number ID |
| `WHATSAPP_TO_NUMBER` | No | No (default used) | `966566325017` (no +) or your number |

After adding or changing variables, **trigger a new deploy**.

---

## 3. What to click/configure in Resend

1. **Sign up / log in**: https://resend.com  
2. **Create API key**: **API Keys** → **Create API Key** → name it (e.g. Zyra Netlify) → **Add** → **copy the key** → paste into Netlify as `RESEND_API_KEY`.  
3. **Testing only**: No domain needed. Emails will send from Resend’s default address to `INQUIRY_TO_EMAIL`.  
4. **Production (optional)**: **Domains** → **Add Domain** → enter your domain → add the DNS records Resend shows at your DNS provider → **Verify**. Then in Netlify set `RESEND_FROM_EMAIL` to e.g. `Zyra Builds <inquiries@yourdomain.com>`.

---

## 4. What to click/configure in Meta WhatsApp Cloud API

1. **Create app**: https://developers.facebook.com → **My Apps** → **Create App** → **Other** → **Business** → name (e.g. Zyra Builds).  
2. **Add WhatsApp**: In the app → **Add Products** → **WhatsApp** → **Set up** → **WhatsApp Business Platform** (Cloud API).  
3. **API Setup**: Open **WhatsApp** → **API Setup** (or **Getting started**).  
   - Copy **Phone number ID** → Netlify `WHATSAPP_PHONE_NUMBER_ID`.  
   - Copy **Temporary access token** (or create a System User token for production) → Netlify `WHATSAPP_ACCESS_TOKEN`.  
4. **Recipient**: In the same WhatsApp section, add the number that should receive notifications (e.g. +966566325017) under **To** / test numbers, so the app can send to it.

---

## 5. After that

1. **Redeploy** the site on Netlify so it picks up the new env vars.  
2. Open **Contact**, submit the form with test data.  
3. Check the inbox for `INQUIRY_TO_EMAIL` and, if configured, the WhatsApp number.

For a step-by-step checklist, use **INQUIRY_CHECKLIST.md**.
