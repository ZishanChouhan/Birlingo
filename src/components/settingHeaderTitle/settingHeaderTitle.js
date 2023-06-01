import * as React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { images, colors, metrics, fonts } from "../../Theme";

const { width } = Dimensions.get("window");
const height = metrics.screenHeight;
const swidth = metrics.screenWidth;

export default class SettingsHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    var { title, fSize = width * (28 / 375) } = this.props;

    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.nav_view}
          onPress={() => this.props.navigation.goBack()}
        >
          {/* <Image source={images.backArrow} style={styles.backArrowImg} /> */}
          <AntDesign name='left' size={20} color={'#fff'}/>
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={[styles.title, { fontSize: fSize }]}>{title}</Text>
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 8,
    backgroundColor: colors.maroon,
  },
  titleView: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",

    marginTop: swidth * (10 / 375),
    // paddingBottom: swidth * (10 / 375),
  },
  backArrowImg: {
    width: Dimensions.get('window').width > 670 ?70: swidth * (14 / 375),
    tintColor: colors.code_fff,
  },
  title: {
    color: colors.code_fff,
    fontSize: width * (28 / 375),
    fontFamily: fonts.type.ACaslonPro_Bold,
    paddingVertical: 11
  },
  nav_view: {
    marginLeft: swidth * (20 / 375),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Platform.OS == "ios" ? width * (10 / 375) : 0,
    marginTop: Platform.OS == "ios" ? 5 : 10,
  },
});
