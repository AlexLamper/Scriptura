import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Reading {
  book: string;
  chapter: number;
  verses?: string;
}

interface BiblePlan {
  _id: string;
  title: string;
  description: string;
  category: string;
  isPublic: boolean;
  duration: number;
  readings: Reading[];
  createdBy: {
    _id: string;
    name: string;
  };
  isEnrolled?: boolean;
  completedDays?: number;
  progressPercentage?: number;
}

interface PlanCardProps {
  plan: BiblePlan;
  onEnrollmentChange?: () => void;
  t?: unknown; // Optional translation function
}

const categoryColors = {
  evangelie: 'bg-blue-100 text-blue-800',
  psalmen: 'bg-green-100 text-green-800',
  proverbs: 'bg-yellow-100 text-yellow-800',
  profeten: 'bg-purple-100 text-purple-800',
  brieven: 'bg-red-100 text-red-800',
  apocalyps: 'bg-gray-100 text-gray-800'
};

export default function PlanCard({ plan, onEnrollmentChange }: PlanCardProps) {
  console.log('PlanCard rendering plan:', plan.title, 'readings:', plan.readings?.length);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{plan.title}</CardTitle>
            <CardDescription className="mt-1">{plan.description}</CardDescription>
          </div>
          <Badge className={categoryColors[plan.category as keyof typeof categoryColors] || categoryColors.evangelie}>
            {plan.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{plan.duration || plan.readings?.length || 0} dagen</span>
            <span>{plan.readings?.length || 0} lezingen</span>
          </div>
          
          {plan.isEnrolled && (
            <div className="bg-gray-50 p-3 rounded">
              <div className="flex justify-between text-sm">
                <span>Voortgang</span>
                <span>{plan.progressPercentage || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${plan.progressPercentage || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {plan.completedDays || 0} van {plan.duration || plan.readings?.length || 0} dagen voltooid
              </p>
            </div>
          )}

          <div className="flex gap-2">
            {!plan.isEnrolled && (
              <Button onClick={onEnrollmentChange} className="flex-1">
                Inschrijven
              </Button>
            )}
            {plan.isEnrolled && (
              <Button variant="outline" className="flex-1">
                Doorgaan
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-500">
            Gemaakt door {plan.createdBy?.name || 'Onbekend'}
          </div>
          
          {plan.isPublic && (
            <Badge variant="secondary" className="text-xs">
              Openbaar
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
