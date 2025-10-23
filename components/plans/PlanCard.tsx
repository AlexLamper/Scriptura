import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
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
    <div className="h-full bg-white dark:bg-[#23263a] border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/20 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-['Merriweather'] font-semibold text-gray-900 dark:text-white">{plan.title}</h3>
            <p className="text-sm font-['Inter'] text-gray-600 dark:text-gray-400 mt-1">{plan.description}</p>
          </div>
          <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#1a1d2e] text-gray-700 dark:text-gray-300 text-xs font-['Inter'] rounded-none border border-gray-200 dark:border-gray-700">
            {plan.category}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-6 space-y-4">
        <div className="flex justify-between text-sm font-['Inter'] text-gray-600 dark:text-gray-400">
          <span>{plan.duration || plan.readings?.length || 0} dagen</span>
          <span>{plan.readings?.length || 0} lezingen</span>
        </div>
        
        {plan.isEnrolled && (
          <div className="bg-gray-50 dark:bg-[#1a1d2e] p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm font-['Inter']">
              <span className="text-gray-900 dark:text-gray-300">Voortgang</span>
              <span className="text-gray-900 dark:text-gray-300">{plan.progressPercentage || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 mt-1">
              <div
                className="bg-[#798777] h-2"
                style={{ width: `${plan.progressPercentage || 0}%` }}
              ></div>
            </div>
            <p className="text-xs font-['Inter'] text-gray-500 dark:text-gray-400 mt-1">
              {plan.completedDays || 0} van {plan.duration || plan.readings?.length || 0} dagen voltooid
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {!plan.isEnrolled && (
            <>
              <Button 
                onClick={handleEnrollment} 
                className="flex-1 bg-[#798777] hover:bg-[#6a7a68] text-white rounded-none font-['Inter']"
                disabled={isLoading}
              >
                {isLoading ? 'Bezig...' : 'Inschrijven'}
              </Button>
              <Button 
                onClick={handleStartReading}
                className="bg-white dark:bg-[#1a1d2e] text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#262626] rounded-none font-['Inter']"
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
                className="flex-1 bg-[#798777] hover:bg-[#6a7a68] text-white rounded-none font-['Inter']"
                disabled={isLoading}
              >
                Lees verder
              </Button>
              <Button 
                onClick={handleUnenrollment}
                className="bg-white dark:bg-[#1a1d2e] text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#262626] rounded-none font-['Inter'] text-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Bezig...' : 'Uitschrijven'}
              </Button>
            </>
          )}
        </div>

        <div className="text-xs font-['Inter'] text-gray-500 dark:text-gray-400 pt-2">
          Gemaakt door {plan.createdBy?.name || 'Onbekend'}
        </div>
        
        {plan.isPublic && (
          <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-[#1a1d2e] text-gray-700 dark:text-gray-300 text-xs font-['Inter'] rounded-none border border-gray-200 dark:border-gray-700">
            Openbaar
          </span>
        )}
      </div>
    </div>
  );
}
