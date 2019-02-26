import React from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import FAB from 'react-native-fab';
import firebase from 'react-native-firebase';
import ToDoListItem from '../Components/ToDoListItem';

let cpt = 0;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'ToDoL',
  }

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    this.unsubscribeCollectionTodo = firebase.firestore()
      .collection('todos')
      .where('owner', '==', firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        this.setState({ todos: querySnapshot.docs.map(doc => doc.ref) });
      });
  }

  componentWillUnmount() {
    this.unsubscribeCollectionTodo();
  }

  signOut() {
    const { navigation } = this.props;
    firebase.auth()
      .signOut()
      .then(() => {
        navigation.navigate('Auth');
      });
  }

  addTodo() {
    const { navigation } = this.props;
    navigation.navigate(
      'ToDo',
      firebase.firestore()
        .collection('todos')
        .add({
          name: `test${cpt++}`,
          complete: false,
          date: Date.now(),
          owner: firebase.auth().currentUser.uid,
        }),
    );
  }

  render() {
    const { navigation } = this.props;
    const { todos } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ToDoListItem model={item} action={() => navigation.navigate('ToDo', item.ref)} />}
          />
          <FAB
            buttonColor="#1f9eef"
            iconTextColor="#FFFFFF"
            onClickAction={() => this.addTodo()}
            visible
            iconTextComponent={<Text>+</Text>}
          />
        </View>
        <Button title="Sign me out" onPress={() => this.signOut()} />
      </View>
    );
  }
}

export default HomeScreen;
