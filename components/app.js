import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './login';
import Feed from './feed';

const App = StackNavigator({
  Login: { screen: Login },
  Feed: { screen: Feed }
});

export default App;