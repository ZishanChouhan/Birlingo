import { StyleSheet } from "react-native";
import { metrics, colors, fonts } from "../../Theme";
import font from "../../Theme/font";
const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({
  heading_text: {
    fontSize: width * (28 / 375),
    color: colors.code_fff,
    fontFamily: font.type.Roboto_Medium,
    marginHorizontal: width * (30 / 375),
    //marginTop: width * (50 / 375)
  },
  heading_text_2: {
    fontSize: width * (30 / 375),
    color: colors.code_fff,
    fontFamily: font.type.ACaslonPro_Bold,
    marginHorizontal: width * (30 / 375),
    marginTop: width * (20 / 375),
  },
  message_text: {
    fontSize: width * (30 / 375),
    color: colors.code_fff,
    fontFamily: font.type.ACaslonPro_Bold,
    marginHorizontal: width * (30 / 375),
    marginTop: width * (10 / 375),
  },
  statusBarContainer_1: {
    flexDirection: "row",
    borderBottomColor: colors.code_fff,
    //borderBottomWidth: 1,
    backgroundColor: "rgb(255,255,255)",
  },
  closeView: {
    flex: 1,
    // alignItems: 'center',
    paddingLeft: width * (15 / 375),
    paddingVertical: width * (15 / 375),
  },
  closeImg_1: {
    height: width * (12 / 375),
    width: width * (12 / 375),
    tintColor: "#fff",
  },
  headingText_1: {
    color: colors.code_fff,
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
    textAlign: "center",
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
});
