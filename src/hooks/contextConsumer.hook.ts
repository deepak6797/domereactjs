import { useContext } from 'react';
import { ThemeContext, ThemeContextProps } from '../context/ThemeContext';
import { ContextCreator } from '../context/VisibleContext';
import { AuthContextCreator } from '../context/AuthContext';

export const useThemeProvider = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeProvider must be used within a ThemeProvider');
  }
  return context;
};

export const useAuthContext = () => {
  return useContext(AuthContextCreator);
};

export const useContextStore = () => {
  return useContext(ContextCreator);
};

