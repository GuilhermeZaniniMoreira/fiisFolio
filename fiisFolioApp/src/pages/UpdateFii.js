import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import Success from '../components/Success';
import {useNavigation} from '@react-navigation/native';
import {Jiro} from 'react-native-textinput-effects';

export default function UpdateFii(props) {
  const navigation = useNavigation();
  const {ticker} = props.route.params;
  const {quantity} = props.route.params;

  const [value, setValue] = useState(quantity);
  const [cotasQuantity, setCotasQuantity] = useState(quantity);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleUpdate = async () => {
    if (Number.isInteger(parseInt(value, 10))) {
      try {
        await AsyncStorage.setItem(`${ticker}`, `${value}`);
        setSuccess(true);
        await delay(1000);
        navigation.navigate('Proventos');
        setSuccess(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      setError(true);
    }
  };

  const handleValueChange = (textValue) => {
    setError(false);
    setValue(textValue);
  };

  return (
    <>
      {success ? (
        <Success />
      ) : (
        <>
          <View style={styles.row}>
            <Feather
              name="x"
              size={24}
              color="black"
              style={styles.closePage}
            />
            <Text style={styles.editText}>Editar</Text>
            <Feather
              name="trash"
              size={24}
              color="black"
              style={styles.deleteFii}
            />
          </View>
          <View style={styles.column}>
            <View>
              <Jiro
                label={ticker}
                borderColor={'#2A9D8F'}
                editable={false}
                inputPadding={16}
                onChangeText={(textValue) => handleValueChange(textValue)}
                inputStyle={{color: 'white'}}
              />
              {/* <Text style={styles.label}>FII</Text>
              <Text style={styles.ticker}>{ticker}</Text> */}
            </View>
            <View>
              {/* <Text style={styles.label}>Quantidade de cotas</Text> */}
              {error ? (
                <Jiro
                  label={'Fii'}
                  borderColor={'#2A9D8F'}
                  inputPadding={16}                  
                  onChangeText={(textValue) => handleValueChange(textValue)}
                  inputStyle={{color: 'white'}}
                />
              ) : (
                <Jiro
                  label={'Quantidade de cotas'}
                  borderColor={'#2A9D8F'}
                  inputPadding={16}
                  onChangeText={(textValue) => handleValueChange(textValue)}
                  inputStyle={{color: 'white'}}
                />
                // <TextInput
                //   keyboardType={
                //     Platform.OS === 'ios' ? 'number-pad' : 'numeric'
                //   }
                //   defaultValue={`${quantity}`}
                //   style={styles.input}
                //   onChangeText={(textValue) => handleValueChange(textValue)}
                // />
              )}
            </View>
            <Button
              buttonStyle={styles.button}
              title="Alterar"
              onPress={() => handleUpdate()}
            />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: '120%',
  },
  label: {
    fontSize: 24,
    color: '#2a9d8f',
    fontFamily: 'Nunito_800ExtraBold',
  },
  editText: {
    flexDirection: 'column',
    textAlign: 'left',
    fontSize: 24,
    paddingTop: 2,
    color: '#2a9d8f',
    fontFamily: 'Nunito_800ExtraBold',
    flex: 1.3,
  },
  closePage: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 24,
    paddingTop: 5,
  },
  deleteFii: {
    fontSize: 24,
    paddingTop: 5,
  },
  ticker: {
    marginBottom: 30,
    elevation: 1,
    textAlign: 'left',
    fontSize: 24,
    color: 'black',
    fontFamily: 'Nunito_800ExtraBold',
  },
  input: {
    alignSelf: 'stretch',
    height: 40,
    fontSize: 20,
    paddingLeft: 7,
    elevation: 1,
    borderRadius: 2,
    backgroundColor: '#cdd1ce',
    textAlign: 'center',
  },
  inputError: {
    alignSelf: 'stretch',
    height: 40,
    fontSize: 20,
    paddingLeft: 7,
    elevation: 1,
    borderRadius: 2,
    backgroundColor: '#f4a261',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#f4a261',
  },
});
