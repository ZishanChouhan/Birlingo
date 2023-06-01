import {StyleSheet} from 'react-native';
import {metrics, colors, fonts} from '../../Theme';
import font from '../../Theme/font';

const height = metrics.screenHeight;
const width = metrics.screenWidth;
export const styles = StyleSheet.create({
  goLogin_view: {
    flexDirection: 'row',
    marginTop: width * (10 / 375),
  },
  loginText: {
    color: colors.code_fff,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  account_note: {
    color: colors.code_fff,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: fonts.type.ACaslonPro_Bold,
  },
  description: {
    color: colors.code_fff,
    marginTop: width * (16 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  buttonFree: {
    marginTop: width * (20 / 375),
    backgroundColor: colors.code_fff,
    width: width * (240 / 375),
    height: width * (50 / 375),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  btntxt: {
    fontSize: width * (20 / 375),
    color: colors.code_82c2,
    fontWeight: 'bold',
  },
  outerContainer: {
    flex: 1,
    backgroundColor: colors.code_82c2,
  },
  loginContainer: {
    paddingHorizontal: 16,
    //marginTop: "15%",
  },
  textFieldContainer: {
    marginTop: width*(15/375)
    // borderWidth:1
  },

  rememberMeContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '6%',
  },
  rememberMe: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    marginTop: '10%',
  },
  googleButtonStyle: {
    width: width * (240 / 375),
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.code_fff,
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: width * (20 / 375),
  },
  facebookButtonStyle: {
    width: width * (240 / 375),
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.code_fff,
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: width * (20 / 375),
  },
  facebookTextStyle: {color: colors.white, marginLeft: 10},
  orLoginTextStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '5%',
  },
  footerContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 16,
  },
  socialNote: {
    alignItems: 'center',
    marginTop: width * (30 / 375),
  },
  socialText: {
    marginLeft: width * (8 / 375),
    marginRight: width * (4 / 375),
  },
  googleImg: {
    height: width * (25 / 375),
    width: width * (25 / 375),
  },
  facebookImg: {
    height: width * (25 / 375),
    width: width * (25 / 375),
  },
  socialLabel: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontFamily: font.type.Akkurat_Bold,
  },
  socialText: {
    marginLeft: width * (15 / 375),
    marginRight: width * (4 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  login_note: {
    color: colors.code_fff,
    fontFamily: fonts.type.Akkurat_Bold,
    alignSelf: 'center',
  },
  login_note_view: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginTop: width * (20 / 375),
    height: width * (40 / 375),
  },
  backArrowImg: {
    width: width * (14 / 375),
    tintColor: colors.code_fff,
    alignSelf: 'center',
  },
  check1: {
    marginTop: width * (50 / 375),
    height: width * (40 / 375),
  },
  check2: {
    // marginTop: width * (20 / 375),
    // height: width * (70 / 375),
    flexDirection: 'row',
    // backgroundColor: 'red',
    // alignItems: 'center',
  },
  btn_view: {
    marginTop: 10,
    alignItems: 'center',
    marginTop: width * (50 / 375),
  },
  learningTitle: {
    marginBottom: width * (10 / 375),
    color: colors.code_fff,
    fontFamily: font.type.Akkurat,
  },
  applangTitle: {
    marginVertical: width * (10 / 375),
    color: colors.code_fff,
    fontFamily: font.type.Akkurat,
  },
  privacyPolicyLink: {
    color: '#fff',
    fontSize: width * (14 / 375),
    fontFamily: font.type.Akkurat,
    textDecorationLine: 'underline',
    paddingTop: width * (2 / 375),
  },
  checkText_4: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  checkText_2: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
