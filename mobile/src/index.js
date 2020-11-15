import Home from './Home';
import Edit from './Edit';

import { createAppContainer, createStackNavigator  } from '@react-navigation-stack';

const TabNavigator = createAppContainer(
    createStackNavigator({
    Home: Home,
    Edit: Edit,
  })
);

export default TabNavigator;
