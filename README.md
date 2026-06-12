# GutWise — IBS & Low-FODMAP Companion Website

A polished, single-page marketing website (in English) for an IBS solution app.
Pure static HTML/CSS/JS — no frameworks, no build step, no dependencies.

## Preview

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What's on the page

| Section | Contents |
| --- | --- |
| Hero | Headline, CTAs, CSS-built phone mockup of the app, floating insight cards |
| Stats | IBS prevalence & low-FODMAP efficacy facts |
| How it works | Track → Learn → Thrive |
| **Free features** | Basic logging · Essential food library · Weekly symptom trends · Simple flare patterns |
| Food library demo | Interactive search of 41 sample foods with low/moderate/high FODMAP badges and filters |
| **Premium features** | AI trigger analysis · Personalized diet recommendations · Guided 3-phase low-FODMAP plan · Menu photo analysis · Doctor-ready PDF reports · Meditation & gut-directed hypnotherapy audio · Smart takeout suggestions · Registered dietitian Q&A |
| Pricing | Monthly/annual toggle, Free vs Premium cards, full plan-comparison table |
| Testimonials | Three member stories (placeholder copy) |
| FAQ | Accessible accordion (native `<details>`) incl. medical-advice disclaimer |
| CTA band + footer | Sign-up call-to-action, link columns, full medical disclaimer |

## Files

```
index.html   — all markup (semantic, accessible, SEO meta + JSON-LD)
styles.css   — design system, layout, responsive breakpoints, reduced-motion support
main.js      — mobile nav, pricing toggle, FAQ accordion, reveal animations,
               demo-CTA toast, interactive food-library search
```

## Customizing

- **Brand**: search for `GutWise` in `index.html` and replace; the logo is an inline SVG.
- **Pricing**: edit the `data-monthly` / `data-annual` attributes on the Premium plan card.
- **Sign-up links**: every dead CTA carries a `data-demo` attribute and currently shows a
  toast. Point those `href`s at your real sign-up/app URL and remove `data-demo`.
- **Food demo data**: edit the `FOODS` array at the bottom of `main.js`.
- **Testimonials & stats**: placeholder copy — replace with your real numbers and quotes
  before launching.

## Notes

- Food ratings in the demo follow commonly published low-FODMAP serving guidance, but they
  are illustrative only and serving sizes matter.
- The site includes a prominent medical disclaimer; keep one in any production version.
