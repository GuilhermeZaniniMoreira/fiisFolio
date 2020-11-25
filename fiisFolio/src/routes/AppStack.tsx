import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

import Earnings from '../pages/Eearnings';
import Wallet from '../pages/Wallet';
import Historical from '../pages/Historical';
import Settings from '../pages/Settings';

import AddFii from '../pages/AddFii';
import UpdateFii from '../pages/UpdateFii';

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = '';
            
            if (route.name === 'Proventos') {
              iconName = 'ios-cash';
            } else if (route.name === 'Carteira') {
              iconName = 'ios-wallet';
            } else if (route.name === 'Histórico') {
              iconName = 'ios-stats';
            } else if (route.name === 'Configurações') {
              iconName = 'ios-settings';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#2a9d8f',
          inactiveTintColor: 'grey',
          labelStyle: {
            fontFamily: 'Nunito_800ExtraBold',
            fontSize: 14,
          },
          style: {
            height: (Platform.OS === 'ios') ? 48 : 50
          }
        }}
      >
        <Tab.Screen name="Proventos" component={Earnings} />
        <Tab.Screen name="Carteira" component={Wallet} />
        <Tab.Screen name="Histórico" component={Historical} />
        <Tab.Screen name="Configurações" component={Settings} />
        <Tab.Screen name="AdicionarFii" component={AddFii} options={{
            tabBarButton: () => null,
            tabBarVisible: false,
        }} />
        <Tab.Screen name="AlterarFii" component={UpdateFii} options={{
            tabBarButton: () => null,
            tabBarVisible: false,
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
