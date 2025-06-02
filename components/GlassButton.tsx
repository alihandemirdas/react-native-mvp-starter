// components/GlassButton.tsx
// Glass Button = Glassmorphism Design
// Özellikler:
// - Şeffaf/yarı şeffaf arka plan
// - Blur efekti (cam gibi)
// - Subtle border
// - Shadow efektleri
// - Modern, minimal tasarım

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { cn } from '../utils/cn';
import Icon from 'react-native-vector-icons/Ionicons';

export interface GlassButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
  textClassName?: string;
  activeOpacity?: number;
  glassIntensity?: 'light' | 'medium' | 'heavy';
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  textClassName,
  activeOpacity = 0.7,
  glassIntensity = 'medium',
}) => {
  const getBackgroundColor = () => {
    const intensityOpacities = {
      light: 0.1,
      medium: 0.2,
      heavy: 0.3,
    };
    
    const colors = {
      default: 'rgba(255, 255, 255,',
      primary: 'rgba(59, 130, 246,', // blue-500
      secondary: 'rgba(147, 51, 234,', // purple-500
      accent: 'rgba(16, 185, 129,', // emerald-500
    };
    
    return `${colors[variant]} ${intensityOpacities[glassIntensity]})`;
  };

  const getBorderColor = () => {
    const colors = {
      default: 'rgba(255, 255, 255, 0.3)',
      primary: 'rgba(59, 130, 246, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.4)',
      accent: 'rgba(16, 185, 129, 0.4)',
    };
    return colors[variant];
  };

  const getTextColor = () => {
    const colors = {
      default: '#ffffff',
      primary: '#dbeafe', // blue-100
      secondary: '#ede9fe', // purple-100
      accent: '#d1fae5', // emerald-100
    };
    return colors[variant];
  };

  const getSizeStyles = () => {
    const styles = {
      sm: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
      md: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
      lg: { paddingHorizontal: 32, paddingVertical: 16, borderRadius: 24 },
    };
    return styles[size];
  };

  const getTextSize = () => {
    const sizes = {
      sm: 14,
      md: 16,
      lg: 18,
    };
    return sizes[size];
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;
    
    return (
      <Icon 
        name={icon} 
        size={iconSize} 
        color={getTextColor()}
        style={{ 
          marginRight: iconPosition === 'left' ? 8 : 0, 
          marginLeft: iconPosition === 'right' ? 8 : 0 
        }}
      />
    );
  };

  return (
    <View className={cn('relative', className)}>
      {/* Glow/Shadow effect */}
      <View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: getSizeStyles().borderRadius,
          shadowColor: variant === 'default' ? '#ffffff' : 
                      variant === 'primary' ? '#3b82f6' :
                      variant === 'secondary' ? '#9333ea' : '#10b981',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 8,
        }}
      />
      
      {/* Ana Glass Button */}
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={activeOpacity}
        style={[
          getSizeStyles(),
          {
            backgroundColor: getBackgroundColor(),
            borderWidth: 1,
            borderColor: getBorderColor(),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabled ? 0.5 : 1,
            // Backdrop blur React Native'de desteklenmediği için kaldırıldı
            // Bunun yerine şeffaf renk kullanıyoruz
          },
        ]}
      >
        {iconPosition === 'left' && renderIcon()}
        
        <Text
          style={{
            fontSize: getTextSize(),
            fontWeight: '600',
            color: getTextColor(),
            textAlign: 'center',
          }}
          className={textClassName}
        >
          {loading ? 'Loading...' : children}
        </Text>
        
        {iconPosition === 'right' && renderIcon()}
      </TouchableOpacity>
    </View>
  );
};

export default GlassButton; 