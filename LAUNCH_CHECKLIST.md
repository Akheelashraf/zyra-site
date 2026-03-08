# Zyra Builds – Launch checklist

Use this list before going live. Tick off each item when done.

---

## Contact and branding

- [ ] **Replace WhatsApp placeholder**  
  In `src/data/company.ts`, set `whatsApp` and `whatsAppLink` to your real number (e.g. `+966 5X XXX XXXX` and `https://wa.me/966XXXXXXXXX`). This updates the whole site.

- [ ] **Confirm email**  
  Ensure `email` in `src/data/company.ts` is correct (`connect@zyrabuilds.com` or your chosen address).

---

## Legal and content

- [ ] **Final Privacy Policy**  
  Replace placeholder text in `src/app/privacy-policy/page.tsx` with your real policy and update the “Last updated” date.

- [ ] **Final proofread**  
  Check all pages for typos, placeholder text, and correct company/region details.

---

## Images and metadata

- [ ] **Add favicon**  
  Add `src/app/icon.png` (e.g. 32×32 or 48×48). See `src/app/ICON_AND_SOCIAL_IMAGES.md`.

- [ ] **Add Apple touch icon (optional)**  
  Add `src/app/apple-icon.png` (180×180) for home-screen bookmarks.

- [ ] **Add social preview image**  
  Add `src/app/opengraph-image.png` (1200×630) so link previews look good when shared. Optional: `src/app/twitter-image.png`.

---

## Functionality

- [ ] **Test contact form**  
  Submit the form on `/contact` and confirm you are redirected to the Thank You page. When you add a backend, connect the form to it.

- [ ] **Test all links**  
  Check Navbar, Footer, and every CTA: Home, About, Services, Projects, Contact, Privacy Policy, Request a Quote, Talk on WhatsApp, Learn More, View Project, etc.

- [ ] **Test on mobile**  
  Open the site on a phone; check layout, buttons, and links.

---

## Deployment

- [ ] **Deploy to Vercel**  
  Push to GitHub and import the repo in Vercel. See **README.md** → “Deploy on Vercel”.

- [ ] **Connect domain (optional)**  
  In Vercel: Project → Settings → Domains → add your domain and update DNS as instructed.

- [ ] **Check live site**  
  After deploy, open the live URL and run through the checklist again (links, form, mobile).

---

## Optional before or after launch

- [ ] Add real Spline scene URL in `src/sections/hero/Hero.tsx` (constant `SPLINE_SCENE_URL`).
- [ ] Replace project image placeholders on the Projects page with real photos when available.
- [ ] Connect the contact form to an API or email service so inquiries are stored or sent to you.
