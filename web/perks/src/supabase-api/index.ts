import { createClient } from "@supabase/supabase-js";
import { PerkEvent, UnsavedPerkEvent, User } from "../definitions";

export type { Session } from "@supabase/supabase-js";

const supabaseUrl = "http://localhost:54321";
const serviceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";

export const supabase = createClient(supabaseUrl, serviceKey!);

export const getUsers = async () => {
  const { data, error } = await supabase.from("employees").select("*");
  if (error) {
    console.error("Error:", error);
  }
  return data as User[];
};

export const getPerks = async () => {
  const { data, error } = await supabase.from("perks").select("*");
  if (error) {
    console.error("Error:", error);
  }
  return data as PerkEvent[];
};

export const createPerksEntry = async (event: UnsavedPerkEvent) => {
  const { data, error } = await supabase.rpc("insert_perk", {
    giver_id: event.giver,
    receiver_id: event.receiver,
    gift_amount: event.amount,
    gift_reason: event.reason,
  });
  if (error) {
    console.error("Error:", error);
  }
  return data as PerkEvent;
};
