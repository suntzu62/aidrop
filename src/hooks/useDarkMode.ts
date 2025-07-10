import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  const setMode = (mode: Theme) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    // Ensure this only runs client-side
    setMounted(true);
    
    // Check for saved theme preference or use device preference
    const localTheme = window.localStorage.getItem('theme') as Theme;
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (localTheme) {
      setTheme(localTheme);
    } else if (darkMediaQuery.matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme, mounted]);

  return { theme, toggleTheme, mounted };
};