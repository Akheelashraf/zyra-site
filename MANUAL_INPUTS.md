# Manual inputs before deployment

Use this checklist to add final content and assets. The site is built to accept these without code changes.

## 1. Logo assets

- **Location:** Place logo files in `public/logos/`:
  - `zyra-logo.png` — for light/white backgrounds (Navbar)
  - `zyra-logo-white.png` — for dark/blue backgrounds (Footer)
- Navbar uses `zyra-logo.png`; Footer uses `zyra-logo-white.png`. If files are under `src/assets/logos/`, copy them to `public/logos/` so `/logos/zyra-logo.png` and `/logos/zyra-logo-white.png` resolve.

## 2. Favicon and app icon

- **App icon:** Add or replace `src/app/icon.png` (or `app/icon.png` depending on your structure). Next.js will use it for favicon and PWA.
- Do not remove existing icon setup; only replace the image file if needed.

## 3. Social preview image

- Add your Open Graph / social share image (e.g. `public/og-image.png` or as configured in layout metadata).
- Reference it in `src/app/[lang]/layout.tsx` or root `layout.tsx` in `metadata.openGraph.images` if you use it.

## 4. WhatsApp number

- **Source of truth:** `src/data/company.ts`
- Set `whatsApp` (display number) and `whatsAppLink` (full `https://wa.me/...` URL). The floating WhatsApp button and all contact links use this.

## 5. Final Arabic translations

- **Files:** `src/data/translations/ar.ts`
- All keys mirror `src/data/translations/en.ts`. Replace placeholder Arabic copy with final, professional translations. No code changes required.

## 6. Privacy policy text

- **Files:** `src/data/translations/en.ts` and `src/data/translations/ar.ts`
- Update the `privacy` object: `intro`, `lastUpdated`, and `sections.*` (headings and body text) with your legal copy.

---

After updating the above, run a quick test: open `/en` and `/ar`, test the contact form (thank-you redirect), and check the floating WhatsApp link.
