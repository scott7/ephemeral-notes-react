import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme !== 'light'; // Default to dark mode unless explicitly set to light
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    const themeIcon = document.getElementById('themeIcon');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    if (themeIcon && themeToggleBtn) {
      if (isDarkMode) {
        themeIcon.className = 'bi bi-sun';
        themeToggleBtn.title = 'Switch to light mode';
      } else {
        themeIcon.className = 'bi bi-moon';
        themeToggleBtn.title = 'Switch to dark mode';
      }
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    if (window.setReactThemeToggle) {
      window.setReactThemeToggle(toggleTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
