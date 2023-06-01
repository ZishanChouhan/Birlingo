import { StyleSheet } from "react-native";
import { metrics, colors, fonts } from "../../../Theme";
import font from "../../../Theme/font";
const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({
  titleView: {
    marginTop: width * (50 / 375),
    marginHorizontal: width * (40 / 375),
  },
  title: {
    color: colors.code_fff,
    fontSize: width * (32 / 375),
    fontFamily: fonts.type.ACaslonPro_Bold,
  },
  subTitleView: {
    marginTop: width * (11 / 375),
    marginHorizontal: width * (40 / 375),
    flexDirection: "row",
  },
  subTitle: {
    color: colors.code_82c2,
    marginTop: width * (12 / 375),
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  marginView: {
    height: width * (50 / 375),
  },
  formContainer: {
    marginHorizontal: width * (40 / 375),
    flex: 1,
  },
  subTitleInnerView: {
    flex: 1,
  },
  flatlistContainerView: {
    flex: 0.5,
    backgroundColor: colors.code_fff,
    height: width * (55 / 375),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: width * (15 / 375),
    flexDirection: "column",
  },
  flatlistContainerView_dark: {
    flex: 0.5,
    backgroundColor: "rgb(83,179,214)",
    height: width * (55 / 375),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: width * (15 / 375),
    flexDirection: "column",
  },

  flatListText_big: {
    color: colors.code_82c2,
    fontSize: width * (13 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  flatListText_big_white: {
    color: colors.code_fff,
    fontSize: width * (13 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  flatListText: {
    color: colors.code_82c2,
    fontSize: width * (10 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  flatListText_white: {
    color: colors.code_fff,
    fontSize: width * (10 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  checkImg: {
    height: width * (12 / 375),
    width: width * (13 / 375),
  },
  firstRowContainer: {
    flexDirection: "row",
    flex: 0.6,
  },
  outerRowContainer: {
    flexDirection: "column",
    flex: 0.6,
  },
  innerRowContainer: {
    flex: 0.4,
  },
  TextContainerView: {
    flexDirection: "row",
    width: width * (250 / 375),
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "center",
  },
  textAlign: {
    alignItems: "center",
  },
  checkImgContainerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainerView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.4,
    marginTop: 5,
  },

  rowBack: {
    height: width * (34 / 375),
    // width: width * (36 / 375),
    backgroundColor: colors.maroon,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
  },

  renderOuterView: {
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  navRenderView: {
    // height: width * (193 / 375),
    width: width * (300 / 375),
    backgroundColor: "#fff",
    borderRadius: width * (10 / 375),
    paddingBottom: width * (10 / 375),
    // borderWidth: 1
  },
  listTitleView: {
    marginHorizontal: width * (20 / 375),
    marginTop: width * (10 / 375),
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
    marginTop: width * (5 / 375),
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
    alignItems: "center",
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
  progressBarView: {
    marginBottom: width * (15 / 375),
  },
  bottomOptionFirstTxt: {
    color: colors.code_blk,
    fontSize: width * (8 / 375),
    fontFamily: fonts.type.Akkurat,
  },
});
