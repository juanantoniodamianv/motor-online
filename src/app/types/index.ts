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
    vehicle_categories: { name: string };
    vehicle_makes: { name: string };
    vehicle_models: { name: string };
    vehicle_versions: { name: string };
  };
export type Publication = PublicationEntity;
