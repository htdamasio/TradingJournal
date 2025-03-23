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

interface ITrade {
  id: number;
  strategy: string;
  asset: string;
  direction: string;
  roi: number;
  entry_price: number;
  exit_price: number;
  qty: number;
  start_date: string;
  end_date: string | null;
  status: string;
  net_pnl: number;
}

export type { IUserState, ITrade };
