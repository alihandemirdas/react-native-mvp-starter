import React, { useRef } from "react";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { adUnitIds } from "../../config/adsConfig";
import { View } from "react-native";

const Banner: React.FC = () => {
  const bannerRef = useRef<BannerAd>(null);

  return (
    <View>
      <BannerAd
        ref={bannerRef}
        unitId={adUnitIds.banner}
        size={BannerAdSize.BANNER}
        onAdFailedToLoad={(error) =>
          console.error("Ad failed to load:", error.message)
        }
        onAdLoaded={() => console.log("Ad loaded successfully")}
      />
    </View>
  );
};

export default Banner;