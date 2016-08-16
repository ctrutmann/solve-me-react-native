import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  TouchableOpacity
} from 'react-native';

const NavigationBarRouteMapper = {

  LeftButton: (route, navigator) => {
    if(route.name === 'root' || route.name === 'home') {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={ () => navigator.pop() }
        style ={ styles.navBarLeftButton }>
        <Text style={ styles.navBarText }>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: () => {
    return null;
  },

  Title: (route) => {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        Solve.Me
      </Text>
    );
  },

};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'red',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black'
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  }
});

export default (
  < Navigator.NavigationBar
    styles={ styles.navBar }
    routeMapper={ NavigationBarRouteMapper } />
);
