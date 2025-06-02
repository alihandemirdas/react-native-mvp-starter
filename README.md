# 🚀 React Native MVP Starter

A complete, production-ready React Native boilerplate with essential features for rapid mobile app development. This starter pack includes authentication, analytics, monetization, theming, localization, and much more!

## ✨ Features

### 🎨 **UI & UX**
- **Dark/Light Theme Support** with system detection
- **Multi-language Support** (English/Turkish) with easy extensibility
- **Modern Onboarding Flow** with swipeable screens
- **Custom Animated Components** (Button, GradientButton, GlassButton)
- **Toast Notifications** with multiple types
- **Gradient Backgrounds** and modern design

### 🔐 **Authentication**
- **Login/Register Screens** with form validation
- **Social Authentication** ready (Google, Apple, Facebook)
- **Password visibility toggle**
- **Terms & Conditions** integration

### 💰 **Monetization**
- **Premium Paywall** with subscription plans
- **AdMob Integration** for banner and interstitial ads
- **In-App Purchase** flow ready

### 📊 **Analytics & Performance**
- **Firebase Analytics** with comprehensive event tracking
- **Screen view tracking** automatic
- **User interaction analytics**
- **Crash reporting** ready

### 🧭 **Navigation**
- **Tab Navigation** with custom icons
- **Stack Navigation** with modal screens
- **Gesture Handler** support

### 🌐 **Internationalization**
- **Multi-language support** with react-native-localize
- **Automatic device language detection**
- **Persistent language preferences**
- **Easy translation management**

### 🎯 **Developer Experience**
- **TypeScript** for type safety
- **Context API** for state management
- **Custom Hooks** for reusable logic
- **Clean Architecture** with separation of concerns
- **TailwindCSS** with NativeWind for styling

## 📱 Screenshots

*Add your app screenshots here*

## 🛠 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### 1. Clone Repository

```bash
git clone https://github.com/your-username/react-native-mvp-starter.git
cd react-native-mvp-starter
npm install
```

### 2. iOS Setup

#### Install iOS Dependencies
```bash
cd ios && pod install && cd ..
```

#### Firebase Setup for iOS
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing one
3. Add iOS app to your Firebase project
4. Download `GoogleService-Info.plist`
5. Add the file to `ios/` directory in Xcode:
   - Open `ios/start.xcworkspace` in Xcode
   - Right-click on project → Add Files
   - Select `GoogleService-Info.plist`
   - Make sure it's added to target

#### AdMob Setup for iOS
1. Get your AdMob App ID from [AdMob Console](https://apps.admob.com)
2. Open `ios/start/Info.plist`
3. Add your GADApplicationIdentifier:

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX</string>
```

#### Add Firebase Packages in Xcode
1. Open `ios/start.xcworkspace`
2. File → Add Package Dependencies
3. Add: `https://github.com/firebase/firebase-ios-sdk`
4. Select: FirebaseAnalytics, FirebaseCrashlytics

### 3. Android Setup

#### Firebase Setup for Android
1. Download `google-services.json` from Firebase Console
2. Place it in `android/app/` directory

#### AdMob Setup for Android
1. Open `android/app/src/main/AndroidManifest.xml`
2. Add your AdMob App ID:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"/>
```

### 4. Configuration Files

#### Update App Name and Bundle ID
1. **iOS**: Open `ios/start.xcworkspace` and update Bundle Identifier
2. **Android**: Update `android/app/build.gradle` applicationId
3. **App Name**: Update in `app.json` and platform-specific files

#### Environment Configuration
Create `config/env.ts`:

```typescript
export const ENV = {
  ADMOB_BANNER_ID: __DEV__ 
    ? 'ca-app-pub-3940256099942544/6300978111' // Test ID
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Your real ID
  ADMOB_INTERSTITIAL_ID: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712' // Test ID  
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Your real ID
  API_URL: __DEV__ ? 'https://dev-api.example.com' : 'https://api.example.com',
};
```

### 5. Run the App

```bash
# iOS
npm run ios

# Android  
npm run android

# Start Metro
npm start
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx       # Standard button with variants
│   ├── GradientButton.tsx # Animated gradient buttons
│   ├── GlassButton.tsx  # Glass morphism buttons
│   └── Toast.tsx        # Toast notification component
├── contexts/            # React Context providers
│   ├── LanguageContext.tsx    # Multi-language state
│   ├── ThemeContext.tsx       # Dark/Light theme state
│   ├── ToastContext.tsx       # Toast notifications state
│   └── OnboardingContext.tsx  # First launch state
├── screens/             # Screen components
│   ├── MainScreen.tsx          # Home screen with features
│   ├── SideScreen.tsx          # Chat interface
│   ├── ProfileScreen.tsx       # User profile
│   ├── OnboardingScreen.tsx    # App introduction
│   ├── Paywall.tsx            # Premium subscription
│   ├── LoginScreen.tsx        # User authentication
│   ├── RegisterScreen.tsx     # User registration
│   └── CustomButtonComponents.tsx # Component showcase
├── locales/             # Translation files
│   ├── en.json         # English translations
│   └── tr.json         # Turkish translations
├── utils/               # Utility functions
│   ├── i18n.ts         # Internationalization setup
│   └── cn.ts           # Tailwind class names utility
└── App.tsx             # Main app component with providers
```

## 🎯 Usage Examples

### Using Theme Context

```typescript
import { useTheme } from './contexts/ThemeContext';

const MyComponent = () => {
  const { colors, isDark, changeTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello World</Text>
      <Button onPress={() => changeTheme('dark')}>
        Switch to Dark
      </Button>
    </View>
  );
};
```

### Using Language Context

```typescript
import { useLanguage } from './contexts/LanguageContext';

const MyComponent = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  
  return (
    <View>
      <Text>{t('welcome.title')}</Text>
      <Button onPress={() => changeLanguage('tr')}>
        Türkçe
      </Button>
    </View>
  );
};
```

### Using Toast Notifications

```typescript
import { useToast } from './contexts/ToastContext';

