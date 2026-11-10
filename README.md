# Vision Poll

Create, share and vote on polls. Android-only PWA hosted free on GitHub Pages, with a Google Apps Script + Google Sheet backend that you control 100%.

## Core files (depend on each other)
| File | Role |
|---|---|
| index.html | App shell, header, both sidebars |
| styles.css | Material Design 3 styling, Facebook blue |
| app.js | Polls, accounts, voting, results, To-Do, settings |
| admin.html | Standalone admin app: approve users, manage polls |
| code.gs | Google Apps Script backend |

## Modular files (each fully independent, removable)
Each module has its own CSS, HTML and JavaScript and is connected only by a script tag before `</body>`.

| File | Role |
|---|---|
| 404.html | Pretty poll URLs on GitHub Pages (`/p/ID`) |
| poll.js | Share-poll dialog (link, WhatsApp, Facebook) |
| api.js | Tap the title 5 times to set the backend URL |
| more.js | The six left-sidebar pages |
| cover-page.js | Welcome cover screen |
| computer-block.js | Blocks desktop and non-Android devices |
| sw.js | Offline service worker |
| manifest.json | Install settings |

## Poll links
Every poll has a unique link: `https://USERNAME.github.io/REPO/p/POLLID`
Backup link: `https://USERNAME.github.io/REPO/#/p/POLLID`

## Placeholders to replace
- `YOUR-HOSTED-URL` in index.html, 404.html, cover-page.js, manifest.json, more.js (PNG icons, OG image, developer photo)
- `YOUR-USERNAME` and repo name in the `og:url` tag in index.html
- Name, bio, email, phone, WhatsApp, Facebook and organization details in more.js
- `PASTE_YOUR_GAS_WEB_APP_URL_HERE` in app.js (or set it inside the app through api.js)

See Deployment.md for step-by-step setup.
