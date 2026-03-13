import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SurvivabilityReport from "../components/SurvivabilityReport";

export default function ReportPage() {
  const [reportData, setReportData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("hotelRiskAnalysis");
    if (stored) {
      setReportData(JSON.parse(stored));
    } else {
      router.push("/intake");
    }
  }, [router]);

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-hrip-navy via-hrip-charcoal to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-hrip-gold border-r-transparent"></div>
          <p className="mt-4 text-sm text-slate-400">Loading your report...</p>
        </div>
      </div>
    );
  }

  return <SurvivabilityReport data={reportData} />;
}
