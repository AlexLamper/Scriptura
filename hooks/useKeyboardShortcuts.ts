'use client';

import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
}

export function useKeyboardShortcuts({ shortcuts, enabled = true }: UseKeyboardShortcutsProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in input fields
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      const matchingShortcut = shortcuts.find(shortcut => {
        const keyMatches = shortcut.key.toLowerCase() === event.key.toLowerCase();
        const ctrlMatches = (shortcut.ctrlKey || false) === event.ctrlKey;
        const shiftMatches = (shortcut.shiftKey || false) === event.shiftKey;
        const altMatches = (shortcut.altKey || false) === event.altKey;
        
        return keyMatches && ctrlMatches && shiftMatches && altMatches;
      });

      if (matchingShortcut) {
        event.preventDefault();
        matchingShortcut.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);

  return shortcuts;
}

export type { KeyboardShortcut };
