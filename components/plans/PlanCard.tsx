import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from '../../hooks/use-toast';

interface Reading {
  day: number;
  book: string;
  chapter: number;
  verses?: string;
  title?: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  console.log('PlanCard rendering plan:', plan.title, 'readings:', plan.readings?.length);

  const handleEnrollment = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/bible-plans/enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId: plan._id }),
      });

      if (response.ok) {
        toast({
          title: 'Succesvol ingeschreven!',
          description: `Je bent nu ingeschreven voor "${plan.title}"`,
        });
        onEnrollmentChange?.();
      } else {
        const error = await response.json();
        toast({
          title: 'Inschrijving mislukt',
          description: error.error || 'Er is een fout opgetreden',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      toast({
        title: 'Inschrijving mislukt',
        description: 'Er is een onverwachte fout opgetreden',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnenrollment = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/bible-plans/enrollment?planId=${plan._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Uitgeschreven',
          description: `Je bent uitgeschreven van "${plan.title}"`,
        });
        onEnrollmentChange?.();
      } else {
        const error = await response.json();
        toast({
          title: 'Uitschrijving mislukt',
          description: error.error || 'Er is een fout opgetreden',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error unenrolling:', error);
      toast({
        title: 'Uitschrijving mislukt',
        description: 'Er is een onverwachte fout opgetreden',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    try {
      // Fetch the plan details to get the current day's reading
      const response = await fetch(`/api/bible-plans/${plan._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch plan details');
      }
      
      const { plan: planDetails } = await response.json();
      
      // Find the next uncompleted day or first day if none completed
      const completedDays = planDetails.completedDays || [];
      let currentDay = 1;
      
      if (completedDays.length > 0) {
        // Find the next day after the latest completed day
        const maxCompletedDay = Math.max(...completedDays);
        currentDay = maxCompletedDay < planDetails.duration ? maxCompletedDay + 1 : maxCompletedDay;
      }
      
      // Find the reading for the current day
      const currentReading = planDetails.readings?.find((reading: Reading) => reading.day === currentDay);
      
      if (currentReading) {
        // Navigate to /read with the specific book and chapter
        const queryParams = new URLSearchParams({
          book: currentReading.book,
          chapter: currentReading.chapter.toString(),
          plan: plan._id,
          day: currentDay.toString()
        });
        
        router.push(`/read?${queryParams.toString()}`);
      } else {
        // Fallback to plan detail page
        router.push(`/plans/${plan._id}`);
      }
    } catch (error) {
      console.error('Error continuing plan:', error);
      // Fallback to plan detail page
      router.push(`/plans/${plan._id}`);
    }
  };

  const handleStartReading = async () => {
    try {
      // For non-enrolled users, start with day 1
      const firstReading = plan.readings?.[0];
      if (firstReading) {
        const queryParams = new URLSearchParams({
          book: firstReading.book,
          chapter: firstReading.chapter.toString(),
          plan: plan._id,
          day: firstReading.day.toString()
        });
        
        router.push(`/read?${queryParams.toString()}`);
      }
    } catch (error) {
      console.error('Error starting reading:', error);
    }
  };
  
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
              <>
                <Button 
                  onClick={handleEnrollment} 
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Bezig...' : 'Inschrijven'}
                </Button>
                <Button 
                  onClick={handleStartReading}
                  variant="outline"
                  disabled={isLoading}
                >
                  Preview
                </Button>
              </>
            )}
            {plan.isEnrolled && (
              <>
                <Button 
                  onClick={handleContinue}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Lees verder
                </Button>
                <Button 
                  onClick={handleUnenrollment}
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                >
                  {isLoading ? 'Bezig...' : 'Uitschrijven'}
                </Button>
              </>
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
