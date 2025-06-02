import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingContextType {
  isFirstLaunch: boolean;
  isLoading: boolean;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>; // For testing purposes
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

const ONBOARDING_STORAGE_KEY = '@app_onboarding_completed';

export const OnboardingProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
      
      if (onboardingCompleted === 'true') {
        setIsFirstLaunch(false);
      } else {
        setIsFirstLaunch(true);
      }
    } catch (error) {
      console.error('Onboarding check error:', error);
      setIsFirstLaunch(true); // Default to showing onboarding on error
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      setIsFirstLaunch(false);
      console.log('✅ Onboarding completed');
    } catch (error) {
      console.error('Complete onboarding error:', error);
    }
  };

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_STORAGE_KEY);
      setIsFirstLaunch(true);
      console.log('🔄 Onboarding reset for testing');
    } catch (error) {
      console.error('Reset onboarding error:', error);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        isFirstLaunch,
        isLoading,
        completeOnboarding,
        resetOnboarding,
      }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}; 