import { StyleSheet } from "react-native";
import { metrics, colors, fonts } from "../../../Theme";

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({
  titleView: {
    flex: 1,
    justifyContent: "center",
  },
  arrowView: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  arrow: {
    height: width * (14 / 375),
    width: width * (24 / 375),
    tintColor: "#fff",
  },
  tabView: {
    marginHorizontal: width * (20 / 375),
    flexDirection: "row",
    paddingVertical: width * (15 / 375),
    borderBottomWidth: 1,
    borderBottomColor: colors.code_fff,
  },
  title: {
    color: colors.code_fff,
    fontSize: width * (16 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  margin: {
    height: width * (30 / 375),
  },
});
