'use client';

import { KeyboardShortcut } from '../../hooks/useKeyboardShortcuts';

interface ShortcutDisplayProps {
  shortcuts: KeyboardShortcut[];
  t: (key: string) => string;
}

export function ShortcutDisplay({ shortcuts, t }: ShortcutDisplayProps) {
  const formatShortcut = (shortcut: KeyboardShortcut) => {
    const parts = [];
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.shiftKey) parts.push('Shift');
    if (shortcut.altKey) parts.push('Alt');
    parts.push(shortcut.key.toUpperCase());
    return parts.join(' + ');
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm">{t('shortcuts.title')}</h4>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{shortcut.description}</span>
            <div className="flex items-center gap-1">
              {formatShortcut(shortcut).split(' + ').map((part, partIndex, parts) => (
                <span key={partIndex} className="inline-flex items-center">
                  <kbd className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded border">
                    {part}
                  </kbd>
                  {partIndex < parts.length - 1 && <span className="mx-1 text-muted-foreground">+</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
