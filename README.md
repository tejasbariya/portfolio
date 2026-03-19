# Tejash Bariya — Portfolio

Personal portfolio site built with vanilla HTML, CSS, and JavaScript.

## Structure

```
portfolio/
├── index.html          # Main HTML entry point
├── assets/
│   ├── css/
│   │   └── styles.css  # All styling (variables, layout, components, responsive)
│   ├── js/
│   │   └── main.js     # All interactivity (cursor, nav, filter, form, reveal)
│   └── images/         # Place project screenshots / profile image here
├── data/
│   └── data.js         # Single source of truth — edit this to update content
├── .gitignore
└── README.md
```

## Customisation

All content lives in `data/data.js`. To update:
- **Stack / skills** → edit `DATA.stack`
- **Projects** → edit `DATA.projects` array
- **Contact form** → replace `DATA.formEndpoint` with your [Formspree](https://formspree.io) ID
- **Social links** → edit `DATA.socials`

## Running locally

Open `index.html` directly in a browser, or use a local server:

```bash
npx serve .
# or
python3 -m http.server
```

## Deployment

Drop the entire folder onto any static host — Vercel, Netlify, GitHub Pages, Cloudflare Pages.
