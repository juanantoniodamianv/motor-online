# Motor Online

This project uses [Supabase](https://supabase.com/docs) and [Next.js](https://nextjs.org/docs). Refer to the documentation for more information on how to use them.

**Important: Docker is required to run Supabase locally and it requires at least 7GB of memory.**

## Run Supabase Locally

For a quick setup, we are using `npx`.

- `npx supabase init` (This will create a Supabase folder in your project's root directory. This folder will contain all the files related to your Supabase database, including migrations.)
- `npx supabase start` (Requires Docker running locally and at least 7GB of memory ram)
  - After this step, you will see output containing your local Supabase credentials. Use `npx supabase status` to retrieve your credentials again.
- Connect Supabase to a local database:
  - `npx supabase login`
  - `npx supabase link --project-ref <reference-id>` (Find the reference ID in the Supabase Dashboard of your project.)

Migrations (see the database migration guide: [Supabase Database Migration Guide](https://supalaunch.com/blog/nextjs-supabase-database-migration-guide))

- Create a new migration with `npx supabase migration new create_new_migration_name` and edit the migration file.
- Apply migrations remotely; this also runs seeds:
  - `npx supabase db reset --linked`
- Apply migrations locally; this also runs seeds:
  - `npx supabase db reset --local`

## Push Changes from Local to Supabase

Before starting, it is recommended to pull the changes from Supabase first.

- Use `npx supabase db pull` to pull the changes into your local environment (it creates a new migration with the changes if they exist).
- Create a new migration with `npx supabase migration new create_new_migration_name` and edit the migration file in `./supabase/migrations/`.
- Run `npx supabase db reset --local` to apply migrations locally.
- Run `npx supabase db reset --linked` to apply migrations on Supabase.
- If none of both (local or linked) is specified, then --local will be used as default.

## Pull Changes from Supabase to Local

- Create a new database in Supabase.
- Use `npx supabase db pull` to pull the changes into your local environment (it creates a new migration with the changes).
- Run `npx supabase db reset --local` to apply migrations locally.
