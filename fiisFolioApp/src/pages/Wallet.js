import React from 'react';
import {useNavigation} from '@react-navigation/native';
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

// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded,
// } from 'react-native-admob';

import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize
} from '@react-native-firebase/admob';

export default function Wallet() {
  const navigation = useNavigation();

  const data = [
    {
      key: '1',
      ticker: 'BCFF11',
      quantity: 50,
    },
    {
      key: '2',
      ticker: 'MXRF11',
      quantity: 50,
    },
    {
      key: '3',
      ticker: 'HGLG11',
      quantity: 50,
    },
    {
      key: '4',
      ticker: 'HGTX11',
      quantity: 50,
    },
    {
      key: '5',
      ticker: 'HGTX11',
      quantity: 50,
    },
    {
      key: '6',
      ticker: 'HGTX11',
      quantity: 50,
    },
    {
      key: '7',
      ticker: 'HGTX11',
      quantity: 50,
    },
    {
      key: '8',
      ticker: 'HGTX11',
      quantity: 50,
    },
    {
      key: '9',
      ticker: 'HGTX11',
      quantity: 50,
    },
    {
      key: '10',
      ticker: 'HGTX11',
      quantity: 50,
    },
    {
      key: '11',
      ticker: 'HGTX11',
      quantity: 50,
    },
  ];

  return (
    <>
      <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
      <View style={styles.pageTitle}>
        <Text style={styles.textHeader}>Minha Carteira</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View key={item.key} style={styles.row}>
              <Text style={styles.ticker}>{item.ticker}</Text>
              <Text style={styles.quantity}>Cotas: {item.quantity}</Text>
              <Feather
                name="edit"
                size={20}
                color="black"
                onPress={() =>
                  navigation.navigate('AlterarFii', {
                    ticker: item.ticker,
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
  bannerAd: {
    marginTop: 25,
  },
  pageTitle: {
    backgroundColor: '#2a9d8f',
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#e5e5e5',
    paddingTop: 20,
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
    backgroundColor: '#f4a261',
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    borderRadius: 4,
  },
});
