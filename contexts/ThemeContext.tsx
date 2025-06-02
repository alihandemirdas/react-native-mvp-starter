import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  accent: string;
  gradientBackground: string[];
}

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  changeTheme: (mode: ThemeMode) => Promise<void>;
  availableThemes: {mode: ThemeMode; name: string; icon: string}[];
}

const lightColors: ThemeColors = {
  background: '#ffffff',
  surface: '#f8f9fa',
  primary: '#3b82f6',
  secondary: '#6b7280',
  text: '#111827',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  card: '#ffffff',
  accent: '#8b5cf6',
  gradientBackground: ['#f8fafc', '#f1f5f9', '#e2e8f0'],
};

const darkColors: ThemeColors = {
  background: '#111827',
  surface: '#1f2937',
  primary: '#60a5fa',
  secondary: '#9ca3af',
  text: '#f9fafb',
  textSecondary: '#d1d5db',
  border: '#374151',
  card: '#1f2937',
  accent: '#a78bfa',
  gradientBackground: ['#0f172a', '#111827', '#1e293b'],
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';

export const availableThemes = [
  {mode: 'system' as ThemeMode, name: 'System', icon: '📱'},
  {mode: 'light' as ThemeMode, name: 'Light', icon: '☀️'},
  {mode: 'dark' as ThemeMode, name: 'Dark', icon: '🌙'},
];

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const systemColorScheme = useColorScheme();

  const isDark = mode === 'dark' || (mode === 'system' && systemColorScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  useEffect(() => {
    initializeTheme();
  }, []);

  const initializeTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setMode(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Theme initialization error:', error);
    }
  };

  const changeTheme = async (newMode: ThemeMode) => {
    try {
      setMode(newMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
      console.log(`🎨 Theme changed to: ${newMode}`);
    } catch (error) {
      console.error('Change theme error:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        isDark,
        colors,
        changeTheme,
        availableThemes,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 