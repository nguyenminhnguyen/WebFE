import React, { useState } from 'react';
import ProjectDetailModal from './ProjectDetailModal';
import projects from '../../data/ProjectsData';

export default function ProjectsList() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [activeSkills, setActiveSkills] = useState([]);
  const [budgetFilter, setBudgetFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedProject(null), 500);
  };

  const toggleSkill = (skill) => {
    setActiveSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setActiveSkills([]);
    setBudgetFilter('');
    setDurationFilter('');
    setSortOption('');
  };

  const sortProjects = (list) => {
    const sorted = [...list];
    if (sortOption === 'recent') {
      return sorted.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    }
    if (sortOption === 'budget-desc') {
      return sorted.sort((a, b) => {
        const budgetA = parseInt(a.budget.replace(/\D/g, ''));
        const budgetB = parseInt(b.budget.replace(/\D/g, ''));
        return budgetB - budgetA;
      });
    }
    return sorted;
  };

  const filteredProjects = sortProjects(
    projects.filter((project) => {
      const matchSkills =
        activeSkills.length === 0 ||
        activeSkills.every((skill) => project.skills.includes(skill));
      const matchBudget =
        !budgetFilter || project.budget.includes(budgetFilter);
      const matchDuration =
        !durationFilter || project.duration.includes(durationFilter);

      return matchSkills && matchBudget && matchDuration;
    })
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Việc làm có thể bạn sẽ quan tâm
      </h1>

      {/* 🔽 FILTER + SORT */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <select
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Ngân sách (tất cả)</option>
          <option value="$100">$100 - $200</option>
          <option value="$300">$300 - $500</option>
          <option value="$800">$800 - $1200</option>
        </select>

        <select
          value={durationFilter}
          onChange={(e) => setDurationFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Thời gian (tất cả)</option>
          <option value="1 tuần">1 tuần</option>
          <option value="2 tuần">2 tuần</option>
          <option value="4 tuần">4 tuần</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Sắp xếp</option>
          <option value="recent">Gần đây nhất</option>
          <option value="budget-desc">Ngân sách cao nhất</option>
        </select>

        <button
          onClick={clearFilters}
          className="ml-auto text-sm text-red-500 hover:underline"
        >
          Xoá bộ lọc
        </button>
      </div>

      {/* 🟩 DANH SÁCH VIỆC */}
      <div className="space-y-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => openModal(project)}
            className="cursor-pointer p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-green-600">
                {project.title}
              </h2>
              <span className="text-sm text-gray-400">{project.postedAt}</span>
            </div>
            <p className="text-gray-700 mt-2">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Ngân sách: {project.budget}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Thời gian: {project.duration}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSkill(skill);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                    activeSkills.includes(skill)
                      ? 'bg-green-600 text-white'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
}
