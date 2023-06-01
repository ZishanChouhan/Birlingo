import { StyleSheet } from "react-native";
import { metrics, colors, fonts } from "../../../Theme";

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const localStyle = StyleSheet.create({
  backArrowImg: {
    width: width * (14 / 375),
    tintColor: "#fff",
  },
  navTitle: {
    color: colors.code_fff,
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  title: {
    color: colors.code_fff,
    fontSize: width * (32 / 375),
    fontFamily: fonts.type.ACaslonPro_Bold,
  },
  subTitle: {
    //marginVertical: 20,
    color: colors.code_fff,
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  flatlistContainerView: {
    //flex: 0.5,
    backgroundColor: colors.code_d6eb,
    height: width * (100 / 375),
    margin: "2%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: width * (20 / 375),
  },
  flatListText: {
    color: colors.code_82c2,
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  nextButton: {
    backgroundColor: colors.maroon,
    height: width * (50 / 375),
    justifyContent: "center",
    alignItems: "center",
    //   marginBottom: width * (80 / 375),
    width: "90%",
    alignSelf: "center",
    borderRadius: 50,
    //marginTop: width * (40 / 375),
    position: "absolute",
    bottom: 5,
  },
  learn_nextButton: {
    backgroundColor: colors.code_82c2,
    height: width * (50 / 375),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: width * (35 / 375),
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: width * (40 / 375),
  },
  nextText: {
    color: colors.code_fff,
    fontSize: width * (16 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  list_view: {
    marginHorizontal: width * (20 / 375),
    marginTop: width * (30 / 375),
    alignItems: "center",
    flex: 1,
  },
  list: {
    alignSelf: "center",
    marginTop: width * (15 / 375),
    marginBottom: width * (60 / 375),
  },
});
