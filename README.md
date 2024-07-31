# Motor Online

## Run Supabase in local

See database migration guide [https://supalaunch.com/blog/nextjs-supabase-database-migration-guide]

- `npm i supabase --save-dev`
- `npx supabase init` (This will create supabase folder in your project root directory. This folder will contain all the files related to your Supabase database including migrations)
- `npx supabase start` (it requires docker running locally)
  - After this step you will see output containing your local Supabase credentials
- Connect local database to your Supabase project
  - `npx supabase login`
  - `npx supabase link --project-ref <reference-id>`
- New migration `npx supabase migration new create_new_migration_name` and edit the migration file
- Apply migrations in remote, it also run seeds
  - `npx supabase db reset --linked`
- Apply migrations in local, it also run seeds
  - `npx supabase db reset --local`

## Push changes from Local to Supabase

Before to start it's recommended to pull the changes from Supabase first.

- `npx supabase db pull` to pull the changes into our local (it create a new migration with the changes if exists)
- Create a new migration `npx supabase migration new create_new_migration_name` and edit the migration file (`./supabase/migrations/`)
- Then `npx supabase db reset --local` to run migrations in local
- Then `npx supabase db reset --linked` to run migrations in Supabase

## Pull changes from Supabase to Local

- Create a new database in Supabase
- Then `npx supabase db pull` to pull the changes into our local (it create a new migration with the changes)
- Then `npx supabase db reset --local` to run migrations in local
