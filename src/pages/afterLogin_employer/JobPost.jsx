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
    skills: [],
    timeEstimation: "",
    experienceLevel: "",
    minSalary: "",
    maxSalary: "",
    description: "",
    location: "",
  });

  const isStepCompleted = () => {
    const {
      title,
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
        return title !== "";
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
      returnUrl: `${window.location.origin}/payment/return`,
      cancelUrl: `${window.location.origin}/payment/return?cancel=true`
    };
    
    const token = localStorage.getItem("token");
    
    try {
      const response = await fetch("http://localhost:3000/api/jobpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log("Response from server:", result);
      
      if (response.ok && result.data?.paymentUrl) {
        // Lưu jobId vào localStorage
        if (result.data.job?._id) {
          localStorage.setItem("pendingJobId", result.data.job._id);
        }

        // Chuyển hướng trực tiếp đến PayPal
        const paypalUrl = new URL(result.data.paymentUrl);
        window.location.replace(paypalUrl.toString());
      } else {
        throw new Error(result.message || "Failed to create job post");
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Có lỗi xảy ra khi tạo job: " + error.message);
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
