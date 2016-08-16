/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import Root from './components/root';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import UserProfile from './components/user_profile';
import UserSettings from './components/user_settings';
import Update from './components/update';
import NavigationBar from './components/navigation_bar';

class SolveMe extends Component {
  renderScene(route, navigator) {
    if(route.name == 'root') {
      return <Root navigator={navigator} />
    }
    if(route.name == 'register') {
      return <Register navigator={navigator} />
    }
    if(route.name == 'login') {
      return <Login navigator={navigator} />
    }
    if(route.name == 'home') {
      return <Home navigator={navigator} {...route.passProps} />
    }
    if(route.name == 'user_profile') {
      return <UserProfile navigator={navigator} {...route.passProps} />
    }
    if(route.name == 'user_settings') {
      return <UserSettings navigator={navigator} {...route.passProps} />
    }
    if(route.name == 'update') {
      return <Update navigator={navigator} {...route.passProps} />
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'root'}}
          renderScene={this.renderScene.bind(this)}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
})

AppRegistry.registerComponent('SolveMe', () => SolveMe);