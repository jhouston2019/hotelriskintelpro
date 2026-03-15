import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import IntakeWizard from "../components/IntakeWizard";

export default function IntakePage() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleComplete = async (formData) => {
    setIsAnalyzing(true);
    
    try {
      // Save complete intake data
      localStorage.setItem("hotelRiskAnalysis", JSON.stringify(formData));
      
      // TODO: When backend is ready, trigger analysis and get analysisId
      // const response = await fetch('/api/analysis/run', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // const { analysisId } = await response.json()
      // router.push(`/report/${analysisId}`)
      
      // For now, redirect to report page with localStorage data
      router.push("/report");
      
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-hrip-navy mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing Your Insurance Coverage
          </h2>
          <p className="text-gray-600">
            Evaluating property coverage, business interruption, liability, and risk factors...
          </p>
        </div>
      </div>
    );
  }

  return <IntakeWizard onComplete={handleComplete} />;
}
