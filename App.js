import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todoApp from './app/reducers';
import Main from './app/index';

let store = createStore(todoApp, applyMiddleware(thunk));

export default class App extends React.Component {

  // componentDidMount() {
  //   if (Platform.OS === 'ios') {
  //     StatusBarIOS.setHidden(true)
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9a73ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
