import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import analytics from '@react-native-firebase/analytics';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';

interface PaywallProps {
  navigation: any;
}

const Paywall: React.FC<PaywallProps> = ({navigation}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>(
    'yearly',
  );

  const handleClose = async () => {
    try {
      await analytics().logEvent('paywall_closed', {
        action: 'close_button',
        selected_plan: selectedPlan,
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
    navigation.goBack();
  };

  const handlePurchase = async () => {
    try {
      await analytics().logEvent('paywall_purchase_attempt', {
        plan: selectedPlan,
        price: selectedPlan === 'monthly' ? 9.99 : 59.99,
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }

    Alert.alert(
      'Purchase Successful!',
      `You've subscribed to the ${selectedPlan} plan. Welcome to Premium!`,
      [{text: 'Continue', onPress: () => navigation.goBack()}],
    );
  };

  const features = [
    {
      icon: 'remove-circle-outline',
      text: 'Remove all advertisements',
      premium: true,
    },
    {
      icon: 'analytics-outline',
      text: 'Advanced analytics & insights',
      premium: true,
    },
    {
      icon: 'cloud-upload-outline',
      text: 'Unlimited cloud storage',
      premium: true,
    },
    {
      icon: 'shield-checkmark-outline',
      text: 'Priority customer support',
      premium: true,
    },
    {
      icon: 'rocket-outline',
      text: 'Early access to new features',
      premium: true,
    },
    {
      icon: 'lock-open-outline',
      text: 'Unlock all premium content',
      premium: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center p-6">
          <View />
          <TouchableOpacity
            onPress={handleClose}
            className="w-8 h-8 bg-gray-700 rounded-full items-center justify-center">
            <Icon name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Premium Badge */}
        <View className="items-center mb-8">
          <View className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full">
            <Text className="text-white font-bold text-lg">✨ PREMIUM</Text>
          </View>
        </View>

        {/* Title */}
        <View className="px-6 mb-8">
          <Text className="text-white text-3xl font-bold text-center mb-2">
            Unlock Premium Features
          </Text>
          <Text className="text-gray-300 text-center text-lg">
            Get unlimited access to all features and remove ads forever
          </Text>
        </View>

        {/* Features List */}
        <View className="px-8 mb-8">
          {features.map((feature, index) => (
            <View key={index} className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mr-4">
                <Icon name="checkmark" size={16} color="white" />
              </View>
              <Text className="text-white text-lg flex-1">{feature.text}</Text>
            </View>
          ))}
        </View>

        {/* Pricing Plans */}
        <View className="px-8 mb-8">
          <Text className="text-white text-xl font-bold mb-4 text-center">
            Choose Your Plan
          </Text>

          {/* Yearly Plan */}
          <TouchableOpacity
            onPress={() => setSelectedPlan('yearly')}
            className={`p-4 rounded-xl mb-4 border-2 ${
              selectedPlan === 'yearly'
                ? 'bg-purple-600 border-purple-400'
                : 'bg-gray-700 border-gray-600'
            }`}>
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="text-white text-lg font-bold">Yearly</Text>
                  <View className="bg-green-500 px-2 py-1 rounded ml-2">
                    <Text className="text-white text-xs font-bold">
                      SAVE 50%
                    </Text>
                  </View>
                </View>
                <Text className="text-gray-300">$59.99/year</Text>
                <Text className="text-gray-400 text-sm">Just $4.99/month</Text>
              </View>
              <View
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedPlan === 'yearly'
                    ? 'bg-white border-white'
                    : 'border-gray-400'
                }`}>
                {selectedPlan === 'yearly' && (
                  <View className="w-2 h-2 bg-purple-600 rounded-full self-center mt-1" />
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Monthly Plan */}
          <TouchableOpacity
            onPress={() => setSelectedPlan('monthly')}
            className={`p-4 rounded-xl border-2 ${
              selectedPlan === 'monthly'
                ? 'bg-purple-600 border-purple-400'
                : 'bg-gray-700 border-gray-600'
            }`}>
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-white text-lg font-bold">Monthly</Text>
                <Text className="text-gray-300">$9.99/month</Text>
              </View>
              <View
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedPlan === 'monthly'
                    ? 'bg-white border-white'
                    : 'border-gray-400'
                }`}>
                {selectedPlan === 'monthly' && (
                  <View className="w-2 h-2 bg-purple-600 rounded-full self-center mt-1" />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View className="px-8 mb-8">
          <Button
            variant="animated"
            size="lg"
            icon="flash-outline"
            activeOpacity={0.8}
            onPress={handlePurchase}
            className="mb-2 rounded-3xl bg-blue-400">
            <View>
              <Text className="text-white text-center font-bold text-lg">
                Start {selectedPlan === 'yearly' ? '1 Year' : '1 Month'} Premium
              </Text>
              <Text className="text-purple-100 text-center text-sm mt-1">
                Cancel anytime • No commitment
              </Text>
            </View>
          </Button>
        </View>

        {/* Footer */}
        <View className="px-6 pb-8">
          <Text className="text-gray-400 text-center text-xs mb-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
            Subscription automatically renews unless auto-renew is turned off.
          </Text>

          <View className="flex-row justify-center space-x-8">
            <TouchableOpacity>
              <Text className="text-purple-400 text-sm underline">
                Terms of Service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-purple-400 text-sm underline">
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-purple-400 text-sm underline">
                Restore Purchase
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Paywall;
