# Tejash Bariya — Portfolio

Personal portfolio site built with vanilla HTML, CSS, and JavaScript.

## Structure

```
portfolio/
├── index.html          # Main HTML entry point (now ships real static content for SEO)
├── robots.txt           # Crawler rules + sitemap pointer
├── sitemap.xml           # XML sitemap
├── admin/
│   ├── config.yml       # Decap/Netlify CMS schema
│   └── index.html       # CMS entry (noindex)
├── assets/
│   ├── css/
│   │   └── styles.css  # All styling (variables, layout, components, responsive)
│   └── js/
│       └── main.js     # Interactivity + re-renders content from data/data.json
└── data/
    └── data.json        # Single source of truth — edit this to update content
```

## SEO / crawlability changes made

The original page rendered every piece of content (title, meta description, hero
copy, about text, project cards, socials) client-side after `fetch('data/data.json')`
resolved. Search engines that don't execute JavaScript, and most link-preview bots
(Slack, iMessage, LinkedIn, older Bing/Twitter scrapers), only ever saw an empty
shell. Fixes:

- **Static fallback content**: `index.html` now ships the actual name, role,
  tagline, hero copy, about paragraphs, project cards, and contact info directly
  in the markup. `main.js` still fetches `data/data.json` and re-renders on top of
  it (so editing the CMS still works), but if that fetch fails or JS is disabled,
  visitors and crawlers still see the real content.
- **Real `<title>` and meta description** set statically instead of empty strings.
- **Open Graph + Twitter Card tags** so links posted on social platforms/chat apps
  render a proper preview (update `og:image` / `twitter:image` once you add a real
  1200×630 cover image at `assets/images/og-cover.png`).
- **JSON-LD `Person` structured data** describing the developer, skills, and
  social profiles, for potential rich results / knowledge panels.
- **`<link rel="canonical">`** and `robots` meta tag.
- **`robots.txt`** allowing crawlers, disallowing `/admin/`, pointing to the sitemap.
- **`sitemap.xml`** listing the single page.
- **`noindex` on the CMS admin page** so it never appears in search results.
- Proper heading hierarchy retained (`h1` for the name, `h2` per section, `h3` per
  project card instead of a plain `div`).
- `<noscript>` fallback block with core content and links.

**Before deploying**, replace `https://tejasbariya.dev/` in `index.html`,
`robots.txt`, and `sitemap.xml` with your real production domain, and add a real
`assets/images/og-cover.png` (1200×630) for social share previews.

## Customisation

All content lives in `data/data.json`. To update:
- **Stack / skills** → edit `stack`
- **Projects** → edit `projects` array
- **Contact form** → replace `formEndpoint` with your [Formspree](https://formspree.io) ID
- **Social links** → edit `socials`

Note: since `index.html` now also carries static copies of this content for SEO,
keep the two in sync when you make a substantial content change (e.g. new
project, new tagline) — `main.js` will overwrite the visible page from
`data.json` on load, but the static markup is what search engines and
no-JS crawlers see first.

## Running locally

Open `index.html` directly in a browser, or use a local server:

```bash
npx serve .
# or
python3 -m http.server
```

## Deployment

Drop the entire folder onto any static host — Vercel, Netlify, GitHub Pages, Cloudflare Pages.
