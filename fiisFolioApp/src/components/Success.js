import React from 'react';
import LottieView from 'lottie-react-native';

export default class BasicExample extends React.Component {
  render() {
    return (
      <LottieView
        source={require('../animations/9553-check-animation.json')}
        autoPlay
        loop={false}
      />
    );
  }
}
