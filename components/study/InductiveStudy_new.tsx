'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Eye, Brain, Heart, ChevronDown, ChevronRight, Lightbulb, Book } from 'lucide-react';

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
  observationQuestions: Record<string, string>;
  interpretationReflections: Record<string, string>;
  applicationCommitments: Record<string, string>;
}

// Professional Genesis 1 study content based on biblical scholarship
const getGenesisStudyContent = () => {
  return {
    observationQuestions: [
      {
        id: 'who',
        question: 'Wie is de hoofdpersoon in deze passage?',
        hint: 'Let op wie alle handelingen uitvoert',
        professionalAnswer: 'God (Elohim) is de absolute hoofdpersoon. Hij wordt 32 keer genoemd en voert alle scheppingshandelingen uit. Er zijn geen andere actieve personen.'
      },
      {
        id: 'what',
        question: 'Wat gebeurt er in deze passage?',
        hint: 'Beschrijf de volgorde van gebeurtenissen',
        professionalAnswer: 'God schept het universum in zes dagen: dag 1 (licht/duisternis), dag 2 (hemelgewelf), dag 3 (land/zeeën/planten), dag 4 (hemellichamen), dag 5 (zeedieren/vogels), dag 6 (landdieren/mens). Op dag 7 rust Hij.'
      },
      {
        id: 'when',
        question: 'Wanneer gebeurt dit?',
        hint: 'Let op tijdsaanduidingen',
        professionalAnswer: 'In het absolute begin ("bereschiet"), voordat tijd, ruimte en materie bestonden. De structuur van zes dagen + rust toont Gods ordelijke werken in de tijd.'
      },
      {
        id: 'where',
        question: 'Waar gebeurt dit?',
        hint: 'Welke plaatsen worden genoemd?',
        professionalAnswer: 'In de hemel en op de aarde. De tekst begint met "hemel en aarde" (merisme voor het hele universum) en beschrijft kosmische ruimtes: hemelgewelf, zeeën, droog land.'
      },
      {
        id: 'how',
        question: 'Hoe brengt God de schepping tot stand?',
        hint: 'Let op herhaalde uitdrukkingen',
        professionalAnswer: 'Door Zijn woord ("God zei") gevolgd door uitvoering ("het werd zo") en evaluatie ("God zag dat het goed was"). Dit patroon toont Gods soevereine macht en wijsheid.'
      }
    ],
    interpretationInsights: [
      {
        id: 'author_intent',
        question: 'Wat wilde Mozes hier leren aan Israël?',
        insight: 'Mozes wilde Israël tonen dat hun God, JHWH, de enige ware Schepper is - niet de Egyptische of Kanaänietische goden. Genesis 1 is polemiek tegen polytheïsme en toont Gods absolute soevereiniteit.'
      },
      {
        id: 'literary_structure',
        question: 'Hoe is deze passage literair opgebouwd?',
        insight: 'Symmetrische structuur: dagen 1-3 (vorming van domeinen) parallel aan dagen 4-6 (vulling van domeinen). Dag 7 is het hoogtepunt. Dit toont Gods perfecte planning en orde.'
      },
      {
        id: 'theological_themes',
        question: 'Welke theologische thema\'s zien we?',
        insight: 'Gods transcendentie (Hij staat boven de schepping), Zijn goedheid ("het was goed"), menselijke waardigheid (beeld van God), sabbatsrust, en kosmische orde versus chaos.'
      },
      {
        id: 'historical_context',
        question: 'Wat betekende dit voor de oorspronkelijke lezers?',
        insight: 'Voor Israëlites in de woestijn gaf dit identiteit en hoop: hun God is de almachtige Schepper die hen naar het beloofde land brengt, in contrast met de machteloze afgoden van Egypte.'
      }
    ],
    applicationAreas: [
      {
        id: 'worship',
        category: 'Aanbidding',
        question: 'Hoe verandert dit mijn aanbidding van God?',
        suggestion: 'Erken God als de almachtige Schepper die alle eer en aanbidding verdient. Zie de schepping als tempel waarin je Hem kunt ontmoeten.'
      },
      {
        id: 'identity',
        category: 'Identiteit',
        question: 'Wat leert dit over wie ik ben?',
        suggestion: 'Je bent geschapen naar Gods beeld - met waardigheid, doel en verantwoordelijkheid. Je bent geen toeval maar Gods bewuste creatie.'
      },
      {
        id: 'stewardship',
        category: 'rentmeesterschap',
        question: 'Hoe moet ik omgaan met de schepping?',
        suggestion: 'Zorg goed voor Gods schepping. Je bent rentmeester, niet eigenaar. Behandel natuur, dieren en mensen met respect.'
      },
      {
        id: 'rest',
        category: 'Rust',
        question: 'Wat betekent sabbatsrust voor mij?',
        suggestion: 'Neem bewust tijd voor rust en reflectie. Werk is goed, maar je identiteit ligt niet in prestatie maar in je relatie met God.'
      },
      {
        id: 'purpose',
        category: 'Doel',
        question: 'Wat is mijn doel in Gods plan?',
        suggestion: 'Leef als Gods vertegenwoordiger op aarde. Weerspiegeld Gods karakter in je relaties, werk en manier van leven.'
      }
    ]
  };
};

