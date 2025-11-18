'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Eye, Brain, Heart } from 'lucide-react';

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
  chapter
}: InductiveStudyProps) {
  const [studyData, setStudyData] = useState<InductiveStudyData>({
    observation: '',
    interpretation: '',
    application: ''
  });

  const updateStudyData = (field: keyof InductiveStudyData, value: string) => {
    setStudyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
            <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
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
            <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
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
            <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
              Maak het persoonlijk: hoe ga je deze waarheid gebruiken in je dagelijks leven? Wat ga je anders doen?
            </p>
            <Textarea
              placeholder="Hoe ga je dit toepassen in je leven?"
              value={studyData.application}
              onChange={(e) => updateStudyData('application', e.target.value)}
              className="min-h-[120px] font-['Inter'] border border-gray-300 dark:border-gray-600 focus:border-[#798777] dark:focus:border-[#9aaa98] dark:bg-[#181b23] rounded-none"
            />
          </div>
      </CardContent>
    </Card>
  );
}
