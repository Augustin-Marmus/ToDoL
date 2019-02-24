import React from 'react';
import { Button, View } from 'react-native';
import firebase from 'react-native-firebase';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  signOut() {
    const { navigation } = this.props;
    firebase.auth()
      .signOut()
      .then(() => {
        navigation.navigate('Auth');
      });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Button title="Actually, sign me out :)" onPress={() => this.signOut()} />
        <Button title="Go to TODO" onPress={() => navigation.navigate('ToDo')} />
        <Button title="Add TODO" onPress={() => navigation.navigate('ToDo')} />
      </View>
    );
  }
}

export default HomeScreen;
