import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AcceptFreelancerModal from '../components/AcceptFreelancerModal';

const JobProposals = () => {
  const { jobId } = useParams();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  useEffect(() => {
    fetchProposals();
  }, [jobId]);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://findwork-backend.onrender.com/api/jobs/${jobId}/proposal`);
      setProposals(response.data.data.applications);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách ứng viên');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptClick = (application) => {
    setSelectedApplication(application);
    setShowAcceptModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Danh sách ứng viên</h1>
      
      <div className="grid gap-6">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{proposal.freelancer.name}</h2>
                <p className="text-gray-600">Đề xuất: ${proposal.bidAmount}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {proposal.status === 'pending' ? 'Đang chờ' :
                   proposal.status === 'accepted' ? 'Đã chấp nhận' :
                   'Đã từ chối'}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{proposal.proposalText}</p>
            
            {proposal.status === 'pending' && (
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleAcceptClick(proposal)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Chấp nhận và thanh toán
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <AcceptFreelancerModal
        isOpen={showAcceptModal}
        onClose={() => {
          setShowAcceptModal(false);
          setSelectedApplication(null);
        }}
        jobId={jobId}
        application={selectedApplication}
      />
    </div>
  );
};

export default JobProposals; 