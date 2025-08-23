"use client";

import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { BookOpen, ChevronRight, Clock } from "lucide-react";
import { useTranslation } from "../../app/i18n/client";
import Link from "next/link";

interface StudyBibleCardProps {
  lng: string;
}

export function StudyBibleCard({ lng }: StudyBibleCardProps) {
  const { t } = useTranslation(lng, "study");

  return (
    <Card className="h-full shadow-sm border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200">
      <CardContent className="h-full px-6 py-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#3b82f6] rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {t("study_self_title", { defaultValue: "Bestudeer de Bijbel zelf" })}
              </h3>
              <p className="text-gray-600">
                {t("study_self_description", { defaultValue: "Open de Studie-pagina om te lezen, notities te maken en verzen te markeren." })}
              </p>
            </div>
          </div>
          <Link href={`/${lng}/study`}>
            <Button
              size="sm"
              className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white font-medium px-4 py-2 shadow-sm"
            >
              {t("start_study", { defaultValue: "Start studie" })}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-2xl font-semibold text-gray-900">7</p>
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {t("studies_completed", { defaultValue: "Studies voltooid" })}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-[#3b82f6] rounded-full"></div>
                  <p className="text-2xl font-semibold text-gray-900">23</p>
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {t("notes_made", { defaultValue: "Notities gemaakt" })}
                </p>
              </div>
            </div>
            <div className="text-right bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {t("last_active", { defaultValue: "Laatst actief" })}
              </p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-600">
                  {t("last_activity_example", { defaultValue: "Genesis 3 - 2 uur geleden" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
