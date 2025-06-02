import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View, Animated } from 'react-native';
import { cn } from '../utils/cn';
import Icon from 'react-native-vector-icons/Ionicons';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'animated' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
  textClassName?: string;
  activeOpacity?: number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  textClassName,
  activeOpacity = 0.8,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (variant === 'animated') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.03,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    if (variant === 'glow') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 0.8,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.3,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [variant, pulseAnim, glowAnim]);

  const getButtonStyles = () => {
    const baseStyles = 'rounded-xl items-center justify-center flex-row';
    
    const sizeStyles = {
      sm: 'px-4 py-2',
      md: 'px-6 py-3',
      lg: 'px-8 py-4',
    };

    const variantStyles = {
      primary: 'bg-blue-600',
      secondary: 'bg-gray-800 border-2 border-purple-500',
      tertiary: 'bg-transparent border border-gray-600',
      animated: 'bg-purple-600',
      glow: 'bg-emerald-600',
    };

    const disabledStyles = disabled ? 'opacity-50' : '';

    return cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      disabledStyles,
      className
    );
  };

  const getTextStyles = () => {
    const baseTextStyles = 'font-semibold text-center';
    
    const sizeTextStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const variantTextStyles = {
      primary: 'text-white',
      secondary: 'text-white',
      tertiary: 'text-gray-300',
      animated: 'text-white',
      glow: 'text-white',
    };

    return cn(
      baseTextStyles,
      sizeTextStyles[size],
      variantTextStyles[variant],
      textClassName
    );
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;
    
    return (
      <Icon 
        name={icon} 
        size={iconSize} 
        color="white" 
        style={{ marginRight: iconPosition === 'left' ? 8 : 0, marginLeft: iconPosition === 'right' ? 8 : 0 }}
      />
    );
  };

  const ButtonWrapper = ({ children }: { children: React.ReactNode }) => {
    if (variant === 'animated') {
      return (
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          {children}
        </Animated.View>
      );
    }

    if (variant === 'glow') {
      return (
        <View>
          <Animated.View
            style={{
              position: 'absolute',
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              backgroundColor: '#10b981',
              borderRadius: 20,
              opacity: glowAnim,
            }}
          />
          {children}
        </View>
      );
    }

    return <>{children}</>;
  };

  return (
    <ButtonWrapper>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={activeOpacity}
        className={getButtonStyles()}
      >
        <View className="flex-row items-center justify-center">
          {iconPosition === 'left' && renderIcon()}
          
          <Text className={getTextStyles()}>
            {loading ? 'Loading...' : children}
          </Text>
          
          {iconPosition === 'right' && renderIcon()}
        </View>
      </TouchableOpacity>
    </ButtonWrapper>
  );
};

export default Button;
