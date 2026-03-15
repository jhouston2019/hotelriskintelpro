/**
 * Analysis entry page
 * Redirects to first step of intake wizard
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AnalyzePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/intake');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hrip-navy mx-auto mb-4"></div>
        <p className="text-gray-600">Starting your analysis...</p>
      </div>
    </div>
  );
}
