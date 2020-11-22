import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const AdComp = (props) => {
    const adUnitId = __DEV__ ? TestIds.BANNER : Platform.OS === 'ios' ? 'ca-app-pub-xxxx/xxxx' : 'ca-app-pub-xxxx/xxxx';

    return(
        <View style={{height: '10%', paddingLeft: 20}}>
            <BannerAd 
            unitId={adUnitId}
            size={BannerAdSize.LARGE_BANNER}
            onAdLoaded={() => console.log('addLoaded')}
            onAdFailedToLoad={() => console.log('addLoaded')}
            onAdClosed={() => console.log('addLoaded')}
            onAdOpened={() => console.log('addLoaded')}
            onAdLeftApplication={() => console.log('addLoaded')}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }} />
        </View>
    );
};

export default AdComp;