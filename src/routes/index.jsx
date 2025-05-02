import { createBrowserRouter } from 'react-router-dom';
import JobProposals from '../pages/JobProposals';

const router = createBrowserRouter([
  // ... existing routes ...
  {
    path: '/jobs/:jobId/proposals',
    element: <JobProposals />
  }
]);

export default router; 