/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import Login from './components/Login';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import reducers from './reducers/PeopleReducer';
import Thunk from 'redux-thunk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));

export default class App extends Component {
  state = { loggedIn: null};

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyCtjHvRvNzqvY3jnsMuRZ44LPLcv_1X9NI",
            authDomain: "fir-analytic-76507.firebaseapp.com",
            databaseURL: "https://fir-analytic-76507.firebaseio.com",
            projectId: "fir-analytic-76507",
            storageBucket: "fir-analytic-76507.appspot.com",
            messagingSenderId: "314098059122"
        });

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ loggedIn: true });
          } else {
            this.setState({ loggedIn: false});
          }
        });
    }

    renderInitialView() {
      switch (this.state.loggedIn) {
        case true:
          return <Navigation />
        case false:
          return <Login />;
        default:
          return <Loader size="large" />;
      }
    }
  render() {
    return (
      <Provider store={store}>
          <View style={styles.container}>
            {this.renderInitialView()}
          </View>
      </Provider>
    );
  }
}
