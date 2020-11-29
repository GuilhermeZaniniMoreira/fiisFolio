/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

export default function Splash() {
  const navigation = useNavigation();
  const [fiis, setFiis] = useState([]);

  useEffect(() => {
    const importData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const data = [];
        for (const fii of keys) {
          const quantity = await AsyncStorage.getItem(fii);
          var tickerRequest = fii.substring(0, 4);
          const ytd = await axios.get(
            `https://fiis.com.br/${tickerRequest}/cotacoes/?periodo=12+months`,
          );
          let historicalYTD = [];
          if (ytd.data.stockReports) {
            historicalYTD = ytd.data.stockReports;
          }
          data.push({
            fii,
            quantity,
            historicalYTD,
          });
        }
        setFiis(data);
      } catch (error) {
        console.error(error);
      }
    };
    importData();
  }, []);

  useEffect(() => {
    if (fiis.length > 0) {
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
