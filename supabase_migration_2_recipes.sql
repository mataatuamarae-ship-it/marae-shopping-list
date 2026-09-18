-- Marae Shopping List — Recipes feature
-- Run this ONCE in the Supabase SQL Editor (in addition to the original
-- supabase_migration.sql you already ran). This is a separate, smaller file
-- so you don't have to touch the original one again.
--
-- Adds: a "unit" column on shopping list lines (so recipe ingredients like
-- "4.5 cups" or "1.5 kg" can show their unit), and a new shopping_recipes
-- table (Puddings / Meals / Hangi / whatever categories you use), seeded
-- with the 3 recipes you gave me.

alter table shopping_event_lines add column if not exists unit text;

create table if not exists shopping_recipes (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  servings integer not null default 1,
  ingredients jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_recipes_updated_at on shopping_recipes;
create trigger trg_recipes_updated_at before update on shopping_recipes
  for each row execute function set_updated_at();

alter table shopping_recipes enable row level security;

drop policy if exists "anon full access" on shopping_recipes;
create policy "anon full access" on shopping_recipes for all
  using (true) with check (true);

alter publication supabase_realtime add table shopping_recipes;

-- Seed with your existing recipes. Skip this INSERT if you're re-running
-- this file (it would duplicate them) — everything above is safe to re-run.
-- Each ingredient carries a "category" matching your normal shopping-list
-- columns (Vegetables, Meat, Dairy, etc.), so it lands in the right place
-- on the list instead of a separate section for the recipe.
--
-- NOTE: if you already ran an earlier version of this file (before the
-- "category" field existed), you do NOT need to re-run this INSERT — the
-- app fixes up already-synced recipes automatically the next time it loads.
INSERT INTO shopping_recipes (category, name, servings, ingredients) VALUES
  ('Puddings', 'Burnt Sugar Steamed Pudding (A10 tin)', 37, '[{"name": "Self-raising flour", "amount": 4.5, "unit": "cups", "category": "Baking"}, {"name": "Sugar (for crumb)", "amount": 2.33, "unit": "cups", "category": "Baking"}, {"name": "Salt", "amount": 1.5, "unit": "tsp", "category": "Baking"}, {"name": "Butter", "amount": 390, "unit": "g", "category": "Dairy"}, {"name": "Sugar (for burnt sugar mix)", "amount": 1.5, "unit": "cups", "category": "Baking"}, {"name": "Boiling water", "amount": 1.5, "unit": "cups", "category": "Pantry"}, {"name": "Eggs", "amount": 7, "unit": "each", "category": "Pantry"}, {"name": "Golden syrup", "amount": 100, "unit": "ml", "category": "Baking"}, {"name": "Baking soda", "amount": 2, "unit": "tbsp", "category": "Baking"}, {"name": "Warm milk", "amount": 1.5, "unit": "cups", "category": "Dairy"}]'::jsonb),
  ('Meals', 'Bacon & Egg Pie (1 large tray)', 35, '[{"name": "Ready-made pastry sheets", "amount": 8, "unit": "sheets", "category": "Baking"}, {"name": "Bacon (diced)", "amount": 1.5, "unit": "kg", "category": "Meat"}, {"name": "Eggs", "amount": 24, "unit": "each", "category": "Pantry"}, {"name": "Milk", "amount": 750, "unit": "ml", "category": "Dairy"}, {"name": "Grated cheese", "amount": 500, "unit": "g", "category": "Dairy"}, {"name": "Onions (diced)", "amount": 600, "unit": "g", "category": "Vegetables"}, {"name": "Tomatoes (diced)", "amount": 600, "unit": "g", "category": "Vegetables"}, {"name": "Spring onions", "amount": 2, "unit": "bunches", "category": "Vegetables"}, {"name": "Salt", "amount": 2, "unit": "tsp", "category": "Baking"}, {"name": "Black pepper", "amount": 2, "unit": "tsp", "category": "Baking"}, {"name": "Dried parsley", "amount": 2, "unit": "tbsp", "category": "Baking"}, {"name": "Garlic powder", "amount": 2, "unit": "tsp", "category": "Baking"}, {"name": "Butter or oil", "amount": 2, "unit": "tbsp", "category": "Pantry"}]'::jsonb),
  ('Meals', 'Easy Creamy Potato Bake', 35, '[{"name": "Potatoes (peeled, sliced)", "amount": 6, "unit": "kg", "category": "Vegetables"}, {"name": "Bacon (diced, optional)", "amount": 1, "unit": "kg", "category": "Meat"}, {"name": "Grated cheese", "amount": 1, "unit": "kg", "category": "Dairy"}, {"name": "Cream", "amount": 2, "unit": "l", "category": "Dairy"}, {"name": "Milk", "amount": 1, "unit": "l", "category": "Dairy"}, {"name": "Butter", "amount": 250, "unit": "g", "category": "Dairy"}, {"name": "Onions (sliced)", "amount": 4, "unit": "each", "category": "Vegetables"}, {"name": "Garlic cloves", "amount": 4, "unit": "cloves", "category": "Vegetables"}, {"name": "Salt", "amount": 4, "unit": "tsp", "category": "Baking"}, {"name": "Black pepper", "amount": 2, "unit": "tsp", "category": "Baking"}, {"name": "Dried mixed herbs (optional)", "amount": 2, "unit": "tbsp", "category": "Baking"}]'::jsonb);
