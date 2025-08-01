import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useOnboardingCheck() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (status === "loading") return;
      
      if (!session?.user) {
        setIsCheckingOnboarding(false);
        return;
      }

      try {
        const response = await fetch("/api/user/preferences");
        const data = await response.json();
        
        const completed = data.onboardingCompleted || false;
        setNeedsOnboarding(!completed);
        
        // If user needs onboarding and is not already on onboarding page
        if (!completed && !window.location.pathname.includes("/onboarding")) {
          router.push("/onboarding");
        }
        
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        // On error, assume onboarding is needed
        setNeedsOnboarding(true);
      } finally {
        setIsCheckingOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, [session, status, router]);

  return {
    isCheckingOnboarding,
    needsOnboarding,
    isAuthenticated: !!session?.user
  };
}
