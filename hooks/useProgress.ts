"use client"

import { useState, useEffect } from 'react';

type ProgressType = {
  _id: string;
  user: string;
  course: string;
  completed: boolean;
  startedAt: string;
  completedAt?: string;
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
        const url = courseId ? `/api/user-progress?courseId=${courseId}` : '/api/user-progress';
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch progress');
        }
        
        const data = await response.json();
        setProgress(data);
      } catch (error) {
        console.error('Error fetching progress:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchProgress();
    }
  }, [courseId]);

  const updateProgress = async (completed: boolean = false) => {
    if (!courseId) return;
    
    try {
      const response = await fetch('/api/user-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          completed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      const data = await response.json();
      setProgress(data);
      return data;
    } catch (error) {
      console.error('Error updating progress:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      return null;
    }
  };

  // Calculate progress percentage
  const calculateProgressPercentage = () => {
    if (!progress) return 0;
    return progress.completed ? 100 : 0;
  };

  return {
    progress,
    loading,
    error,
    updateProgress,
    calculateProgressPercentage,
  };
}
