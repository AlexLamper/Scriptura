'use client';

import { useEffect, useState } from 'react';

export function StartupLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if we've already shown the loader in this session
    const hasShown = sessionStorage.getItem('startup-loader-shown');
    if (hasShown) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('startup-loader-shown', 'true');
    }, 2000); // 2 seconds for data prefetching

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex flex-col items-center animate-pulse">
        {/* Simple Logo Representation */}
        <svg className="w-20 h-20 text-blue-600 dark:text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wider">SCRIPTURA</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading resources...</p>
      </div>
    </div>
  );
}
