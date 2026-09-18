# Marae Shopping List

A simple offline-first shopping list app for stocking up for events at the marae (tangi, noho, wānanga, etc.). No login, no backend — everything is stored in your browser.

## What it does

- **Auto-scaling lists** — tell it how many people and how many days, and it builds a shopping list from your master item list, scaling quantities up or down.
- **Checklist while shopping** — tick items off, adjust quantities on the fly, and record what you actually paid. Running totals (estimated and actual) are shown at the bottom.
- **Editable master item list** — add, edit, remove items and categories, and set default unit prices, under "Manage Items". This is the template every new event is built from.
- **Print-friendly view** — the "Print" button on an event gives you a clean printout to take shopping.
- **Backup / Share** — export your whole list (items + all past events) as a `.json` file, and import it again on another device or send it to someone else. There's no live sync between devices yet — this file is the way to hand your data to someone else, or back it up.

Seeded with items and quantities pulled from your existing shopping template and a real 20-person shopping list, so there's a sensible starting point already loaded — edit anything that doesn't match how you actually shop.

## Running it locally

No build step needed. Just open `index.html` in a browser, or serve the folder with any static file server, e.g.:

```
npx serve .
```

## Hosting on GitHub Pages

1. Create a new GitHub repo (e.g. `marae-shopping-list`) and push this folder's contents to it.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Save — GitHub will give you a URL like `https://<your-username>.github.io/marae-shopping-list/` within a minute or two.

That's it — no environment variables, no server, no database required.

## Notes on quantities

Each master item has a "scaling" setting:

- **Scales with headcount** — the quantity you entered is treated as "how much for 100 people over 2 days", and the app scales it up/down proportionally for your event's actual headcount and days.
- **Fixed** — the quantity stays the same regardless of headcount (useful for things you'd buy one of regardless, or items you haven't set a ratio for yet). You can always adjust the quantity by hand on any event.

## Later: syncing across devices

Right now this is single-device/browser storage (like a personal notebook). If you want several people to check off the same live list from their own phones, that needs a small shared backend (e.g. Supabase, same as your other apps) — the code is structured so that swap should be reasonably contained to `js/store.js` when you're ready for it.
