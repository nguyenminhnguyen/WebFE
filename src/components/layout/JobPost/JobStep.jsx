import React, { useState } from "react";
import JobStep1 from "./JobStep/JobStep1";
import JobStep2 from "./JobStep/JobStep2";
import JobStep3 from "./JobStep/JobStep3";
import JobStep4 from "./JobStep/JobStep4";
import JobStep5 from "./JobStep/JobStep5";
import JobStep6 from "./JobStep/JobStep6";
import AnimatedPage from "../../animation/animated_pages";
const JobStep = ({ currentStep, formData, handleInputChange, setFormData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    setFormData({ ...formData, location: selected });
  };
  return (
    <AnimatedPage>
      <div className="absolute w-full h-[90%] flex">
        {currentStep === 1 && (
          <JobStep1 formData={formData} handleInputChange={handleInputChange} />
        )}

        {currentStep === 2 && (
          <JobStep2 formData={formData} setFormData={setFormData} />
        )}

        {currentStep === 3 && (
          <JobStep3 formData={formData} handleInputChange={handleInputChange} /> // Use JobStep3
        )}

        {currentStep === 4 && (
          <JobStep4
            selectedOption={formData.location}
            handleSelectChange={handleSelectChange} // Gửi handleSelectChange từ JobStep
          />
        )}

        {currentStep === 5 && (
          <JobStep5
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
          />
        )}

        {currentStep === 6 && (
          <JobStep6
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
          />
        )}
      </div>
    </AnimatedPage>
  );
};

export default JobStep;
