create table "public"."favorites" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "publication" bigint not null,
    "user_id" uuid
);


alter table "public"."favorites" enable row level security;

create table "public"."publication_files" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "publication" bigint not null,
    "file_url" text not null,
    "cover_image" boolean
);


alter table "public"."publication_files" enable row level security;

create table "public"."publications" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now(),
    "title" text not null,
    "description" text not null,
    "price" numeric,
    "previous_price" numeric,
    "currency_type" text,
    "condition" text,
    "year" numeric,
    "km" numeric,
    "color" text,
    "neiborhood" text,
    "transmision" text,
    "engine" text,
    "fuel_type" text,
    "doors" numeric,
    "unique_owner" boolean default false,
    "slug_url" text not null,
    "swap" boolean default false,
    "owner_phone" text,
    "market_discount" boolean default false,
    "user_id" uuid,
    "category" bigint not null,
    "make" bigint not null,
    "model" bigint not null,
    "version" bigint not null,
    "province" bigint,
    "city" bigint,
    "status" text default 'draft'::text
);


alter table "public"."publications" enable row level security;

alter table "public"."users" alter column "name" drop not null;

CREATE UNIQUE INDEX favorites_pkey ON public.favorites USING btree (id);

CREATE UNIQUE INDEX publication_files_pkey ON public.publication_files USING btree (id);

CREATE UNIQUE INDEX publications_pkey ON public.publications USING btree (id);

CREATE UNIQUE INDEX publications_slug_url_key ON public.publications USING btree (slug_url);

alter table "public"."favorites" add constraint "favorites_pkey" PRIMARY KEY using index "favorites_pkey";

alter table "public"."publication_files" add constraint "publication_files_pkey" PRIMARY KEY using index "publication_files_pkey";

alter table "public"."publications" add constraint "publications_pkey" PRIMARY KEY using index "publications_pkey";

alter table "public"."favorites" add constraint "favorites_publication_fkey" FOREIGN KEY (publication) REFERENCES publications(id) ON DELETE CASCADE not valid;

alter table "public"."favorites" validate constraint "favorites_publication_fkey";

alter table "public"."favorites" add constraint "favorites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."favorites" validate constraint "favorites_user_id_fkey";

alter table "public"."publication_files" add constraint "publication_files_publication_fkey" FOREIGN KEY (publication) REFERENCES publications(id) ON DELETE CASCADE not valid;

alter table "public"."publication_files" validate constraint "publication_files_publication_fkey";

alter table "public"."publications" add constraint "publications_category_fkey" FOREIGN KEY (category) REFERENCES vehicle_categories(id) not valid;

alter table "public"."publications" validate constraint "publications_category_fkey";

alter table "public"."publications" add constraint "publications_city_fkey" FOREIGN KEY (city) REFERENCES cities(id) not valid;

alter table "public"."publications" validate constraint "publications_city_fkey";

alter table "public"."publications" add constraint "publications_make_fkey" FOREIGN KEY (make) REFERENCES vehicle_makes(id) not valid;

alter table "public"."publications" validate constraint "publications_make_fkey";

alter table "public"."publications" add constraint "publications_model_fkey" FOREIGN KEY (model) REFERENCES vehicle_models(id) not valid;

alter table "public"."publications" validate constraint "publications_model_fkey";

alter table "public"."publications" add constraint "publications_province_fkey" FOREIGN KEY (province) REFERENCES provinces(id) not valid;

alter table "public"."publications" validate constraint "publications_province_fkey";

alter table "public"."publications" add constraint "publications_slug_url_key" UNIQUE using index "publications_slug_url_key";

alter table "public"."publications" add constraint "publications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."publications" validate constraint "publications_user_id_fkey";

alter table "public"."publications" add constraint "publications_version_fkey" FOREIGN KEY (version) REFERENCES vehicle_versions(id) not valid;

alter table "public"."publications" validate constraint "publications_version_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_created_columns()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.created_at = now();
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.set_updated_columns()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.insert_user_in_public_table_for_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.users (id, name, username, avatar_url, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(new.raw_user_meta_data ->> 'name', ''),
    COALESCE(new.raw_user_meta_data ->> 'avatar_url', ''),
    new.email
  );
  RETURN NEW;
