import { StyleSheet } from "react-native";
import { metrics, colors, fonts } from "../../../Theme";

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({
  titleView: {
    marginTop: width * (50 / 375),
    marginHorizontal: width * (40 / 375),
  },
  title: {
    color: colors.code_82c2,
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
  },
  subTitleInnerView: {
    flex: 1,
  },
  statusBarContainer: {
    flexDirection: "row",
    borderBottomColor: colors.code_fff,
    // borderBottomWidth: 1,
  },
  statusBarContainer_1: {
    flexDirection: "row",
    borderBottomColor: colors.code_fff,
    //borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  closeView: {
    // flex: 1,
    // alignItems: 'center',
    // backgroundColor: "black",
    paddingLeft: width * (15 / 375),
    paddingRight: width * (9 / 375),
    paddingVertical: width * (15 / 375),
  },

  headingView: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowDownView: {
    flex: 1,
    paddingRight: "5%",
    alignItems: "flex-end",
    //justifyContent: 'center'
    paddingVertical: width * (15 / 375),
  },
  headingText: {
    color: colors.code_fff,
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
    textAlign: "center",
  },
  headingText_1: {
    color: colors.code_fff,
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  closeImg: {
    height: width * (16 / 375),
    width: width * (16 / 375),
  },
  closeImg_1: {
    height: width * (12 / 375),
    width: width * (12 / 375),
    tintColor: "#fff",
  },
  downImg: {
    height: width * (21 / 375),
    width: width * (21 / 375),
  },
  topFlex: {
    backgroundColor: "transparent",
  },
});
