"use client";

import { Suspense } from "react";
import OnboardingFlow from "../../../components/onboarding/OnboardingFlow";
import SessionProvider from "../../../components/SessionProvider";

export default function OnboardingPage() {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        }>
          <OnboardingFlow />
        </Suspense>
      </div>
    </SessionProvider>
  );
}
