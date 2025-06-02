import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/Ionicons';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = async () => {
    try {
      await analytics().logEvent('login_screen_closed', {
        screen_name: 'LoginScreen',
        action: 'close_button',
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
    navigation.goBack();
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      
      await analytics().logEvent('login_attempt', {
        screen_name: 'LoginScreen',
        method: 'email',
        timestamp: new Date().toISOString(),
      });

      // Simulate login process
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          'Login Successful!',
          'Welcome back! You have been logged in successfully.',
          [
            {
              text: 'Continue',
              onPress: () => {
                analytics().logEvent('login_success', {
                  method: 'email',
                  user_email: email,
                });
                navigation.goBack();
              }
            }
          ]
        );
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await analytics().logEvent('forgot_password_pressed', {
        screen_name: 'LoginScreen',
      });
      
      Alert.alert(
        'Forgot Password',
        'Password reset functionality will be available in the next update.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      await analytics().logEvent('social_login_attempt', {
        screen_name: 'LoginScreen',
        provider: provider,
      });
      
      Alert.alert(
        'Social Login',
        `${provider} login will be available in the next update.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row justify-between items-center p-6">
            <View />
            <TouchableOpacity
              onPress={handleClose}
              className="w-8 h-8 bg-gray-700 rounded-full items-center justify-center"
            >
              <Icon name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Login Icon */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
              <Icon name="log-in" size={32} color="white" />
            </View>
            <Text className="text-white text-3xl font-bold mb-2">
              Welcome Back
            </Text>
            <Text className="text-gray-400 text-center text-base">
              Sign in to your account to continue
            </Text>
          </View>

          {/* Login Form */}
          <View className="px-6">
            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-white text-sm font-medium mb-2">
                Email Address
              </Text>
              <View className="bg-gray-700 rounded-lg border border-gray-600">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="text-white px-4 py-3 text-base"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-white text-sm font-medium mb-2">
                Password
              </Text>
              <View className="bg-gray-700 rounded-lg border border-gray-600 flex-row items-center">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  className="text-white px-4 py-3 text-base flex-1"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="px-4"
                >
                  <Icon 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#9CA3AF" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              className="mb-6"
            >
              <Text className="text-blue-400 text-sm text-right">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading || !email || !password}
              className={`py-4 rounded-lg mb-6 ${
                isLoading || !email || !password
                  ? 'bg-gray-600'
                  : 'bg-blue-600'
              }`}
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-bold text-lg">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-600" />
              <Text className="text-gray-400 px-4 text-sm">or</Text>
              <View className="flex-1 h-px bg-gray-600" />
            </View>

            {/* Social Login Buttons */}
            <View className="gap-y-2 mb-8">
              <TouchableOpacity
                onPress={() => handleSocialLogin('Google')}
                className="bg-red-600 py-3 rounded-lg flex-row items-center justify-center"
                activeOpacity={0.8}
              >
                <Icon name="logo-google" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSocialLogin('Apple')}
                className="bg-black py-3 rounded-lg flex-row items-center justify-center border border-gray-700"
                activeOpacity={0.8}
              >
                <Icon name="logo-apple" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">
                  Continue with Apple
                </Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="flex-row justify-center">
              <Text className="text-gray-400 text-sm">
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
              >
                <Text className="text-blue-400 text-sm font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
