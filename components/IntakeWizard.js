import { useState } from "react";
import BasicHotelProfile from "./intake/BasicHotelProfile";
import FinancialExposure from "./intake/FinancialExposure";
import InsurancePolicyInput from "./intake/InsurancePolicyInput";
import LossHistory from "./intake/LossHistory";
import OperationalRisk from "./intake/OperationalRisk";
import LocationHazard from "./intake/LocationHazard";
import ReviewAnalyze from "./intake/ReviewAnalyze";

const steps = [
  { id: 1, title: "Hotel Profile", component: BasicHotelProfile },
  { id: 2, title: "Financial Exposure", component: FinancialExposure },
  { id: 3, title: "Insurance Coverage", component: InsurancePolicyInput },
  { id: 4, title: "Loss History", component: LossHistory },
  { id: 5, title: "Operational Risk", component: OperationalRisk },
  { id: 6, title: "Location & Hazards", component: LocationHazard },
  { id: 7, title: "Review & Analyze", component: ReviewAnalyze },
];

export default function IntakeWizard({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    hotelProfile: {},
    financialExposure: {},
    insurancePolicy: {},
    lossHistory: { claims: [] },
    operationalRisk: {},
    locationHazard: {},
  });

  const CurrentStepComponent = steps.find((s) => s.id === currentStep)?.component;

  const handleNext = async (stepData) => {
    const stepKey = Object.keys(formData)[currentStep - 1];
    const updatedData = {
      ...formData,
      [stepKey]: { ...formData[stepKey], ...stepData },
    };
    
    setFormData(updatedData);
    
    // Auto-save to localStorage
    localStorage.setItem("hotelRiskIntake", JSON.stringify(updatedData));
    
    // TODO: Auto-save to backend when API is available
    // await saveDraftSection(sessionId, stepKey, stepData)
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete?.(updatedData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSave = async () => {
    // Save to localStorage
    localStorage.setItem("hotelRiskIntake", JSON.stringify(formData));
    
    // TODO: Save to backend when API is available
    // await fetch('/api/draft/save', {
    //   method: 'POST',
    //   body: JSON.stringify(formData)
    // })
    
    alert("Progress saved! You can return anytime to continue.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Insurance Survivability Analysis
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
              </p>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Progress
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-hrip-navy to-hrip-blue transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="mt-4 flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-xs font-medium ${
                    step.id === currentStep
                      ? "text-hrip-navy"
                      : step.id < currentStep
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Current step content */}
        {CurrentStepComponent && (
          <CurrentStepComponent
            data={formData[Object.keys(formData)[currentStep - 1]]}
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === steps.length}
          />
        )}
      </div>
    </div>
  );
}
