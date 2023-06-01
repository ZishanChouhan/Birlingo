import * as React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,

} from "react-native";
//import styles from "./styles";
import { images, colors } from "../../Theme";
import * as Progress from "react-native-progress";
import font from "../../Theme/font";
const { width } = Dimensions.get("window");

export default class BottomTab extends React.Component {
  render() {
    var {
      appString,
      title1,
      title2,
      title3,
      title4,
      slected1,
      slected2,
      type,
    } = this.props;

    return (
      <View style={styles.outerView}>
        {type == 1 ? (
          <View style={styles.innerView}>
            <TouchableOpacity
              style={slected1 == 1 ? styles.touchView_1_5 : styles.touchView}
              onPress={() => this.props.onClick(1, type, "all")}
            >
              <Text
                style={slected1 == 1 ? styles.textStyle2 : styles.textStyle}
              >
                {title1}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={slected1 == 2 ? styles.touchView2 : styles.touchView}
              onPress={() => this.props.onClick(2, type, 1)}
            >
              <Text
                style={slected1 == 2 ? styles.textStyle2 : styles.textStyle}
              >
                {title2}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={slected1 == 3 ? styles.touchView2 : styles.touchView}
              onPress={() => this.props.onClick(3, type, 2)}
            >
              <Text
                style={slected1 == 3 ? styles.textStyle2 : styles.textStyle}
              >
                {title3}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                slected1 == 4 ? styles.touchViewRight2 : styles.touchViewRight
              }
              onPress={() => this.props.onClick(4, type, 3)}
            >
              <Text
                style={slected1 == 4 ? styles.textStyle2 : styles.textStyle}
              >
                {title4}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.innerView}>
            <TouchableOpacity
              style={slected2 == 5 ? styles.touchView_1_5 : styles.touchView}
              onPress={() => this.props.onClick(5, type, "all")}
            >
              <Text
                style={slected2 == 5 ? styles.textStyle2 : styles.textStyle}
              >
                {title1}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={slected2 == 6 ? styles.touchView2 : styles.touchView}
              onPress={() => this.props.onClick(6, type, 0)}
            >
              <Text
                style={slected2 == 6 ? styles.textStyle2 : styles.textStyle}
              >
                {title2}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={slected2 == 7 ? styles.touchView2 : styles.touchView}
              onPress={() => this.props.onClick(7, type, 1)}
            >
              <Text
                style={slected2 == 7 ? styles.textStyle2 : styles.textStyle}
              >
                {title3}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                slected2 == 8 ? styles.touchViewRight2 : styles.touchViewRight
              }
              onPress={() => this.props.onClick(8, type, 2)}
            >
              <Text
                style={slected2 == 8 ? styles.textStyle2 : styles.textStyle}
              >
                {title4}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  outerView: {
    height: 80,
    justifyContent: "center",
  },
  innerView: {
    flexDirection: "row",
    height: 50,
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: "#fff",
  },
  touchView: {
    borderRightColor: "#fff",
    flex: 0.25,
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchViewRight: {
    borderRightColor: "#fff",
    flex: 0.25,
    //  borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  textStyle: {
    fontSize: Dimensions.get('window').width > 670 ?30:14,
    color: "#fff",
    textAlign: "center",
    fontFamily: font.type.Akkurat,
  },
  touchView2: {
    borderRightColor: "#fff",
    flex: 0.25,
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  touchView_1_5: {
    borderRightColor: "#fff",
    flex: 0.25,
    // borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  touchViewRight2: {
    borderRightColor: "#fff",
    flex: 0.25,
    // borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  textStyle2: {
    fontSize: Dimensions.get('window').width > 670 ?30:14,
    color: colors.code_blk,
    textAlign: "center",
    fontFamily: font.type.Akkurat,
  },
});
