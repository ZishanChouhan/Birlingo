import { StyleSheet } from "react-native";
import { metrics, colors, fonts } from "../../Theme";

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({
  backArrowImg: {
    width: width * (14 / 375),
    tintColor: colors.code_fff,
  },
  nav_view: {
    marginLeft: width * (20 / 375),
    //width:width*(80/375),
    flexDirection: "row",
    marginVertical: width * (20 / 375),
    alignItems: "center",
  },
  nav_bar: {
    backgroundColor: colors.maroon,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 8,
    flexDirection: "row",
  },
  navTitle: {
    color: colors.code_fff,
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  titleView: {
    marginTop: width * (30 / 375),
    marginHorizontal: width * (25 / 375),
  },
  title: {
    color: colors.code_fff,
    fontSize: width * (32 / 375),
    fontFamily: fonts.type.ACaslonPro_Bold,
  },
  subTitleView: {
    marginHorizontal: width * (40 / 375),
    flexDirection: "row",
    marginTop: 20,
  },
  subTitle: {
    //marginVertical: 20,
    color: colors.code_fff,
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  addressTitle: {
    marginTop: 50,
    color: colors.code_82c2,
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  addressTitle1: {
    color: colors.code_82c2,
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  marginView: {
    height: width * (50 / 375),
  },
  formContainer: {
    marginHorizontal: width * (40 / 375),
    marginTop: width * (10 / 375),
  },

  subTitleInnerView: {
    flex: 1,
  },
  list_view_outer: {
    height: width * (310 / 375),
  },
  list: {
    alignSelf: "center",
    marginTop: width * (10 / 375),
  },
  webView: {
    marginHorizontal: width * (20 / 375),
  },

  //  ratingHeadSection
});
