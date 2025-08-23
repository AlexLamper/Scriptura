"use client";
import { useSession } from "next-auth/react";
import { useTranslation } from "../../app/i18n/client";
import { useEffect, useState } from "react";

interface WelcomeCardProps {
  lng: string;
}

export function WelcomeCard({ lng }: WelcomeCardProps) {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] || "Student";
  const { t } = useTranslation(lng, "welcome");
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const getTimeBasedGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        return "good_morning";
      } else if (hour >= 12 && hour < 18) {
        return "good_afternoon";
      } else if (hour >= 18 && hour < 22) {
        return "good_evening";
      } else {
        return "good_night";
      }
    };
    setGreeting(getTimeBasedGreeting());
  }, []);

  return (
    <div className="mb-6 p-6 rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">
        {t(greeting)}, {userName}!
      </h2>
      <p className="text-gray-600">
        {t("study_card_description", {
          defaultValue: "Ready to dive deeper? Go to the Study page to read, take notes, and highlight your favorite Bible passages!"
        })}
      </p>
    </div>
  );
}
