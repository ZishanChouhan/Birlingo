import { StyleSheet } from 'react-native'
import color from '../../Theme/Colors'
import { colors, fonts, metrics } from '../../Theme';
import font from '../../Theme/font';
const height = metrics.screenHeight;
const width = metrics.screenWidth;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        paddingHorizontal: 20,

    },
    close_view: {
        width: width * (60 / 375),
        marginTop: width * (50 / 375),
        backgroundColor: 'red',
        flex: 1
    },
    image: {
        marginLeft: width * (20 / 375),
        height: width * (16 / 375),
        width: width * (16 / 375),
        tintColor: colors.code_fff
    },
    btn_view: {
        marginTop: width * (30 / 375),
        flexDirection: 'row'
    },
    btn_view_1: {
        marginTop: width * (30 / 375),
        flexDirection: 'row'
    },
    text_view: {
        //flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * (50 / 375),


    },
    nav_view: {
        justifyContent: 'center',
        paddingVertical: width * (10 / 375),
        backgroundColor: colors.code_fff,

    },
    crossIcon: {
        flexDirection: 'row',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    crossImg: {
        tintColor: 'rgb(64,120,203)',
        height: 16,
        width: 16,
        marginVertical: 5
    },
    text: {
        color: 'rgb(83,179,214)',
        fontSize: width * (18 / 375),
        fontFamily: font.type.Akkurat_Bold,
        textAlign: 'center',

    },
    text_yes_no: {
        color: colors.code_fff,
        fontSize: width * (18 / 375),
        fontFamily: font.type.Akkurat_Bold,

    },
    btn_no: {
        marginRight: width * (20 / 375),
        height: width * (40 / 375),
        width: width * (80 / 375),
        backgroundColor: 'rgb(48,75,195)',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_yes: {
        marginLeft: width * (20 / 375),
        height: width * (40 / 375),
        width: width * (80 / 375),
        backgroundColor: 'rgb(48,75,195)',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }


})