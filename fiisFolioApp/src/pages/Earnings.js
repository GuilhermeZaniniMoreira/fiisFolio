import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';

import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';

export default function Earnings(props) {
  const navigation = useNavigation();
  const {data} = props.route.params;
  const [fiis, setFiis] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (data) {
      const fiisArray = data.map((fii, idx) => {
        return {
          key: `${idx}`,
          fii: fii[0],
          quantity: fii[1],
        };
      });
      setFiis(fiisArray);
    }
  }, [data]);

  return (
    <>
      <View style={styles.pageTitle}>
        <Text style={styles.textHeader}>FIIs</Text>
      </View>
      <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={fiis}
          renderItem={({item}) => (
            <View key={item.key} style={styles.row}>
              <Text style={styles.ticker}>{item.fii}</Text>
              <Text style={styles.quantity}>Cotas: {item.quantity}</Text>
            </View>
          )}
        />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 18,
    marginRight: 18,
    marginTop: 4,
    marginBottom: 6,
  },
  ticker: {
    flex: 1,
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    flexDirection: 'column',
  },
  quantity: {
    flexDirection: 'column',
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    flex: 1,
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
