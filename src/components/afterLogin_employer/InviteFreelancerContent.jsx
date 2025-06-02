import React from "react";
import InviteFreelancer from "./InviteFreelancer";
// Remove modal related imports if they were here (FaUser, FaMapMarkerAlt, FaCheckCircle, FaEnvelope, FaPhone etc. if they are only for the internal modal)
// import { FaUser, FaMapMarkerAlt, FaCheckCircle, FaEnvelope, FaPhone } from "react-icons/fa"; // Keep if used elsewhere

// Assuming the modal state and component are managed by the parent (JobDetail.jsx)

const InviteFreelancerContent = ({
  jobId,
  setShowModal, // Receive from parent
  setSelectedFreelancer, // Receive from parent
  jobData
}) => {
  console.log("InviteFreelancerContent jobData:", jobData); // Debug log
  // Remove local state and handlers for the modal
  // const [showModal, setShowModal] = useState(false);
  // const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  // const handleCloseModal = () => { ... };
  // const handleOverlayClick = (e) => { ... };

  // Remove the handleSendMessage if it's only for the internal modal and will be handled in the shared modal
  // const handleSendMessage = () => { ... };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Pass modal state setters to InviteFreelancer */}
      {/* InviteFreelancer will call these when a freelancer card is clicked */}
      <InviteFreelancer
        jobId={jobId}
        setSelectedFreelancer={setSelectedFreelancer}
        setShowModal={setShowModal}
        jobData={jobData}
      />

      {/* Remove the entire basic Modal Structure from here */}
      {/* The modal will be rendered by the parent component (JobDetail.jsx) using FreelancerDetailModal.jsx */}
      {/*
      {showModal && selectedFreelancer && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-end"
          onClick={handleOverlayClick}
        >
          <div className="bg-white w-full md:w-1/2 lg:w-1/3 h-full shadow-xl overflow-y-auto">
             ...
          </div>
        </div>
      )}
      */}
    </div>
  );
};

export default InviteFreelancerContent; 