const MyComponent = () => {
  const { showSuccess, showError } = useToast();
  
  const handleAction = async () => {
    try {
      // Your action
      showSuccess('Success!', 'Action completed successfully');
    } catch (error) {
      showError('Error!', 'Something went wrong');
    }
  };
};
```

### Custom Button Components

```typescript
import Button from './components/Button';
import GradientButton from './components/GradientButton';

<Button variant="primary" size="lg" icon="checkmark-outline">
  Primary Button
</Button>

<GradientButton 
  variant="cosmic" 
  size="md" 
  animation="pulse"
  onPress={handlePress}>
  Gradient Button
</GradientButton>
```

## 🔧 Customization

### Adding New Languages

1. Create new translation file: `locales/es.json`
2. Add to available languages in `contexts/LanguageContext.tsx`:

```typescript
export const availableLanguages = [
  {code: 'en', name: 'English', flag: '🇺🇸'},
  {code: 'tr', name: 'Türkçe', flag: '🇹🇷'},
  {code: 'es', name: 'Español', flag: '🇪🇸'}, // New language
];
```

3. Import in `utils/i18n.ts`:

```typescript
import es from '../locales/es.json';

const i18n = new I18n({
  en,
  tr,
  es, // Add new language
});
```

### Adding New Themes

1. Update `contexts/ThemeContext.tsx`:

```typescript
const blueTheme: ThemeColors = {
  background: '#1e3a8a',
  surface: '#1e40af',
  // ... other colors
};

// Add to context
```

### Adding New Features to MainScreen

1. Add translation keys to `locales/en.json` and `locales/tr.json`
2. Create handler function
3. Add to features array:

```typescript
{
  id: 'new_feature',
  title: t('main.new_feature.title'),
  description: t('main.new_feature.description'),
  icon: 'your-icon-name',
  color: 'bg-your-color',
  onPress: handleNewFeature,
}
```

## 📦 Package Dependencies

### Core Dependencies
- **react-native**: 0.79.2 - React Native framework
- **react**: 19.0.0 - React library
- **typescript**: 5.0.4 - TypeScript support

### Navigation
- **@react-navigation/native**: Tab and stack navigation
- **@react-navigation/bottom-tabs**: Bottom tab navigator
- **@react-navigation/stack**: Stack navigator
- **react-native-gesture-handler**: Gesture support
- **react-native-screens**: Native screen optimization

### UI & Styling
- **nativewind**: 4.1.23 - TailwindCSS for React Native
- **tailwindcss**: 3.4.17 - CSS framework
- **react-native-vector-icons**: Icon library
- **react-native-linear-gradient**: Gradient backgrounds
- **react-native-safe-area-context**: Safe area handling

### State Management
- **@react-native-async-storage/async-storage**: Persistent storage
- **clsx**: Conditional classnames
- **tailwind-merge**: Tailwind class merging

### Firebase & Analytics
- **@react-native-firebase/app**: Firebase core
- **@react-native-firebase/analytics**: Analytics tracking

### Monetization
- **react-native-google-mobile-ads**: AdMob integration

### Internationalization
- **react-native-localize**: Device locale detection
- **i18n-js**: Internationalization framework

## 🚀 Deployment

### iOS Deployment
1. Update version in `ios/start/Info.plist`
2. Archive in Xcode
3. Upload to App Store Connect

### Android Deployment
1. Generate signed APK/AAB
2. Upload to Google Play Console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if necessary
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native team for the amazing framework
- Firebase for backend services
- All open source contributors

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: your-email@example.com
- LinkedIn: [Your LinkedIn Profile]

---

**Happy Coding! 🚀**

Built with ❤️ for the React Native community
