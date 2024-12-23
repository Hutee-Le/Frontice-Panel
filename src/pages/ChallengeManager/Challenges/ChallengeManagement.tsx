import { ChallengeDetailsPage } from "./Details";
import { ChallengeListPage } from "./List";
import { ChallengeUploadPage } from "./Upload";

const ChallengeManagement = () => {
  return ChallengeListPage;
};

ChallengeManagement.Details = ChallengeDetailsPage;
ChallengeManagement.Upload = ChallengeUploadPage;
ChallengeManagement.List = ChallengeListPage;

export default ChallengeManagement;
