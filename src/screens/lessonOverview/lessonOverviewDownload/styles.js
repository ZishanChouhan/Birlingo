import { Platform, StyleSheet,Dimensions } from "react-native";
import { metrics, colors, fonts } from "../../../Theme";
import font from "../../../Theme/font";

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({
  titleView: {
    //  height: width * (60 / 375),
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.maroon,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 8,
    // marginBottom: width * (30 / 375),
  },
  titleText: {
    fontSize: width * (28 / 375),
    color: "#fff",
    fontFamily: font.type.ACaslonPro_Bold,
    textAlign: "center",
    paddingVertical: Platform.OS == "ios" ? width * (10 / 375) : 0,
    marginTop: Platform.OS == "ios" ? 5 : 10,
  },
  subTitleView: {
    height: width * (40 / 375),
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  subTitleText: {
    marginLeft: width * (30 / 375),
    fontFamily: font.type.Akkurat,
    color: "rgb(61,118,206)",
    fontSize: width * (14 / 375),
  },
  bottomOptionContainer: {
    flexDirection: "row",
    paddingVertical: width * (10 / 375),
    backgroundColor: colors.progressBackColor,
    marginHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  bottomOptionFirst: {
    height: width * (45 / 375),
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    marginTop: 10,
  },
  bottomOptionSecond: {
    height: width * (45 / 375),
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    marginTop: 10,
  },
  bottomOptionThird: {
    height: width * (45 / 375),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 10,
  },
  bottomOptionFour: {
    height: width * (45 / 375),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 10,
  },
  bottomOptionFirstTxt: {
    color: colors.code_blk,
    fontSize: width * (8 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  renderOuterView: {
    alignItems: "center",
    marginBottom: width * (15 / 375),
    marginTop: 10,
  },
  navRenderView: {
    // height: width * (193 / 375),
    width: width * (300 / 375),
    backgroundColor: "#fff",
    borderRadius: width * (10 / 375),
    paddingBottom: width * (10 / 375),
  },
  listTitleView: {
    marginHorizontal: width * (20 / 375),
    marginTop: width * (10 / 375),
    flexDirection: "row",
  },
  levelText: {
    fontSize: width * (12 / 375),
    color: "rgb( 61, 118, 206)",
    fontFamily: font.type.Akkurat,
  },
  levelSubTitle: {
    fontSize: width * (18 / 375),
    color: colors.code_blk,
    fontFamily: font.type.Akkurat_Bold,
  },
  levelsubTitleView: {
    marginTop: width * (15 / 375),
    marginBottom: width * (5 / 375),
    flex: 1,
  },
  progressBarView: {
    marginBottom: width * (15 / 375),
  },
  screenTitleView: {
    alignItems: "center",
    flex: 0.9,
    justifyContent: "center",
  },
  backIcon: {
    tintColor: "#fff",
    height:Dimensions.get('window').width > 670 ? 100:40,
    marginLeft:35,
    // backgroundColor:'black'
  },
  backIconView: {
    marginLeft: 16,
    // marginTop: 20
    // flex: 0.1,
    //  alignItems: "center",
    // height: width * (40 / 375),
    // width: width * (24 / 375),
    // backgroundColor:'red'
  },
  checkImg: {
    height: width * (12 / 375),
    width: width * (13 / 375),
    tintColor: colors.maroon,
    // right: 0,
    alignSelf: "flex-end",
    marginTop: 4,
  },
});
