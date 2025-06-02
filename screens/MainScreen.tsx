// screens/MainScreen.tsx
import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useToast} from '../contexts/ToastContext';
import {useLanguage} from '../contexts/LanguageContext';
import {useTheme} from '../contexts/ThemeContext';
import {useOnboarding} from '../contexts/OnboardingContext';

interface MainScreenProps {
  navigation: any;
}

const MainScreen: React.FC<MainScreenProps> = ({navigation}) => {
  const {showSuccess, showError, showWarning, showInfo} = useToast();
  const {t, currentLanguage, changeLanguage, availableLanguages} = useLanguage();
  const {mode, isDark, colors, changeTheme, availableThemes} = useTheme();
  const {resetOnboarding} = useOnboarding();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleAdMobTest = async () => {
    try {
      await analytics().logEvent('admob_test_button_pressed', {
        screen_name: 'MainScreen',
        feature: 'admob_integration',
        timestamp: new Date().toISOString(),
      });

      await analytics().logEvent('user_interaction', {
        action: 'tap',
        element: 'admob_test_button',
        feature: 'admob',
      });

      console.log('🎯 AdMob test event logged successfully');
      showSuccess(t('toast_messages.admob_success.title'), t('toast_messages.admob_success.message'));
    } catch (error) {
      console.error('AdMob analytics error:', error);
      showError(t('toast_messages.admob_error.title'), t('toast_messages.admob_error.message'));
    }
  };

  const handleAnalyticsTest = async () => {
    try {
      await analytics().logEvent('analytics_test_button_pressed', {
        screen_name: 'MainScreen',
        feature: 'analytics_test',
        timestamp: new Date().toISOString(),
      });

      console.log('📊 Analytics test event logged successfully');
      showInfo(t('toast_messages.analytics_success.title'), t('toast_messages.analytics_success.message'));
    } catch (error) {
      console.error('Analytics error:', error);
      showError(t('toast_messages.analytics_error.title'), t('toast_messages.analytics_error.message'));
    }
  };

  const handlePremiumUpgrade = async () => {
    try {
      await analytics().logEvent('paywall_button_pressed', {
        screen_name: 'MainScreen',
        button_name: 'premium_button',
        timestamp: new Date().toISOString(),
      });

      await analytics().logEvent('user_interaction', {
        action: 'tap',
        element: 'premium_button',
        screen: 'main',
      });

      console.log('✨ Premium upgrade event logged successfully');
      showInfo(t('toast_messages.paywall_opening.title'), t('toast_messages.paywall_opening.message'));
      navigation.navigate('Paywall');
    } catch (error) {
      console.error('Premium analytics error:', error);
      showWarning(t('toast_messages.paywall_warning.title'), t('toast_messages.paywall_warning.message'));
      navigation.navigate('Paywall');
    }
  };

  const handleLanguageChange = async () => {
    try {
      await analytics().logEvent('language_selector_pressed', {
        screen_name: 'MainScreen',
        current_language: currentLanguage,
        timestamp: new Date().toISOString(),
      });

      Alert.alert(
        t('main.language.title'),
        t('main.language.description'),
        availableLanguages.map(lang => ({
          text: `${lang.flag} ${lang.name} ${currentLanguage === lang.code ? `(${t('main.language.current')})` : ''}`,
          onPress: async () => {
            if (currentLanguage !== lang.code) {
              await changeLanguage(lang.code);
              showSuccess(t('toast_messages.language_changed.title'), t('toast_messages.language_changed.message'));
            }
          },
        })),
        { cancelable: true }
      );
    } catch (error) {
      console.error('Language change analytics error:', error);
    }
  };

  const handleThemeChange = async () => {
    try {
      await analytics().logEvent('theme_selector_pressed', {
        screen_name: 'MainScreen',
        current_theme: mode,
        timestamp: new Date().toISOString(),
      });

      Alert.alert(
        t('main.theme.title'),
        t('main.theme.description'),
        availableThemes.map(theme => ({
          text: `${theme.icon} ${theme.name} ${mode === theme.mode ? `(${t('main.theme.current')})` : ''}`,
          onPress: async () => {
            if (mode !== theme.mode) {
              await changeTheme(theme.mode);
              showSuccess(t('toast_messages.theme_changed.title'), t('toast_messages.theme_changed.message'));
            }
          },
        })),
        { cancelable: true }
      );
    } catch (error) {
      console.error('Theme change analytics error:', error);
    }
  };

  const handleOnboardingReset = async () => {
    try {
      await analytics().logEvent('onboarding_reset_pressed', {
        screen_name: 'MainScreen',
        timestamp: new Date().toISOString(),
      });

      Alert.alert(
        t('main.onboarding.title'),
        t('main.onboarding.description'),
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Reset',
            style: 'destructive',
            onPress: async () => {
              await resetOnboarding();
              showSuccess(t('toast_messages.onboarding_reset.title'), t('toast_messages.onboarding_reset.message'));
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error('Onboarding reset analytics error:', error);
    }
  };

  const handleComponentTest = async (componentName: string) => {
    try {
      await analytics().logEvent('custom_component_test', {
        screen_name: 'MainScreen',
        component_name: componentName,
        timestamp: new Date().toISOString(),
      });

      console.log(`🎨 ${componentName} component tested successfully`);
    } catch (error) {
      console.error('Component test analytics error:', error);
    }
  };

  const features = [
    {
      id: 'admob',
      title: t('main.admob.title'),
      description: t('main.admob.description'),
      icon: 'tv-outline',
      color: 'bg-green-600',
      onPress: handleAdMobTest,
    },
    {
      id: 'analytics',
      title: t('main.analytics.title'),
      description: t('main.analytics.description'),
      icon: 'radio-outline',
      color: 'bg-orange-600',
      onPress: handleAnalyticsTest,
    },
    {
      id: 'premium',
      title: t('main.premium.title'),
      description: t('main.premium.description'),
      icon: 'diamond-outline',
      color: 'bg-purple-600',
      onPress: handlePremiumUpgrade,
    },
    {
      id: 'language',
      title: t('main.language.title'),
      description: t('main.language.description'),
      icon: 'language-outline',
      color: 'bg-blue-600',
      onPress: handleLanguageChange,
    },
    {
      id: 'theme',
      title: t('main.theme.title'),
      description: t('main.theme.description'),
      icon: isDark ? 'moon-outline' : 'sunny-outline',
      color: 'bg-indigo-600',
      onPress: handleThemeChange,
    },
    {
      id: 'onboarding',
      title: t('main.onboarding.title'),
      description: t('main.onboarding.description'),
      icon: 'play-circle-outline',
      color: 'bg-pink-600',
      onPress: handleOnboardingReset,
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}} >
      <LinearGradient
        colors={colors.gradientBackground}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{flex: 1}}>
        
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={{paddingHorizontal: 24, paddingTop: 20, paddingBottom: 24}}>
            <Text style={{
              textAlign: 'center',
              color: colors.text,
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 8
            }}>
              {t('app.title')}
            </Text>
            <Text style={{
              textAlign: 'center',
              color: colors.textSecondary,
              fontSize: 16
            }}>
              {t('app.subtitle')}
            </Text>
          </View>

          {/* Features List */}
          <View style={{paddingHorizontal: 24}}>
            <Text style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 16
            }}>
              {t('main.features_title')}
            </Text>

            {features.map((feature, index) => (
              <TouchableOpacity
                key={feature.id}
                onPress={feature.onPress}
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: colors.border,
                  shadowColor: colors.text,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isDark ? 0.1 : 0.05,
                  shadowRadius: 4,
                  elevation: 2,
                }}
                activeOpacity={0.8}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    className={`w-12 h-12 ${feature.color} rounded-lg items-center justify-center mr-4`}>
                    <Icon name={feature.icon} size={24} color="white" />
                  </View>

                  <View style={{flex: 1}}>
                    <Text style={{
                      color: colors.text,
                      fontSize: 18,
                      fontWeight: '600',
                      marginBottom: 4
                    }}>
                      {feature.title}
                    </Text>
                    <Text style={{
                      color: colors.textSecondary,
                      fontSize: 14
                    }}>
                      {feature.description}
                    </Text>
                  </View>

                  <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
                </View>
              </TouchableOpacity>
            ))}

            {/* Coming Soon Section */}
            <View style={{marginBottom: 32}}>
              <View style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
                opacity: 0.6
              }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{
                    width: 48,
                    height: 48,
                    backgroundColor: colors.border,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16
                  }}>
                    <Icon name="add-outline" size={24} color={colors.textSecondary} />
                  </View>

                  <View style={{flex: 1}}>
                    <Text style={{
                      color: colors.textSecondary,
                      fontSize: 18,
                      fontWeight: '600',
                      marginBottom: 4
                    }}>
                      {t('main.coming_soon.title')}
                    </Text>
                    <Text style={{
                      color: colors.textSecondary,
                      fontSize: 14
                    }}>
                      {t('main.coming_soon.description')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Custom Components Showcase */}
            <View style={{marginBottom: 16}}>
              <Text style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: '600',
                marginBottom: 16
              }}>
                {t('main.components.title')}
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('CustomButtonComponents')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 border border-purple-500 mb-4"
                activeOpacity={0.8}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View className="w-12 h-12 bg-purple-700 rounded-lg items-center justify-center mr-4">
                      <Icon name="cube-outline" size={24} color="white" />
                    </View>
                    <View>
                      <Text className="text-white text-lg font-semibold mb-1">
                        {t('main.components.view_all')}
                      </Text>
                      <Text className="text-purple-200 text-sm">
                        {t('main.components.description')}
                      </Text>
                    </View>
                  </View>
                  <Icon name="chevron-forward" size={20} color="#E2E8F0" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Toast Demo Section */}
            <View style={{marginBottom: 32}}>
              <Text style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: '600',
                marginBottom: 16
              }}>
                {t('main.toast.title')}
              </Text>
              <View style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: 'center'
              }}>
                <Text style={{
                  color: colors.textSecondary,
                  fontSize: 14,
                  marginBottom: 16
                }}>
                  {t('main.toast.description')}
                </Text>

                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 8,
                  justifyContent: 'center'
                }}>
                  <TouchableOpacity
                    onPress={() =>
                      showSuccess(t('main.toast.success'), t('toast_messages.demo.success'))
                    }
                    className="bg-emerald-600 px-4 py-2 rounded-lg"
                    activeOpacity={0.8}>
                    <Text className="text-white text-sm font-medium">
                      {t('main.toast.success')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => showError(t('main.toast.error'), t('toast_messages.demo.error'))}
                    className="bg-red-600 px-4 py-2 rounded-lg"
                    activeOpacity={0.8}>
                    <Text className="text-white text-sm font-medium">{t('main.toast.error')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      showWarning(t('main.toast.warning'), t('toast_messages.demo.warning'))
                    }
                    className="bg-amber-600 px-4 py-2 rounded-lg"
                    activeOpacity={0.8}>
                    <Text className="text-white text-sm font-medium">
                      {t('main.toast.warning')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      showInfo(t('main.toast.info'), t('toast_messages.demo.info'))
                    }
                    className="bg-blue-600 px-4 py-2 rounded-lg"
                    activeOpacity={0.8}>
                    <Text className="text-white text-sm font-medium">{t('main.toast.info')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default MainScreen;
