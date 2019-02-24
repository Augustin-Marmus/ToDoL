import React from 'react';
import { Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      sended: false,
    };
  }

  createUser() {
    const { email, password } = this.state;

    if (!(email && password)) {
      this.setState({ error: 'Fill form first.' });
      return;
    }

    this.setState({ sended: true });
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(() => {
        this.setState({ error: 'An error has occured.' });
      });
  }

  render() {
    const { error, sended } = this.state;
    return (
      <View style={{ justifyContent: 'center', verticalAlign: 'center', paddingVertical: 20 }}>
        <Text style={{ fontSize: 27 }}>
          Sign In
        </Text>
        {sended && <ActivityIndicator size="large" />}
        <TextInput
          placeholder="email"
          onChangeText={(newEmail) => { this.setState({ email: newEmail }); }}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          onChangeText={(newPassword) => { this.setState({ password: newPassword }); }}
        />
        <View style={{ margin: 7 }} />
        <Button
          onPress={() => this.createUser()}
          title="Sign In"
        />
        {error && <Text>{error}</Text>}
      </View>
    );
  }
}

export default SignIn;
