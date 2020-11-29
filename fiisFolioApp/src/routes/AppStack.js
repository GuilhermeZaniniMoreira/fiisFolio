import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

import Splash from '../pages/Splash';
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
              return <Feather name="dollar-sign" size={size} color={color} />;
            } else if (route.name === 'Carteira') {
              return <AntDesign name="wallet" size={size} color={color} />;
            } else if (route.name === 'Histórico') {
              return <AntDesign name="linechart" size={size} color={color} />;
            } else if (route.name === 'Configurações') {
              return <AntDesign name="setting" size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#228CDB',
          inactiveTintColor: 'grey',
          // labelStyle: {
          //   fontFamily: 'Nunito_800ExtraBold',
          //   fontSize: 14,
          // },
          style: {
            height: Platform.OS === 'ios' ? 48 : 50,
          },
        }}>
        <Tab.Screen
          name="SplashTela"
          component={Splash}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />
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
