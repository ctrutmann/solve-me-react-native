import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

class Root extends Component {

  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}> Welcome to Solve.Me</Text>
        <TouchableHighlight onPress={this.navigate.bind(this, 'login')} style={styles.button}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.navigate.bind(this, 'register')} style={styles.button}>
          <Text style={styles.buttonText}> Register </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 180
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom: 15
  }
});

export default Root