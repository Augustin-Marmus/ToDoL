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
    this.unsubscribeModel = model.onSnapshot((result) => {
      this.setState(result.data());
    });
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
    const { action } = this.props;
    const { name, complete } = this.state;
    return (
      <TouchableNativeFeedback onPress={action}>
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
