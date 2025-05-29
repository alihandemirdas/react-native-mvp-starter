# React Native MVP Starter Kit

This project serves as a boilerplate for building and launching mobile MVPs fast using React Native (without Expo). It includes TailwindCSS (via NativeWind) and AdMob integration out of the box, perfect for indie developers looking to quickly prototype and monetize apps.

---

## Features

- ⚛️ React Native 0.76.x (no Expo)
- 🎨 TailwindCSS via NativeWind
- 💰 AdMob support (Banner, Interstitial, Rewarded)
- 📦 Modular folder structure
- ⚡ Fast Refresh enabled
- 🧪 Uses test ad units in development
- 🧼 Easy to extend and customize

---

## Getting Started

To use this boilerplate, follow these steps:

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Metro

```bash
npm start
```

### 4. Run the app

#### Android

```bash
npm run android
```

#### iOS

```bash
bundle install           # first time only
bundle exec pod install  # install iOS native deps
npm run ios
```

> For full setup instructions, refer to [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)

---

## Folder Structure

```
.
├── src/
│   ├── components/
│   │   └── ads/          # AdMob components (Banner, Interstitial, Rewarded)
│   │   └── config/
│   │   └── adsConfig.ts  # Centralized ad unit IDs
│   └── App.tsx
├── tailwind.config.js
└── ...
```

---

## TailwindCSS (NativeWind)

This project uses [NativeWind](https://nativewind.dev/) to bring TailwindCSS utility classes into React Native. It allows you to style components quickly and consistently.

### Example

```tsx
<View className="bg-white p-4 rounded-xl shadow">
  <Text className="text-lg font-semibold text-black">Hello World</Text>
</View>
```

For more details, visit the [NativeWind Documentation](https://nativewind.dev/docs/installation).

---

## AdMob Integration

The following ad types are already set up:

* ✅ Banner Ads
* ✅ Interstitial Ads
* ✅ Rewarded Ads

Ad unit IDs are stored in:

```
src/config/adsConfig.ts
```

The app automatically uses **test ads** in development (`__DEV__`) and your **production ads** in release builds.

---

## Components

This boilerplate includes reusable ad components:

* `BannerAdComponent`
* `InterstitialAdComponent`
* `RewardedAdComponent`

You can import and place these anywhere in your app.

---

## Contributing

If you'd like to contribute, please fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For questions or feedback, feel free to open an issue or contact the maintainer.
