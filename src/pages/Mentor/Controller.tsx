import { MyProfileController } from "../MyProfile";
import { SolutionManagement } from "./Solutions";

const MentorController = () => {
  return null;
};

MentorController.Solutions = SolutionManagement;
MentorController.Profile = MyProfileController.Mentor;

export default MentorController;
