import { Database } from "./database";

type UserEntity = Database['public']['Tables']['users']['Row'];

export type User = UserEntity;

type VehicleCategoryEntity = Database['public']['Tables']['vehicle_categories']['Row'];

export type VehicleCategory = VehicleCategoryEntity;

type VehicleMakeEntity = Database['public']['Tables']['vehicle_makes']['Row'];

export type VehicleMake = VehicleMakeEntity;

type VehicleModelEntity = Database['public']['Tables']['vehicle_models']['Row'];

export type VehicleModel = VehicleModelEntity;

type VehicleVersionEntity = Database['public']['Tables']['vehicle_versions']['Row'];

export type VehicleVersion = VehicleVersionEntity;