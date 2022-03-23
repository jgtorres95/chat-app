import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';

//import Gifted Chat library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// The application’s main Chat component that renders the chat UI
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
         },
         {
          _id: 2,
          text: `${this.props.route.params.name} has entered the chat`,
          createdAt: new Date(),
          system: true,
         },
      ]
    })
  }

  //this is called upon sending a message. The new message is appended to the messages state
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {

    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    let backgroundColor = this.props.route.params.backgroundColor;

    return (
      <View style={styles.container} backgroundColor={backgroundColor}>
        <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
 }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})