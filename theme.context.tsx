import React, { createContext, useContext } from 'react';
import { useWordPress } from './hooks/useWordPress';
import { THEME } from './theme.config';

const ThemeContext = createContext(THEME);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { content } = useWordPress();
  
  return (
    <ThemeContext.Provider value={content}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
