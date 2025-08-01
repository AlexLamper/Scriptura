'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Eye, Brain, Heart, ChevronDown, ChevronRight, Lightbulb, Users } from 'lucide-react';

interface InductiveStudyProps {
  book: string;
  chapter: number;
  version: string;
  t: (key: string) => string;
}

interface StudyProgress {
  observation: string;
  interpretation: string;
  application: string;
  completed: boolean;
}

export default function InductiveStudy({ book, chapter, version, t }: InductiveStudyProps) {
  const [currentStep, setCurrentStep] = useState<'observe' | 'interpret' | 'apply'>('observe');
  const [progress, setProgress] = useState<StudyProgress>({
    observation: '',
    interpretation: '',
    application: '',
    completed: false
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    observe: true,
    interpret: false,
    apply: false
  });

  // Laad opgeslagen voortgang
  useEffect(() => {
    const key = `inductive-study-${book}-${chapter}-${version}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading study progress:', error);
      }
    }
  }, [book, chapter, version]);

  // Sla voortgang op
  const saveProgress = (newProgress: StudyProgress) => {
    setProgress(newProgress);
    const key = `inductive-study-${book}-${chapter}-${version}`;
    localStorage.setItem(key, JSON.stringify(newProgress));
  };

  const updateStep = (step: keyof StudyProgress, value: string) => {
    const newProgress = { ...progress, [step]: value };
    saveProgress(newProgress);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const goToNextStep = () => {
    if (currentStep === 'observe') {
      setCurrentStep('interpret');
      setExpandedSections(prev => ({ ...prev, observe: false, interpret: true }));
    } else if (currentStep === 'interpret') {
      setCurrentStep('apply');
      setExpandedSections(prev => ({ ...prev, interpret: false, apply: true }));
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === 'apply') {
      setCurrentStep('interpret');
      setExpandedSections(prev => ({ ...prev, apply: false, interpret: true }));
    } else if (currentStep === 'interpret') {
      setCurrentStep('observe');
      setExpandedSections(prev => ({ ...prev, interpret: false, observe: true }));
    }
  };

  const completeStudy = () => {
    const newProgress = { ...progress, completed: true };
    saveProgress(newProgress);
  };

  const getStepProgress = () => {
    let completed = 0;
    if (progress.observation.length > 20) completed++;
    if (progress.interpretation.length > 20) completed++;
    if (progress.application.length > 20) completed++;
    return { completed, total: 3 };
  };

  const stepProgress = getStepProgress();

  // Voorbeeld vragen per stap
  const observationQuestions = [
    t('inductive.observe.q1'), // "Wie zijn de hoofdpersonen in dit hoofdstuk?"
    t('inductive.observe.q2'), // "Wat gebeurt er precies?"
    t('inductive.observe.q3'), // "Waar en wanneer vindt dit plaats?"
    t('inductive.observe.q4'), // "Welke woorden worden herhaald?"
    t('inductive.observe.q5'), // "Wat valt je op aan de structuur?"
  ];

  const interpretationQuestions = [
    t('inductive.interpret.q1'), // "Waarom gebeurde dit?"
    t('inductive.interpret.q2'), // "Wat wilde de auteur communiceren?"
    t('inductive.interpret.q3'), // "Hoe past dit in de context van het hele boek?"
    t('inductive.interpret.q4'), // "Wat leert dit over God's karakter?"
    t('inductive.interpret.q5'), // "Welke lessen zijn er voor die tijd?"
  ];

  const applicationQuestions = [
    t('inductive.apply.q1'), // "Hoe kan ik dit toepassen in mijn leven?"
    t('inductive.apply.q2'), // "Welke veranderingen moet ik maken?"
    t('inductive.apply.q3'), // "Hoe helpt dit me God beter te kennen?"
    t('inductive.apply.q4'), // "Wat ga ik deze week anders doen?"
    t('inductive.apply.q5'), // "Voor wie kan ik bidden op basis van deze tekst?"
  ];

  return (
    <div className="space-y-6">
      {/* Voortgang Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{t('inductive.title')}</h3>
          <Badge variant={progress.completed ? "default" : "secondary"}>
            {stepProgress.completed}/3 {t('inductive.steps_completed')}
          </Badge>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>{t('inductive.subtitle')}</p>
        </div>

        {/* Voortgangsbalk */}
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(stepProgress.completed / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Stap 1: Observatie */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={() => toggleSection('observe')}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <span>1. {t('inductive.observe.title')}</span>
              {progress.observation.length > 20 && (
                <Badge variant="outline" className="text-xs">✓</Badge>
              )}
            </div>
            {expandedSections.observe ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.observe && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('inductive.observe.description')}
            </p>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('inductive.observe.guide_questions')}</label>
              <div className="grid gap-2">
                {observationQuestions.map((question, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{question}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('inductive.observe.your_observations')}</label>
              <Textarea
                placeholder={t('inductive.observe.placeholder')}
                value={progress.observation}
                onChange={(e) => updateStep('observation', e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            {progress.observation.length > 20 && (
              <Button onClick={goToNextStep} className="w-full">
                {t('inductive.next_step')} →
              </Button>
            )}
          </CardContent>
        )}
      </Card>

      {/* Stap 2: Interpretatie */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={() => toggleSection('interpret')}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-600" />
              <span>2. {t('inductive.interpret.title')}</span>
              {progress.interpretation.length > 20 && (
                <Badge variant="outline" className="text-xs">✓</Badge>
              )}
            </div>
            {expandedSections.interpret ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.interpret && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('inductive.interpret.description')}
            </p>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('inductive.interpret.guide_questions')}</label>
              <div className="grid gap-2">
                {interpretationQuestions.map((question, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <Brain className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{question}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('inductive.interpret.your_interpretation')}</label>
              <Textarea
                placeholder={t('inductive.interpret.placeholder')}
                value={progress.interpretation}
                onChange={(e) => updateStep('interpretation', e.target.value)}
                className="min-h-[120px]"
                disabled={progress.observation.length < 20}
              />
              {progress.observation.length < 20 && (
                <p className="text-xs text-muted-foreground">
                  {t('inductive.complete_observation_first')}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={goToPreviousStep}>
                ← {t('inductive.previous_step')}
              </Button>
              {progress.interpretation.length > 20 && (
                <Button onClick={goToNextStep} className="flex-1">
                  {t('inductive.next_step')} →
                </Button>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Stap 3: Toepassing */}
      <Card>
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={() => toggleSection('apply')}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600" />
              <span>3. {t('inductive.apply.title')}</span>
              {progress.application.length > 20 && (
                <Badge variant="outline" className="text-xs">✓</Badge>
              )}
            </div>
            {expandedSections.apply ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.apply && (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('inductive.apply.description')}
            </p>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('inductive.apply.guide_questions')}</label>
              <div className="grid gap-2">
                {applicationQuestions.map((question, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <Heart className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>{question}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('inductive.apply.your_application')}</label>
              <Textarea
                placeholder={t('inductive.apply.placeholder')}
                value={progress.application}
                onChange={(e) => updateStep('application', e.target.value)}
                className="min-h-[120px]"
                disabled={progress.interpretation.length < 20}
              />
              {progress.interpretation.length < 20 && (
                <p className="text-xs text-muted-foreground">
                  {t('inductive.complete_interpretation_first')}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={goToPreviousStep}>
                ← {t('inductive.previous_step')}
              </Button>
              {progress.application.length > 20 && !progress.completed && (
                <Button onClick={completeStudy} className="flex-1">
                  {t('inductive.complete_study')} ✓
                </Button>
              )}
            </div>

            {progress.completed && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{t('inductive.study_completed')}</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  {t('inductive.study_completed_message')}
                </p>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
