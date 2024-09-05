'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Themetoggle from '@/components/Themetoggle'; // Adjust the path as needed

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === 'dark' ? (
        <img src="/icons/sun.svg" alt="Sun icon" className="h-6 w-6" />
      ) : (
        <img src="/icons/moon.svg" alt="Moon icon" className="h-6 w-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
