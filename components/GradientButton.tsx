import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

// Types for extensibility
export type GradientVariant = 'cosmic' | 'neon' | 'aurora' | 'fire' | 'ocean';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type AnimationType = 'none' | 'rotate' | 'pulse' | 'wave' | 'flicker' | 'flow' | 'auto';

export interface GradientButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  children: React.ReactNode;
  variant?: GradientVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  animationType?: AnimationType;
  onPress?: () => void;
}

// Gradient color definitions - easily extensible
const GRADIENT_COLORS: Record<GradientVariant, string[]> = {
  cosmic: ['#667eea', '#764ba2', '#f093fb'],
  neon: ['#ff006e', '#8338ec', '#3a86ff'],
  aurora: ['#00f5ff', '#00d4aa', '#007cf0'],
  fire: ['#ff6b6b', '#ee5a24', '#feca57'],
  ocean: ['#2563eb', '#1e40af', '#1d4ed8'],
};

// Size configurations - easily extensible
const SIZE_CONFIG: Record<ButtonSize, {
  paddingHorizontal: number;
  paddingVertical: number;
  borderRadius: number;
  fontSize: number;
  iconSize: number;
  minHeight: number;
  fontWeight: '400' | '500' | '600' | '700' | '800' | '900';
}> = {
  sm: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 8,
    fontSize: 14,
    iconSize: 16,
    minHeight: 32,
    fontWeight: '600',
  },
  md: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 12,
    fontSize: 16,
    iconSize: 20,
    minHeight: 44,
    fontWeight: '600',
  },
  lg: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 18,
    fontSize: 18,
    iconSize: 24,
    minHeight: 52,
    fontWeight: '700',
  },
};

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'cosmic',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  animationType = 'auto',
  onPress,
  ...props
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const [currentAnimValue, setCurrentAnimValue] = useState(0);
  const [currentRotateValue, setCurrentRotateValue] = useState(0);

  const sizeConfig = SIZE_CONFIG[size];
  const gradientColors = GRADIENT_COLORS[variant];

  // Determine animation type based on variant if auto
  const getEffectiveAnimationType = (): AnimationType => {
    if (animationType !== 'auto') return animationType;
    
    const autoAnimations: Record<GradientVariant, AnimationType> = {
      cosmic: 'rotate',
      neon: 'pulse',
      aurora: 'wave',
      fire: 'flicker',
      ocean: 'flow',
    };
    
    return autoAnimations[variant];
  };

  const effectiveAnimationType = getEffectiveAnimationType();

  // Animated gradient effects
  useEffect(() => {
    if (effectiveAnimationType !== 'none' && !disabled) {
      const animations: Animated.CompositeAnimation[] = [];

      // Rotation animation for cosmic
      if (effectiveAnimationType === 'rotate') {
        const rotateListener = rotateValue.addListener(({ value }) => {
          setCurrentRotateValue(value);
        });
        
        animations.push(
          Animated.loop(
            Animated.timing(rotateValue, {
              toValue: 1,
              duration: 8000,
              useNativeDriver: false,
            })
          )
        );
      }

      // Pulse animation for neon
      if (effectiveAnimationType === 'pulse') {
        const pulseListener = pulseValue.addListener(({ value }) => {
          setCurrentAnimValue(value);
        });
        
        animations.push(
          Animated.loop(
            Animated.sequence([
              Animated.timing(pulseValue, {
                toValue: 1.3,
                duration: 1200,
                useNativeDriver: false,
              }),
              Animated.timing(pulseValue, {
                toValue: 0.8,
                duration: 1200,
                useNativeDriver: false,
              }),
            ])
          )
        );
      }

      // Wave, Flicker, Flow animations
      if (['wave', 'flicker', 'flow'].includes(effectiveAnimationType)) {
        const animListener = animatedValue.addListener(({ value }) => {
          setCurrentAnimValue(value);
        });

        if (effectiveAnimationType === 'wave') {
          animations.push(
            Animated.loop(
              Animated.sequence([
                Animated.timing(animatedValue, {
                  toValue: 1,
                  duration: 4000,
                  useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                  toValue: 0,
                  duration: 4000,
                  useNativeDriver: false,
                }),
              ])
            )
          );
        }

        if (effectiveAnimationType === 'flicker') {
          animations.push(
            Animated.loop(
              Animated.sequence([
                Animated.timing(animatedValue, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                  toValue: 0.7,
                  duration: 200,
                  useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                  toValue: 1,
                  duration: 400,
                  useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                  toValue: 0.8,
                  duration: 150,
                  useNativeDriver: false,
                }),
              ])
            )
          );
        }

        if (effectiveAnimationType === 'flow') {
          animations.push(
            Animated.loop(
              Animated.sequence([
                Animated.timing(animatedValue, {
                  toValue: 1,
                  duration: 3000,
                  useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                  toValue: 0,
                  duration: 3000,
                  useNativeDriver: false,
                }),
              ])
            )
          );
        }
      }

      // Start all animations
      animations.forEach(animation => animation.start());

      return () => {
        animations.forEach(animation => animation.stop());
        rotateValue.removeAllListeners();
        animatedValue.removeAllListeners();
      };
    }
  }, [effectiveAnimationType, disabled, animatedValue, rotateValue, pulseValue]);

  // Press animation
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  // Dynamic gradient colors for animation
  const getAnimatedColors = () => {
    if (effectiveAnimationType === 'none') return gradientColors;

    const colors = [...gradientColors];
    
    // Different color manipulation based on animation type
    switch (effectiveAnimationType) {
      case 'pulse':
        // Pulse effect with brightness pulsing
        const intensity = (currentAnimValue - 0.8) / 0.5; // 0.8-1.3 arasını 0-1 yapar
        const brightness = Math.max(0.6, Math.min(1.4, 1 + intensity * 0.4));
        return colors.map(color => {
          // RGB değerlerini parçala ve parlaklığı artır
          const r = Math.min(255, Math.floor(parseInt(color.slice(1, 3), 16) * brightness));
          const g = Math.min(255, Math.floor(parseInt(color.slice(3, 5), 16) * brightness));
          const b = Math.min(255, Math.floor(parseInt(color.slice(5, 7), 16) * brightness));
          return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        });
        
      case 'flicker':
        // Flicker effect with brightness variation
        const opacity = currentAnimValue * 0.3 + 0.7;
        return colors.map(color => {
          const alpha = Math.floor(opacity * 255).toString(16).padStart(2, '0');
          return color + alpha;
        });
        
      case 'flow':
        // Flow effect with color shifting
        const shift = currentAnimValue;
        const shiftedColors = [...colors];
        if (shift > 0.5) {
          shiftedColors.reverse();
        }
        return shiftedColors;
        
      default:
        return colors;
    }
  };

  // Dynamic gradient positions for animation
  const getAnimatedGradientProps = () => {
    if (effectiveAnimationType === 'none') {
      return {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };
    }

    switch (effectiveAnimationType) {
      case 'rotate':
        // Yumuşak rotating gradient
        const rotation = currentRotateValue * 2 * Math.PI;
        const smoothFactor = 0.3; // Daha yumuşak hareket
        return {
          start: { 
            x: 0.5 + Math.cos(rotation) * smoothFactor, 
            y: 0.5 + Math.sin(rotation) * smoothFactor 
          },
          end: { 
            x: 0.5 - Math.cos(rotation) * smoothFactor, 
            y: 0.5 - Math.sin(rotation) * smoothFactor 
          },
        };

      case 'wave':
        // Yumuşak wave effect
        const wave = (Math.sin(currentAnimValue * Math.PI * 2) + 1) / 2; // 0-1 arası sinüs
        return {
          start: { x: wave * 0.3, y: 0 },
          end: { x: 1 - wave * 0.3, y: 1 },
          locations: [0, 0.5, 1],
        };

      case 'flow':
        // Belirgin flow effect
        const flow = currentAnimValue;
        return {
          start: { x: flow * 0.5, y: flow * 0.3 },
          end: { x: 1 - flow * 0.5, y: 1 - flow * 0.3 },
          locations: [0, flow * 0.4 + 0.3, 1],
        };

      default:
        return {
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 },
        };
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    const iconMargin = iconPosition === 'left' ? { marginRight: 8 } : { marginLeft: 8 };

    return (
      <Icon
        name={icon}
        size={sizeConfig.iconSize}
        color="#FFFFFF"
        style={iconMargin}
      />
    );
  };

  const containerStyle = [
    styles.container,
    {
      borderRadius: sizeConfig.borderRadius,
      minHeight: sizeConfig.minHeight,
      opacity: disabled ? 0.6 : 1,
    },
  ];

  const gradientStyle = [
    styles.gradient,
    {
      paddingHorizontal: sizeConfig.paddingHorizontal,
      paddingVertical: sizeConfig.paddingVertical,
      borderRadius: sizeConfig.borderRadius,
      minHeight: sizeConfig.minHeight,
    },
  ];

  const textStyle = [
    styles.text,
    {
      fontSize: sizeConfig.fontSize,
      fontWeight: sizeConfig.fontWeight,
      lineHeight: sizeConfig.fontSize * 1.2,
    },
  ];

  return (
    <Animated.View style={[containerStyle, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        {...props}
        activeOpacity={0.8}
        disabled={disabled || loading}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <LinearGradient
          colors={getAnimatedColors()}
          style={gradientStyle}
          {...getAnimatedGradientProps()}
        >
          <View style={styles.content}>
            {iconPosition === 'left' && renderIcon()}
            
            <Text style={textStyle}>
              {loading ? 'Loading...' : children}
            </Text>
            
            {iconPosition === 'right' && renderIcon()}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  touchable: {
    borderRadius: 16,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
    textAlignVertical: 'center',
    flexShrink: 1,
  },
});

export default GradientButton;
