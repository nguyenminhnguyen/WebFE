import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobStep from "../../components/layout/JobPost/JobStep";
import StepNavigation from "../../components/layout/JobPost/StepNavigation";
import AnimatedPage from "../../components/animation/animated_pages";
function JobPostForm() {
  const navigate = useNavigate();
  const totalSteps = 6;
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    skills: [],
    timeEstimation: "",
    experienceLevel: "",
    salary: "",
    description: "",
    location: "",
  });

  const isStepCompleted = () => {
    const {
      title,
      skills,
      timeEstimation,
      experienceLevel,
      salary,
      description,
      location,
    } = formData;
    switch (currentStep) {
      case 1:
        return title !== "";
      case 2:
        return skills.length > 0;
      case 3:
        return timeEstimation !== "" && experienceLevel !== "";
      case 4:
        return true; // Không bắt buộc
      case 5:
        return salary !== "";
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
    // Dữ liệu không bao gồm kỹ năng
    const dataToSend = {
      title: formData.title,
      description: formData.description,
      salary: formData.salary,
      time: formData.timeEstimation,
      experienceLevel: formData.experienceLevel,
      location: formData.location,
    };
    alert(JSON.stringify(formData, null, 2));
    try {
      const response = await fetch("https://your-api-endpoint.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log("Dữ liệu gửi thành công:", result);
    } catch (error) {
      console.error("Lỗi kết nối đến backend:", error);
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
            isNextDisabled={!isStepCompleted()}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </AnimatedPage>
  );
}

export default JobPostForm;
