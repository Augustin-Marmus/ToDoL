import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import AuthLoadingScreen from './Screens/AuthLoading';
import HomeScreen from './Screens/Home';
import ConnectionScreen from './Screens/Connection';
import ToDoScreen from './Screens/ToDo';

const AppStack = createStackNavigator({ Home: HomeScreen, ToDo: ToDoScreen });
const AuthStack = createStackNavigator({ Connection: ConnectionScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));
