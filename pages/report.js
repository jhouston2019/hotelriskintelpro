import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SurvivabilityReportV2 from "../components/SurvivabilityReportV2";

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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-hrip-navy border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">Loading your report...</p>
        </div>
      </div>
    );
  }

  return <SurvivabilityReportV2 data={reportData} />;
}
