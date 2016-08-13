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

import Register from './register';
import Login from './login';
import Root from './root';
import Home from './home';
import Update from './update';

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