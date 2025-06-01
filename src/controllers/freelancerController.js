const Freelancer = require("../models/Freelancer");
const JobInvitation = require("../models/JobInvitation");

// Get freelancers with search and filter
exports.getFreelancers = async (req, res) => {
  try {
    const { search, skills, minRating, maxRating } = req.query;
    let query = {};

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter by skills
    if (skills) {
      const skillArray = skills.split(',');
      query.skills = { $in: skillArray };
    }

    // Filter by rating
    if (minRating || maxRating) {
      query.rating = {};
      if (minRating) query.rating.$gte = parseFloat(minRating);
      if (maxRating) query.rating.$lte = parseFloat(maxRating);
    }

    const freelancers = await Freelancer.find(query)
      .select('name skills rating completedJobs')
      .limit(20);

    res.json(freelancers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Invite freelancer to job
exports.inviteFreelancer = async (req, res) => {
  try {
    const { jobId, freelancerId } = req.body;

    // Check if invitation already exists
    const existingInvitation = await JobInvitation.findOne({
      job: jobId,
      freelancer: freelancerId
    });

    if (existingInvitation) {
      return res.status(400).json({ message: 'Freelancer đã được mời' });
    }

    // Create new invitation
    const invitation = new JobInvitation({
      job: jobId,
      freelancer: freelancerId,
      status: 'pending'
    });

    await invitation.save();

    res.status(201).json(invitation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove invitation
exports.removeInvitation = async (req, res) => {
  try {
    const { jobId, freelancerId } = req.params;

    await JobInvitation.findOneAndDelete({
      job: jobId,
      freelancer: freelancerId
    });

    res.json({ message: 'Đã hủy lời mời' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get invited freelancers for a job
exports.getInvitedFreelancers = async (req, res) => {
  try {
    const { jobId } = req.params;

    const invitations = await JobInvitation.find({ job: jobId })
      .populate('freelancer', 'name skills rating completedJobs');

    const invitedFreelancers = invitations.map(inv => inv.freelancer);

    res.json(invitedFreelancers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 