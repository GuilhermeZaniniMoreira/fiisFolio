import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import admob, {MaxAdContentRating} from '@react-native-firebase/admob';

import AppStack from './src/routes/AppStack';

export default function App() {
  // useEffect(() => {
  //   admob()
  //     .setRequestConfiguration({
  //       // Update all future requests suitable for parental guidance
  //       maxAdContentRating: MaxAdContentRating.PG,

  //       // Indicates that you want your content treated as child-directed for purposes of COPPA.
  //       tagForChildDirectedTreatment: true,

  //       // Indicates that you want the ad request to be handled in a
  //       // manner suitable for users under the age of consent.
  //       tagForUnderAgeOfConsent: true,
  //     })
  //     .then(() => {
  //       // Request config successfully set!
  //     });
  // });
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <AppStack />
    </>
  );

  // let [fontsLoaded] = useFonts({
  //   Nunito_600SemiBold,
  //   Nunito_700Bold,
  //   Nunito_800ExtraBold,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // } else {
  //   return (
  //     <>
  //       <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
  //       <AppStack />
  //     </>
  //   );
  // }
}
