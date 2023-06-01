import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { styles } from "./styles";

const { height, width } = Dimensions.get("window");

class FooterTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: "I'm ready to get swiped!",
      gestureName: "none",
      backgroundColor: "#fff",
    };
  }

  render() {
    const { selected } = this.props;
    console.log("selected----", selected);

    return (
      <View style={styles.bottomOptionContainer}>
        <TouchableOpacity activeOpacity={0.8} style={styles.bottomOptionFirst}>
          <Text style={styles.bottomOptionFirstTxt}>Hear Actively</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.bottomOptionSecond}>
          <Text style={styles.bottomOptionFirstTxt}>Listen Passively</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.bottomOptionThird}>
          <Text style={styles.bottomOptionFirstTxt}>Speak</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FooterTabs;
