"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { 
  BookOpen, 
  PenTool, 
  Trophy, 
  ChevronRight, 
  ChevronLeft,
  Globe,
  Check,
  ArrowRight,
  Target,
  Heart,
  Brain,
  GraduationCap
} from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  canSkip?: boolean;
}

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

function OnboardingFlow() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  // Save language preference and complete onboarding
  const completeOnboarding = async () => {
    if (!session?.user) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          translation: "NIV", // Default translation
          intent: "study"      // Default intent
        }),
      });

      if (response.ok) {
        // Redirect to the study page
        router.push(`/study`);
      } else {
        console.error("Failed to save preferences");
        router.push(`/study`);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      router.push(`/study`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welkom bij Scriptura! 🎉",
      subtitle: "Jouw complete platform voor Bijbelstudie",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600 leading-relaxed">
              Scriptura helpt je dieper de Bijbel te bestuderen met moderne tools en een ondersteunende gemeenschap. 
              Laten we je wegwijs maken in de belangrijkste functies!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <PenTool className="w-8 h-8 text-blue-600 mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Notities & Highlights</h4>
              <p className="text-sm text-gray-600">Maak notities en highlight belangrijke verzen</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <GraduationCap className="w-8 h-8 text-purple-600 mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Cursussen & Quizzes</h4>
              <p className="text-sm text-gray-600">Leer door cursussen en test je kennis</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Kies je taal 🌍",
      subtitle: "Stel je voorkeurstaal in voor de interface",
      content: (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <Globe className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
            <p className="text-gray-600">
              Kies de taal waarin je Scriptura wilt gebruiken. Je kunt dit later altijd aanpassen.
            </p>
          </div>

          <div className="space-y-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                  selectedLanguage === lang.code
                    ? "border-indigo-500 bg-indigo-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{lang.name}</h3>
                  </div>
                  {selectedLanguage === lang.code && (
                    <Check className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "De Study Pagina 📖",
      subtitle: "Lees, highlight en maak notities",
      content: (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h4 className="font-semibold text-gray-900">Study Functionaliteit</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Lees elke Bijbelvertaling</p>
                  <p className="text-sm text-gray-600">Kies uit verschillende vertalingen zoals NBV, HSV, of engelstalige versies</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Highlight belangrijke teksten</p>
                  <p className="text-sm text-gray-600">Markeer verzen in verschillende kleuren voor verschillende thema&apos;s</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Maak persoonlijke notities</p>
                  <p className="text-sm text-gray-600">Voeg je eigen gedachten, vragen en inzichten toe aan elke tekst</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">💡 Tip: Al je notities en highlights worden automatisch opgeslagen!</p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Cursussen & Leren 🎓",
      subtitle: "Verdiep je kennis met gestructureerde cursussen",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <GraduationCap className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <p className="text-gray-600">
              Ontdek onze gestructureerde cursussen die je helpen de Bijbel beter te begrijpen.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">Interactieve Lessen</h4>
              </div>
              <p className="text-sm text-gray-600">Leer stap voor stap met video&apos;s, teksten en oefeningen</p>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900">Quizzes & Tracking</h4>
              </div>
              <p className="text-sm text-gray-600">Test je kennis en volg je voortgang</p>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900">Gemeenschap</h4>
              </div>
              <p className="text-sm text-gray-600">Verbind met andere studenten en deel inzichten</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Dashboard Overzicht 📊",
      subtitle: "Jouw persoonlijke leercentrum",
      content: (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-4 sm:p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Dashboard Features:</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Dagelijkse Bijbeltekst</p>
                  <p className="text-sm text-gray-600">Elke dag een nieuwe inspirerende tekst</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Study Streak</p>
                  <p className="text-sm text-gray-600">Houd je dagelijkse study routine bij</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PenTool className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Recente Notities</p>
                  <p className="text-sm text-gray-600">Snel toegang tot je laatste inzichten</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Voortgang Tracking</p>
                  <p className="text-sm text-gray-600">Zie hoe je groeit in je Bijbelkennis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Je bent klaar! 🚀",
      subtitle: "Begin je Bijbelstudiereis met Scriptura",
      content: (
        <div className="space-y-6 text-center">
          <div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600 leading-relaxed">
              Perfect! Je bent nu klaar om Scriptura ten volle te benutten. Begin met het verkennen van 
              het dashboard en probeer de Study pagina uit!
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Aanbevolen eerste stappen:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>1. Bekijk je dashboard voor een overzicht</p>
              <p>2. Ga naar Study om je eerste notitie te maken</p>
              <p>3. Verken de beschikbare cursussen</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const isLastStep = currentStep === totalSteps;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (isLastStep) {
      completeOnboarding();
    } else {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-white shadow-sm rounded-lg border border-gray-200">
        <CardHeader className="text-center pb-4 px-6 pt-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Scriptura</h1>
          </div>
          
          <Progress value={progress} className="w-full mb-2" />
          <p className="text-sm text-gray-500">
            Stap {currentStep} van {totalSteps}
          </p>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          {currentStepData && (
            <div className="space-y-6">
              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {currentStepData.title}
                </CardTitle>
                <p className="text-gray-600">
                  {currentStepData.subtitle}
                </p>
              </div>

              <div className="min-h-[300px]">
                {currentStepData.content}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Vorige
                </Button>

                <div className="flex items-center gap-3">
                  {currentStep < totalSteps && (
                    <Button
                      variant="ghost"
                      onClick={() => completeOnboarding()}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Overslaan
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleComplete}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isSubmitting ? (
                      "Bezig..."
                    ) : isLastStep ? (
                      <>
                        Start Dashboard
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Volgende
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default OnboardingFlow;
