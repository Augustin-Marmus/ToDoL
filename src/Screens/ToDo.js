import React from 'react';
import {
  Text,
  View,
  TextInput,
  CheckBox,
  Button,
} from 'react-native';

class ToDoScreen extends React.Component {
  static navigationOptions = {
    title: 'ToDo details',
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      complete: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const model = navigation.getParam('model', {});
    this.unsubscribeModel = model.onSnapshot(
      (result) => {
        this.setState(result.data());
      },
      // Avoid exception from this firestore
      // When item created TodoListItem is created before db insertion
      // And an PERMISSION_DENIED error pop for nothing
      // because the element we request does not exists
      () => { },
    );
  }

  componentWillUnmount() {
    this.unsubscribeModel();
  }

  toggleCheck() {
    const { complete } = this.state;
    const { navigation } = this.props;
    const model = navigation.getParam('model', {});
    model.update({ complete: !complete });
  }

  save() {
    const { name } = this.state;
    const { navigation } = this.props;
    const model = navigation.getParam('model', {});
    model.update({ name });
  }

  render() {
    const { navigation } = this.props;
    const { name, complete } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', verticalAlign: 'center', padding: 20 }}>
        <Text style={{ fontSize: 27 }}>
          Edit
        </Text>
        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text>
              Completed :
            </Text>
          </View>
          <CheckBox
            onValueChange={() => this.toggleCheck()}
            value={complete}
          />
        </View>
        <View style={{ paddingTop: 10 }}>
          <Text>Name :</Text>
          <TextInput
            placeholder="name"
            value={name}
            onChangeText={(newName) => { this.setState({ name: newName }); }}
            onSubmitEditing={() => { this.save(); navigation.goBack(); }}
          />
        </View>
        <View />
        <Button
          onPress={() => { this.save(); navigation.goBack(); }}
          title="Save"
        />
      </View>
    );
  }
}

export default ToDoScreen;
