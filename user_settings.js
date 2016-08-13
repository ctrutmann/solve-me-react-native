import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  AlertIOS,
  Text,
  View
} from 'react-native';


const ACCESS_TOKEN = 'access_token';

class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
    }
  }

  componentWillMount() {
    this.getToken();
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken) {
        this.redirect('login');
      } else {
        this.setState({accessToken: accessToken});
      }
    } catch(error) {
      console.log("Something went wrong")
      this.redirect('login')
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

  onLogout() {
    this.deleteToken();
  }

  async deleteToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN)
      this.redirect('root');
    } catch(error) {
      console.log("Something went wrong");
    }
  }

  confirmDelete() {
    AlertIOS.alert("Are you sure?", "This action cannot be undone", [
      {text: 'Cancel'}, {text: 'Delete', onPress: () => this.onDelete()}
    ]);
  }

  async onDelete(){
    let access_token = this.state.accessToken
    try {
      let response = await fetch('http://localhost:3000/users/'+access_token,{
                              method: 'DELETE',
                            });
        let res = await response.text();
        if (response.status >= 200 && response.status < 300) {
          console.log("success sir: " + res)
          this.redirect('root');
        } else {
          let error = res;
          throw error;
        }
    } catch(error) {
        console.log("error: " + error)
    }
  }

  render() {
    let flashMessage;
    if(this.props.flash) {
      flashMessage = <Text style={styles.flash}>{this.props.flash} </Text>
    } else {
      flashMessage = null;
    }

    return (
      <View style={styles.container}>
        {flashMessage}
        <Text style={styles.title}> Welcome to Solve.Me</Text>
        <Text style={styles.text}> Your new token is {this.state.accessToken} </Text>

        <TouchableHighlight style={styles.button} onPress={this.onLogout.bind(this)}>
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button} onPress={this.redirect.bind(this, 'update')}>
          <Text style={styles.buttonText}>
            Update
          </Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button} onPress={this.confirmDelete.bind(this)}>
          <Text style={styles.buttonText}>
            Delete Account
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

export default UserSettings