import React from 'react';
import { Button, View, FlatList } from 'react-native';
import FAB from 'react-native-fab';
import firebase from 'react-native-firebase';
import ToDoListItem from '../Components/ToDoListItem';

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
      .onSnapshot(
        (querySnapshot) => {
          this.setState({ todos: querySnapshot.docs.map(doc => doc.ref) });
        },
        () => { },
      );
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
    firebase.firestore()
      .collection('todos')
      .add({
        name: 'new task',
        complete: false,
        date: Date.now(),
        owner: firebase.auth().currentUser.uid,
      }).then(ref => navigation.navigate({ routeName: 'ToDo', params: { model: ref } }));
  }

  renderItem(item) {
    const { navigation } = this.props;
    return (
      <ToDoListItem
        model={item}
        action={ref => navigation.navigate({ routeName: 'ToDo', params: { model: ref } })}
      />
    );
  }

  render() {
    const { todos } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => this.renderItem(item)}
          />
          <FAB
            buttonColor="#1f9eef"
            iconTextColor="#FFFFFF"
            onClickAction={() => this.addTodo()}
            visible
          />
        </View>
        <Button title="Sign me out" onPress={() => this.signOut()} />
      </View>
    );
  }
}

export default HomeScreen;
