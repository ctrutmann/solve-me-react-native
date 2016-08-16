import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import UserSettings from './user_settings';

const ACCESS_TOKEN = 'access_token';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: this.props.accessToken,
      email: "",
      first_name: "",
      last_name: "",
      errors: [],
      showProgress: false,
    }
  }

  componentWillMount() {
    this.fetchUserData();
  }

  async fetchUserData() {
    let access_token = this.state.accessToken;
    console.log(access_token)
    try {
      let response = await fetch("http://localhost:3000/users/"+access_token);
      let res = await response.text();
      console.log(res)
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let userData = JSON.parse(res);
          for(let data in userData) {
            console.log("data is: " + data);
            this.setState({[data]:userData[data]});
          }
      } else {
          //Handle error
          let error = res;
          throw err;
      }
    } catch(error) {
        //If something went wrong we will redirect to the login page
        this.redirect('login');
    }
  }

  redirect(routeName) {
    this.props.navigator.push({
      name: routeName,
      passProps: {
        accessToken: this.state.accessToken
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Welcome {this.state.first_name} </Text>

        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>
            My Quiz
          </Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button} onPress={this.redirect.bind(this, 'user_settings')}>
          <Text style={styles.buttonText}>
            My Settings
          </Text>
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
    backgroundColor: 'red',
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
  },
  flash: {
    height: 40,
    backgroundColor: '#00ff00',
    padding: 10,
    alignSelf: 'center',
  },
  loader: {
    marginTop: 20
  }
});

export default UserProfile