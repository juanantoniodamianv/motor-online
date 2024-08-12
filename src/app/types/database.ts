export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cities: {
        Row: {
          id: number
          name: string
          province_id: number
        }
        Insert: {
          id?: number
          name: string
          province_id: number
        }
        Update: {
          id?: number
          name?: string
          province_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cities_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "provinces"
            referencedColumns: ["id"]
          },
        ]
      }
      provinces: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: never
          name?: string | null
        }
        Update: {
          id?: never
          name?: string | null
        }
        Relationships: []
      }
      publications: {
        Row: {
          category: string
          color: string | null
          condition: string | null
          created_at: string
          currency_type: string | null
          description: string
          doors: number | null
          engine: string | null
          fuel_type: string | null
          id: number
          km: number | null
          make: string
          market_discount: boolean | null
          model: string
          neiborhood: string | null
          owner_phone: string | null
          previous_price: number | null
          price: number | null
          slug_url: string
          swap: boolean | null
          title: string
          transmision: string | null
          unique_owner: boolean | null
          updated_at: string
          user_id: string | null
          version: string
          year: number | null
        }
        Insert: {
          category: string
          color?: string | null
          condition?: string | null
          created_at?: string
          currency_type?: string | null
          description: string
          doors?: number | null
          engine?: string | null
          fuel_type?: string | null
          id?: number
          km?: number | null
          make: string
          market_discount?: boolean | null
          model: string
          neiborhood?: string | null
          owner_phone?: string | null
          previous_price?: number | null
          price?: number | null
          slug_url: string
          swap?: boolean | null
          title: string
          transmision?: string | null
          unique_owner?: boolean | null
          updated_at?: string
          user_id?: string | null
          version: string
          year?: number | null
        }
        Update: {
          category?: string
          color?: string | null
          condition?: string | null
          created_at?: string
          currency_type?: string | null
          description?: string
          doors?: number | null
          engine?: string | null
          fuel_type?: string | null
          id?: number
          km?: number | null
          make?: string
          market_discount?: boolean | null
          model?: string
          neiborhood?: string | null
          owner_phone?: string | null
          previous_price?: number | null
          price?: number | null
          slug_url?: string
          swap?: boolean | null
          title?: string
          transmision?: string | null
          unique_owner?: boolean | null
          updated_at?: string
          user_id?: string | null
          version?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "publications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_categories: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      vehicle_makes: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      vehicle_models: {
        Row: {
          created_at: string
          id: number
          name: string | null
          vehicle_category_id: number | null
          vehicle_make_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          vehicle_category_id?: number | null
          vehicle_make_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          vehicle_category_id?: number | null
          vehicle_make_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_models_vehicle_category_id_fkey"
            columns: ["vehicle_category_id"]
            isOneToOne: false
            referencedRelation: "vehicle_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_models_vehicle_make_id_fkey"
            columns: ["vehicle_make_id"]
            isOneToOne: false
            referencedRelation: "vehicle_makes"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_versions: {
        Row: {
          created_at: string
          id: number
          name: string
          vehicle_model_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          vehicle_model_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          vehicle_model_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_versions_vehicle_model_id_fkey"
            columns: ["vehicle_model_id"]
            isOneToOne: false
            referencedRelation: "vehicle_models"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
