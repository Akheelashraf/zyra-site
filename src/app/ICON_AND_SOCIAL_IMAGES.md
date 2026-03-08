# Favicon and social preview images

Next.js App Router picks up image files from the `app` folder automatically. Add these when you’re ready for launch.

## Favicon (browser tab icon)

- **File:** `app/icon.png`  
- **Size:** 32×32 px or 48×48 px (square).  
- **What to do:** Add your Zyra logo or mark as a PNG in the project root:  
  `zyra-site/src/app/icon.png`  
  Next.js will use it as the favicon.

## Apple touch icon (home screen / PWA)

- **File:** `app/apple-icon.png`  
- **Size:** 180×180 px (square).  
- **What to do:** Add the same (or a larger) logo at  
  `zyra-site/src/app/apple-icon.png`  
  so it looks good when the site is saved to the home screen.

## Social sharing (Open Graph / Twitter)

When someone shares your site link, social platforms show a title, description, and image. The metadata is already set in `app/layout.tsx`. To add a custom image:

- **Open Graph (Facebook, LinkedIn, etc.):**  
  Add `app/opengraph-image.png`  
  Recommended size: 1200×630 px.

- **Twitter:**  
  Add `app/twitter-image.png`  
  Same size (1200×630 px) is fine, or use the same file by only adding `opengraph-image.png`; many platforms will use it.

Place these files in `zyra-site/src/app/`. No code changes are required; Next.js will detect and use them.
