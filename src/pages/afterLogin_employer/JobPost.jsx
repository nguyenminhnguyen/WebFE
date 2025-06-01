import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobStep from "../../components/layout/JobPost/JobStep";
import StepNavigation from "../../components/layout/JobPost/StepNavigation";
import AnimatedPage from "../../components/animation/animated_pages";

function JobPostForm() {
  const navigate = useNavigate();
  const totalSteps = 6;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: undefined,
    skills: [],
    timeEstimation: "",
    experienceLevel: "",
    minSalary: "",
    maxSalary: "",
    description: "",
    location: "",
  });
  const [error, setError] = useState("");

  const isStepCompleted = () => {
    const {
      title,
      category,
      skills,
      timeEstimation,
      experienceLevel,
      minSalary,
      maxSalary,
      description,
      location,
    } = formData;
    switch (currentStep) {
      case 1:
        return title !== "" && category !== undefined;
      case 2:
        return skills.length > 0;
      case 3:
        return timeEstimation !== "" && experienceLevel !== "";
      case 4:
        return true; // Không bắt buộc
      case 5:
        return minSalary !== "" && maxSalary !== "";
      case 6:
        return description !== "";
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepCompleted()) {
      if (currentStep === totalSteps) {
        handleSubmit(); // Gọi submit khi là bước cuối
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/employer/dashboard");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const dataToSend = {
      title: formData.title,
      description: formData.description,
      minSalary: Number(formData.minSalary),
      maxSalary: Number(formData.maxSalary),
      timeEstimation: formData.timeEstimation,
      experienceLevel: formData.experienceLevel,
      location: formData.location?.label,
      skills: formData.skills,
      category: formData.categoryName
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/api/jobpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from server:", result);

      navigate("/employer/dashboard");
    } catch (error) {
      console.error("Lỗi chi tiết:", error);
      if (error.message === "Failed to fetch") {
        setError("Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối mạng hoặc liên hệ quản trị viên.");
      } else {
        setError(error.message || "Có lỗi xảy ra khi tạo job");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col justify-between h-screen">
        {/* FORM */}
        <div className="flex-grow flex justify-center items-center">
          <div className="relative w-[70%] h-[90%] p-6 rounded-lg bg-white">
            <p className="text-sm text-gray-500 mb-4">
              {currentStep} / {totalSteps}{" "}
              <span className="ml-2 text-black">Đăng việc</span>
            </p>

            {/* Hiển thị từng bước */}
            <JobStep
              currentStep={currentStep}
              formData={formData}
              handleInputChange={handleInputChange}
              setFormData={setFormData}
            />
          </div>
        </div>

        {/* NÚT ĐIỀU HƯỚNG */}
        <div className="w-full py-4 shadow-lg sticky bottom-0">
          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            isNextDisabled={!isStepCompleted() || isSubmitting}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </AnimatedPage>
  );
}

export default JobPostForm;
