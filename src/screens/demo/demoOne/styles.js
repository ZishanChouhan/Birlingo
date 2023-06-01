import {Platform, StyleSheet,Dimensions} from 'react-native';
import {metrics, colors, fonts} from '../../../Theme';
import font from '../../../Theme/font';
import hasNotch from '../../../components/container/Deviceinfo';
const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backGround[0],
  },
  formContainer: {
    flex: 1,
    marginHorizontal: width * (8 / 375),
    // backgroundColor: 'green',
  },
  fifth_formContainer: {
    flex: 1,
    marginHorizontal: width * (10 / 375),
  },
  slides: {
    flex: 1,
    // backgroundColor: 'red',
    //paddingHorizontal: width * (20 / 375),
  },
  imagineImg: {
    height: width * (53 / 375),
    width: width * (50 / 375),
    resizeMode: 'contain',
  },
  instructionView: {
    // flex: 0.7,
    flexDirection: 'row',
    paddingTop: width * (25 / 375),
    marginHorizontal: width * (10 / 375),
  },
  instructionSet: {
    flex: 0.7,
    flexDirection: 'row',
    paddingTop: width * (25 / 375),
    marginHorizontal: width * (10 / 375),
    alignItems: 'center',
  },
  sentenceList_title: {
    flexDirection: 'row',
    paddingTop: width * (20 / 375),
  },
  sentence_outer_view: {
    marginLeft: width * (10 / 375),
    flexDirection: 'row',
    marginBottom: width * (10 / 375),
  },
  sentence_circle_view: {
    height: width * (50 / 375),
    width: width * (50 / 375),
    // borderBottomWidth: 2,
    // borderColor: "#4882c2",
    borderRadius: width * (25 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  sentence_text: {
    marginLeft: width * (20 / 375),
    justifyContent: 'center',
    flex: 1,
  },
  instructionText: {
    marginLeft: width * (25 / 375),
    marginRight: width * (50 / 375),
    paddingTop: width * (5 / 375),
    justifyContent: 'center',
  },
  compareImg: {
    height: width * (54 / 375),
    width: width * (50 / 375),
    resizeMode: 'contain',
  },
  earImg: {
    height: width * (54 / 375),
    width: width * (50 / 375),
    resizeMode: 'contain',
  },
  repeatImg: {
    height: width * (54 / 375),
    width: width * (50 / 375),
    resizeMode: 'contain',
  },
  sentance_view: {
    marginTop: width * (10 / 375),
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.3)',
    // backgroundColor: 'red',
    padding: 5,
    marginRight: width * (10 / 375),
    // marginBottom: 30,
  },
  listen_sub_sentance_text: {
    fontSize: width * (19 / 375),
    fontFamily: font.type.ACaslonPro_Bold,
    color: colors.code_fff,
    // marginTop: width * (14 / 375),
  },
  sentance_view_1: {
    marginTop: width * (2 / 375),
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingVertical: Platform.OS == "ios" ? 5 : 0,
    marginRight: width * (10 / 375),
    // backgroundColor: "black"
  },
  imageSentence: {
    marginTop: width * (30 / 375),
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 5,
    marginRight: width * (8 / 375),
    paddingLeft: width * (15 / 375),
  },
  imagin_text: {
    fontSize: width * (21 / 375),
    fontFamily: font.type.ACaslonPro_Bold,
    color: colors.code_fff,
    //paddingVertical: Platform.OS === 'ios' ? width * (10 / 375) : 0
  },
  sentance_text: {
    fontSize: width * (21 / 375),
    fontFamily: font.type.ACaslonPro_Bold,
    lineHeight: 30,
    letterSpacing: 0.5,
  },
  sentance_text_listen: {
    fontSize: width * (21 / 375),
    fontFamily: font.type.Regular,
    lineHeight:Dimensions.get('window').width > 670 ?60: 30,
    letterSpacing: 0.5,
    color: colors.code_fff,
  },
  sentance_loop_text: {
    fontSize: width * (20 / 375),
    fontFamily: font.type.Regular,
    color: 'rgba(255,255,255, 0.3)',
  },
  sentance_list_number: {
    fontSize: width * (14 / 375),
    fontFamily: font.type.Akkurat,
    paddingVertical: Platform.OS === 'ios' ? width * (10 / 375) : 0,
    color: colors.code_82c2,
  },
  sentance_list_text: {
    fontSize: width * (20 / 375),
    fontFamily: font.type.ACaslonPro_Bold,
    paddingVertical: Platform.OS === 'ios' ? width * (10 / 375) : 0,
    // textDecorationLine: 'underline',
    color: colors.code_fff,
  },
  sentance_text_1: {
    fontSize: width * (20 / 375),
    fontFamily: font.type.Regular,
    color: colors.code_fff,
  },
  sub_sentance_text: {
    fontSize: width * (19 / 375),
    fontFamily: font.type.Regular,
    // marginTop: width * (21 / 375),
    lineHeight: 30,
    letterSpacing: 0.5,
  },
  song_sentance_text: {
    fontSize: width * (20 / 375),
    fontFamily: font.type.Regular,
    marginTop: width * (15 / 375),
  },
  sound_btn_container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',

    bottom: hasNotch
      ? width * (-7 / 375)
      : Platform.OS == 'ios'
      ? width * (-19 / 375)
      : -5,
    marginHorizontal: width * (20 / 375),
    marginTop:Dimensions.get('window').width > 670 ?55: 0,
    
  },
  sound_btn_container12: {
    marginHorizontal: width * (20 / 375),
  },
  fifth_section_btn_container: {
    marginTop:Dimensions.get('window').width > 670 ?70: 0,
    marginHorizontal: width * (20 / 375),

    alignItems: 'flex-start',
    justifyContent: 'flex-end',

    bottom: hasNotch
      ? width * (-5 / 375)
      : Platform.OS == 'ios'
      ? width * (-18 / 375)
      : -1,
  },
  fifth_section_btn_container12: {
    marginHorizontal: width * (20 / 375),
    // alignItems: 'center',
    // flex: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    // marginBottom: height * (-20 / 667)
  },

  passiveBottom: {
    marginHorizontal: width * (20 / 375),
    // alignItems: 'center',
    alignItems: 'flex-start',
    // marginBottom: width * (15 / 375)
    // flex: 0.25,
    // backgroundColor: 'red',
  },

  list_view: {
    // flex: 1,
    marginTop: width * (30 / 375),
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderRadius: 10,
    paddingBottom: width * (15 / 375),
    flex: 0.85,
  },
  sentence_list_view: {
    flex: 1,
    marginTop: width * (10 / 375),

    borderTopColor: colors.code_fff,
    borderTopWidth: 1,
  },
  sentance_list: {
    alignSelf: 'center',
    marginTop: width * (10 / 375),
  },
  circle_outer_view: {
    height: width * (70 / 375),
    width: width * (70 / 375),
    borderRadius: width * (35 / 375),
    backgroundColor: colors.code_d6eb,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle_outer_view_fill: {
    height: width * (70 / 375),
    width: width * (70 / 375),
    borderRadius: width * (35 / 375),
    backgroundColor: colors.code_82c2,
    justifyContent: 'center',
    //alignItems: 'center'
  },
  inner_circle_view: {
    height: width * (60 / 375),
    width: width * (60 / 375),
    borderRadius: width * (30 / 375),
    backgroundColor: colors.code_fff,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * (1 / 375),
  },
  timer_view: {
    alignItems: 'center',
    //marginBottom: width * (30 / 375),
  },
  timerText: {
    color: '#c3d6eb',
    fontSize: width * (24 / 375),
    fontWeight: 'bold',
  },
  playIcon: {
    //marginLeft: width * (8 / 375),
  },
  bottomOptionFirst: {
    //backgroundColor: colors.code_d6eb,
    height: width * (45 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomOptionSecond: {
    //  backgroundColor: colors.code_d6eb,
    height: width * (45 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '1%',
    marginRight: '1%',
    flex: 1,
  },
  bottomOptionThird: {
    //  backgroundColor: colors.code_d6eb,
    height: width * (45 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomOptionFirstTxt: {
    color: colors.code_82c2,
    fontSize: width * (10 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  bottomOptionContainer: {
    flexDirection: 'row',
    height: width * (60 / 375),
    justifyContent: 'center',
    // alignItems: 'flex-end',
    paddingVertical: width * (10 / 375),
    bottom: 0,
  },
  bottomOptionContainer_1: {
    height: width * (60 / 375),

    bottom: 0,
    backgroundColor: 'transparent',
  },
  bottomContainerFirstSlide: {
    height: width * (80 / 375),
    backgroundColor: 'rgb(48,75,195)',
  },
  heading_text1: {
    fontSize: width * (30 / 375),
    color: colors.code_fff,
    fontFamily: font.type.ACaslonPro_Bold,
    marginHorizontal: width * (30 / 375),
    marginTop: width * (50 / 375),
  },
  heading_text: {
    fontSize: width * (30 / 375),
    color: colors.code_fff,
    fontFamily: font.type.ACaslonPro_Bold,
    marginHorizontal: width * (30 / 375),
    marginTop: width * (50 / 375),
  },
  heading_text_sentence_list: {
    fontSize: width * (30 / 375),
    color: colors.code_82c2,
    fontFamily: font.type.ACaslonPro_Bold,
    marginHorizontal: width * (30 / 375),
  },
  buttonFree: {
    marginTop: width * (20 / 375),
    backgroundColor: colors.code_82c2,
    width: width * (240 / 375),
    height: width * (50 / 375),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  btntxt: {
    fontSize: width * (20 / 375),
    color: colors.code_fff,
    fontWeight: 'bold',
  },
  latin_text: {
    fontSize: width * (15 / 375),
    fontFamily: font.type.Roboto_Medium,
    marginTop: Platform.OS === 'ios' ? width * (4 / 375) : 0,
    marginBottom: Platform.OS === 'ios' ? width * (12 / 375) : 0,
    color: colors.code_fff,
  },
  loop_latin_sentance_text: {
    fontSize: width * (21 / 375),
    fontFamily: font.type.ACaslonPro_Bold,
    marginTop: width * (2 / 375),
    color: 'rgba(255,255,255, 0.3)',
  },
  loop_sub_sentance_text: {
    fontSize: width * (20 / 375),
    fontFamily: font.type.Semibold,
    color: colors.code_fff,
  },
  bottomIcon: {
    height: width * (22 / 375),
    width: width * (22 / 375),
    resizeMode: 'contain',
  },
  headphoneIcon: {
    height: width * (20 / 375),
    width: width * (20 / 375),
    resizeMode: 'contain',
    marginTop:5
  },
  statusBarContainer_1: {
    flexDirection: 'row',
    borderBottomColor: colors.code_fff,
    //borderBottomWidth: 1,
    // backgroundColor: 'rgb(83,179,214)',
  },
  closeView: {
    // flex: 1,
    // alignItems: 'center',
    // backgroundColor: "black",
    paddingLeft: width * (15 / 375),
    paddingRight: width * (9 / 375),
    paddingVertical: width * (15 / 375),
  },
  closeImg_1: {
    height: width * (12 / 375),
    width: width * (12 / 375),
    tintColor: '#fff',
  },
  headingText_1: {
    color: colors.code_fff,
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  headingView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowDownView: {
    flex: 1,
    paddingRight: '5%',
    alignItems: 'flex-end',
    //justifyContent: 'center'
    paddingVertical: width * (15 / 375),
  },
  paginationContainer: {
    position: 'absolute',
    bottom: width * (70 / 375),
    left: width * (16 / 375),
    right: width * (16 / 375),
  },
  textBlue: {
    fontSize: 12,
    marginTop: width * (5 / 375),
    color: colors.code_blk,
  },
  text: {
    fontSize: 12,
    marginTop: width * (5 / 375),
    color: 'rgb(151,151,151)',
  },
  img: {
    height: width * (18 / 375),
    width: width * (18 / 375),
    marginTop: width * (5 / 375),
    tintColor: 'rgb(151,151,151)',
  },
  imgBlue: {
    height: width * (18 / 375),
    width: width * (18 / 375),
    marginTop: width * (5 / 375),
    tintColor: colors.code_blk,
  },
  touchView: {
    alignItems: 'center',
    flex: 0.4,
  },
  topView: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    height: width * (60 / 375),
    justifyContent: 'center',
    borderTopColor: '#C0C0C0',
    backgroundColor: '#fff',
    bottom: 0,
    alignItems: 'center',
  },
});
