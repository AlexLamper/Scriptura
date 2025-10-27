/*
"use client";

import { Card, CardContent } from "../ui/card";
// Button intentionally not used here because the whole card is clickable
import { ChevronRight, Clock } from "lucide-react";
import { useTranslation } from "../../app/i18n/client";
import Link from "next/link";

interface StudyBibleCardProps {
  lng: string;
}

export function StudyBibleCard({ lng }: StudyBibleCardProps) {
  const { t } = useTranslation(lng, "study");

  return (
    <Link href={`/${lng}/study`} className="block" aria-label={t("start_study")}>
      <Card className="h-full shadow-lg border rounded-none dark:shadow-gray-900/20 border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-shadow duration-200 bg-white dark:bg-[#23263a]">
      <CardContent className="h-full px-6 py-6 sm:px-8 sm:py-8 flex flex-col">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex-1">
            <h3 className="font-['Merriweather'] text-2xl lg:text-3xl font-bold text-[#262626] dark:text-white mb-3 leading-tight">
              {t("study_self_title")}
            </h3>
            <p className="font-['Inter'] text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              {t("study_self_description")}
            </p>
          </div>
          <div
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#798777] hover:bg-[#6a7a68] text-white font-['Inter'] font-medium shadow-lg transition-colors duration-200 select-none"
            aria-hidden
          >
            {t("start_study")}
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#181b23] border border-gray-200 dark:border-gray-600 overflow-hidden">
          <div className="grid grid-cols-3">
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="font-['Inter'] text-sm text-gray-500 dark:text-gray-400">{t("studies_completed")}</div>
              <div className="font-['Merriweather'] text-3xl font-bold text-[#262626] dark:text-white mt-2">7</div>
              <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600 mt-3">
                <div className="h-1 bg-[#798777] w-3/4" />
              </div>
            </div>
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="font-['Inter'] text-sm text-gray-500 dark:text-gray-400">{t("notes_made")}</div>
              <div className="font-['Merriweather'] text-3xl font-bold text-[#262626] dark:text-white mt-2">23</div>
              <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600 mt-3">
                <div className="h-1 bg-[#798777] w-2/3" />
              </div>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="font-['Inter'] text-sm font-medium text-[#262626] dark:text-white">{t("last_active")}</div>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-300">{t("last_activity_example")}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      </Card>
    </Link>
  );
}
*/

// Dashboard component commented out - Study page is now the default
export function StudyBibleCard() {
  return null;
}
