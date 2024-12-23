import { SolutionDetailsPage } from "./Details";
import { SolutionListPage } from "./List";
import { SolutionsReportsPage } from "./Report";
import { SolutionsReportDetailsPage } from "./ReportDetails";
const SolutionManagement = () => {
  return SolutionListPage;
};

SolutionManagement.List = SolutionListPage;
SolutionManagement.Details = SolutionDetailsPage;
SolutionManagement.Reports = SolutionsReportsPage;
SolutionManagement.ReportDetails = SolutionsReportDetailsPage;

export default SolutionManagement;
