import React from 'react';
import { View, Button } from 'react-native';
import firebase from 'react-native-firebase';
import SignIn from './SignIn';
import LogIn from './LogIn';

class ConnectionScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      createUser: false,
      unsubscribeAuthStateChange: null,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const unsubscribeAuthStateChange = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('App');
      }
    });
    this.setState({ unsubscribeAuthStateChange });
  }

  componentWillUnmount() {
    const { unsubscribeAuthStateChange } = this.state;
    if (this.unsubscribeAuthStateChange) {
      unsubscribeAuthStateChange();
      this.setState({ unsubscribeAuthStateChange: null });
    }
  }

  render() {
    const { createUser } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', verticalAlign: 'center', padding: 20 }}>
        {(createUser) ? <SignIn /> : <LogIn />}
        <Button
          style={{ margin: 7 }}
          onPress={() => this.setState({ createUser: !createUser })}
          title={createUser ? 'Log In' : 'Sign In'}
        />
      </View>
    );
  }
}

export default ConnectionScreen;
