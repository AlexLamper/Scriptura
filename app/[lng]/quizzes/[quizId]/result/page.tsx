'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function QuizResultPage() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const total = searchParams.get('total');
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h1>
        <p className="text-2xl text-gray-600 mb-6">
          Your score: {score} out of {total}
        </p>
        <button
          onClick={() => router.push(`/quizzes`)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Quizzes
        </button>
      </div>
    </div>
  );
}