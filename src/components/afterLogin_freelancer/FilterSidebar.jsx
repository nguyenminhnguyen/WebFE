import React from "react";

const FilterSidebar = ({
  filters,
  filterOptions,
  handleFilterChange,
  clearFilters,
}) => {
  return (
    <div className="w-full lg:w-72 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Bộ lọc</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Xoá bộ lọc
        </button>
      </div>
      <div className="space-y-6">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa điểm làm việc
          </label>
          <select
            value={filters.location}
            onChange={handleFilterChange}
            name="location"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14a800] focus:border-transparent"
          >
            <option value="">Tất cả địa điểm</option>
            {filterOptions.locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cấp độ kinh nghiệm
          </label>
          <select
            value={filters.experienceLevel}
            onChange={handleFilterChange}
            name="experienceLevel"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14a800] focus:border-transparent"
          >
            <option value="">Tất cả cấp độ</option>
            {filterOptions.experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Project Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại dự án
          </label>
          <select
            value={filters.duration}
            onChange={handleFilterChange}
            name="duration"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14a800] focus:border-transparent"
          >
            <option value="">Tất cả loại dự án</option>
            {filterOptions.durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sắp xếp theo
          </label>
          <select
            value={filters.sort}
            onChange={handleFilterChange}
            name="sort"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14a800] focus:border-transparent"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="salary-desc">Ngân sách cao nhất</option>
            <option value="salary-asc">Ngân sách thấp nhất</option>
            <option value="applications-desc">Nhiều ứng viên nhất</option>
            <option value="applications-asc">Ít ứng viên nhất</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
