# Motor Online

This project uses [Supabase](https://supabase.com/docs) and [Next.js](https://nextjs.org/docs). Refer to the documentation for more information on how to use them.

This project is not intended to be a Supabase or Next documentation project (solo algunos comandos para arrancar o salir del paso). Instead you should use the proper documentation to understand them.

**Important: Docker is required to run Supabase locally and it requires at least 7GB of memory.**

## Setup

- Copy the file `.env.local-example` into a new file `.env.local` and replace the variables with your own.
- Run `npm install --include=optional` to install dependencies.

## Run Supabase Locally

For a quick setup, we are using `npx`.

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

## New DB Migration and Push Changes from Local to Supabase

Before starting, it is recommended to pull the changes from Supabase first.

- Use `npx supabase db pull` to pull the changes into your local environment (it creates a new migration with the changes if they exist).
- Create a new migration with `npx supabase migration new create_new_migration_name` and edit the migration file in `./supabase/migrations/`.
- Run `npx supabase db reset --local` to apply migrations locally.
- Run `npx supabase db reset --linked` to apply migrations on Supabase.
- If none of both (local or linked) is specified, then --local will be used as default.

## New DB Migration and Pull Changes from Supabase to Local

- Create a new database in Supabase.
- Use `npx supabase db pull` to pull the changes into your local environment (it creates a new migration with the changes).
- Run `npx supabase db reset --local` to apply migrations locally.

## FAQ

- If problems with 'not healthy checks' running `npx supabase start` try disabling `npx supabase start --ignore-health-check`
- Make sure to use Node 20.
- En Supabase UI ya no se pueden crear triggers a tablas privadas. Para solucionar este problema tienes que ir a la opcion de "SQL Editor" y copiar el siguiente comando, ej:
  `create trigger on_auth_insert_users after insert on auth.users for each row execute function insert_user_in_public_table_for_new_user();`
  luego le das RUN en la esquina inferior derecha (o ctrl + enter) y ya te aparecera el triger creado correctamente.
- Para visualizar logs referentes a Postgres, refiera se a Logs->Postgres
- UI: https://flowbite.com/blocks/
- Iconos: https://react-icons.github.io/react-icons/icons/hi/
- Agregar usuarios a google login: https://console.cloud.google.com/apis/credentials/consent?project=motoronline
