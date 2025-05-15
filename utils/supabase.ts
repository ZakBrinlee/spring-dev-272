import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nmgkmmzlnvrzytvnkxll.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZ2ttbXpsbnZyenl0dm5reGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDEzNjQsImV4cCI6MjA2MTIxNzM2NH0.sRKHf6Wp1pKulge0d7LzEhZ70ZJ2bZOjw7atn9-DuFA",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
