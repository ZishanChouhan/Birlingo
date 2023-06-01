import {StyleSheet} from 'react-native';
import {State} from 'react-native-gesture-handler';
import {metrics, colors, fonts} from '../../../Theme';
import {setLastTermDate} from '../../selectLanguage/reducer';

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({
  nav_bar: {
    backgroundColor: colors.maroon,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 8,
    flexDirection: 'row',
  },
  backArrowImg: {
    width: width * (14 / 375),
    tintColor: colors.code_fff,
  },
  nav_view: {
    marginLeft: width * (20 / 375),
    //width:width*(80/375),
    flexDirection: 'row',
    marginVertical: width * (20 / 375),
    alignItems: 'center',
  },
  navTitle: {
    color: colors.code_fff,
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  titleView: {
    //  marginTop: width * (30 / 375),
    marginHorizontal: width * (40 / 375),

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.code_fff,
    fontSize: width * (32 / 375),
    fontFamily: fonts.type.ACaslonPro_Bold,
  },
  subTitleView: {
    marginHorizontal: width * (20 / 375),
    flexDirection: 'row',
    marginTop: 20,
  },
  subTitle: {
    color: colors.code_fff,

    fontSize: width * (16 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  subTitle2: {
    color: colors.code_fff,

    fontSize: width * (20 / 375),

    fontWeight: 'bold',

    marginLeft: width * (20 / 375),
    marginTop: width * (35 / 375),
  },
  view31: {
    alignContent: 'center',
    justifyContent: 'center',
    height: width * (50 / 375),
    flexDirection: 'row',
    backgroundColor: colors.maroon,
    width: width - 40,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: width * (15 / 375),
  },
  subTitleInnerView: {
    flex: 1,
  },
  radioView: {
    marginTop: width * (20 / 375),
    marginHorizontal: width * (40 / 375),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  formContainer: {
    // marginHorizontal: width * (40 / 375),
    marginTop: width * (10 / 375),
    // alignSelf: 'center',
  },
  inputView: {
    borderBottomColor: '#4882c2',
    borderBottomWidth: 1,
  },
  input: {
    color: '#4882c2',
    height: width * (40 / 375),
    marginTop: width * (10 / 375),
    paddingLeft: 10,
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
    fontWeight: 'bold',
    // borderWidth: 0,
    width: width * (300 / 375),
  },
  buttonView: {
    marginRight: '3%',
  },
  view22: {
    backgroundColor: colors.maroon,
    height: width * (50 / 375),
    width: width - 40,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: width * (15 / 375),
    // alignSelf: 'center',
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  buttonFree: {
    marginTop: width * (20 / 375),
    backgroundColor: colors.maroon,
    width: "100%",
    height: width * (50 / 375),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  redButtonFree: {
    marginTop: width * (20 / 375),
    backgroundColor: colors.maroon, //red
    // width: width * (300 / 375),
    height: width * (50 / 375),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btntxt: {
    fontSize: width * (20 / 375),
    color: colors.code_fff,
    fontWeight: 'bold',
  },
  mail_view: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    flexWrap: 'nowrap',
    paddingVertical: width * (16 / 375),
    borderBottomColor: colors.maroon,
    backgroundColor: 'rgb(242,242,242)',
    paddingLeft: width * (12 / 375),
  },
  mailText: {
    color: colors.maroon,
  },
  btn_view: {
    // alignItems: 'center',
    // width: width - 40,
    paddingHorizontal: 20
    // marginBottom: width * (20 / 375),
  },
  delete_note: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: width * (3 / 375),
    // borderTopColor: '#fff',
    // borderWidth: 1,
  },
  delete_note1: {
    height: 2,
    backgroundColor: '#fff',
    width: width * (330 / 375),
    alignSelf: 'center',
    marginTop: width * (30 / 375),
    marginBottom: width * (30 / 375),
  },
  transaction:{
    marginHorizontal: 20,
    backgroundColor: colors.maroon,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: width * (20 / 375),
    // width: width - 40,

    height: width * (50 / 375),
    borderRadius: 10,
  },
  lbl:{
    color: colors.code_fff,
    fontFamily: fonts.type.ACaslonPro_Bold,
    fontSize: width * (20 / 375),
    fontWeight: 'bold',
  }
});
