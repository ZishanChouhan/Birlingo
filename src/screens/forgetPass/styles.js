
import { StyleSheet, Platform } from 'react-native';
import { metrics, colors, fonts } from '../../Theme';

const height=metrics.screenHeight;
const width=metrics.screenWidth;
export const styles = StyleSheet.create({
outerContainer:{
   flex:1,
   backgroundColor:colors.code_fff,
   marginBottom : Platform.OS == "ios" ? -50: 0
},    
container: {
    paddingHorizontal:width*(25/375),
    marginTop: "18%",
},
textFieldContainer: {
    marginTop: "10%"
},
btnStyle: {
    marginTop: "7%",
    alignItems:'center'
},
loginTitle:{
    fontFamily:fonts.type.ACaslonPro_Bold
  },
buttonFree:{
    marginTop:width*(20/375),
    backgroundColor:colors.code_fff,
    width:width*(240/375),
    height:width*(50/375),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,
  },
btntxt:{
    fontSize:width*(20/375),
    color:colors.code_82c2,
    fontWeight:'bold'
  },
login_note:{
    color:colors.code_fff,
    fontFamily:fonts.type.Akkurat_Bold
  },  
login_note_view:{
    flexDirection:'row',
    marginTop:width*(10/375)
  },
backArrowImg:{
    width:width*(14/375),
    tintColor:colors.code_fff
}, 
})
