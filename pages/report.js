import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SurvivabilityReportV2 from "../components/SurvivabilityReportV2";
import AuthModal from "../components/auth/AuthModal";
import SubscriptionPrompt from "../components/billing/SubscriptionPrompt";

export default function ReportPage() {
  const [reportData, setReportData] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [user, setUser] = useState(null);
  const [hasSubscription, setHasSubscription] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("hotelRiskAnalysis");
    if (stored) {
      setReportData(JSON.parse(stored));
      
      // TODO: When backend is ready, fetch actual analysis
      // const { analysisId } = router.query
      // if (analysisId) {
      //   fetchAnalysis(analysisId)
      // }
    } else {
      router.push("/intake");
    }
    
    // Check user session
    // const sessionUser = checkUserSession()
    // setUser(sessionUser)
    
    // Check subscription status
    // const subStatus = await checkSubscription()
    // setHasSubscription(subStatus)
  }, [router]);

  const handleExportPDF = () => {
    if (!user) {
      setCurrentFeature('pdf_export');
      setShowAuthModal(true);
      return;
    }
    
    if (!hasSubscription) {
      setCurrentFeature('pdf_export');
      setShowSubscriptionPrompt(true);
      return;
    }
    
    // TODO: Generate PDF
    // window.location.href = `/api/pdf/export?analysisId=${analysisId}`
    alert('PDF export will be available when backend is connected');
  };

  const handleSaveHotel = () => {
    if (!user) {
      setCurrentFeature('save_hotel');
      setShowAuthModal(true);
      return;
    }
    
    // TODO: Save to backend
    alert('Hotel saved successfully');
  };

  const handleEnableMonitoring = () => {
    if (!user) {
      setCurrentFeature('monitoring');
      setShowAuthModal(true);
      return;
    }
    
    if (!hasSubscription) {
      setCurrentFeature('monitoring');
      setShowSubscriptionPrompt(true);
      return;
    }
    
    router.push('/dashboard');
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setShowAuthModal(false);
    
    // If feature requires subscription, show subscription prompt
    if (currentFeature === 'pdf_export' || currentFeature === 'monitoring') {
      setShowSubscriptionPrompt(true);
    }
  };

  const handleSubscribe = async () => {
    // TODO: Create Stripe checkout session
    // const response = await fetch('/api/billing/create-checkout', {
    //   method: 'POST',
    //   body: JSON.stringify({ hotelId, planType: 'monthly' })
    // })
    // const { url } = await response.json()
    // window.location.href = url
    
    alert('Stripe checkout will be available when backend is connected');
  };

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

  return (
    <>
      <SurvivabilityReportV2 
        data={reportData}
        onExportPDF={handleExportPDF}
        onSaveHotel={handleSaveHotel}
        onEnableMonitoring={handleEnableMonitoring}
      />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        mode="signup"
      />
      
      <SubscriptionPrompt
        isOpen={showSubscriptionPrompt}
        onClose={() => setShowSubscriptionPrompt(false)}
        onSubscribe={handleSubscribe}
        feature={currentFeature}
      />
    </>
  );
}
