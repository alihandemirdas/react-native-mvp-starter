import { useEffect } from "react";
import {
  InterstitialAd,
  AdEventType,
} from "react-native-google-mobile-ads";
import { adUnitIds } from "../../config/adsConfig";

const interstitial = InterstitialAd.createForAdRequest(adUnitIds.interstitial);

const Interstitial = () => {
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      }
    );

    interstitial.load();

    return unsubscribe;
  }, []);

  return null;
};

export default Interstitial;
