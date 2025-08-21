'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Eye, Brain, Heart, Save, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface InductiveStudyProps {
  book: string;
  chapter: number;
  version: string;
}

interface InductiveStudyData {
  observation: string;
  interpretation: string;
  application: string;
}

export default function InductiveStudy({
  book,
  chapter,
  version
}: InductiveStudyProps) {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [studyData, setStudyData] = useState<InductiveStudyData>({
    observation: '',
    interpretation: '',
    application: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load existing study data
  useEffect(() => {
    const loadData = async () => {
      if (!session?.user?.email) return;
      
      setIsLoading(true);
      try {
        const response = await fetch('/api/inductive-study', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'load',
            userEmail: session.user.email,
            book,
            chapter,
            version
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.study) {
            setStudyData({
              observation: data.study.observation || '',
              interpretation: data.study.interpretation || '',
              application: data.study.application || ''
            });
          }
        }
      } catch (error) {
        console.error('Error loading study data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.email && book && chapter) {
      loadData();
    }
  }, [session?.user?.email, book, chapter, version]);

  const saveStudyData = async () => {
    if (!session?.user?.email) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/inductive-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          userEmail: session.user.email,
          book,
          chapter,
          version,
          studyData
        })
      });

      if (response.ok) {
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Error saving study data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateStudyData = (field: keyof InductiveStudyData, value: string) => {
    setStudyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const steps = [
    { 
      id: 1, 
      title: 'Observeren', 
      subtitle: 'Wat staat er echt?', 
      icon: Eye,
      description: 'Lees de tekst zorgvuldig en schrijf op wat je daadwerkelijk ziet staan.'
    },
    { 
      id: 2, 
      title: 'Interpreteren', 
      subtitle: 'Wat betekent dit?', 
      icon: Brain,
      description: 'Denk na over de betekenis van wat je hebt geobserveerd.'
    },
    { 
      id: 3, 
      title: 'Toepassen', 
      subtitle: 'Hoe pas ik dit toe?', 
      icon: Heart,
      description: 'Hoe kun je deze waarheden toepassen in je eigen leven?'
    }
  ];

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Inductieve studie laden...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Inductieve Bijbelstudie: {book} {chapter}
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ontdek zelf de betekenis van Gods Woord in drie eenvoudige stappen
          </p>
        </CardHeader>
      </Card>

      {/* Progress Steps */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const hasContent = studyData[step.id === 1 ? 'observation' : step.id === 2 ? 'interpretation' : 'application'].length > 0;
          
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`flex-1 p-4 rounded-lg border transition-all ${
                isActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : hasContent
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : hasContent
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  <Icon size={16} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{step.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{step.subtitle}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Stap 1: Observeren - Wat staat er echt?
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Lees {book} {chapter} zorgvuldig en schrijf op wat je daadwerkelijk ziet staan. Let op:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
              <li>Wie zijn de hoofdpersonen?</li>
              <li>Wat gebeurt er precies?</li>
              <li>Waar en wanneer speelt dit zich af?</li>
              <li>Welke woorden worden herhaald?</li>
              <li>Wat valt je op aan de tekst?</li>
            </ul>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Schrijf hier je observaties van wat er daadwerkelijk in de tekst staat..."
              value={studyData.observation}
              onChange={(e) => updateStudyData('observation', e.target.value)}
              className="min-h-[200px] mb-4"
            />
            
            <div className="flex gap-2">
              <Button onClick={() => setCurrentStep(2)} className="flex-1">
                Ga naar Interpretatie <Brain className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={saveStudyData} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              </Button>
            </div>
            
            {lastSaved && (
              <p className="text-xs text-gray-500 mt-2">
                Laatst opgeslagen: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Stap 2: Interpreteren - Wat betekent dit?
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Denk na over de betekenis van wat je hebt geobserveerd. Probeer te begrijpen:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
              <li>Wat is de hoofdboodschap van deze passage?</li>
              <li>Wat leren we over God en Zijn karakter?</li>
              <li>Wat leren we over mensen en hun relatie met God?</li>
              <li>Hoe past dit in het grotere verhaal van de Bijbel?</li>
              <li>Wat wilde de auteur zijn lezers leren?</li>
            </ul>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Schrijf hier je interpretatie van wat de tekst betekent..."
              value={studyData.interpretation}
              onChange={(e) => updateStudyData('interpretation', e.target.value)}
              className="min-h-[200px] mb-4"
            />
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                <Eye className="w-4 h-4 mr-2" /> Terug naar Observatie
              </Button>
              <Button onClick={() => setCurrentStep(3)} className="flex-1">
                Ga naar Toepassing <Heart className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={saveStudyData} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              </Button>
            </div>
            
            {lastSaved && (
              <p className="text-xs text-gray-500 mt-2">
                Laatst opgeslagen: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Stap 3: Toepassen - Hoe pas ik dit toe?
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Denk na over hoe je de waarheden uit deze passage kunt toepassen in je eigen leven:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
              <li>Welke concrete lessen kan ik hieruit trekken?</li>
              <li>Wat moet ik veranderen in mijn denken of handelen?</li>
              <li>Hoe kan dit mijn relatie met God verdiepen?</li>
              <li>Welke praktische stappen ga ik nemen?</li>
              <li>Hoe kan ik anderen helpen met deze waarheid?</li>
            </ul>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Schrijf hier hoe je deze waarheden wilt toepassen in je eigen leven..."
              value={studyData.application}
              onChange={(e) => updateStudyData('application', e.target.value)}
              className="min-h-[200px] mb-4"
            />
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                <Brain className="w-4 h-4 mr-2" /> Terug naar Interpretatie
              </Button>
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                <Eye className="w-4 h-4 mr-2" /> Naar Observatie
              </Button>
              <Button variant="outline" onClick={saveStudyData} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              </Button>
            </div>
            
            {lastSaved && (
              <p className="text-xs text-gray-500 mt-2">
                Laatst opgeslagen: {lastSaved.toLocaleTimeString()}
              </p>
            )}
            
            {studyData.observation && studyData.interpretation && studyData.application && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                <div className="flex items-start gap-2">
                  <Eye className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-200">Inductieve studie voltooid!</h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Je hebt alle drie de stappen doorlopen. Neem tijd om te bidden over hoe God je wil veranderen door Zijn Woord.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
