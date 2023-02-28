export type MUID = {
  token: string;
  expiresIn: number;
}

export interface Account {
  id: string;
  username: string;
  role: role[];
  enabled: boolean;
}

export interface AccountDetails extends Account{
  bio: string;
  creationDate: Date;
  email: string;
}

export enum role {
  CLIENT = 'Client',
  OWNER = 'Owner',
}
