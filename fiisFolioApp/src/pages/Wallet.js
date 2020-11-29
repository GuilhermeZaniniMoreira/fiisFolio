import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

import {
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';

export default function Wallet() {
  const isFocused = useIsFocused();

  const [fiis, setFiis] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const importData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const data = [];
        for (const [index, value] of keys.entries()) {
          const quantity = await AsyncStorage.getItem(value);
          var tickerRequest = value.substring(0, 4);
          const ytd = await axios.get(
            `https://fiis.com.br/${tickerRequest}/cotacoes/?periodo=ytd`,
          );
          let historicalYTD = [];
          if (ytd.data.stockReports) {
            historicalYTD = ytd.data.stockReports;
          }
          data.push({
            key: index.toString(),
            fii: value,
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
  }, [isFocused]);

  return (
    <>
      <View style={styles.pageTitle}>
        <Text style={styles.textHeader}>Minha Carteira</Text>
      </View>
      <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={fiis}
          renderItem={({item}) => (
            <View key={item.key} style={styles.row}>
              <Text style={styles.ticker}>{item.fii}</Text>
              <Text style={styles.quantity}>Cotas: {item.quantity}</Text>
              <Feather
                name="edit"
                size={20}
                color="black"
                onPress={() =>
                  navigation.navigate('AlterarFii', {
                    fii: item.fii,
                    quantity: item.quantity,
                  })
                }
              />
            </View>
          )}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => Alert.alert('TEST')}>
        <Text style={styles.buttonAdd}>Adicionar FII</Text>
      </TouchableOpacity>
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
    marginRight: 25,
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
