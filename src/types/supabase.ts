export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Insert: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      check_ins: {
        Row: {
          id: string
          user_id: string
          created_at: string
          mood?: string | null
          energy?: string | null
          sleep_quality?: string | null
          sleep_duration?: number | null
          thoughts?: string | null
          current_need?: string | null
          tags?: string[] | null
          note?: string | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          mood?: string | null
          energy?: string | null
          sleep_quality?: string | null
          sleep_duration?: number | null
          thoughts?: string | null
          current_need?: string | null
          tags?: string[] | null
          note?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          mood?: string | null
          energy?: string | null
          sleep_quality?: string | null
          sleep_duration?: number | null
          thoughts?: string | null
          current_need?: string | null
          tags?: string[] | null
          note?: string | null
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          mood?: string | null
          created_at: string
          updated_at: string
          song?: string | null
          image_url?: string | null
          tags?: string[] | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          mood?: string | null
          created_at?: string
          updated_at?: string
          song?: string | null
          image_url?: string | null
          tags?: string[] | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          mood?: string | null
          created_at?: string
          updated_at?: string
          song?: string | null
          image_url?: string | null
          tags?: string[] | null
        }
      }
      comfort_items: {
        Row: {
          id: string
          user_id: string
          label: string
          category?: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          label: string
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          label?: string
          category?: string | null
          created_at?: string
        }
      }
      partner_connections: {
        Row: {
          id: string
          user_id: string
          partner_user_id?: string | null
          status?: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          partner_user_id?: string | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          partner_user_id?: string | null
          status?: string | null
          created_at?: string
        }
      }
      shared_status: {
        Row: {
          id: string
          user_id: string
          current_need?: string | null
          mood?: string | null
          custom_message?: string | null
          selected_journal_entry_id?: string | null
          is_public: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_need?: string | null
          mood?: string | null
          custom_message?: string | null
          selected_journal_entry_id?: string | null
          is_public?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_need?: string | null
          mood?: string | null
          custom_message?: string | null
          selected_journal_entry_id?: string | null
          is_public?: boolean
          created_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          daily_checkin_reminder: boolean
          reminder_time: string
          journal_reminder: boolean
          theme: string
          privacy_mode: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          daily_checkin_reminder?: boolean
          reminder_time?: string
          journal_reminder?: boolean
          theme?: string
          privacy_mode?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          daily_checkin_reminder?: boolean
          reminder_time?: string
          journal_reminder?: boolean
          theme?: string
          privacy_mode?: string
          updated_at?: string
        }
      }
    }
  }
}
