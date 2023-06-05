export interface SessionObj {
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  userType: string;
}

export interface Entry {
  id: number;
  companyId: number;
  length: number;
  date: string;
  status: string;
}

export interface Event {
  id: string;
  username: string;
  src: string;
  rel: string;
  text: string;
}

export interface PerkEvent {
  id: number;
  givingUserId: number;
  receivingUserId: number;
  date: string;
  perkId: number;
}

export interface Perk {
  id: number;
  name: string;
}
