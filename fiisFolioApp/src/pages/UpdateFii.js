/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import Success from '../components/Success';
import {useNavigation} from '@react-navigation/native';
import {Jiro} from 'react-native-textinput-effects';

export default function UpdateFii(props) {
  const navigation = useNavigation();
  const {fii} = props.route.params;
  const {quantity} = props.route.params;

  const [value, setValue] = useState(quantity);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleUpdate = async () => {
    if (Number.isInteger(parseInt(value, 10))) {
      try {
        await AsyncStorage.setItem(`${fii}`, `${value}`);
        setSuccess(true);
        await delay(1000);
        navigation.navigate('Carteira');
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

  const handleDeleteFii = async () => {
    try {
      await AsyncStorage.removeItem(`${fii}`);
      console.log('a');
      navigation.navigate('Carteira');
    } catch (exception) {
      console.log(exception);
    }
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
              onPress={() =>
                Alert.alert(
                  `${fii}`,
                  'Você realmente deseja excluir?',
                  [
                    {
                      text: 'Cancelar',
                      onPress: () => console.log('Cancel pressed.'),
                      style: 'cancel',
                    },
                    {text: 'Sim', onPress: () => handleDeleteFii()},
                  ],
                  {cancelable: false},
                )
              }
              style={styles.deleteFii}
            />
          </View>
          <View style={styles.column}>
            <View>
              <Jiro
                label={fii}
                borderColor={'#228CDB'}
                editable={false}
                inputPadding={16}
                onChangeText={(textValue) => handleValueChange(textValue)}
                inputStyle={{color: 'white'}}
              />
            </View>
            <View>
              {error ? (
                <Jiro
                  label={'Fii'}
                  borderColor={'#228CDB'}
                  inputPadding={16}
                  onChangeText={(textValue) => handleValueChange(textValue)}
                  inputStyle={{color: 'white'}}
                />
              ) : (
                <Jiro
                  label={'Quantidade de cotas'}
                  borderColor={'#228CDB'}
                  inputPadding={16}
                  value={`${value}`}
                  onChangeText={(textValue) => handleValueChange(textValue)}
                  inputStyle={{color: 'white'}}
                />
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
    color: '#228CDB',
    fontFamily: 'Nunito_800ExtraBold',
  },
  editText: {
    flexDirection: 'column',
    textAlign: 'left',
    fontSize: 24,
    paddingTop: 2,
    color: '#228CDB',
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
  button: {
    marginTop: 20,
    backgroundColor: '#0B7189',
  },
});
