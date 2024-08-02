alter table "public"."cities" alter column "name" set data type text using "name"::text;

alter table "public"."vehicle_categories" alter column "name" set data type text using "name"::text;

alter table "public"."vehicle_makes" alter column "name" set data type text using "name"::text;

alter table "public"."vehicle_models" alter column "name" set data type text using "name"::text;

alter table "public"."vehicle_versions" alter column "name" set data type text using "name"::text;