export default function InductiveStudy({
  book,
  chapter,
}: InductiveStudyProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<StudyProgress>({
    observation: '',
    interpretation: '',
    application: '',
    observationQuestions: {},
    interpretationReflections: {},
    applicationCommitments: {}
  });

  // Only show Genesis 1 content for now
  const isGenesis1 = book.toLowerCase().includes('genesis') && chapter === 1;
  const studyContent = getGenesisStudyContent();

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const updateProgress = (field: keyof StudyProgress, value: string | Record<string, string>) => {
    setProgress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const steps = [
    { id: 1, title: 'Observe', subtitle: 'What does the text say?', icon: Eye },
    { id: 2, title: 'Interpret', subtitle: 'What does it mean?', icon: Brain },
    { id: 3, title: 'Apply', subtitle: 'How does it apply to me?', icon: Heart }
  ];

  if (!isGenesis1) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Inductive Bible Study
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Inductieve studie beschikbaar voor Genesis 1</p>
            <p className="text-sm">Selecteer Genesis hoofdstuk 1 om de volledige inductieve studiemethode te ervaren.</p>
          </div>
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
            Inductieve Bijbelstudie: Genesis 1
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ontdek zelf de betekenis van Gods Woord door observatie, interpretatie en toepassing
          </p>
        </CardHeader>
      </Card>

      {/* Progress Steps */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`flex-1 p-4 rounded-lg border transition-all ${
                isActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : isCompleted
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : isCompleted
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
              Stap 1: Observatie - Wat zie je?
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Lees Genesis 1 zorgvuldig en beantwoord de observatievragen. Let op details, herhaling en patronen.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {studyContent.observationQuestions.map((q) => (
              <div key={q.id} className="border rounded-lg p-4 dark:border-gray-700">
                <button
                  onClick={() => toggleSection(`obs-${q.id}`)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">{q.question}</h4>
                  {expandedSections[`obs-${q.id}`] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                
                {expandedSections[`obs-${q.id}`] && (
                  <div className="mt-3 space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">💡 {q.hint}</p>
                    
                    <Textarea
                      placeholder="Schrijf hier je eigen observaties..."
                      value={progress.observationQuestions[q.id] || ''}
                      onChange={(e) => updateProgress('observationQuestions', {
                        ...progress.observationQuestions,
                        [q.id]: e.target.value
                      })}
                      className="min-h-[80px]"
                    />
                    
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-500 dark:bg-green-900/20">
                      <p className="text-sm">
                        <strong>Professioneel antwoord:</strong> {q.professionalAnswer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="mt-6">
              <Button onClick={() => setCurrentStep(2)} className="w-full">
                Ga naar Interpretatie <Brain className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Stap 2: Interpretatie - Wat betekent het?
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ontdek wat de tekst betekende voor de oorspronkelijke lezers en wat de auteur wilde communiceren.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {studyContent.interpretationInsights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4 dark:border-gray-700">
                <button
                  onClick={() => toggleSection(`int-${insight.id}`)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h4 className="font-medium text-purple-700 dark:text-purple-300">{insight.question}</h4>
                  {expandedSections[`int-${insight.id}`] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                
                {expandedSections[`int-${insight.id}`] && (
                  <div className="mt-3 space-y-3">
                    <Textarea
                      placeholder="Wat denk jij dat deze tekst betekent? Schrijf je eigen interpretatie..."
                      value={progress.interpretationReflections[insight.id] || ''}
                      onChange={(e) => updateProgress('interpretationReflections', {
                        ...progress.interpretationReflections,
                        [insight.id]: e.target.value
                      })}
                      className="min-h-[80px]"
                    />
                    
                    <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500 dark:bg-purple-900/20">
                      <p className="text-sm">
                        <strong>Bijbelse interpretatie:</strong> {insight.insight}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="mt-6 flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                <Eye className="w-4 h-4 mr-2" /> Terug naar Observatie
              </Button>
              <Button onClick={() => setCurrentStep(3)} className="flex-1">
                Ga naar Toepassing <Heart className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Stap 3: Toepassing - Hoe pas je het toe?
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Denk na over hoe de waarheden uit Genesis 1 je leven kunnen veranderen en maak concrete toepassingen.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {studyContent.applicationAreas.map((area) => (
              <div key={area.id} className="border rounded-lg p-4 dark:border-gray-700">
                <button
                  onClick={() => toggleSection(`app-${area.id}`)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-300">{area.question}</h4>
                    <Badge variant="secondary" className="mt-1 text-xs">{area.category}</Badge>
                  </div>
                  {expandedSections[`app-${area.id}`] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                
                {expandedSections[`app-${area.id}`] && (
                  <div className="mt-3 space-y-3">
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500 dark:bg-blue-900/20">
                      <p className="text-sm">
                        <strong>Suggestie:</strong> {area.suggestion}
                      </p>
                    </div>
                    
                    <Textarea
                      placeholder="Welke concrete stappen ga je nemen? Hoe ga je dit toepassen in je dagelijks leven?"
                      value={progress.applicationCommitments[area.id] || ''}
                      onChange={(e) => updateProgress('applicationCommitments', {
                        ...progress.applicationCommitments,
                        [area.id]: e.target.value
                      })}
                      className="min-h-[80px]"
                    />
                  </div>
                )}
              </div>
            ))}
            
            <div className="mt-6 flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                <Brain className="w-4 h-4 mr-2" /> Terug naar Interpretatie
              </Button>
              <Button onClick={() => setCurrentStep(1)} className="flex-1" variant="outline">
                <Eye className="w-4 h-4 mr-2" /> Naar Observatie
              </Button>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 dark:bg-green-900/20 dark:border-green-800">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200">Voltooid!</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Je hebt de inductieve studiemethode toegepast op Genesis 1. Neem tijd om je inzichten door te laten dringen en te bidden over hoe God je wil veranderen door Zijn Woord.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
