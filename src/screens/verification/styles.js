
import { Platform, StyleSheet } from 'react-native';
import { metrics, colors, fonts } from '../../Theme';

const height = metrics.screenHeight;
const width = metrics.screenWidth;
export const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: "#fff",
        marginBottom: Platform.OS == "ios" ? -50 : 0
    },
    container: {
        // paddingHorizontal: width*(16/375),
        // marginTop: "4%",
        paddingTop: 50,
    },
    textFieldContainer: {
        marginTop: 30,
        paddingHorizontal: 30,
        // alignItems: "center"
    },
    btnStyle: {
        marginTop: "7%",
        alignItems: 'center'
    },
    textInputContainer: {
        marginBottom: 20
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 3,
        color: colors.code_fff
    },
    loginTitle: {
        fontFamily: fonts.type.ACaslonPro_Bold
    },
    titleView: {
        marginTop: width * (50 / 375),
        marginHorizontal: width * (30 / 375),
    },
    title: {
        color: colors.code_fff,
        fontSize: width * (32 / 375),
        fontFamily: fonts.type.ACaslonPro_Bold
    },
    subTitle: {
        color: colors.code_fff,
        marginTop: width * (12 / 375),
        fontSize: width * (14 / 375),
        fontFamily: fonts.type.Akkurat
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
        fontWeight: 'bold'
    },
    login_note: {
        color: colors.code_fff,
        fontFamily: fonts.type.Akkurat
    },
    resend_txt: {
        color: colors.code_fff,
        fontFamily: fonts.type.Akkurat_Bold,
        textDecorationLine: 'underline'
    },
    login_note_view: {
        flexDirection: 'row',
        marginTop: width * (10 / 375)
    },
    backArrowImg: {
        width: width * (14 / 375),
        tintColor: colors.code_fff
    },


    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "red",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#fff",
    },
})
