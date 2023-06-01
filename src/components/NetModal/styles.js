import { StyleSheet } from 'react-native'
import color from '../../Theme/Colors'
import { colors, fonts, metrics } from '../../Theme';
import font from '../../Theme/font';
const height = metrics.screenHeight;
const width = metrics.screenWidth;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.code_fff,
    },
    close_view: {
        width: width * (60 / 375),
        marginTop: width * (50 / 375)
    },
    image: {
        marginLeft: width * (20 / 375),
        height: width * (16 / 375),
        width: width * (16 / 375),
        tintColor: colors.code_82c2
    },
    btn_view: {
        marginTop: width * (50 / 375)
    },
    text_view: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * (50 / 375)
    },
    text: {
        color: colors.code_fff,
        fontSize: width * (36 / 375),
        fontFamily: font.type.ACaslonPro_Bold
    },
    titleView: {
        marginTop: width * (10 / 375),
        marginHorizontal: width * (40 / 375),
    },
    title: {
        color: colors.code_82c2,
        fontSize: width * (32 / 375),
        fontFamily: fonts.type.ACaslonPro_Bold
    },

})