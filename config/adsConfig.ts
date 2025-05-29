import { TestIds } from "react-native-google-mobile-ads";

export const adUnitIds = {
  banner: __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-9923122969454459/aaaaaaa",
  interstitial: __DEV__
    ? TestIds.INTERSTITIAL
    : "ca-app-pub-9923127699454459/xxxxxxx",
  rewarded: __DEV__
    ? TestIds.REWARDED
    : "ca-app-pub-9923127969452359/yyyyyyy",
};
