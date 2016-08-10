import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: [],
    }
  }

  async onRegisterPressed() {
    try {
      let response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            // password: this.state.password,
            // password_confirmation: this.state.password_confirmation
          }
        })
      });

      let res = await response.text();
      console.log(response.status);

      if(response.status >= 200 && response.status < 300) {
        console.log("res success is: " + res);
      } else {
        let errors = res;
        throw errors;
      }
    } catch(errors) {
      console.log("catch errors: " + errors)
      let formErrors = JSON.parse(errors);
      let errorsArray = [];
      for(let key in formErrors) {
        if(formErrors[key].length > 1) {
          formErrors[key].map(error => errorsArray.push(`${key} ${error}`))
        } else {
          errorsArray.push(`${key} ${formErrors[key]}`)
        }
      }
      this.setState({errors: errorsArray});
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Join Solve.me!
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({first_name: text}) }
          style={styles.input} placeholder="First Name">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({last_name: text}) }
          style={styles.input} placeholder="Last Name">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input} placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password_confirmation: text}) }
          style={styles.input} placeholder="Confirm Password"
          secureTextEntry={true}>
        </TextInput>

        <TouchableHighlight style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>

        <Errors errors={this.state.errors} />
      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}>{error}</Text>)}
    </View>
  )
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

export default Register