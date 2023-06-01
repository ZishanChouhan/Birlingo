import { StyleSheet } from "react-native";
import { metrics, colors, fonts } from "../../../Theme";

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({
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
  backArrowImg: {
    width: width * (14 / 375),
    tintColor: colors.code_fff,
  },
  nav_view: {
    marginLeft: width * (20 / 375),
    //  width: width * (80 / 375),
    flexDirection: "row",
    marginVertical: width * (20 / 375),
    alignItems: "center",
  },
  navTitle: {
    color: colors.code_fff,
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  titleView: {
    marginTop: width * (20 / 375),
    marginHorizontal: width * (40 / 375),
  },
  title: {
    color: colors.code_fff,
    fontSize: width * (32 / 375),
    fontFamily: fonts.type.ACaslonPro_Bold,
  },
  subTitleView: {
    // marginTop: width * (11 / 375),
    marginHorizontal: width * (40 / 375),
    flexDirection: "row",
  },
  subTitle: {
    color: colors.code_fff,
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  cardTitle: {
    color: colors.code_fff,
    // marginTop: width * (12 / 375),
    fontSize: width * (13 / 375),
    fontFamily: fonts.type.ACaslonPro_Bold,
  },
  subTitleInnerView: {
    flex: 1,
  },
  marginView: {
    height: width * (50 / 375),
  },
  formContainer: {
    marginTop: width * (20 / 375),
    marginHorizontal: width * (40 / 375),
  },
  paymentButtonView: {
    borderWidth: 1,
    borderColor: colors.code_gray,
    height: width * (40 / 375),
    flexDirection: "row",
    marginBottom: "3%",
    // backgroundColor: 'green'
  },
  visaIcon: {
    height: width * (23 / 375),
    width: width * (85 / 375),
  },
  paypalIcon: {
    height: width * (24 / 375),
    width: width * (45 / 375),
    marginLeft: "2%",
  },
  applePayIcon: {
    height: width * (32 / 375),
    width: width * (48 / 375),
    marginBottom: "2.5%",
  },
  gPayIcon: {
    height: width * (23 / 375),
    width: width * (44 / 375),
    marginBottom: "2.5%",
  },
  payIcon: {
    height: width * (21 / 375),
    width: width * (21 / 375),
    marginLeft: "2%",
    resizeMode: "contain",
  },
  arrowIcon: {
    height: width * (14 / 375),
    width: width * (24 / 375),
    tintColor: colors.code_fff,
  },
  alignIcon: {
    justifyContent: "center",
    flex: 1,
    //  backgroundColor: 'red',
    paddingLeft: "1%",
  },
  alignAppleIcon: {
    justifyContent: "center",
    flex: 1,
    //  backgroundColor: 'red',
    //  paddingLeft: '3%'
  },
  alignArrow: {
    justifyContent: "center",
    flex: 0.1,
    // backgroundColor: 'red',
    marginTop: "-1.2%",
  },
  cardIcon: {
    fontSize: 18,
    color: colors.code_fff,
    paddingLeft: "3%",
    marginTop: "-2%",
  },
  cardText: {
    paddingLeft: width * (10 / 375),
    alignItems: "center",
  },
  card_outer_view: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
});
