import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import firebase from 'react-native-firebase';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { unsubscribeAuthStateChange: null };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? 'App' : 'Auth');
    });
    this.setState({ unsubscribeAuthStateChange: unsubscriber });
  }

  componentWillUnmount() {
    const { unsubscribeAuthStateChange } = this.state;
    if (unsubscribeAuthStateChange) {
      unsubscribeAuthStateChange();
      this.setState({ unsubscribeAuthStateChange: null });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', verticalAlign: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
