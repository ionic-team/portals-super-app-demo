import { createClient, Session } from "@supabase/supabase-js";
import { User } from "./types";

const supabaseUrl = "http://localhost:54321";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const serviceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";

export const supabase = createClient(supabaseUrl, serviceKey!);

export const loadUser = async (uuid: string) => {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("id", uuid);
  if (error) {
    console.error("Error:", error);
  }
  const user: User = data?.[0] as User;
  return user;
};
