import * as React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { images, colors } from "../../Theme";
import * as Progress from "react-native-progress";
const { width } = Dimensions.get("window");

export default class Progressbar extends React.Component {
  constructor(props) {
    super(props);
    this.fontsize = 18;
    this.state = {};
  }

  render() {
    var {
      height = 7,
      size = 280,
      complete,
      prog,
      total = 100,
      _onTime,
    } = this.props;

    return (
      <View>
        <Progress.Bar
          height={width * (height / 375)}
          color={colors.green}
          unfilledColor={colors.code_fff}
          borderWidth={0}
          progress={prog ? prog / total : 0}
          width={width - (width * size) / 375}
          borderRadius={0}
        />
      </View>
    );
  }
}
