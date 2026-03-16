# beitlab robotics Landing Page

Static landing page for industrial robotics services, focused on location algorithms, sensor precision, and industrial robotics + AI applications.

## Project structure

- `index.html`: content and section structure
- `styles.css`: layout, visual design system, responsive behavior
- `script.js`: mobile menu, section reveal animation, contact form validation/mailto behavior
- `assets/favicon.svg`: browser icon
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow
- `.nojekyll`: disables Jekyll processing on GitHub Pages

## Run locally

Use a local server (recommended):

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Test framework

This project uses Playwright end-to-end smoke tests to verify key UI and behavior before deployment.

### What is covered

1. Core page rendering (branding, hero, major sections)
2. Sticky header/layout regression at medium desktop widths
3. Anchor offset behavior for section navigation (header should not overlap section titles)
4. Contact form validation feedback
5. Contact email consistency in the UI

### Run tests locally

Install dependencies:

```sh
npm install
```

Run tests:

```sh
npm run test:e2e
```

Optional:

```sh
npm run test:e2e:headed
npm run test:e2e:ui
```

## Keep this site updated

### Common updates

1. Update text/content:
   - Edit headings, paragraphs, and labels in `index.html`.
2. Update visuals (sizes, spacing, colors):
   - Edit CSS variables and component rules in `styles.css`.
3. Update contact email:
   - Update both:
     - `index.html` mailto link
     - `script.js` `recipient` value
4. Update navigation/sections:
   - Keep each nav anchor (`href="#..."`) aligned with matching section `id` in `index.html`.

### Pre-deploy checklist

1. Run local tests (`npm run test:e2e`).
2. Run locally and test desktop + mobile widths for visual review.
3. Verify sticky header does not overlap section titles after anchor jumps.
4. Submit the contact form and confirm mail client opens with the correct recipient (`robotics-hello@beitlab.com`).
5. Confirm no broken asset links in browser console/network tab.

### Recommended update workflow

1. Create a branch for each change (content, styling, or behavior).
2. Make edits and verify locally.
3. Open a pull request with:
   - What changed
   - Why it changed
   - Screenshots (desktop + mobile) for UI edits
4. Merge to `main` after review.

## Contact form behavior

The form uses client-side validation and opens the user email client via `mailto:` with prefilled subject/body.

## GitHub Pages deployment

Deployment is automated via `.github/workflows/deploy-pages.yml`.

Workflow behavior:

1. On pull requests to `main`: run Playwright tests only.
2. On pushes to `main`: run Playwright tests, then deploy to GitHub Pages only if tests pass.

Required one-time repository setting:

1. Open `Settings` -> `Pages` in your GitHub repo.
2. Under `Build and deployment`, set `Source` to `GitHub Actions`.

After that, each push to `main` publishes the latest site.

## Troubleshooting

- Page looks outdated after deploy:
  - Hard refresh (`Cmd+Shift+R` / `Ctrl+F5`) and check that the latest workflow run succeeded.
- Styles or scripts not loading:
  - Verify file names and paths in `index.html` (`styles.css`, `script.js`, `assets/...`).
- Contact form sends to wrong address:
  - Confirm both `index.html` and `script.js` were updated with the same email.
