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
    <div className="mb-4 p-6 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-900">
          {t(greeting)}, {userName}!
        </h2>
        <p className="text-gray-600 text-right">
          {new Intl.DateTimeFormat(lng, { dateStyle: "full" }).format(new Date())}
        </p>
      </div>
    </div>
  );
}