END;$function$
;

grant delete on table "public"."favorites" to "anon";

grant insert on table "public"."favorites" to "anon";

grant references on table "public"."favorites" to "anon";

grant select on table "public"."favorites" to "anon";

grant trigger on table "public"."favorites" to "anon";

grant truncate on table "public"."favorites" to "anon";

grant update on table "public"."favorites" to "anon";

grant delete on table "public"."favorites" to "authenticated";

grant insert on table "public"."favorites" to "authenticated";

grant references on table "public"."favorites" to "authenticated";

grant select on table "public"."favorites" to "authenticated";

grant trigger on table "public"."favorites" to "authenticated";

grant truncate on table "public"."favorites" to "authenticated";

grant update on table "public"."favorites" to "authenticated";

grant delete on table "public"."favorites" to "service_role";

grant insert on table "public"."favorites" to "service_role";

grant references on table "public"."favorites" to "service_role";

grant select on table "public"."favorites" to "service_role";

grant trigger on table "public"."favorites" to "service_role";

grant truncate on table "public"."favorites" to "service_role";

grant update on table "public"."favorites" to "service_role";

grant delete on table "public"."publication_files" to "anon";

grant insert on table "public"."publication_files" to "anon";

grant references on table "public"."publication_files" to "anon";

grant select on table "public"."publication_files" to "anon";

grant trigger on table "public"."publication_files" to "anon";

grant truncate on table "public"."publication_files" to "anon";

grant update on table "public"."publication_files" to "anon";

grant delete on table "public"."publication_files" to "authenticated";

grant insert on table "public"."publication_files" to "authenticated";

grant references on table "public"."publication_files" to "authenticated";

grant select on table "public"."publication_files" to "authenticated";

grant trigger on table "public"."publication_files" to "authenticated";

grant truncate on table "public"."publication_files" to "authenticated";

grant update on table "public"."publication_files" to "authenticated";

grant delete on table "public"."publication_files" to "service_role";

grant insert on table "public"."publication_files" to "service_role";

grant references on table "public"."publication_files" to "service_role";

grant select on table "public"."publication_files" to "service_role";

grant trigger on table "public"."publication_files" to "service_role";

grant truncate on table "public"."publication_files" to "service_role";

grant update on table "public"."publication_files" to "service_role";

grant delete on table "public"."publications" to "anon";

grant insert on table "public"."publications" to "anon";

grant references on table "public"."publications" to "anon";

grant select on table "public"."publications" to "anon";

grant trigger on table "public"."publications" to "anon";

grant truncate on table "public"."publications" to "anon";

grant update on table "public"."publications" to "anon";

grant delete on table "public"."publications" to "authenticated";

grant insert on table "public"."publications" to "authenticated";

grant references on table "public"."publications" to "authenticated";

grant select on table "public"."publications" to "authenticated";

grant trigger on table "public"."publications" to "authenticated";

grant truncate on table "public"."publications" to "authenticated";

grant update on table "public"."publications" to "authenticated";

grant delete on table "public"."publications" to "service_role";

grant insert on table "public"."publications" to "service_role";

grant references on table "public"."publications" to "service_role";

grant select on table "public"."publications" to "service_role";

grant trigger on table "public"."publications" to "service_role";

grant truncate on table "public"."publications" to "service_role";

grant update on table "public"."publications" to "service_role";

create policy "Enable read access for all users"
on "public"."cities"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."provinces"
as permissive
for select
to public
using (true);


create policy "Enable delete"
on "public"."publication_files"
as permissive
for delete
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."publication_files"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."publication_files"
as permissive
for select
to public
using (true);


create policy "Enable insert for users based on user_id"
on "public"."publications"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable read access for all users"
on "public"."publications"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on user_id"
on "public"."publications"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."vehicle_categories"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."vehicle_makes"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."vehicle_models"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."vehicle_versions"
as permissive
for select
to public
using (true);


CREATE TRIGGER on_insert_set_created_columns AFTER INSERT ON public.publications FOR EACH ROW EXECUTE FUNCTION set_created_columns();

CREATE TRIGGER on_update_set_updated_columns BEFORE UPDATE ON public.publications FOR EACH ROW EXECUTE FUNCTION set_updated_columns();


