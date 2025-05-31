import { createBrowserRouter } from "react-router-dom";
import JobProposals from "../pages/JobProposals";
import RecommendedJobsPage from "../pages/afterLogin_freelancer/RecommendedJobsPage";

const router = createBrowserRouter([
  // ... existing routes ...
  {
    path: "/jobs/:jobId/proposals",
    element: <JobProposals />,
  },
  {
    path: "/freelancer/recommended-jobs",
    element: <RecommendedJobsPage />,
  },
]);

export default router;
