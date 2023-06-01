import { StyleSheet,Dimensions } from "react-native";
import { metrics, colors } from "../../Theme";
const width = metrics.screenWidth;
const height = metrics.screenHeight;

export default StyleSheet.create({
  topView: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    height: width * (60 / 375),
    justifyContent: "center",
    borderTopColor: "#C0C0C0",
    backgroundColor: "#fff",
    bottom: 0,
    alignItems: "center",
  },
  touchView: {
    alignItems: "center",
    flex: 0.4,
  },
  img: {
    height: width * (18 / 375),
    width: width * (18 / 375),
    marginTop: width * (5 / 375),
    tintColor: "rgb(151,151,151)",
  },
  imgBlue: {
    height: width * (18 / 375),
    width: width * (18 / 375),
    marginTop: width * (5 / 375),
    tintColor: colors.code_black,
  },
  text: {
    fontSize: Dimensions.get('window').width > 670 ?22:12,
    marginTop: width * (5 / 375),
    color: "rgb(151,151,151)",
  },
  textBlue: {
    fontSize: Dimensions.get('window').width > 670 ?22:12,
    marginTop: width * (5 / 375),
    color: colors.code_black,
  },
});
