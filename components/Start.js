import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";

// import background image 
import BackgroundImage from "../assets/background-image.png";

// The application’s Start screen
export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      backgroundColor: "",
    };
  }

  // background colors
  colors = {
    black: "#090C08",
    purple: "#474056",
    blue: "#8A95A5",
    green: "#B9C6AE",
  };

  // update backgroundColor state when user selects a color
  updateColor = (color) => {
    this.setState({
      backgroundColor: color,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>ChatMe</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Your Name"
              onChangeText={(text) => this.setState({ name: text })}
            />
            <Text>Choose Background Color: </Text>
            {/* renders pressable backgroud colors. updateColor is called upon selecting a color */}
            <View style={styles.backgroundColors}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="black background"
                accessibilityHint="Allows you to add a red background to the chat"
                accessibilityRole="button"
                style={styles.color1}
                onPress={() => this.updateColor(this.colors.black)}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="black background"
                accessibilityHint="Allows you to add a red background to the chat"
                accessibilityRole="button"
                style={styles.color2}
                onPress={() => this.updateColor(this.colors.purple)}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="black background"
                accessibilityHint="Allows you to add a red background to the chat"
                accessibilityRole="button"
                style={styles.color3}
                onPress={() => this.updateColor(this.colors.blue)}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="black background"
                accessibilityHint="Allows you to add a red background to the chat"
                accessibilityRole="button"
                style={styles.color4}
                onPress={() => this.updateColor(this.colors.green)}
              />
            </View>
            <Pressable
              style={styles.buttonBox}
              onPress={() => {
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  backgroundColor: this.state.backgroundColor,
                });
              }}
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleBox: {
    height: "50%",
    width: "88%",
    alignItems: "center",
    paddingTop: 100,
  },
  titleText: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  inputBox: {
    backgroundColor: "#FFFFFF",
    height: "44%",
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "88%",
    height: "10%",
  },
  buttonBox: {
    backgroundColor: "#757083",
    width: "88%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundColors: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  color1: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color2: {
    backgroundColor: "#474056",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color3: {
    backgroundColor: "#8A95A5",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color4: {
    backgroundColor: "#B9C6AE",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
