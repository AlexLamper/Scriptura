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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#798777] mx-auto mb-4" />
          <p className="font-['Inter'] text-gray-700 text-base font-medium dark:text-gray-200">
            Inductieve studie laden...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-none rounded-none dark:bg-[#23263a]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-['Merriweather'] text-[#262626] dark:text-white">
          <Brain className="w-6 h-6 text-[#798777]" />
          Inductieve Bijbelstudie: {book} {chapter}
        </CardTitle>
        <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
          Bestudeer Gods Woord in 3 eenvoudige stappen. Lees eerst de tekst goed door voordat je begint.
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-6">
          
          {/* Step 1: Observation */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#798777] text-white flex items-center justify-center">
                <Eye size={16} />
              </div>
              <h3 className="font-['Merriweather'] text-lg font-semibold text-[#262626] dark:text-white">
                1. Wat zie je?
              </h3>
            </div>
            <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400 pl-11">
              Lees de tekst aandachtig en schrijf op wat je opvalt: wie komt erin voor, wat gebeurt er, waar en wanneer speelt het zich af?
            </p>
            
            <Textarea
              placeholder="Wat staat er in de tekst? Schrijf op wat je ziet..."
              value={studyData.observation}
              onChange={(e) => updateStudyData('observation', e.target.value)}
              className="min-h-[120px] font-['Inter'] border border-gray-300 dark:border-gray-600 focus:border-[#798777] dark:focus:border-[#9aaa98] dark:bg-[#181b23] rounded-none"
            />
          </div>

          {/* Step 2: Interpretation */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#798777] text-white flex items-center justify-center">
                <Brain size={16} />
              </div>
              <h3 className="font-['Merriweather'] text-lg font-semibold text-[#262626] dark:text-white">
                2. Wat betekent het?
              </h3>
            </div>
            <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400 pl-11">
              Denk na over de betekenis: wat wil God hiermee zeggen? Wat leer je over God, mensen of het leven?
            </p>
            
            <Textarea
              placeholder="Wat is de betekenis? Wat wil God je leren?"
              value={studyData.interpretation}
              onChange={(e) => updateStudyData('interpretation', e.target.value)}
              className="min-h-[120px] font-['Inter'] border border-gray-300 dark:border-gray-600 focus:border-[#798777] dark:focus:border-[#9aaa98] dark:bg-[#181b23] rounded-none"
            />
          </div>

          {/* Step 3: Application */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#798777] text-white flex items-center justify-center">
                <Heart size={16} />
              </div>
              <h3 className="font-['Merriweather'] text-lg font-semibold text-[#262626] dark:text-white">
                3. Hoe pas je het toe?
              </h3>
            </div>
            <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400 pl-11">
              Maak het persoonlijk: hoe ga je deze waarheid gebruiken in je dagelijks leven? Wat ga je anders doen?
            </p>
            
            <Textarea
              placeholder="Hoe ga je dit toepassen in je leven?"
              value={studyData.application}
              onChange={(e) => updateStudyData('application', e.target.value)}
              className="min-h-[120px] font-['Inter'] border border-gray-300 dark:border-gray-600 focus:border-[#798777] dark:focus:border-[#9aaa98] dark:bg-[#181b23] rounded-none"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <Button 
                onClick={saveStudyData} 
                disabled={isSaving}
                className="bg-[#798777] hover:bg-[#6a7a68] text-white font-['Inter'] px-6"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Opslaan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Opslaan
                  </>
                )}
              </Button>
              
              {lastSaved && (
                <p className="font-['Inter'] text-xs text-gray-500 dark:text-gray-400">
                  Opgeslagen: {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>
            
            {/* Simple completion message */}
            {studyData.observation && studyData.interpretation && studyData.application && (
              <div className="mt-3 p-3 bg-[#798777]/10 border border-[#798777]/30 dark:bg-[#9aaa98]/10 dark:border-[#9aaa98]/30">
                <p className="font-['Inter'] text-sm text-[#798777] dark:text-[#9aaa98]">
                  ✓ Bijbelstudie voltooid!
                </p>
              </div>
            )}
          </div>
      </CardContent>
    </Card>
  );
}
