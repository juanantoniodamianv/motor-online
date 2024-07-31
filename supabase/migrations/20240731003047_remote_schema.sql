revoke delete on table "public"."provinces" from "anon";

revoke insert on table "public"."provinces" from "anon";

revoke references on table "public"."provinces" from "anon";

revoke select on table "public"."provinces" from "anon";

revoke trigger on table "public"."provinces" from "anon";

revoke truncate on table "public"."provinces" from "anon";

revoke update on table "public"."provinces" from "anon";

revoke delete on table "public"."provinces" from "authenticated";

revoke insert on table "public"."provinces" from "authenticated";

revoke references on table "public"."provinces" from "authenticated";

revoke select on table "public"."provinces" from "authenticated";

revoke trigger on table "public"."provinces" from "authenticated";

revoke truncate on table "public"."provinces" from "authenticated";

revoke update on table "public"."provinces" from "authenticated";

revoke delete on table "public"."provinces" from "service_role";

revoke insert on table "public"."provinces" from "service_role";

revoke references on table "public"."provinces" from "service_role";

revoke select on table "public"."provinces" from "service_role";

revoke trigger on table "public"."provinces" from "service_role";

revoke truncate on table "public"."provinces" from "service_role";

revoke update on table "public"."provinces" from "service_role";

alter table "public"."provinces" drop constraint "provinces_pkey";

drop index if exists "public"."provinces_pkey";

drop table "public"."provinces";


