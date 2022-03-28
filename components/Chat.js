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

    //reference to Firestore messages collection
    this.referenceChatMessages = firebase.firestore().collection('messages');

  }

  componentDidMount() {
    // set page title using user's name
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    // check whether user is signed in. If there are not, then create a new anonymous user
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      // update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
            _id: user.uid,
            name: name,
            avatar: "https://placeimg.com/140/140/any",
        },
      });
      // listen for changes in messages collection
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate)
    });
  }

  componentWillUnmount() {
    // stop listening for changes in collection
    this.authUnsubscribe();
    this.unsubscribe();
  }

  // called when new snapshot is taken. The function updates the messages state with the snapshot's data
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        },
      });
    });
    this.setState({
      messages: messages,
    });
  };

  // add new messages to the messages collection
  addMessages () {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
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