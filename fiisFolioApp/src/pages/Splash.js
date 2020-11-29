/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
var yahoo = require('yahoo-financial-data');

export default function Splash() {
  const navigation = useNavigation();
  const [fiis, setFiis] = useState([]);
  const [loading, setLoading] = useState(true);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    const importData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        await delay(2000);
        await setFiis(result);
      } catch (error) {
        console.error(error);
      }
    };
    if (loading) {
      importData();
    }
    setLoading(false);
    if (fiis.length > 0 && !loading) {
      console.log(fiis[0][0]);
      yahoo.history(
        'AAPL',
        'close',
        '2020-11-01',
        '2020-11-08',
        '1d',
        (err, data) => {
          console.log(err);
          console.log(data);
        },
      );

      navigation.navigate('Proventos', {
        data: fiis,
      });
    }
  }, [fiis]);

  return (
    <View style={styles.container}>
      <Text style={{color: '#000'}}>fiisFolio</Text>
      <LottieView
        style={styles.loading}
        source={require('../animations/29332-loading2.json')}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
  loading: {
    margin: 80,
  },
});
