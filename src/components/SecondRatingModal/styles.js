import { StyleSheet } from "react-native";
import color from "../../Theme/Colors";
import { colors, fonts, metrics } from "../../Theme";
import font from "../../Theme/font";
const height = metrics.screenHeight;
const width = metrics.screenWidth;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  close_view: {
    width: width * (60 / 375),
    marginTop: width * (50 / 375),
  },
  image: {
    marginLeft: width * (20 / 375),
    height: width * (16 / 375),
    width: width * (16 / 375),
    tintColor: colors.code_fff,
  },
  btn_view: {
    marginTop: width * (30 / 375),
    flexDirection: "row",
  },
  text_view: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * (50 / 375),
    backgroundColor: colors.transparent,
  },
  text: {
    color: colors.code_fff,
    fontSize: width * (18 / 375),
    fontFamily: font.type.Akkurat_Bold,
    textAlign: "center",
  },
  text_yes_no: {
    color: colors.code_fff,
    fontSize: width * (18 / 375),
    fontFamily: font.type.Akkurat_Bold,
  },
  btn_no: {
    marginRight: width * (20 / 375),
    height: width * (50 / 375),
    width: width * (120 / 375),
    backgroundColor: colors.maroon,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_yes: {
    marginLeft: width * (20 / 375),
    height: width * (50 / 375),
    width: width * (120 / 375),
    backgroundColor: colors.maroon,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
