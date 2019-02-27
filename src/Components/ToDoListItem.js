import React from 'react';
import { Text, View, CheckBox, TouchableNativeFeedback } from 'react-native';

class ToDoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      name: '',
    };
  }

  componentDidMount() {
    const { model } = this.props;
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
    const { model } = this.props;
    model.update({ complete: !complete });
  }

  render() {
    const { action, model } = this.props;
    const { name, complete } = this.state;
    return (
      <TouchableNativeFeedback onPress={() => action(model)}>
        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
          <CheckBox
            onValueChange={() => this.toggleCheck()}
            value={complete}
          />
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>
              {name}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default ToDoListItem;
