import React from 'react';
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

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const handleSettingPress = async (settingName: string) => {
    try {
      await analytics().logEvent('profile_setting_pressed', {
        screen_name: 'ProfileScreen',
        setting_name: settingName,
        timestamp: new Date().toISOString(),
      });

      console.log(`🔧 Profile setting pressed: ${settingName}`);

      Alert.alert(
        'Feature Coming Soon',
        `${settingName} functionality will be available in the next update.`,
        [{text: 'OK'}],
      );
    } catch (error) {
      console.error('Profile analytics error:', error);
    }
  };

  const handleUpgradeToPremium = async () => {
    try {
      await analytics().logEvent('profile_premium_upgrade', {
        screen_name: 'ProfileScreen',
        source: 'profile_banner',
        timestamp: new Date().toISOString(),
      });

      console.log('✨ Premium upgrade from profile');
      navigation.navigate('Paywall');
    } catch (error) {
      console.error('Premium analytics error:', error);
    }
  };

  const profileSettings = [
    {
      id: 'account',
      title: 'Account Settings',
      description: 'Manage your account information',
      icon: 'person-outline',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Push notifications and preferences',
      icon: 'notifications-outline',
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Data privacy and security settings',
      icon: 'shield-outline',
    },
    {
      id: 'support',
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle-outline',
    },
    {
      id: 'about',
      title: 'About App',
      description: 'Version info and app details',
      icon: 'information-circle-outline',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Professional Header */}
        <View className="relative bg-gradient-to-b from-gray-900 to-gray-800 px-6 pt-8 pb-12">
          <View className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10" />

          <View className="relative z-10">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-white text-2xl font-bold">Profile</Text>
              <TouchableOpacity className="bg-gray-700/80 backdrop-blur-sm rounded-full p-2">
                <Icon name="settings-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-gray-300 text-base leading-relaxed">
              Manage your account, preferences, and app settings
            </Text>
          </View>
        </View>

        {/* Enhanced Profile Card */}
        <View className="px-6 -mt-8 mb-6">
          <View className="relative bg-gray-700 rounded-2xl p-6 border border-gray-600 shadow-2xl">
            {/* Background gradient overlay */}
            <View className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-t-2xl" />

            <View className="items-center">
              {/* Avatar with ring */}
              <View className="mb-4 items-center justify-center">
                {/* Gradient Border */}
                <View
                  style={{
                    backgroundColor: '#374151', // bg-gray-700
                    borderRadius: 999,
                    padding: 3,
                  }}>
                  {/* İç gradient arka plan */}
                  <LinearGradient
                    colors={['#7C3AED', '#2563EB']} // from-purple-600 to-blue-600
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 999,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="person" size={32} color="white" />
                  </LinearGradient>
                </View>
              </View>

              {/* Status Badge */}
              <View className="flex-row items-center bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-full mb-6">
                <Icon name="star" size={12} color="#F59E0B" />
                <Text className="text-amber-400 text-xs font-semibold ml-2">
                  FREE PLAN
                </Text>
              </View>

              {/* Professional Auth Buttons */}
              <View className="w-full gap-y-2">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl py-4 shadow-lg"
                  activeOpacity={0.9}>
                  <View className="absolute inset-0 bg-white/10" />
                  <View className="flex-row items-center justify-center">
                    <Icon name="log-in-outline" size={18} color="white" />
                    <Text className="text-white text-base font-semibold ml-2">
                      Sign In
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                  className="border-2 border-green-500/30 bg-green-500/10 rounded-xl py-4"
                  activeOpacity={0.9}>
                  <View className="flex-row items-center justify-center">
                    <Icon name="person-add-outline" size={18} color="#10B981" />
                    <Text className="text-green-400 text-base font-semibold ml-2">
                      Create Account
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Premium Upgrade Banner */}
        <TouchableOpacity
          onPress={handleUpgradeToPremium}
          className="mx-6 mb-6"
          activeOpacity={0.8}>
          <View className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-gray-100 bg-opacity-20 rounded-lg items-center justify-center mr-4">
                <Icon name="diamond" size={24} color="black" />
              </View>

              <View className="flex-1">
                <Text className="text-white text-lg font-bold mb-1">
                  Upgrade to Premium
                </Text>
                <Text className="text-purple-100 text-sm">
                  Unlock all features and remove ads
                </Text>
              </View>

              <Icon name="chevron-forward" size={20} color="white" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Settings List */}
        <View className="px-6">
          <Text className="text-white text-lg font-semibold mb-4">
            ⚙️ Settings
          </Text>

          {profileSettings.map((setting, index) => (
            <TouchableOpacity
              key={setting.id}
              onPress={() => handleSettingPress(setting.title)}
              className="bg-gray-700 rounded-xl p-4 mb-3 border border-gray-600"
              activeOpacity={0.8}>
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-gray-600 rounded-lg items-center justify-center mr-4">
                  <Icon name={setting.icon} size={20} color="white" />
                </View>

                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-1">
                    {setting.title}
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    {setting.description}
                  </Text>
                </View>

                <Icon name="chevron-forward" size={16} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View className="px-6 py-8">
          <View className="items-center">
            <Text className="text-gray-500 text-sm mb-2">
              React Native MVP Starter
            </Text>
            <Text className="text-gray-500 text-xs">
              Version 1.0.0 • Build 1
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
