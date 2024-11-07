export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      carrera: {
        Row: {
          carrera: string
          id_carrera: number
        }
        Insert: {
          carrera: string
          id_carrera?: number
        }
        Update: {
          carrera?: string
          id_carrera?: number
        }
        Relationships: []
      }
      facultad: {
        Row: {
          facultad: string
          id_facultad: number
        }
        Insert: {
          facultad: string
          id_facultad?: number
        }
        Update: {
          facultad?: string
          id_facultad?: number
        }
        Relationships: []
      }
      facultad_carrera: {
        Row: {
          id_carrera: number
          id_facultad: number
          id_facultad_carrera: number
        }
        Insert: {
          id_carrera: number
          id_facultad: number
          id_facultad_carrera?: number
        }
        Update: {
          id_carrera?: number
          id_facultad?: number
          id_facultad_carrera?: number
        }
        Relationships: [
          {
            foreignKeyName: "facultad_carrera_id_carrera_fkey"
            columns: ["id_carrera"]
            isOneToOne: false
            referencedRelation: "carrera"
            referencedColumns: ["id_carrera"]
          },
          {
            foreignKeyName: "facultad_carrera_id_facultad_fkey"
            columns: ["id_facultad"]
            isOneToOne: false
            referencedRelation: "facultad"
            referencedColumns: ["id_facultad"]
          },
        ]
      }
      institucion: {
        Row: {
          id_facultad: number
          id_institucion: number
          institucion: string
        }
        Insert: {
          id_facultad: number
          id_institucion?: number
          institucion: string
        }
        Update: {
          id_facultad?: number
          id_institucion?: number
          institucion?: string
        }
        Relationships: [
          {
            foreignKeyName: "institucion_id_facultad_fkey"
            columns: ["id_facultad"]
            isOneToOne: false
            referencedRelation: "facultad"
            referencedColumns: ["id_facultad"]
          },
        ]
      }
      membrecia: {
        Row: {
          estado_membrecia: string
          id_membrecia: number
        }
        Insert: {
          estado_membrecia: string
          id_membrecia?: number
        }
        Update: {
          estado_membrecia?: string
          id_membrecia?: number
        }
        Relationships: []
      }
      miembro: {
        Row: {
          celular: number
          correo: string
          fecha_nacimiento: string
          id_membrecia: number | null
          id_miembro: number
          id_puntaje: number
          nombre_estudiante: string
          p_apellido: string
          s_apellido: string | null
        }
        Insert: {
          celular: number
          correo: string
          fecha_nacimiento: string
          id_membrecia?: number | null
          id_miembro?: number
          id_puntaje: number
          nombre_estudiante: string
          p_apellido: string
          s_apellido?: string | null
        }
        Update: {
          celular?: number
          correo?: string
          fecha_nacimiento?: string
          id_membrecia?: number | null
          id_miembro?: number
          id_puntaje?: number
          nombre_estudiante?: string
          p_apellido?: string
          s_apellido?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "miembro_id_membrecia_fkey"
            columns: ["id_membrecia"]
            isOneToOne: false
            referencedRelation: "membrecia"
            referencedColumns: ["id_membrecia"]
          },
          {
            foreignKeyName: "miembro_id_puntaje_fkey"
            columns: ["id_puntaje"]
            isOneToOne: false
            referencedRelation: "puntaje"
            referencedColumns: ["id_puntaje"]
          },
        ]
      }
      miembro_institucion: {
        Row: {
          id_institucion: number
          id_miembro: number
          id_miembro_institucion: number
        }
        Insert: {
          id_institucion: number
          id_miembro: number
          id_miembro_institucion?: number
        }
        Update: {
          id_institucion?: number
          id_miembro?: number
          id_miembro_institucion?: number
        }
        Relationships: [
          {
            foreignKeyName: "miembro_institucion_id_institucion_fkey"
            columns: ["id_institucion"]
            isOneToOne: false
            referencedRelation: "institucion"
            referencedColumns: ["id_institucion"]
          },
          {
            foreignKeyName: "miembro_institucion_id_miembro_fkey"
            columns: ["id_miembro"]
            isOneToOne: false
            referencedRelation: "miembro"
            referencedColumns: ["id_miembro"]
          },
        ]
      }
      puntaje: {
        Row: {
          id_puntaje: number
          puntaje: number
        }
        Insert: {
          id_puntaje?: number
          puntaje: number
        }
        Update: {
          id_puntaje?: number
          puntaje?: number
        }
        Relationships: []
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
