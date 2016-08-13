import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  AlertIOS,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import UserSettings from './user_settings';
import Questionnaires from './questionnaires';

const ACCESS_TOKEN = 'access_token';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'user_settings'
    }
  }
  setTab(tabId){
    this.setState({selectedTab:tabId})
  }


  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon='contacts'
          selected={this.state.selectedTab === 'user_settings'}
          onPress={() => this.setTab('user_settings')}>
          <UserSettings />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon='history'
          selected={this.state.selectedTab === 'questionnaires'}
          onPress={() => this.setTab('questionnaires')}>
          <Questionnaires />
        </TabBarIOS.Item>

      </TabBarIOS>
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

export default Home