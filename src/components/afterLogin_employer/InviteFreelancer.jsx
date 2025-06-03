import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaUserPlus, FaMapMarkerAlt, FaCheckCircle, FaChevronLeft, FaChevronRight, FaUser, FaEnvelope, FaRobot } from "react-icons/fa";
import { toast } from "react-toastify";
import { getFreelancers, getAISuggestedFreelancers } from "../../services/freelancerService";
import { countryOptions } from "../../data/CountryOption";

const InviteFreelancer = ({ jobId, setSelectedFreelancer, setShowModal, jobData }) => {
  console.log("InviteFreelancer jobData:", jobData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [rawSearchResults, setRawSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAISearching, setIsAISearching] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  });

  const fetchFreelancers = async (query = "", page = 1) => {
    setIsLoading(true);
    try {
      const response = await getFreelancers(query, page);
      if (response.success) {
        setRawSearchResults(response.data.freelancers || []);
        setPagination(response.data.pagination || {
          total: 0,
          page: 1,
          limit: 10,
          pages: 0
        });
      } else {
        toast.error("Không thể tìm kiếm freelancer. Vui lòng thử lại sau.");
        setRawSearchResults([]);
        setPagination({ total: 0, page: 1, limit: 10, pages: 0 });
      }
    } catch (error) {
      toast.error("Không thể tìm kiếm freelancer. Vui lòng thử lại sau.");
      console.error("Search error:", error);
      setRawSearchResults([]);
      setPagination({ total: 0, page: 1, limit: 10, pages: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAISearch = async () => {
    console.log("jobData:", jobData);
    if (!jobData || !jobData.title || !jobData.description) {
      toast.error("Không có đủ thông tin công việc để tìm kiếm");
      return;
    }

    setIsAISearching(true);
    try {
      const response = await getAISuggestedFreelancers({
        title: jobData.title,
        description: jobData.description,
        skills: jobData.skills || [],
        category: jobData.category
      });
      if (response.status === "Success") {
        setRawSearchResults(response.data.freelancers || []);
        setPagination(response.data.pagination || {
          total: response.data.freelancers?.length || 0,
          page: 1,
          limit: 10,
          pages: Math.ceil((response.data.freelancers?.length || 0) / 10)
        });
        toast.success("Đã tìm thấy freelancer phù hợp!");
      } else {
        toast.error("Không thể tìm kiếm freelancer phù hợp. Vui lòng thử lại sau.");
        setRawSearchResults([]);
        setPagination({ total: 0, page: 1, limit: 10, pages: 0 });
      }
    } catch (error) {
      toast.error("Không thể tìm kiếm freelancer phù hợp. Vui lòng thử lại sau.");
      console.error("AI Search error:", error);
      setRawSearchResults([]);
      setPagination({ total: 0, page: 1, limit: 10, pages: 0 });
    } finally {
      setIsAISearching(false);
    }
  };

  const filteredSearchResults = useMemo(() => {
    if (!selectedLocation) {
      return rawSearchResults;
    }
    return rawSearchResults.filter(freelancer => 
      freelancer.location && freelancer.location === selectedLocation
    );
  }, [rawSearchResults, selectedLocation]);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const handleSearch = () => {
    fetchFreelancers(searchQuery, 1);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchFreelancers(searchQuery, newPage);
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.pages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronLeft className="inline-block" />
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50" rel="noopener noreferrer"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="px-2">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md border ${
            pagination.page === i
              ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < pagination.pages) {
      if (endPage < pagination.pages - 1) {
        pages.push(<span key="end-ellipsis" className="px-2">...</span>);
      }
      pages.push(
        <button
          key={pagination.pages}
          onClick={() => handlePageChange(pagination.pages)}
          className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
        >
          {pagination.pages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.pages}
        className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronRight className="inline-block" />
      </button>
    );

    return pages;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Tìm kiếm freelancer theo tên hoặc kỹ năng..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? "Đang tìm..." : "Tìm kiếm"}
          </button>
          <button
            onClick={handleAISearch}
            disabled={isAISearching}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 flex items-center gap-2"
          >
            <FaRobot className="text-lg" />
            {isAISearching ? "Đang tìm..." : "Tìm kiếm ứng viên phù hợp với AI"}
          </button>
        </div>

        {/* Location Filter */}
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả địa điểm</option>
            {countryOptions.map((country) => (
              <option key={country.value} value={country.label}>
                {country.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Kết quả tìm kiếm</h3>
          {filteredSearchResults.length > 0 && (
            <span className="text-sm text-gray-500">
              Tìm thấy {filteredSearchResults.length} freelancer
            </span>
          )}
        </div>
        {isLoading || isAISearching ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredSearchResults.length > 0 ? (
          <>
            <div className="grid gap-4">
              {filteredSearchResults.map((freelancer) => (
                <div
                  key={freelancer._id}
                  className="border rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => {
                    if (setSelectedFreelancer && setShowModal) {
                      setSelectedFreelancer(freelancer);
                      setShowModal(true);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-[#14a800] shadow-sm overflow-hidden flex-shrink-0">
                      {freelancer.avatar ? (
                        <img
                          src={`https://findwork-backend.onrender.com/${freelancer.avatar.replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt={freelancer.fname}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            const fallbackIcon = e.target.parentElement.querySelector('.fallback-icon');
                            if(fallbackIcon) fallbackIcon.style.display = 'block';
                          }}
                        />
                      ) : (
                         <div className="w-full h-full bg-gray-200 flex items-center justify-center fallback-icon">
                             <FaUser className="w-12 h-12 text-gray-300" />
                         </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{freelancer.fname || 'Chưa có tên'}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                             <span className="flex items-center gap-1">
                               <FaMapMarkerAlt className="text-gray-400" />
                               {freelancer.location || 'Chưa có địa chỉ'}
                             </span>
                             <span>•</span>
                             <span className="flex items-center gap-1">
                               <FaCheckCircle className="text-green-500" />
                               {freelancer.project_done || 0} dự án hoàn thành
                             </span>
                           </div>
                        </div>
                        <button
                          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4 flex-shrink-0"
                          onClick={(e) => { e.stopPropagation(); toast.info("Chức năng đang được phát triển");}}
                        >
                          <FaEnvelope className="inline-block mr-2" />
                          Nhắn tin
                        </button>
                      </div>

                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                        {freelancer.bio || 'Chưa có mô tả'}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {(freelancer.skills || []).slice(0, 5).map((skill, index) => (
                           <span
                             key={index}
                             className="px-3 py-1 bg-green-100 text-gray-600 rounded-full text-sm"
                           >
                             {skill}
                           </span>
                         ))}
                       {(freelancer.skills || []).length > 5 && (
                           <span className="text-xs text-gray-500">
                             +{(freelancer.skills || []).length - 5} skill khác
                           </span>
                         )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                {renderPagination()}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center py-4">
            {isLoading || isAISearching ? "Đang tải..." : "Chưa có kết quả tìm kiếm phù hợp với bộ lọc"}
          </p>  
        )}
      </div>
    </div>
  );
};

export default InviteFreelancer; 