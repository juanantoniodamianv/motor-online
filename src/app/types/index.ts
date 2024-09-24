import { Database } from "./database";

type UserEntity = Database["public"]["Tables"]["users"]["Row"];

export type User = UserEntity;

type VehicleCategoryEntity =
  Database["public"]["Tables"]["vehicle_categories"]["Row"];

export type VehicleCategory = VehicleCategoryEntity;

type VehicleMakeEntity = Database["public"]["Tables"]["vehicle_makes"]["Row"];

export type VehicleMake = VehicleMakeEntity;

type VehicleModelEntity = Database["public"]["Tables"]["vehicle_models"]["Row"];

export type VehicleModel = VehicleModelEntity;

type VehicleVersionEntity =
  Database["public"]["Tables"]["vehicle_versions"]["Row"];

export type VehicleVersion = VehicleVersionEntity;

type ProvinceEntity = Database["public"]["Tables"]["provinces"]["Row"];
export type Province = ProvinceEntity;

type CityEntity = Database["public"]["Tables"]["cities"]["Row"];
export type City = CityEntity;

export type PublicationEntityInsert =
  Database["public"]["Tables"]["publications"]["Insert"];
export type PublicationInsert = PublicationEntityInsert;

export type PublicationEntity =
  Database["public"]["Tables"]["publications"]["Row"] & {
    id: number;
    vehicle_categories: { name: string | null } | null; // TODO: probablemente sea un error al traer los tipos de supabase, ya que esta declarado como NOT NULLABLE en supabase. El tipo correcto deberia ser: { name: string } | null
    vehicle_makes: { name: string | null } | null;
    vehicle_models: { name: string | null } | null;
    vehicle_versions: { name: string | null } | null;
  };
export type Publication = PublicationEntity;

export type Status = "active" | "sold" | "draft" | "paused";
