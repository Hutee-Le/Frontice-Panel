export type IGetAllUserByRoleParams = {
  page: string | number;
  pageSize: string | number;
};

export type IRemoveUserParams = {
  userId: string;
};

export type ICreateEmployeeUserRequest = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: "admin";
  phone: string;
  fullname: string;
  adminRole: "challenge" | "mentor";
};
