import { useState } from "react";
import { useRouter } from "next/router";
import IntakeWizard from "../components/IntakeWizard";

export default function IntakePage() {
  const router = useRouter();

  const handleComplete = (formData) => {
    localStorage.setItem("hotelRiskAnalysis", JSON.stringify(formData));
    router.push("/report");
  };

  return <IntakeWizard onComplete={handleComplete} />;
}
