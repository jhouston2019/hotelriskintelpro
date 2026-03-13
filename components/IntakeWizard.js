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

  const handleNext = (stepData) => {
    const stepKey = Object.keys(formData)[currentStep - 1];
    setFormData((prev) => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...stepData },
    }));
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete?.(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSave = () => {
    localStorage.setItem("hotelRiskIntake", JSON.stringify(formData));
    alert("Progress saved! You can return anytime to continue.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-hrip-navy via-hrip-charcoal to-black">
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Insurance Survivability Analysis
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Step {currentStep} of {steps.length}
              </p>
            </div>
            <button
              onClick={handleSave}
              className="text-xs text-slate-400 hover:text-hrip-gold transition-colors"
            >
              Save Progress
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="relative">
            <div className="h-2 w-full rounded-full bg-slate-800">
              <div
                className="h-2 rounded-full bg-hrip-gold transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-[10px] ${
                    step.id === currentStep
                      ? "text-hrip-gold font-medium"
                      : step.id < currentStep
                      ? "text-slate-400"
                      : "text-slate-600"
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        </div>

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
