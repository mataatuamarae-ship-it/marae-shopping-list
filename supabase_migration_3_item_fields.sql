-- Adds the "unit" and "paknsave_url" columns to shopping_items so these
-- fields sync across devices via Supabase, instead of staying local-only to
-- whichever device last edited them.
--
-- Run this once in the Supabase SQL editor for this project
-- (mmfaofgvueqfqygzxwfm), the same way supabase_migration.sql and
-- supabase_migration_2_recipes.sql were run.

alter table shopping_items add column if not exists unit text;
alter table shopping_items add column if not exists paknsave_url text;
