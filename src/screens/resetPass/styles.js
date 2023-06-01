
import { StyleSheet, Platform } from 'react-native';
import { metrics, colors, fonts } from '../../Theme';

const height = metrics.screenHeight;
const width = metrics.screenWidth;
export const styles = StyleSheet.create({

  backArrowImg: {
    height: width * (14 / 375),
    width: width * (14 / 375),
    padding: 6
  },
  nav_view: {
    marginHorizontal: width * (20 / 375),
    flexDirection: 'row',
    marginTop: width * (50 / 375),
    alignItems: 'center',
  },
  navTitle: {
    color: colors.code_fff,
    fontSize: width * (12 / 375)
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.code_82c2,
  },
  free: {
    alignItems: 'center',
  },
  buttonFree: {
    marginTop: width * (20 / 375),
    backgroundColor: colors.code_fff,
    width: width * (240 / 375),
    height: width * (50 / 375),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,

  },
  btntxt: {
    fontSize: width * (20 / 375),
    color: colors.code_82c2,
    fontWeight: 'bold'
  },
  title: {
    fontSize: width * (36 / 375),
    color: colors.code_fff,
    backgroundColor: 'transparent',
    paddingTop: width * (90 / 375),
    fontWeight: 'bold',
    fontFamily: fonts.type.ACaslonPro_Bold
  },
  loginText: {
    marginTop: width * (30 / 375),
    marginBottom: width * (50 / 375)
  },
  login: {
    fontSize: width * (25 / 375),
    color: colors.code_fff,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    paddingTop: width * (80 / 375),
    paddingBottom: width * (20 / 667),
    fontSize: height * (13 / 667),
    fontWeight: 'bold',
    fontFamily: fonts.type.Akkurat_Bold
  },
  description: {
    fontSize: height * (12 / 667),
    lineHeight: height * (8 / 375),
    color: colors.code_fff,
    backgroundColor: 'transparent',
    textAlign: 'left',
    paddingBottom: width * (80 / 375),
    paddingRight: width * (60 / 375),
    marginTop: width * (20 / 375),
    letterSpacing: 1,
    fontFamily: fonts.type.Akkurat
  },
  slides: {
    backgroundColor: colors.code_82c2,
    paddingBottom: width * (80 / 375),
    paddingHorizontal: width * (20 / 375),
  },
  container: {
    paddingHorizontal: width * (20 / 375),
    flex: 1
  },




  outerContainer: {
    flex: 1,
    backgroundColor: colors.code_fff,
    marginBottom : Platform.OS == "ios" ? -50: 0
  },
  loginContainer: {
    paddingHorizontal: 16,
    marginTop: "18%",
  },
  textFieldContainer: {
    marginTop: "12%"
  },

  rememberMeContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "6%",
    borderWidth: 1
  },
  rememberMe: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: width * (10 / 375),
    paddingHorizontal: width * (10 / 375)
  },
  btnStyle: {
    alignItems: 'center',
    marginTop: "10%"
  },
  googleButtonStyle: {
    width: width * (240 / 375),
    flexDirection: "row",
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.code_fff,
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: width * (20 / 375),

  },
  facebookButtonStyle: {
    width: width * (240 / 375),
    flexDirection: "row",
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.code_fff,
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: width * (20 / 375),
    marginBottom: width * (50 / 375)
  },
  facebookTextStyle: { color: colors.white, marginLeft: 10 },
  orLoginTextStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: "5%"
  },
  footerContainer: {
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 16
  },
  socialNote: {
    alignItems: 'center',
    marginTop: width * (50 / 375)
  },
  socialText: {
    marginLeft: width * (8 / 375),
    marginRight: width * (4 / 375),
    fontFamily: fonts.type.Akkurat_Bold
  },
  signUpText: {
    color: colors.code_fff,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontFamily: fonts.type.A
  },
  login_note: {
    color: colors.code_fff,
    fontFamily: fonts.type.Akkurat
  },
  login_note_view: {
    flexDirection: 'row',
    marginTop: 10
  },
  loginTitle: {
    fontFamily: fonts.type.ACaslonPro_Bold
  },
  forgot_note: {
    color: colors.code_fff,
    fontFamily: fonts.type.Akkurat_Bold,
    textDecorationLine: 'underline'
  },
  googleImg: {
    height: width * (25 / 375),
    width: width * (25 / 375)
  },
  facebookImg: {
    height: width * (30 / 375),
    width: width * (30 / 375)
  },
  socialLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  backArrowImg: {
    width: width * (14 / 375),
    tintColor: colors.code_fff
  },
  resend_txt: {
    color: colors.code_fff,
    fontFamily: fonts.type.Akkurat_Bold,
    textDecorationLine: 'underline'
  },
})
