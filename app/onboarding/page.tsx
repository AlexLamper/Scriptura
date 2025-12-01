"use client";

import { Suspense } from "react";
import OnboardingFlow from "../../components/onboarding/OnboardingFlow";
import SessionProvider from "../../components/providers/SessionProvider";
import { LoadingSpinner } from "../../components/ui/loading-spinner";

export default function OnboardingPage() {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<LoadingSpinner fullHeight />}>
          <OnboardingFlow />
        </Suspense>
      </div>
    </SessionProvider>
  );
}
