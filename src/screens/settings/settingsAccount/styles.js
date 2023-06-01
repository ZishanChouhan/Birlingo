import {StyleSheet,Dimensions} from 'react-native';
import {metrics, colors, fonts} from '../../../Theme';

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
  image: {
    margin: width * (5 / 375),
    height: width * (16 / 375),
    width: width * (16 / 375),
    // tintColor: colors.code_fff,
    // alignSelf:'c'
    // justifyContent:'center'
},
  backArrowImg: {
    width: width * (14 / 375),
    tintColor: '#fff',
  },
  nav_view: {
    marginLeft: width * (20 / 375),
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
    marginHorizontal: width * (40 / 375),
    borderWidth: 1,
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
    marginTop: width * (20 / 375),
    marginHorizontal: width * (40 / 375),
    // height: width * (80 / 375)
  },
  subtestView: {
    padding:width * (11 / 375),
    marginTop: width * (20 / 375),
    // marginHorizontal: width * (40 / 375),
    // height: width * (80 / 375)
    backgroundColor:'#d9c64d',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:10,
    overflow:'hidden',
    // marginTop:5,
    paddingRight:width * (25 / 375),
  },
  subTitle: {
    color: colors.code_fff,
    //marginTop: width * (12 / 375),
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  puchaseby: {
    color: colors.code_fff,
    //marginTop: width * (12 / 375),
    fontSize: width * (12 / 375),
    fontFamily: fonts.type.Akkurat,
    // padding: width *(2/375),
    // backgroundColor : '#d9c64d',
    // textAlign:'center',
    // borderRadius:width * (10 / 375),
    // overflow:'hidden'
    
  },
  subTitleInnerView: {
    flex: 1,
  },
  marginView: {
    height: width * (50 / 375),
  },
  formContainer: {
    marginHorizontal: width * (40 / 375),
    //height: width * (300 / 375),
    flex: 1,
  },
  accordianView: {
    flex: 1,
    backgroundColor: colors.code_fff,
    borderTopRightRadius: 10,
    marginTop: width * (14 / 375),
    borderRadius: 8,

    paddingBottom: width * (10 / 375),
  },
  accordianView_2: {
    flex: 1,
    backgroundColor: 'rgb(83,179,214)',

    marginTop: width * (14 / 375),
    borderRadius: 8,

    paddingBottom: width * (10 / 375),
  },

  accordianFirstRowView: {
    flexDirection: 'row',
    marginBottom: 5,
    borderWidth: 1,
  },
  accordianFirstRowView_colOne: {
    borderWidth: 1,
    justifyContent: 'center',
  },
  accordianFirstRowView_colTwo: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderWidth: 1,
  },
  accordianSecondRowView: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 2,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  accordianSecondRowView_colOne: {
    // flex: 1,
    justifyContent: 'center',

    paddingRight: 10,
  },
  accordianSecondRowView_colTwo: {
    flex: 1,
    // alignItems: "flex-end",
    // justifyContent: "flex-end",
  },
  accordinFirstRowText: {
    color: colors.code_black,
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
    paddingBottom: 5,
  },
  accordinFirstRowText_2: {
    color: colors.code_fff,
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
    paddingBottom: 5,
  },

  amountText: {
    color: colors.code_black,
    fontSize: width * (16 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
    marginTop: 10,
  },
  accordinSecondRowText_colOne: {
    color: colors.code_82c2,
    fontSize: width * (13 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },

  accordinSecondRowText_colTwo: {
    color: colors.code_black,
    fontSize: width * (13 / 375),
    fontFamily: fonts.type.Akkurat,
    marginTop: 5,
  },
  accordinSecondRowText_colTwo_2: {
    color: colors.code_fff,
    fontSize: width * (13 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  subcriptionType: {
    color: colors.code_black,
    fontSize: width * (16 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },

  subType_2: {
    color: colors.code_fff,
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
    paddingBottom: 5,
  },
  subcriptionType_2: {
    color: colors.code_fff,
    fontSize: width * (16 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  amountText_2: {
    color: colors.code_fff,
    fontSize: width * (14 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
  amountTypeText_2: {
    color: colors.code_fff,
    fontSize: width * (13 / 375),
    fontFamily: fonts.type.Akkurat,
  },
  ExpendedTextView: {
    marginLeft: width * (5 / 375),
  },
  termCheck: {
    flexDirection: 'row',
    marginTop: width * (10 / 375),
    //  marginBottom: width * (20 / 375),
    //   marginHorizontal: width * (40 / 375),
  },
  noteView: {
    // flexDirection: 'row',
    marginTop: width * (20 / 375),
    marginBottom: width * (20 / 375),
    marginHorizontal: width * (40 / 375),
  },
  touchableButton_2: {
    flex: 1,
    borderRadius: 7,
    width: 150,
    height: Dimensions.get('window').width > 670 ?70:35,
    backgroundColor: colors.code_fff,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton_3: {
    flex: 1,
    borderRadius: 7,
    width: 150,
    marginTop:Dimensions.get('window').width > 670 ?10:0,
    height:Dimensions.get('window').width > 670 ?70:35,
    backgroundColor: colors.code_gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton: {
    flex: 1,
    borderRadius: 7,
    width: 150,
    height: Dimensions.get('window').width > 670 ?70:35,
    backgroundColor: colors.maroon,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableText: {
   fontSize:Dimensions.get('window').width > 670 ?30: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  touchableText_2: {
    fontSize:Dimensions.get('window').width > 670 ?40: 18,
    color: 'rgb(83,179,214)',
    fontWeight: 'bold',
  },
  touchableText_3: {
    fontSize:Dimensions.get('window').width > 670 ?25: 12,
    color: colors.code_gray_text,
    fontWeight: 'bold',
  },
  safeText_2: {
    fontSize: 14,
    color: '#fff',
  },
  safeText: {
    fontSize: 14,
    color: colors.maroon,
  },
  instructionHeading: {
    fontSize: 16,
    color: '#fff',
  },

  checkText_1: {
    fontSize:Dimensions.get('window').width > 670 ?25: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  checkText_2: {
    fontSize:Dimensions.get('window').width > 670 ?25: 16,
    color: colors.code_black,
    textDecorationLine: 'underline',
  },
  checkText_3: {
    fontSize:Dimensions.get('window').width > 670 ?25: 16,
    color: '#fff',
    marginLeft: 10,
  },
  checkText_4: {
    fontSize:Dimensions.get('window').width > 670 ?28: 16,
    color: colors.code_black,
    marginLeft: 10,
  },
  checkBoxStyle: { 
    flexDirection: 'row', 
    height: 40, 
    width: 40, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingLeft: 12, 
    marginRight: -10 
  }
});
