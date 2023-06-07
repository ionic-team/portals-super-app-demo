import { createClient } from "@supabase/supabase-js";
import { Customer, PTORequest, User } from "./types";

const supabaseUrl = "http://localhost:54321";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const serviceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";
const supabase = createClient(supabaseUrl, serviceKey!);

export const loadCustomers = async (uuid: string) => {
  const { data, error } = await supabase
    .from("customer")
    .select("*")
    .eq("salesperson", uuid);
  if (error) {
    console.error("Error:", error);
  }
  return data;
};

export const createCustomer = async (customer: Customer) => {
  const { error } = await supabase.from("customer").insert([
    {
      created_at: customer.created_at,
      salesperson: customer.salesperson,
      name: customer.name,
    },
  ]);
  if (error) {
    console.error("Error:", error);
  }
};

export const loadUserPTORequests = async (uuid: string) => {
  const { data, error } = await supabase
    .from("pto_requests")
    .select("*")
    .eq("requester", uuid);
  if (error) {
    console.error("Error:", error);
  }
  return data;
};

export const createPTORequest = async (request: PTORequest) => {
  const { error } = await supabase.from("pto_requests").insert([
    {
      requested_at: request.requested_at,
      requester: request.requester,
      approver: request.approver,
      start_date: request.start_date,
      end_date: request.end_date,
      type: request.type,
      approval_status: request.approval_status,
    },
  ]);
  if (error) {
    console.error("Error:", error);
  }
};

export const loadAssignedPTORequests = async (uuid: string) => {
  const { data, error } = await supabase
    .from("pto_requests")
    .select("*")
    .eq("approver", uuid);
  if (error) {
    console.error("Error:", error);
  }
  return data;
};

export const processPTORequest = async (
  requestId: number,
  approvalStatus: number
) => {
  const { error } = await supabase
    .from("pto_requests")
    .update({ approval_status: approvalStatus })
    .eq("id", requestId);
  if (error) {
    console.error("Error:", error);
  }
};

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
