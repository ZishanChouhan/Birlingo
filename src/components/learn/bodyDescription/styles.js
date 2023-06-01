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
    color: colors.code_fff,
    // marginTop: width * (12 / 375),
    fontSize: width * (18 / 375),
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
});
