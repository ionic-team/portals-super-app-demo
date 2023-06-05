import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://localhost:54321";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const serviceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";
const supabase = createClient(supabaseUrl, serviceKey!);

interface Customer {
  id: number;
  createdAt: Date;
  salesperson: string;
  name: string;
}

export const getEmployees = async () => {
  const { data, error } = await supabase.from("employees").select("*");
  if (error) {
    console.error("Error fetching data:", error);
  }
  return data;
};

export const getCustomers = async (uuid: string) => {
  const { data, error } = await supabase
    .from("customer")
    .select("*")
    .eq("salesperson", uuid);
  if (error) {
    console.error("Error fetching data:", error);
  }
  return data;
};
