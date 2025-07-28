"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { useSession } from "next-auth/react";
import { useTranslation } from "../../app/i18n/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <Card className="lg:col-span-2 p-6 bg-white shadow-sm rounded-lg">
      <CardHeader className="p-0 pb-6">
        <CardTitle className="text-3xl font-bold text-gray-800">
          {t(greeting)}, {userName}!
        </CardTitle>
        <CardDescription className="text-gray-600 text-base">
          {t("study_card_description", {
            defaultValue: "Ready to dive deeper? Go to the Study page to read, take notes, and highlight your favorite Bible passages!"
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Link href={`/study`} className="block group" tabIndex={0} aria-label={t("study_invite_title", { defaultValue: "Study the Bible Yourself" })}>
          <div className="flex flex-col sm:flex-row items-center justify-between sm:h-36 w-full bg-gray-100 rounded-xl px-4 sm:px-8 py-4 sm:py-0 border border-transparent hover:border-indigo-300 focus:border-indigo-400 cursor-pointer transition group outline-none gap-4 sm:gap-0">
            <div className="flex flex-col justify-center h-full w-full sm:w-auto">
              <div className="font-bold text-gray-800 text-xl sm:text-2xl mb-2 flex items-center gap-2 sm:gap-3">
                {t("study_invite_title", { defaultValue: "Study the Bible Yourself" })}
                <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-500 opacity-80 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
              <div className="text-gray-600 text-base sm:text-lg max-w-full sm:max-w-md">
                {t("study_invite_desc", { defaultValue: "Open the Study page to read, take notes, and highlight verses that inspire you." })}
              </div>
            </div>
            {/* Beautiful SVG only on sm and up */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-4 sm:mt-0 w-20 h-20 hidden sm:block">
              <rect x="10" y="18" width="60" height="44" rx="7" fill="#E0E7FF" />
              <rect x="20" y="30" width="40" height="8" rx="4" fill="#6366F1" />
              <rect x="20" y="46" width="28" height="8" rx="4" fill="#A5B4FC" />
              <rect x="20" y="62" width="18" height="8" rx="4" fill="#C7D2FE" />
            </svg>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
