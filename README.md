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
