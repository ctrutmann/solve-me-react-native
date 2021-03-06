import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  // Navigator,
  Text,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Root extends Component {

  componentWillMount() {
    this.getToken();
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken) {
        console.log("Token not set");
      } else {
        this.verifyToken(accessToken);
      }
    } catch(error) {
      console.log("Something went wrong")
    }
  }

  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    })
  }

  //If token is verified we will redirect the user to the home page
  async verifyToken(token) {
    let accessToken = token

    try {
      let response = await fetch('http://localhost:3000/verify?session%5Baccess_token%5D='+accessToken);
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        //Verified token means user is logged in to we redirect to home.
        this.navigate('home');
        console.log(res)
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(error) {
        console.log("error response: " + error);
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>

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
  mainContainer: {
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