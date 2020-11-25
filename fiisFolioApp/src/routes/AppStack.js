import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

import Earnings from '../pages/Earnings';
import Wallet from '../pages/Wallet';
import Historical from '../pages/Historical';
import Settings from '../pages/Settings';

import AddFii from '../pages/AddFii';
import UpdateFii from '../pages/UpdateFii';

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            if (route.name === 'Proventos') {
              return <Ionicons name="ios-cash" size={size} color={color} />;
            } else if (route.name === 'Carteira') {
              return <Ionicons name="ios-wallet" size={size} color={color} />;
            } else if (route.name === 'Histórico') {
              return (
                <Ionicons name="ios-stats-chart" size={size} color={color} />
              );
            } else if (route.name === 'Configurações') {
              return <Ionicons name="ios-settings" size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#2a9d8f',
          inactiveTintColor: 'grey',
          // labelStyle: {
          //   fontFamily: 'Nunito_800ExtraBold',
          //   fontSize: 14,
          // },
          style: {
            height: Platform.OS === 'ios' ? 48 : 50,
          },
        }}>
        <Tab.Screen name="Proventos" component={Earnings} />
        <Tab.Screen name="Carteira" component={Wallet} />
        <Tab.Screen name="Histórico" component={Historical} />
        <Tab.Screen name="Configurações" component={Settings} />
        <Tab.Screen
          name="AdicionarFii"
          component={AddFii}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />
        <Tab.Screen
          name="AlterarFii"
          component={UpdateFii}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Earnings} />
//       <Tab.Screen name="Settings" component={Wallet} />
//     </Tab.Navigator>
//   );
// }

// export default MyTabs;