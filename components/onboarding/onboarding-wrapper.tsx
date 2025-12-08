"use client"

import { OnboardingModal } from "./onboarding-modal"

interface OnboardingWrapperProps {
  shouldShow: boolean
}

export function OnboardingWrapper({ shouldShow }: OnboardingWrapperProps) {
  if (!shouldShow) return null

  return (
    <OnboardingModal 
      isOpen={true} 
      onClose={() => {}} 
      onComplete={() => {}} 
    />
  )
}
