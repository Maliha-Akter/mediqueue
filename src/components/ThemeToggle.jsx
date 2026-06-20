'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-8 w-8" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};