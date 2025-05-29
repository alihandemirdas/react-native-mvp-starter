import { useEffect } from "react";
import {
  RewardedAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import { adUnitIds } from "../../config/adsConfig";

const rewarded = RewardedAd.createForAdRequest(adUnitIds.rewarded);

const Rewarded = () => {
  useEffect(() => {
    const unsubscribe = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log("User earned reward of", reward);
      }
    );

    rewarded.load();
    rewarded.show();

    return unsubscribe;
  }, []);

  return null;
};

export default Rewarded;
