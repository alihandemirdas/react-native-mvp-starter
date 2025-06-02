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

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleClose = async () => {
    try {
      await analytics().logEvent('register_screen_closed', {
        screen_name: 'RegisterScreen',
        action: 'close_button',
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
    navigation.goBack();
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to Terms & Conditions.');
      return;
    }

    try {
      setIsLoading(true);
      
      await analytics().logEvent('registration_attempt', {
        screen_name: 'RegisterScreen',
        method: 'email',
        timestamp: new Date().toISOString(),
      });

      // Simulate registration process
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          'Registration Successful!',
          'Your account has been created successfully. Welcome!',
          [
            {
              text: 'Continue',
              onPress: () => {
                analytics().logEvent('registration_success', {
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
      console.error('Registration error:', error);
    }
  };

  const handleSocialRegister = async (provider: string) => {
    try {
      await analytics().logEvent('social_register_attempt', {
        screen_name: 'RegisterScreen',
        provider: provider,
      });
      
      Alert.alert(
        'Social Registration',
        `${provider} registration will be available in the next update.`,
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

          {/* Register Icon */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-green-600 rounded-full items-center justify-center mb-4">
              <Icon name="person-add" size={32} color="white" />
            </View>
            <Text className="text-white text-3xl font-bold mb-2">
              Create Account
            </Text>
            <Text className="text-gray-400 text-center text-base">
              Join us today and unlock amazing features
            </Text>
          </View>

          {/* Registration Form */}
          <View className="px-6">
            {/* Full Name Input */}
            <View className="mb-4">
              <Text className="text-white text-sm font-medium mb-2">
                Full Name
              </Text>
              <View className="bg-gray-700 rounded-lg border border-gray-600">
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                  className="text-white px-4 py-3 text-base"
                />
              </View>
            </View>

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
            <View className="mb-4">
              <Text className="text-white text-sm font-medium mb-2">
                Password
              </Text>
              <View className="bg-gray-700 rounded-lg border border-gray-600 flex-row items-center">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
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

            {/* Confirm Password Input */}
            <View className="mb-6">
              <Text className="text-white text-sm font-medium mb-2">
                Confirm Password
              </Text>
              <View className="bg-gray-700 rounded-lg border border-gray-600 flex-row items-center">
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  className="text-white px-4 py-3 text-base flex-1"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="px-4"
                >
                  <Icon 
                    name={showConfirmPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#9CA3AF" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms & Conditions */}
            <TouchableOpacity
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              className="flex-row items-center mb-6"
            >
              <View className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                agreeToTerms ? 'bg-green-600 border-green-600' : 'border-gray-400'
              }`}>
                {agreeToTerms && (
                  <Icon name="checkmark" size={12} color="white" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-gray-300 text-sm">
                  I agree to the{' '}
                  <Text className="text-green-400 underline">Terms & Conditions</Text>
                  {' '}and{' '}
                  <Text className="text-green-400 underline">Privacy Policy</Text>
                </Text>
              </View>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading || !fullName || !email || !password || !confirmPassword || !agreeToTerms}
              className={`py-4 rounded-lg mb-6 ${
                isLoading || !fullName || !email || !password || !confirmPassword || !agreeToTerms
                  ? 'bg-gray-600'
                  : 'bg-green-600'
              }`}
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-bold text-lg">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-600" />
              <Text className="text-gray-400 px-4 text-sm">or</Text>
              <View className="flex-1 h-px bg-gray-600" />
            </View>

            {/* Social Register Buttons */}
            <View className="gap-y-2 mb-8">
              <TouchableOpacity
                onPress={() => handleSocialRegister('Google')}
                className="bg-red-600 py-3 rounded-lg flex-row items-center justify-center"
                activeOpacity={0.8}
              >
                <Icon name="logo-google" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSocialRegister('Apple')}
                className="bg-black py-3 rounded-lg flex-row items-center justify-center border border-gray-700"
                activeOpacity={0.8}
              >
                <Icon name="logo-apple" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">
                  Continue with Apple
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View className="flex-row justify-center mb-8">
              <Text className="text-gray-400 text-sm">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text className="text-green-400 text-sm font-semibold">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
