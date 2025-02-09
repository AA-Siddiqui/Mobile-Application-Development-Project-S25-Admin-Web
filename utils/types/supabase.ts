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
      Admin: {
        Row: {
          id: number
          userId: string
        }
        Insert: {
          id?: number
          userId: string
        }
        Update: {
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Admin_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Assessment: {
        Row: {
          classId: number | null
          deadline: string
          description: string
          id: number
          max: number
          title: string
          type: string
          weight: number
        }
        Insert: {
          classId?: number | null
          deadline: string
          description: string
          id?: number
          max: number
          title: string
          type: string
          weight: number
        }
        Update: {
          classId?: number | null
          deadline?: string
          description?: string
          id?: number
          max?: number
          title?: string
          type?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "Assessment_classId_fkey"
            columns: ["classId"]
            isOneToOne: false
            referencedRelation: "Class"
            referencedColumns: ["id"]
          },
        ]
      }
      AssessmentFile: {
        Row: {
          assessmentId: number
          id: number
          name: string
        }
        Insert: {
          assessmentId: number
          id?: number
          name: string
        }
        Update: {
          assessmentId?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "AssessmentFile_assessmentId_fkey"
            columns: ["assessmentId"]
            isOneToOne: false
            referencedRelation: "Assessment"
            referencedColumns: ["id"]
          },
        ]
      }
      Attendance: {
        Row: {
          id: number
          present: boolean
          scheduleId: number
          studentId: number
        }
        Insert: {
          id?: number
          present?: boolean
          scheduleId: number
          studentId: number
        }
        Update: {
          id?: number
          present?: boolean
          scheduleId?: number
          studentId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Attendance_scheduleId_fkey"
            columns: ["scheduleId"]
            isOneToOne: false
            referencedRelation: "Schedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Attendance_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["id"]
          },
        ]
      }
      Class: {
        Row: {
          courseId: number
          id: number
          section: string
          teacherId: number
          term: string
        }
        Insert: {
          courseId: number
          id?: number
          section: string
          teacherId: number
          term: string
        }
        Update: {
          courseId?: number
          id?: number
          section?: string
          teacherId?: number
          term?: string
        }
        Relationships: [
          {
            foreignKeyName: "Class_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "Course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Class_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "Teacher"
            referencedColumns: ["id"]
          },
        ]
      }
      Course: {
        Row: {
          credits: number
          id: number
          mode: string
          name: string
        }
        Insert: {
          credits?: number
          id?: number
          mode: string
          name: string
        }
        Update: {
          credits?: number
          id?: number
          mode?: string
          name?: string
        }
        Relationships: []
      }
      Department: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      Enrollment: {
        Row: {
          classId: number
          id: number
          studentId: number
        }
        Insert: {
          classId: number
          id?: number
          studentId: number
        }
        Update: {
          classId?: number
          id?: number
          studentId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Enrollment_classId_fkey"
            columns: ["classId"]
            isOneToOne: false
            referencedRelation: "Class"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Enrollment_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["id"]
          },
        ]
      }
      Invoice: {
        Row: {
          amount: number
          description: string
          dueDate: string
          id: number
          paidDate: string | null
          studentId: number
          term: string
        }
        Insert: {
          amount: number
          description?: string
          dueDate: string
          id?: number
          paidDate?: string | null
          studentId: number
          term: string
        }
        Update: {
          amount?: number
          description?: string
          dueDate?: string
          id?: number
          paidDate?: string | null
          studentId?: number
          term?: string
        }
        Relationships: [
          {
            foreignKeyName: "Invoice_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["id"]
          },
        ]
      }
      Program: {
        Row: {
          departmentId: number
          id: number
          level: string
          name: string
          totalCredit: number
        }
        Insert: {
          departmentId: number
          id?: number
          level: string
          name: string
          totalCredit: number
        }
        Update: {
          departmentId?: number
          id?: number
          level?: string
          name?: string
          totalCredit?: number
        }
        Relationships: [
          {
            foreignKeyName: "Program_departmentId_fkey"
            columns: ["departmentId"]
            isOneToOne: false
            referencedRelation: "Department"
            referencedColumns: ["id"]
          },
        ]
      }
      Request: {
        Row: {
          classId: number
          id: number
          studentId: number
        }
        Insert: {
          classId: number
          id?: number
          studentId: number
        }
        Update: {
          classId?: number
          id?: number
          studentId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Request_classId_fkey"
            columns: ["classId"]
            isOneToOne: false
            referencedRelation: "Class"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Request_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["id"]
          },
        ]
      }
      Schedule: {
        Row: {
          classId: number
          endTime: string
          id: number
          startTime: string
          venue: string
        }
        Insert: {
          classId: number
          endTime: string
          id?: number
          startTime: string
          venue: string
        }
        Update: {
          classId?: number
          endTime?: string
          id?: number
          startTime?: string
          venue?: string
        }
        Relationships: [
          {
            foreignKeyName: "Schedule_classId_fkey"
            columns: ["classId"]
            isOneToOne: false
            referencedRelation: "Class"
            referencedColumns: ["id"]
          },
        ]
      }
      Student: {
        Row: {
          id: number
          programId: number | null
          rollNo: string
          userId: string
        }
        Insert: {
          id?: number
          programId?: number | null
          rollNo: string
          userId: string
        }
        Update: {
          id?: number
          programId?: number | null
          rollNo?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Student_programId_fkey"
            columns: ["programId"]
            isOneToOne: false
            referencedRelation: "Program"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Student_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Submission: {
        Row: {
          assessmentId: number
          id: number
          marks: number | null
          studentId: number
        }
        Insert: {
          assessmentId: number
          id?: number
          marks?: number | null
          studentId: number
        }
        Update: {
          assessmentId?: number
          id?: number
          marks?: number | null
          studentId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Submission_assessmentId_fkey"
            columns: ["assessmentId"]
            isOneToOne: false
            referencedRelation: "Assessment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Submission_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["id"]
          },
        ]
      }
      SubmissionFile: {
        Row: {
          id: number
          name: string
          submissionId: number
        }
        Insert: {
          id?: number
          name: string
          submissionId: number
        }
        Update: {
          id?: number
          name?: string
          submissionId?: number
        }
        Relationships: [
          {
            foreignKeyName: "SubmissionFile_submissionId_fkey"
            columns: ["submissionId"]
            isOneToOne: false
            referencedRelation: "Submission"
            referencedColumns: ["id"]
          },
        ]
      }
      Teacher: {
        Row: {
          id: number
          office: string
          position: string
          userId: string
        }
        Insert: {
          id?: number
          office?: string
          position: string
          userId: string
        }
        Update: {
          id?: number
          office?: string
          position?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Teacher_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          address: string
          departmentId: number
          dob: string | null
          id: string
          name: string
          role: number
        }
        Insert: {
          address: string
          departmentId: number
          dob?: string | null
          id: string
          name: string
          role?: number
        }
        Update: {
          address?: string
          departmentId?: number
          dob?: string | null
          id?: string
          name?: string
          role?: number
        }
        Relationships: [
          {
            foreignKeyName: "User_departmentId_fkey"
            columns: ["departmentId"]
            isOneToOne: false
            referencedRelation: "Department"
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
