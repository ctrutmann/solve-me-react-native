'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicatorIOS,
  Text,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Update extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
      errors: [],
      showProgress: false,
      accessToken: this.props.accessToken,
    }
  }

  componentWillMount() {
    this.fetchUserData();
  }

  redirect(routeName, flash) {
    this.props.navigator.push({
      name: routeName,
      passProps: {
        flash: flash
      }
    });
  }

  async fetchUserData() {
    let access_token = this.state.accessToken;
    try {
      let response = await fetch("http://localhost:3000/users/"+access_token+"/edit");
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

  async onUpdatePressed() {
    this.setState({showProgress: true});
    let access_token = this.state.accessToken;
    try {
      let response = await fetch("http://localhost:3000/users/"+access_token, {
                              method: 'PATCH',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  first_name: this.state.first_name,
                                  last_name: this.state.last_name,
                                  email: this.state.email,
                                  password: this.state.password,
                                  password_confirmation: this.state.password_confirmation,
                                }
                              })
                           });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //On success we redirect to home with flash success message
          this.redirect('home', res)
      } else {
          //Handle errors
          let error = res;
          throw error
      }
    } catch(errors) {
        //errors are in JSON form so we must parse them first.
        let formErrors = JSON.parse(errors);
        //We will store all the errors in the array.
        let errorsArray = [];
        for(var key in formErrors) {
          //If array is bigger than one we need to split it.
          if(formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(key + " " + error));
          } else {
            errorsArray.push(key + " " + formErrors[key]);
          }
        }
        this.setState({errors: errorsArray})
        this.setState({showProgress: false});
    }
  }
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Account Details
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({first_name: text}) }
          style={styles.input} value={this.state.first_name}>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({last_name: text}) }
          style={styles.input} value={this.state.last_name}>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} value={this.state.email}>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password_confirmation: text}) }
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight onPress={this.onUpdatePressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Update
          </Text>
        </TouchableHighlight>

        <Errors errors={this.state.errors}/>

        <ActivityIndicatorIOS animating={this.state.showProgress} size="large" style={styles.loader} />
      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Update;