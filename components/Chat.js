import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// The application’s main Chat component that renders the chat UI
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  render() {

    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    let backgroundColor = this.props.route.params.backgroundColor;

    return (
      <View style={styles.container} backgroundColor={backgroundColor}>
        <Text></Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})