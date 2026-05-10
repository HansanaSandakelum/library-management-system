import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    () => document.documentElement.classList.contains('dark')
  );

  // Stay in sync if another tab changes the theme
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'theme') return;
      const dark = e.newValue === 'dark';
      document.documentElement.classList.toggle('dark', dark);
      setIsDarkMode(dark);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDarkMode(next);
  };

  return { isDarkMode, toggleTheme };
}
