interface IUserState {
  loggedInStatus: string;
  user: IUser;
}

interface IUser {
  id: number;
  email: string;
  password_digest: string;
  created_at: string;
  updated_at: string;
}

export type { IUserState };
