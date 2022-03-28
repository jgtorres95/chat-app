import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';

//import Gifted Chat library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyACAVEDhGYcOenl1Z-IZRV5MD6DMjidujg",
  authDomain: "test-fda01.firebaseapp.com",
  projectId: "test-fda01",
  storageBucket: "test-fda01.appspot.com",
  messagingSenderId: "1063455601946",
}

// The application’s main Chat component that renders the chat UI
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
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

  //this function changes the color of the speech bubble
  renderBubble(props) {
    return (
      <Bubble 
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
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