import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginComponent from './components/LoginComponent';
/* import SplashComponent from './components/SplashComponent'; */
import ProfileComponent from './components/ProfileComponent';

const Application = createStackNavigator({
  /* Splash: { screen: SplashComponent}, */
  Home: { 
    screen: LoginComponent 
    },
  Profile: { 
    screen: ProfileComponent
    },
  }, 
        {
    navigationOptions: {
      header: null,
    }
});

export default class myApp extends React.Component {
  render() {
    return (
      <Application />
    );
  }
}