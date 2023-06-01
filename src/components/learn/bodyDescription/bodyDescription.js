import React, { Component } from "react";
import {
  View,
  Text,
} from "react-native";
import { styles } from "./styles";


class BodyDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={styles.subTitle}>{this.props.subTitle}</Text>
      </View>
    );
  }
}

export default BodyDescription;
