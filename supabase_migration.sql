-- Marae Shopping List — Supabase schema
-- Run this once in the mataatua.marae Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste all of this -> Run).
--
-- ALREADY RUN THIS BEFORE? Don't re-run the whole file — the seed INSERT at
-- the bottom will duplicate all 120 items. Just run this one line instead,
-- which adds the new "default list" column to your existing table:
--
--   alter table shopping_items add column if not exists in_default_list boolean not null default true;
--
-- And if you're setting up the Recipes feature, see the separate
-- supabase_migration_2_recipes.sql file instead — don't run it here.
--
-- Everything else below is only for a FRESH project that doesn't have these
-- tables yet.

create extension if not exists pgcrypto;

-- 1. Master item list (the template every new event is built from)
create table if not exists shopping_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  scaling text not null check (scaling in ('per_100_2days', 'fixed')),
  base_qty numeric not null default 1,
  unit_price numeric,
  in_default_list boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- If you're re-running this on a project that already has the table
-- (e.g. you ran an earlier version of this migration), this adds the
-- new column without touching your existing rows:
alter table shopping_items add column if not exists in_default_list boolean not null default true;

-- 2. Shopping events (one per tangi / noho / wananga etc.)
create table if not exists shopping_events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  event_date date,
  people integer not null default 1,
  days integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Lines on an event's list (the scaled/checklist items)
