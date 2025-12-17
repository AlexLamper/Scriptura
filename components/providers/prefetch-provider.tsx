'use client';

import { useEffect } from 'react';

export function PrefetchProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefetch = async () => {
      try {
        // Start fetching immediately
        const p1 = fetch('/api/bible/versions');
        
        // We assume statenvertaling is a likely default, or we can wait for versions
        // But waiting defeats the purpose of parallel fetching.
        // Let's fetch likely defaults.
        const p2 = fetch('/api/bible/books?version=statenvertaling');
        const p3 = fetch('/api/bible/chapter?version=statenvertaling&book=Genesis&chapter=1');
        
        // Also fetch ASV for English users
        const p4 = fetch('/api/bible/books?version=asv');
        
        await Promise.all([p1, p2, p3, p4]);
        
      } catch {
        // Ignore errors
      }
    };
    
    prefetch();
  }, []);

  return <>{children}</>;
}
