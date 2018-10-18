import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginComponent from './components/LoginComponent';
/* import SplashComponent from './components/SplashComponent'; */
import ProfileComponent from './components/ProfileComponent';

const Application = createStackNavigator({
  /* Splash: { 
    screen: SplashComponent,
    navigationOptions: {
        header: null,
      },
  }, */
  Home: { 
    screen: LoginComponent,
    navigationOptions: {
        header: null,
      },
  },
  Profile: { 
    screen: ProfileComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'List of users',
      
    }),
  },
});

export default class myApp extends React.Component {
  render() {
    return (
      <Application />
    );
  }
}