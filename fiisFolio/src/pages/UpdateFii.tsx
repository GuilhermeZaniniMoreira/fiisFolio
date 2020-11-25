import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import { Button } from 'react-native-elements';

export default function UpdateFii(props: any) {

    const { ticker } = props.route.params;
    const { quantity } = props.route.params;

    const [value, setValue] = useState(quantity);
    const [cotasQuantity, setCotasQuantity] = useState(quantity);
    const [error, setError] = useState(false);

    const handleUpdate = () => {
        if (Number.isInteger(parseInt(value))) {
            setCotasQuantity(parseInt(value));
        } else {
            setError(true);
        }
    }
    
    const handleValueChange = (value: any) => {
        setError(false);
        setValue(value);
    }

    return (
        <>
            <View style={styles.row}>
                <Feather name='x' size={24} color='black' style={styles.closePage} />
                <Text style={styles.editText}>Editar</Text>
                <Feather name='trash' size={24} color='black' style={styles.deleteFii} />
            </View>
            <View style={styles.column}>
                <View>
                    <Text style={styles.label}>FII</Text>
                    <Text style={styles.ticker}>{ticker}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Quantidade de cotas</Text>
                    {
                        error ? 
                            <TextInput
                                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                                placeholder={'Erro! Digite um número inteiro.'}
                                style={styles.inputError}
                                onChangeText={value => handleValueChange(value)}
                            />
                        :
                            <TextInput
                                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                                placeholder={`${quantity}`}
                                style={styles.input}
                                onChangeText={value => handleValueChange(value)}
                            />

                    }
                    
                </View>
                <Button
                    buttonStyle={styles.button}
                    title='Alterar'
                    onPress={() => handleUpdate()}
                />
                
            </View>

        </>
    )
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
  }
});

