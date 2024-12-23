import { EmployeeUserPage } from "./Employee";
import { EmployeeUserCreatePage } from "./Employee/Create";
import { TaskeeUserPage } from "./Taskee";
import { TaskerUserPage } from "./Tasker";

const UserManagement = () => {
  return null;
};

UserManagement.Taskee = TaskeeUserPage;
UserManagement.Employee = EmployeeUserPage;
UserManagement.Tasker = TaskerUserPage;
UserManagement.CreateEmployee = EmployeeUserCreatePage;

export default UserManagement;
