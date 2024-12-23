export type ITaskeeEntity = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  github: string;
  bio: string;
  cv: string;
  points: number;
  gold_expired: string;
  gold_registration_date: string;
  created_at: string;
  updated_at: string;
  gold_account?: boolean;
};
