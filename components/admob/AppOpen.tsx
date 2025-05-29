import { AppOpenAd, AdEventType } from "react-native-google-mobile-ads";
import { adUnitIds } from "../../config/adsConfig";

const appOpenAd = AppOpenAd.createForAdRequest(adUnitIds.appOpen);

export const showAppOpenAd = () => {
  appOpenAd.load();
  appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
    appOpenAd.show();
  });
};