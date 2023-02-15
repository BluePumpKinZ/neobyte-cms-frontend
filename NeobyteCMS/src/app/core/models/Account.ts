export type MUID = {
  token: string;
  expiresIn: number;
}

export interface Account {
  id: string;
  name: string;
  role: role;
  lastSeen: Date;
}

export interface AccountDetails extends Account{
  bio: string;
  canManageSites: boolean;
  canManageUsers: boolean;
  createdAt: Date;
  email: string;
}

export enum role {
  CLIENT = 'Client',
  OWNER = 'Owner',
}
