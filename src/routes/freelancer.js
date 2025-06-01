const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');
const { protect } = require('../middleware/authMiddleware');

// Get freelancers with search and filter
router.get('/', freelancerController.getFreelancers);

// Invite freelancer to job
router.post('/invite', protect, freelancerController.inviteFreelancer);

// Remove invitation
router.delete('/invite/:jobId/:freelancerId', protect, freelancerController.removeInvitation);

// Get invited freelancers for a job
router.get('/invited/:jobId', protect, freelancerController.getInvitedFreelancers);

module.exports = router; 