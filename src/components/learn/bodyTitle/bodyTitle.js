import React, { Component } from "react";
import {
  View,
  Text,
} from "react-native";
import { styles } from "./styles";

class BodyTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: "I'm ready to get swiped!",
      gestureName: "none",
      backgroundColor: "#fff",
    };
  }
  render() {
    return (
      <View style={styles.titleView}>
        <Text style={styles.title}>{this.props.desText}</Text>
      </View>
    );
  }
}

export default BodyTitle;
