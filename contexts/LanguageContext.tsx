import React, {createContext, useContext, useState, useEffect} from 'react';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../utils/i18n';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (languageCode: string) => Promise<void>;
  t: (key: string, options?: any) => string;
  availableLanguages: {code: string; name: string; flag: string}[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LANGUAGE_STORAGE_KEY = '@app_language';

export const availableLanguages = [
  {code: 'en', name: 'English', flag: '🇺🇸'},
  {code: 'tr', name: 'Türkçe', flag: '🇹🇷'},
];

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  useEffect(() => {
    initializeLanguage();
  }, []);

  const initializeLanguage = async () => {
    try {
      // Check if language is saved in storage
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
        i18n.locale = savedLanguage;
      } else {
        // Use device language if available, otherwise default to English
        const deviceLanguage = RNLocalize.getLocales()[0]?.languageCode || 'en';
        const supportedLanguage = availableLanguages.find(
          lang => lang.code === deviceLanguage,
        )?.code || 'en';
        
        setCurrentLanguage(supportedLanguage);
        i18n.locale = supportedLanguage;
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, supportedLanguage);
      }
    } catch (error) {
      console.error('Language initialization error:', error);
      setCurrentLanguage('en');
      i18n.locale = 'en';
    }
  };

  const changeLanguage = async (languageCode: string) => {
    try {
      setCurrentLanguage(languageCode);
      i18n.locale = languageCode;
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
      console.log(`🌍 Language changed to: ${languageCode}`);
    } catch (error) {
      console.error('Change language error:', error);
    }
  };

  const t = (key: string, options?: any) => {
    return i18n.t(key, options);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        t,
        availableLanguages,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 