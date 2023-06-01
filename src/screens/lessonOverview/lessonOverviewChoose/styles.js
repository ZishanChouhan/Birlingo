import { StyleSheet, Platform } from "react-native";
import { metrics, colors, fonts } from "../../../Theme";
import font from "../../../Theme/font";

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({
  titleView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.maroon,
    shadowColor: colors.code_black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 20,
  },
  titleText: {
    fontSize: width * (28 / 375),
    color: colors.code_fff,
    fontFamily: font.type.ACaslonPro_Bold,
    paddingVertical: Platform.OS == "ios" ? width * (10 / 375) : 0,
    marginTop: Platform.OS == "ios" ? 5 : 10,
  },
  subTitleView: {
    height: width * (40 / 375),
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: 30,
  },
  renderouterView: {
    paddingHorizontal: width * (25 / 375),
    marginBottom: width * (40 / 375),
    alignSelf: "center",
  },
  backImg: {
    height: 375 * (180 / 375),
    width: width * (306 / 375),
  },
  midView: {
    justifyContent: "flex-end",
    bottom: 0,
    // borderWidth: 0.5,
    // borderColor: '#fff',
    borderRadius: 10,
  },
  nestedView: {
    //  position: 'absolute',
    width: width * (306 / 375),
    backgroundColor: "#fff",
    //  flex: 0.55,
    paddingHorizontal: width * (5 / 375),
    borderBottomLeftRadius: width * (10 / 375),
    borderBottomRightRadius: width * (10 / 375),
  },
  renderTitleView: {
    paddingVertical: width * (5 / 375),
  },
  renderTitle: {
    color: "rgb(61,118,206)",
    fontSize: width * (12 / 375),
    //   lineHeight: 21,
    fontFamily: font.type.Akkurat,
  },
  renderSubTitle: {
    color: "#fff",
    fontSize: width * (24 / 375),
    fontFamily: font.type.Akkurat_Bold,
    paddingTop: width * (20 / 375),
    paddingBottom: width * (10 / 375),
    paddingLeft: width * (20 / 375),
  },
  heading: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(72,158,212)",
    paddingBottom: width * (5 / 375),
    // marginTop: width * (5 / 375),
  },
  headingText: {
    color: "rgb(61,118,206)",
    fontSize: width * (12 / 375),
    fontFamily: font.type.Akkurat,
  },
  levelOuterView: {
    flexDirection: "row",
    marginTop: width * (12 / 375),
  },
  levelNameView: {
    justifyContent: "center",
    width: width * (142 / 375),
  },
  levelName: {
    color: colors.code_blk,
    fontSize: width * (12 / 375),
    fontFamily: font.type.Akkurat,
  },
  progressView: {
    justifyContent: "center",
    marginRight: width * (15 / 375),
    // marginLeft: width * (5 / 375),
  },
  circleOuterView: {
    alignSelf: "flex-end",
  },
  circleNavView: {
    backgroundColor: "rgb(61,118,206)",
    height: width * (25 / 375),
    width: width * (25 / 375),
    borderRadius: width * (15 / 375),
    justifyContent: "center",
    alignItems: "center",
  },
  levelNumber: {
    color: colors.code_blk,
    fontSize: width * (10 / 375),
    fontFamily: font.type.Akkurat,
  },
  subTitleText: {
    marginLeft: width * (30 / 375),
    fontFamily: font.type.Akkurat,
    color: "rgb(61,118,206)",
    fontSize: width * (14 / 375),
  },
});
