"use client"

import { useState, useEffect } from 'react';

type ProgressType = {
  _id: string;
  user: string;
  course: string;
  completedLessons: number[];
  lastAccessedLesson: number;
  startedAt: string;
  lastAccessedAt: string;
};

export function useProgress(courseId?: string) {
  const [progress, setProgress] = useState<ProgressType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const url = courseId ? `/api/progress?courseId=${courseId}` : '/api/progress';
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch progress');
        }
        
        const data = await response.json();
        setProgress(data.progress);
      } catch (error) {
        console.error('Error fetching progress:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [courseId]);

  const updateProgress = async (lessonIndex: number, completed: boolean = false) => {
    if (!courseId) return;
    
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          lessonIndex,
          completed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      const data = await response.json();
      setProgress(data.progress);
      return data.progress;
    } catch (error) {
      console.error('Error updating progress:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      return null;
    }
  };

  // Calculate progress percentage
  const calculateProgressPercentage = (totalLessons: number) => {
    if (!progress || !progress.completedLessons || totalLessons === 0) return 0;
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  };

  return {
    progress,
    loading,
    error,
    updateProgress,
    calculateProgressPercentage,
  };
}
