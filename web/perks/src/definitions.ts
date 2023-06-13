export type User = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  manager: string;
  role: string;
};

export type PerkEvent = {
  id: string;
  givingUserId: string;
  receivingUserId: string;
  date: string;
  amount: number;
  reason: string;
};

export type UnsavedPerkEvent = Omit<PerkEvent, "id" | "date">;
