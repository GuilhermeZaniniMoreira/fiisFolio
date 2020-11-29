/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';

import {LineChart} from 'react-native-svg-charts';
import axios from 'axios';

export default function Earnings(props) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {data} = props.route.params;
  const [fiis, setFiis] = useState([]);

  useEffect(() => {
    if (data) {
      const fiisArray = data.map((fii, idx) => {
        const historical = fii.historicalYTD.map((day) => {
          return parseFloat(day.fec);
        });
        return {
          key: `${idx}`,
          fii: fii.fii,
          quantity: fii.quantity,
          historical,
        };
      });
      setFiis(fiisArray);
    }
  }, [data]);

  useEffect(() => {
    const importData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const newData = [];
        for (const [index, fii] of keys.entries()) {
          const quantity = await AsyncStorage.getItem(fii);
          var tickerRequest = fii.substring(0, 4);
          const ytd = await axios.get(
            `https://fiis.com.br/${tickerRequest}/cotacoes/?periodo=12+months`,
          );
          let historicalYTD = [];
          if (ytd.data.stockReports) {
            historicalYTD = ytd.data.stockReports;
          }
          const historical = historicalYTD.map((day) => {
            return parseFloat(day.fec);
          });
          newData.push({
            key: `{${index}}`,
            fii,
            quantity,
            historical,
          });
        }
        setFiis(newData);
      } catch (error) {
        console.error(error);
      }
    };
    importData();
  }, [isFocused]);

  return (
    <>
      <View style={styles.pageTitle}>
        <Text style={styles.textHeader}>FIIs</Text>
      </View>
      <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
      <SafeAreaView style={styles.container}>
        {fiis.length > 0 && (
          <FlatList
            data={fiis}
            renderItem={({item}) => (
              <View key={item.key} style={styles.row}>
                <Text style={styles.ticker}>{item.fii}</Text>
                <View style={styles.chartView}>
                  <LineChart
                    style={styles.chart}
                    data={item.historical}
                    contentInset={{top: 10, bottom: 10}}
                    svg={{stroke: 'rgb(33, 206, 153, 0.8)'}}
                  />
                </View>
                <Text style={styles.quantity}>Cotas: {item.quantity}</Text>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    backgroundColor: '#228CDB',
    marginBottom: 15,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#e5e5e5',
    paddingTop: 15,
  },
  textHeader: {
    margin: 20,
    fontSize: 24,
    fontFamily: 'Nunito_800ExtraBold',
    color: 'white',
    textAlign: 'center',
  },
  row: {
    backgroundColor: 'white',
    elevation: 1,
    borderRadius: 3,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  ticker: {
    flex: 1,
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    paddingTop: 20,
    marginLeft: 20,
    flexDirection: 'column',
  },
  chartView: {
    flexDirection: 'column',
    flex: 1.2,
  },
  chart: {
    width: 100,
    height: 60,
  },
  quantity: {
    flexDirection: 'column',
    fontSize: 16,
    paddingTop: 20,
    marginRight: 20,
    fontFamily: 'Nunito_600SemiBold',
  },
  buttonAdd: {
    margin: 10,
    fontFamily: 'Nunito_600SemiBold',
    backgroundColor: '#0B7189',
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    borderRadius: 4,
  },
});
