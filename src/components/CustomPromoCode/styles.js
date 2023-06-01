import { StyleSheet, Platform } from 'react-native'
import color from '../../Theme/Colors'
import { colors, fonts, metrics } from '../../Theme';
import font from '../../Theme/font';
const height = metrics.screenHeight;
const width = metrics.screenWidth;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.code_82c2,
    },

    btn_view: {
        marginTop: width * (50 / 375)
    },
    crossIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * (20 / 375)
    },
    crossImg: {
        tintColor: 'rgb(255,255,255)',
        height: 16,
        width: 16,
        marginVertical: 5
    },
    formContainer: {
        marginHorizontal: width * (40 / 375),
        marginTop: width * (100 / 375),

    },
    btn_view: {
        alignItems: 'center',
        marginTop: width * (10 / 375)
    },
    buttonFree: {
        marginTop: width * (20 / 375),
        backgroundColor: 'rgb(83,179,214)',
        width: width * (240 / 375),
        height: width * (50 / 375),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    btntxt: {
        fontSize: width * (20 / 375),
        color: colors.code_fff,
        fontWeight: 'bold'
    },
    nav_view: {
        marginLeft: width * (20 / 375),
        //width: width * (80 / 375),
        flexDirection: 'row',
        marginTop: width * (20 / 375),
        alignItems: 'center',
    },
    backArrowImg: {
        width: width * (14 / 375),
        tintColor: colors.code_fff,
    },
    navTitle: {
        color: colors.code_fff,
        fontSize: width * (12 / 375),
        fontFamily: fonts.type.Akkurat_Bold
    },

    heading: {
        marginHorizontal: width * (40 / 375),
        marginTop: width * (50 / 375),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    headingText: {
        fontSize: width * (20 / 375),
        color: colors.code_fff,
        fontFamily: font.type.Akkurat_Bold,
        textAlign: 'center'
    },
    skip_outerView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    skip_touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * (30 / 375)
    },
    skipText: {
        paddingHorizontal: width * (20 / 375),
        fontSize: width * (14 / 375),
        color: colors.code_fff,
        textDecorationLine: 'underline',
        paddingVertical: width * (5 / 375),
        fontFamily: font.type.Akkurat,
    },
    backOutrView: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? width * (20 / 375) : 0
    }
})