create table if not exists shopping_event_lines (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references shopping_events(id) on delete cascade,
  item_id uuid references shopping_items(id) on delete set null,
  category text not null,
  name text not null,
  qty numeric not null default 0,
  unit text,
  unit_price numeric,
  actual_price numeric,
  checked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_event_lines_event_id on shopping_event_lines(event_id);

-- Keep updated_at current on every row change
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_items_updated_at on shopping_items;
create trigger trg_items_updated_at before update on shopping_items
  for each row execute function set_updated_at();

drop trigger if exists trg_events_updated_at on shopping_events;
create trigger trg_events_updated_at before update on shopping_events
  for each row execute function set_updated_at();

drop trigger if exists trg_lines_updated_at on shopping_event_lines;
create trigger trg_lines_updated_at before update on shopping_event_lines
  for each row execute function set_updated_at();

-- Row Level Security: this app has no login, so anyone with the anon key
-- (i.e. anyone using the app) can read/write, same trust model as your koha tracker.
alter table shopping_items enable row level security;
alter table shopping_events enable row level security;
alter table shopping_event_lines enable row level security;

drop policy if exists "anon full access" on shopping_items;
create policy "anon full access" on shopping_items for all
  using (true) with check (true);

drop policy if exists "anon full access" on shopping_events;
create policy "anon full access" on shopping_events for all
  using (true) with check (true);

drop policy if exists "anon full access" on shopping_event_lines;
create policy "anon full access" on shopping_event_lines for all
  using (true) with check (true);

-- Live sync: let all three tables broadcast changes over Supabase Realtime
alter publication supabase_realtime add table shopping_items;
alter publication supabase_realtime add table shopping_events;
alter publication supabase_realtime add table shopping_event_lines;

-- Seed the master item list with your existing template + real purchase-price data.
-- Only run this section once (skip it if you're re-running this file on a project
-- that already has items).
INSERT INTO shopping_items (category, name, scaling, base_qty, unit_price) VALUES
  ('Vegetables', 'Potatoes 10kg', 'per_100_2days', 17, 8.99),
  ('Pantry', 'Eggs 18pkt', 'per_100_2days', 20, NULL),
  ('Vegetables', 'Pumkin', 'per_100_2days', 15, NULL),
  ('Pantry', 'Jolly Drinks 24s', 'per_100_2days', 8, NULL),
  ('Vegetables', 'Kumara 20kg Box', 'per_100_2days', 3, NULL),
  ('Pantry', 'Water', 'per_100_2days', 2, NULL),
  ('Vegetables', 'Onions 10kg', 'per_100_2days', 3, NULL),
  ('Pantry', 'Raro (3pkt)', 'fixed', 1, 1.49),
  ('Vegetables', 'Cabbage', 'per_100_2days', 10, 2.59),
  ('Pantry', 'Milk Powder 1kg', 'per_100_2days', 2, NULL),
  ('Vegetables', 'Spring Onion', 'per_100_2days', 6, NULL),
  ('Pantry', 'Coffee', 'per_100_2days', 6, NULL),
  ('Vegetables', 'Lettuce', 'per_100_2days', 6, 1.69),
  ('Pantry', 'Teabags', 'per_100_2days', 4, NULL),
  ('Vegetables', 'Tomato - Bag', 'per_100_2days', 6, NULL),
  ('Pantry', 'Porridge', 'per_100_2days', 2, 2.99),
  ('Vegetables', 'Cucumber', 'fixed', 1, NULL),
  ('Pantry', 'Weetbix 1kg', 'per_100_2days', 2, 5.0),
  ('Vegetables', 'Capsicum', 'fixed', 1, NULL),
  ('Pantry', 'Golden Syrup', 'fixed', 1, 5.89),
  ('Vegetables', 'Red Onion singles', 'fixed', 1, NULL),
  ('Pantry', 'Plum Jam', 'fixed', 1, NULL),
  ('Pantry', 'Tomato Sauce 2L', 'fixed', 1, NULL),
  ('Pantry', 'Soya Sauce', 'fixed', 1, NULL),
  ('Fruit', 'Apples 20kg Box', 'per_100_2days', 1, 32.0),
  ('Pantry', 'Sweet Chilli Sauce', 'fixed', 1, NULL),
  ('Fruit', 'Oranges 20kg Box', 'per_100_2days', 1, 20.0),
  ('Pantry', 'Coconut Cream (Kara 1L box or 6 cans)', 'fixed', 1, NULL),
  ('Fruit', 'Bananas 20kg Box', 'per_100_2days', 1, NULL),
  ('Pantry', 'Mayonaise 887ml', 'fixed', 1, NULL),
  ('Fruit', 'Kiwifruit', 'fixed', 1, NULL),
  ('Pantry', 'Cooking Oil 5L', 'fixed', 1, NULL),
  ('Fruit', 'Crushed Chilli 1kg', 'per_100_2days', 1, NULL),
  ('Pantry', 'Fruit Salad', 'fixed', 1, NULL),
  ('Fruit', 'Crushed Garlic 1kg', 'per_100_2days', 1, NULL),
  ('Pantry', 'Peaches', 'fixed', 1, NULL),
  ('Fruit', 'Crushed Ginger 1kg', 'per_100_2days', 1, NULL),
  ('Pantry', 'Spaghetti', 'fixed', 1, 14.99),
  ('Pantry', 'Baked Beans', 'fixed', 1, NULL),
  ('Dairy', 'Yoghurt', 'fixed', 1, NULL),
  ('Dairy', 'Cheese', 'fixed', 1, 8.49),
  ('Baking', 'Self Rising Flour', 'fixed', 1, 11.49),
  ('Dairy', 'Butter 500g', 'per_100_2days', 28, 4.45),
  ('Baking', 'Plain Flour 5kg', 'per_100_2days', 8, NULL),
  ('Dairy', 'Cream 2lt', 'per_100_2days', 6, NULL),
  ('Baking', 'Sugar 5kg', 'per_100_2days', 4, NULL),
  ('Dairy', 'Milk 3lt', 'per_100_2days', 15, NULL),
  ('Baking', 'Brown Sugar', 'per_100_2days', 4, 2.53),
  ('Dairy', 'Bread (Stuffing)', 'per_100_2days', 10, NULL),
  ('Baking', 'Icing Sugar', 'fixed', 1, NULL),
  ('Dairy', 'Bread (Sandwiches)', 'per_100_2days', 20, NULL),
  ('Baking', 'Cocoa Powder', 'fixed', 1, NULL),
  ('Baking', 'Cornflour', 'fixed', 1, NULL),
  ('Frozen', 'Surimi 1KG', 'per_100_2days', 8, NULL),
  ('Baking', 'Baking Powder', 'fixed', 1, NULL),
  ('Frozen', 'Shrimps', 'per_100_2days', 5, NULL),
  ('Baking', 'Custard Powder', 'fixed', 1, NULL),
  ('Frozen', 'Goofy Cakes - Slab', 'per_100_2days', 4, NULL),
  ('Baking', 'Yeast (12 pkt sachet)', 'fixed', 1, NULL),
  ('Frozen', 'Ice cream', 'fixed', 1, NULL),
  ('Baking', 'Mixed Herbs', 'fixed', 1, NULL),
  ('Frozen', 'Mixed Vegetables', 'per_100_2days', 6, NULL),
  ('Baking', 'Curry Powder', 'fixed', 1, NULL),
  ('Frozen', 'Peas', 'fixed', 1, NULL),
  ('Baking', 'Salt', 'fixed', 1, 1.93),
  ('Baking', 'Pepper', 'fixed', 1, NULL),
  ('Cleaning', 'Toilet Paper 40PK', 'per_100_2days', 6, NULL),
  ('Other', 'Glad Wrap', 'per_100_2days', 4, 4.99),
  ('Cleaning', 'Dishwash', 'fixed', 1, NULL),
  ('Other', 'Tin Foil', 'per_100_2days', 4, 2.69),
  ('Cleaning', 'Disinfectant', 'fixed', 1, 4.49),
  ('Other', 'Baking Paper', 'per_100_2days', 2, NULL),
  ('Cleaning', 'Jif Cleanser', 'fixed', 1, NULL),
  ('Other', 'Muslin Cloth', 'fixed', 1, NULL),
  ('Cleaning', 'Toilet Cleaner', 'fixed', 1, NULL),
  ('Cleaning', 'Hand Soap / Handwash', 'fixed', 1, NULL),
  ('Meat', 'Whole Chicken', 'per_100_2days', 20, NULL),
  ('Cleaning', 'Rubbish Bags', 'fixed', 1, NULL),
  ('Meat', 'Mince', 'fixed', 1, NULL),
  ('Cleaning', 'Goldilocks 2PK', 'per_100_2days', 4, NULL),
  ('Meat', 'Sausages 4kg', 'per_100_2days', 4, NULL),
  ('Cleaning', 'Sink plug', 'fixed', 1, NULL),
  ('Meat', 'Bacon 1kg', 'per_100_2days', 7, 7.29),
  ('Meat', 'Steak', 'fixed', 1, NULL),
  ('Seafood', 'Fish Fillets (Carton)', 'per_100_2days', 2, NULL),
  ('Meat', 'Pork', 'fixed', 1, NULL),
  ('Seafood', 'Mussels (Sack)', 'fixed', 1, NULL),
  ('Meat', 'Ham (Sliced)', 'per_100_2days', 20, 8.99),
  ('Lollies & Treats', 'Barley sugars', 'fixed', 8, 2.99),
  ('Lollies & Treats', 'Marshmallows (big bag)', 'fixed', 3, 3.69),
  ('Lollies & Treats', 'Scroggin', 'fixed', 1, 4.51),
  ('Lollies & Treats', 'Chippies (18 pkt)', 'fixed', 1, 4.99),
  ('Pantry', 'Milo (biggest bag)', 'fixed', 2, 7.49),
  ('Pantry', 'Instant Coffee 90g', 'fixed', 2, 1.89),
  ('Pantry', 'Instant noodles (10 pkt)', 'fixed', 2, 5.59),
  ('Pantry', 'White rice 5kg', 'fixed', 1, 11.29),
  ('Pantry', 'Jam (big jar)', 'fixed', 1, 4.59),
  ('Pantry', 'Peanut butter (big jar)', 'fixed', 1, 6.99),
  ('Pantry', 'Pickle', 'fixed', 1, 2.89),
  ('Baking', 'Biscuits', 'fixed', 8, 1.41),
  ('Baking', 'Cabin bread', 'fixed', 2, 1.89),
  ('Baking', 'Muesli (10 pkt)', 'fixed', 2, 2.49),
  ('Baking', 'Yeast (jar)', 'fixed', 1, 4.79),
  ('Vegetables', 'Carrots 1.5kg', 'fixed', 2, 2.5),
  ('Vegetables', 'Kamokamo', 'fixed', 4, 2.48),
  ('Meat', 'Ham', 'fixed', 3, 8.99),
  ('Meat', 'Beef sausages (each)', 'fixed', 84, 0.36),
  ('Meat', 'Whole pork', 'fixed', 1, NULL),
  ('Meat', 'Mutton', 'fixed', 1, NULL),
  ('Cleaning', 'Sunlight soap bar (box)', 'fixed', 1, 2.95),
  ('Cleaning', 'Dishwashing liquid 2ltr', 'fixed', 1, 1.99),
  ('Cleaning', 'Firelighters (24 pkt)', 'fixed', 1, 3.36),
  ('Cleaning', 'Tea towels (10 pkt)', 'fixed', 1, 11.78),
  ('Other', 'Yellow Candles', 'fixed', 2, 4.29),
  ('Other', 'Matches', 'fixed', 1, 0.61),
  ('First Aid', 'Claratyne', 'fixed', 1, NULL),
  ('First Aid', 'Insect repellent', 'fixed', 1, NULL),
  ('First Aid', 'Sunscreen', 'fixed', 1, NULL),
  ('First Aid', 'Pamol', 'fixed', 1, NULL),
  ('First Aid', 'Savlon cream', 'fixed', 1, NULL);
