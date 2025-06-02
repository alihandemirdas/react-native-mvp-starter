import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import GradientButton from '../components/GradientButton';
import GlassButton from '../components/GlassButton';

interface CustomButtonComponentsProps {
  navigation: any;
}

const CustomButtonComponents: React.FC<CustomButtonComponentsProps> = ({navigation}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  const handleClose = async () => {
    try {
      await analytics().logEvent('custom_components_modal_closed', {
        action: 'close_button',
        screen_name: 'CustomButtonComponents',
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
    navigation.goBack();
  };

  const handleComponentTest = async (componentName: string) => {
    try {
      await analytics().logEvent('custom_component_test', {
        screen_name: 'CustomButtonComponents',
        component_name: componentName,
        timestamp: new Date().toISOString(),
      });

      console.log(`🎨 ${componentName} component tested successfully`);
    } catch (error) {
      console.error('Component test analytics error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center p-6">
          <Text className="text-white text-xl font-bold">Custom Components</Text>
          <TouchableOpacity
            onPress={handleClose}
            className="w-8 h-8 bg-gray-700 rounded-full items-center justify-center">
            <Icon name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="px-6">
          <Text className="text-gray-400 text-sm mb-6">
            Reusable components with TypeScript support and customizable styles
          </Text>

          {/* Button Component */}
          <View className="mb-6">
            <Text className="text-white text-base font-semibold mb-3">
              ⌨️ Button Component
            </Text>
            <View className="gap-y-2">
              <Button
                variant="primary"
                size="md"
                icon="rocket-outline"
                onPress={() => handleComponentTest('Button Primary')}>
                Primary Button
              </Button>

              <Button
                variant="secondary"
                size="md"
                icon="settings-outline"
                onPress={() => handleComponentTest('Button Secondary')}>
                Secondary Button
              </Button>

              <Button
                variant="animated"
                size="lg"
                icon="flash-outline"
                onPress={() => handleComponentTest('Button Animated')}
                className="mb-2">
                Animated Button
              </Button>
            </View>
          </View>

          {/* GradientButton Component */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-white text-base font-semibold">
                🌈 GradientButton Component
              </Text>
              <TouchableOpacity
                onPress={() => setIsAnimated(!isAnimated)}
                className={`px-3 py-1 rounded-full border ${
                  isAnimated 
                    ? 'bg-purple-600 border-purple-500' 
                    : 'bg-gray-700 border-gray-600'
                }`}
                activeOpacity={0.8}>
                <View className="flex-row items-center">
                  <Icon 
                    name={isAnimated ? "flash" : "flash-outline"} 
                    size={14} 
                    color={isAnimated ? "#FFFFFF" : "#9CA3AF"} 
                    style={{ marginRight: 4 }}
                  />
                  <Text className={`text-xs font-medium ${
                    isAnimated ? 'text-white' : 'text-gray-400'
                  }`}>
                    Animation
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="gap-y-2">
              {isAnimated ? (
                // Animated versions
                <>
                  <GradientButton
                    variant="cosmic"
                    size="sm"
                    icon="planet-outline"
                    animationType="rotate"
                    onPress={() => handleComponentTest('GradientButton Cosmic Rotate')}>
                    Cosmic Rotate
                  </GradientButton>

                  <GradientButton
                    variant="neon"
                    size="md"
                    icon="flash-outline"
                    animationType='wave'
                    onPress={() => handleComponentTest('GradientButton Neon')}>
                    Neon Wave
                  </GradientButton>

                  <GradientButton
                    variant="aurora"
                    size="md"
                    icon="flash-outline"
                    animationType="pulse"
                    onPress={() => handleComponentTest('GradientButton Neon Pulse')}>
                    Aurora Pulse
                  </GradientButton>

                  <GradientButton
                    variant="fire"
                    size="md"
                    icon="water-outline"
                    animationType="flow"
                    onPress={() => handleComponentTest('GradientButton Aurora Wave')}>
                    Fire Flow
                  </GradientButton>

                  <GradientButton
                    variant="ocean"
                    size="lg"
                    icon="flame-outline"
                    animationType="flicker"
                    onPress={() => handleComponentTest('GradientButton Fire Flicker')}>
                    Ocean Flicker
                  </GradientButton>
                </>
              ) : (
                // Static versions
                <>
                  <GradientButton
                    variant="cosmic"
                    size="sm"
                    icon="planet-outline"
                    animationType="none"
                    onPress={() => handleComponentTest('GradientButton Cosmic')}>
                    Cosmic Static
                  </GradientButton>

                  <GradientButton
                    variant="neon"
                    size="md"
                    icon="flash-outline"
                    animationType="none"
                    onPress={() => handleComponentTest('GradientButton Neon')}>
                    Neon Static
                  </GradientButton>

                  <GradientButton
                    variant="aurora"
                    size="md"
                    icon="snow-outline"
                    animationType="none"
                    onPress={() => handleComponentTest('GradientButton Aurora')}>
                    Aurora Static
                  </GradientButton>

                  <GradientButton
                    variant="fire"
                    size="md"
                    icon="flame-outline"
                    animationType="none"
                    onPress={() => handleComponentTest('GradientButton Fire')}>
                    Fire Static
                  </GradientButton>

                  <GradientButton
                    variant="ocean"
                    size="lg"
                    icon="water-outline"
                    animationType="none"
                    onPress={() => handleComponentTest('GradientButton Ocean')}>
                    Ocean Static
                  </GradientButton>
                </>
              )}
            </View>
          </View>

          {/* GlassButton Component */}
          <View className="mb-8">
            <Text className="text-white text-base font-semibold mb-3">
              🪟 GlassButton Component
            </Text>
            <View className="gap-y-2">
              <GlassButton
                variant="default"
                size="md"
                icon="eye-outline"
                glassIntensity="medium"
                onPress={() => handleComponentTest('GlassButton Default')}>
                Glass Default
              </GlassButton>

              <GlassButton
                variant="primary"
                size="md"
                icon="water-outline"
                glassIntensity="heavy"
                onPress={() => handleComponentTest('GlassButton Primary')}>
                Glass Primary
              </GlassButton>

              <GlassButton
                variant="accent"
                size="lg"
                icon="leaf-outline"
                glassIntensity="light"
                onPress={() => handleComponentTest('GlassButton Accent')}>
                Glass Accent
              </GlassButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomButtonComponents; 