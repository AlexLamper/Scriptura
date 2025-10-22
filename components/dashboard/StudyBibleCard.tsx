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
      <Card className="h-full shadow-sm border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200 rounded-none">
      <CardContent className="h-full px-4 py-4 sm:px-6 sm:py-6 flex flex-col">
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-900 mb-1 leading-tight">
              {t("study_self_title")}
            </h3>
            <p className="text-gray-600 max-w-xl">
              {t("study_self_description")}
            </p>
          </div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563eb] hover:bg-[#1e40af] text-white font-semibold shadow-md rounded-md select-none"
            aria-hidden
          >
            {t("start_study")}
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-none border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-3">
            <div className="p-4 flex flex-col items-center justify-center">
              <div className="text-sm text-gray-500">{t("studies_completed")}</div>
              <div className="text-3xl font-extrabold text-gray-900 mt-2">7</div>
              <div className="w-20 h-1 bg-[#2563eb]/20 rounded-full mt-3">
                <div className="h-1 bg-[#2563eb] rounded-full w-3/4" />
              </div>
            </div>
            <div className="p-4 flex flex-col items-center justify-center">
              <div className="text-sm text-gray-500">{t("notes_made")}</div>
              <div className="text-3xl font-extrabold text-gray-900 mt-2">23</div>
              <div className="w-20 h-1 bg-[#10b981]/20 rounded-full mt-3">
                <div className="h-1 bg-[#10b981] rounded-full w-2/3" />
              </div>
            </div>
            <div className="p-4 flex flex-col justify-center">
              <div className="text-sm font-medium text-gray-900">{t("last_active")}</div>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-600">{t("last_activity_example")}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      </Card>
    </Link>
  );
}
