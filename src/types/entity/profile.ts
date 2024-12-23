import { RoleType } from '../base/role';

export type ProfileEntityType = {
  username: string;
  firstName: string;
  lastName: string;
  role: RoleType;
  email: string;
};
