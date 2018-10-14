import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginComponent from './components/LoginComponent';
import SplashComponent from './components/SplashComponent';

const Application = createStackNavigator({
  Splash: { screen: SplashComponent},
  Home: { screen: LoginComponent },
  }, {
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