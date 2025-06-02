import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLanguage} from '../contexts/LanguageContext';
import {useTheme} from '../contexts/ThemeContext';
import {useOnboarding} from '../contexts/OnboardingContext';
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const {width: screenWidth} = Dimensions.get('window');

interface OnboardingPage {
  key: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  icon: string;
  colors: string[];
}

const OnboardingScreen: React.FC = () => {
  const {t} = useLanguage();
  const {colors, isDark} = useTheme();
  const {completeOnboarding} = useOnboarding();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const pages: OnboardingPage[] = [
    {
      key: 'welcome',
      titleKey: 'onboarding.welcome.title',
      subtitleKey: 'onboarding.welcome.subtitle',
      descriptionKey: 'onboarding.welcome.description',
      icon: 'rocket-outline',
      colors: ['#8B5CF6', '#EC4899'],
    },
    {
      key: 'features',
      titleKey: 'onboarding.features.title',
      subtitleKey: 'onboarding.features.subtitle',
      descriptionKey: 'onboarding.features.description',
      icon: 'flash-outline',
      colors: ['#06B6D4', '#3B82F6'],
    },
    {
      key: 'customization',
      titleKey: 'onboarding.customization.title',
      subtitleKey: 'onboarding.customization.subtitle',
      descriptionKey: 'onboarding.customization.description',
      icon: 'color-palette-outline',
      colors: ['#10B981', '#059669'],
    },
    {
      key: 'ready',
      titleKey: 'onboarding.ready.title',
      subtitleKey: 'onboarding.ready.subtitle',
      descriptionKey: 'onboarding.ready.description',
      icon: 'checkmark-circle-outline',
      colors: ['#F59E0B', '#EF4444'],
    },
  ];

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffsetX / screenWidth);
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      const nextPage = currentPage + 1;
      scrollViewRef.current?.scrollTo({
        x: nextPage * screenWidth,
        animated: true,
      });
      setCurrentPage(nextPage);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = async () => {
    try {
      await analytics().logEvent('onboarding_skipped', {
        current_page: currentPage,
        total_pages: pages.length,
      });
      handleGetStarted();
    } catch (error) {
      console.error('Skip onboarding analytics error:', error);
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    try {
      await analytics().logEvent('onboarding_completed', {
        completed_pages: currentPage + 1,
        total_pages: pages.length,
      });
      await completeOnboarding();
    } catch (error) {
      console.error('Complete onboarding analytics error:', error);
      await completeOnboarding();
    }
  };

  const renderPage = (page: OnboardingPage, index: number) => (
    <View
      key={page.key}
      style={{
        width: screenWidth,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* Icon with Gradient Background */}
      <View style={{marginBottom: 48}}>
        <LinearGradient
          colors={page.colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: page.colors[0],
            shadowOffset: {width: 0, height: 8},
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}>
          <Icon name={page.icon} size={48} color="white" />
        </LinearGradient>
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: colors.text,
          textAlign: 'center',
          marginBottom: 16,
          lineHeight: 34,
        }}>
        {t(page.titleKey)}
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: colors.primary,
          textAlign: 'center',
          marginBottom: 24,
        }}>
        {t(page.subtitleKey)}
      </Text>

      {/* Description */}
      <Text
        style={{
          fontSize: 16,
          color: colors.textSecondary,
          textAlign: 'center',
          lineHeight: 24,
          maxWidth: 300,
        }}>
        {t(page.descriptionKey)}
      </Text>
    </View>
  );

  const renderDots = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 32,
      }}>
      {pages.map((_, index) => (
        <Animated.View
          key={index}
          style={{
            width: currentPage === index ? 24 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              currentPage === index ? colors.primary : colors.border,
            marginHorizontal: 4,
            opacity: fadeAnim,
          }}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}>
        <View style={{width: 60}} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.textSecondary,
          }}>
          {currentPage + 1} / {pages.length}
        </Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: colors.primary,
            }}>
            {t('onboarding.skip')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Pages */}
      <Animated.View style={{flex: 1, opacity: fadeAnim}}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={false}>
          {pages.map((page, index) => renderPage(page, index))}
        </ScrollView>
      </Animated.View>

      {/* Dots Indicator */}
      {renderDots()}

      {/* Bottom Buttons */}
      <View style={{paddingHorizontal: 32, paddingBottom: 32}}>
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 32,
            alignItems: 'center',
            shadowColor: colors.primary,
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
          activeOpacity={0.8}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                marginRight: 8,
              }}>
              {currentPage === pages.length - 1
                ? t('onboarding.get_started')
                : t('onboarding.next')}
            </Text>
            <Icon
              name={
                currentPage === pages.length - 1
                  ? 'checkmark-outline'
                  : 'arrow-forward-outline'
              }
              size={20}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen; 