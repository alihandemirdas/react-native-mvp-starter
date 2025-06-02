// App.tsx
import React, { useEffect, useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import MainScreen from './screens/MainScreen';
import SideScreen from './screens/SideScreen';
import ProfileScreen from './screens/ProfileScreen';
import Paywall from './screens/Paywall';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CustomButtonComponents from './screens/CustomButtonComponents';
import OnboardingScreen from './screens/OnboardingScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from './contexts/ToastContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { OnboardingProvider, useOnboarding } from './contexts/OnboardingContext';
import analytics from '@react-native-firebase/analytics';
import firebaseApp from '@react-native-firebase/app';
import Icon from 'react-native-vector-icons/Ionicons';
import './global.css';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubbles';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else {
            iconName = 'ellipse';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#d1d5db',
        tabBarStyle: {
          backgroundColor: '#1f2937',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '400',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Chat" component={SideScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const AppContent: React.FC = () => {
  const { isFirstLaunch, isLoading } = useOnboarding();
  const { colors } = useTheme();
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const routeNameRef = useRef<string | null>(null);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        if (!firebaseApp.apps.length) {
          console.log('❌ No Firebase apps found, check configuration');
        } else {
          console.log('✅ Firebase App initialized:', firebaseApp.app().name);
          console.log('✅ Firebase Analytics available');
        }
      } catch (error) {
        console.error('❌ Firebase initialization error:', error);
      }
    };
    initializeFirebase();
  }, []);

  // Show loading spinner while checking onboarding status
  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Show onboarding if it's first launch
  if (isFirstLaunch) {
    return <OnboardingScreen />;
  }

  // Show main app
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name ?? '';
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name ?? '';

        if (currentRouteName && previousRouteName !== currentRouteName) {
          try {
            console.log(currentRouteName+" screen view logged");
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
            console.log('📱 Screen view logged:', currentRouteName);
          } catch (error) {
            console.error('❌ Screen view analytics error:', error);
          }
        }

        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen 
          name="Paywall" 
          component={Paywall}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen 
          name="CustomButtonComponents" 
          component={CustomButtonComponents}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <OnboardingProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </OnboardingProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
