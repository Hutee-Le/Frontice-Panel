export type ITaskerEntity = {
  id: string;
  username: string;
  email: string;
  role: string;
  firstname: string;
  lastname: string;
  phone: string | null;
  image: string;
  bio: string;
  company: string;
  createdAt: number;
};
