# Leaseweb dedicated-server storefront

Angular 19 client-facing demo (product list, configurable product detail, B2B quote).

---

## Requirements

- **Node.js** 18.19 or 20.x (this repo was built with Node 18.20)
- **npm** 10+ (comes with Node)

Check:

```bash
node -v
npm -v
```

---

## Install

From the project root (`leaseweb-infrastructure`):

```bash
npm install
```

---

## Run locally

```bash
npm start
```

This starts the Angular dev server. When it prints `Local:`, open:

**http://localhost:4200/**

| Path | Screen |
|---|---|
| `/` | Home |
| `/servers` | Product list |
| `/configure/lw-gp-epyc` | Product detail (example SKU) |
| `/quote` | B2B quote |

Stop the server with `Ctrl+C`.

If port 4200 is already in use:

```bash
npx ng serve --port 4201
```

Then open `http://localhost:4201/`.

---

## Production build

```bash
npm run build
```

Output: `dist/leaseweb-infrastructure/browser/`

Preview the production build:

```bash
npx ng serve --configuration production
```

---

## Troubleshooting

| Problem | What to try |
|---|---|
| `npm install` fails | Use Node 18 or 20; delete `node_modules` and `package-lock.json`, then `npm install` again |
| Blank page / catalog empty | Confirm `public/assets/occ/products.json` exists; hard-refresh the browser |
| Port 4200 taken | `npx ng serve --port 4201` |
| `ng` not found | Use `npx ng …` or `npm start` (scripts use the local CLI) |
