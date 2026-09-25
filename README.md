# Marae Shopping List

A simple offline-first shopping list app for stocking up for events at the marae (tangi, noho, wānanga, etc.). No login required. It's a PWA, so it installs like a real app on phones and desktops, works offline, and syncs live with everyone else using it via Supabase.

## What it does

- **Auto-scaling lists** — tell it how many people and how many days, and it builds a shopping list from your master item list, scaling quantities up or down.
- **Checklist while shopping** — tick items off, adjust quantities on the fly, and record what you actually paid. Running totals (estimated and actual) are shown at the bottom.
- **Editable master item list** — add, edit, remove items and categories, and set default unit prices, under "Manage Items". This is the template every new event is built from.
- **Print-friendly view** — the "Print" button on an event gives you a clean printout to take shopping.
- **Backup / Share** — export your whole list (items + all past events) as a `.json` file, and import it again on another device or send it to someone else. Handy as a backup even though the app also syncs live via Supabase.
- **Installable** — once hosted (e.g. on GitHub Pages), it can be installed like a native app on a phone or desktop, works offline, and doesn't need an app store.
- **Recipes** — under "Recipes" in the header, add recipes with their ingredients and how many people they serve, browsed by category (Puddings, Meals, Hangi, or any you add). Each ingredient is picked from your master item list rather than typed freehand — same "Item / Qty / Unit price" columns as "Manage Items" — so it always shows that item's real price and shopping column (Vegetables, Meat, Dairy, etc.); pick "+ Add new item…" for an ingredient that isn't on your master list yet and it's added there too. On an event, "🍲 Add recipe" lets you pick a category then a recipe, previews the ingredients scaled to that event's headcount grouped by their shopping column, and adds them straight into the same list — each ingredient joins its usual column rather than a separate section for the recipe. Adding the same recipe twice, or two recipes that share an ingredient, adds the quantities together rather than duplicating rows. Seeded with your Burnt Sugar Steamed Pudding, Bacon & Egg Pie, and Creamy Potato Bake recipes (their ingredients that weren't already on your master list have been added there automatically, hidden from the default list until you decide otherwise).
- **Search bars** — "Manage Items", an event's shopping list, and "Add item to this list" each have a live search box at the top to quickly filter a long list down by name.
- **PAK'nSAVE links** — master items can carry a link straight to that product on the PAK'nSAVE website (🛒 in "Manage Items"), so you can check the current price or add it to an online order without hunting for it.
- **View-only share links** — on an event, "🔗 Copy view-only link" / "📧 Email view-only link" gives you a separate link to that event's list that anyone can open to view and tick off items while shopping, without being able to edit quantities, prices, or the master list. Handy for sharing with whoever's actually doing the shopping. This is a convenience, not real security — anyone with the link can still get to the full app if they know to change the URL, so don't use it for anything that needs to stay private.

Seeded with items and quantities pulled from your existing shopping template and a real 20-person shopping list, so there's a sensible starting point already loaded — edit anything that doesn't match how you actually shop.

## Live sync (Supabase)

This app is wired to sync with a Supabase project (`mmfaofgvueqfqygzxwfm`, same account as the koha tracker — separate tables, doesn't touch koha data). Before it'll work, you need to run the schema once — there are three migration files in this folder, and they need to be run **in order, every one of them**:

1. Open the Supabase dashboard (logged in as mataatua.marae@gmail.com) → your project → **SQL Editor** → **New query**.
2. Paste the entire contents of `supabase_migration.sql` and click **Run**. This creates the three core tables (`shopping_items`, `shopping_events`, `shopping_event_lines`), sets up permissive access (no login needed — same trust model as the koha tracker), turns on Realtime so devices sync live, and seeds the master item list with the 120 starting items.
3. Do the same with `supabase_migration_2_recipes.sql` — adds the `shopping_recipes` table used by the Recipes feature. (Skipping this is why recipes won't save if you only ever ran step 2.)
4. Do the same with `supabase_migration_3_item_fields.sql` — adds the `unit` and `paknsave_url` columns so those fields sync across devices instead of staying stuck on whichever device last edited them.

Once that's run, open the app — the little status dot next to "Backup / Share" in the header shows:
- **● Synced** (green) — connected, and changes sync live to anyone else with the app open.
- **● Offline (saved locally)** (orange) — can't reach Supabase right now; your changes are safe on this device and will sync automatically once you're back online.
- **● Local only** (tan) — Supabase isn't configured (shouldn't happen unless `js/config.js` is edited/removed).

The connection details live in `js/config.js`. If you ever want to point the app at a different Supabase project, that's the only file to change.

Note: I couldn't run the migration or test against the live project myself from here — this sandbox can only reach a fixed allowlist of sites, and your Supabase project isn't on it. Everything's been tested against a mocked Supabase client and against local-only mode, but give it a try after running the migration and let me know if anything looks off.

## Installing it as an app

Once it's hosted somewhere over HTTPS (GitHub Pages works fine — installing needs a real domain, not just a local file), you or anyone else can install it:

- **Android (Chrome)** — open the site, tap the three-dot menu → "Install app" (or a banner may offer this automatically). It shows up as a normal app icon.
- **iPhone/iPad (Safari)** — open the site, tap the Share button → "Add to Home Screen". Safari doesn't show an automatic install prompt like Chrome does, so this manual step is the way.
- **Desktop (Chrome/Edge)** — an install icon (⊕ or a monitor-with-arrow) appears in the address bar, or use the "⬇️ Install app" button that shows up in the app's own header.

Installed, it opens in its own window (no browser bar), gets its own icon, and keeps working offline — the app shell (everything except live data) is cached on the device the first time it's opened.

If you change any of the app's files later, bump the version number at the top of `sw.js` (`CACHE_NAME = 'marae-shopping-v1'` → `v2`, etc.) so installed copies pick up the update — otherwise they may keep serving the old cached version for a while.

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

## Offline behaviour

The app always keeps a full local copy of everything (items, events, recipes) in the browser's storage, so it works normally with no internet connection. Changes made offline are queued and sent to Supabase automatically once the connection comes back, and other devices pick them up live via Realtime. See "Live sync (Supabase)" above for how that's wired up.
