
import { StyleSheet } from 'react-native';
import { metrics, colors, fonts } from '../../../Theme';
import font from '../../../Theme/font';

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const localStyle = StyleSheet.create({
    backArrowImg: {
        width: width * (14 / 375),
        tintColor: colors.code_fff,
    },
    navTitle: {
        color: colors.code_fff,
        fontSize: width * (12 / 375),
        fontFamily: fonts.type.Akkurat_Bold
    },

    modal: {
        width: '100%',
        alignSelf: 'center',
        height: '100%',
        justifyContent: 'flex-start',
    },
    OuterView: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
    },
    InnerView: {
        alignSelf: 'center',
        width: width * (300 / 375),
        height: width * (120 / 375),
        backgroundColor: colors.code_82c2,
        paddingRight: '10%',
        paddingLeft: '10%',
        paddingTop: '2%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.code_fff,
        fontSize: width * (32 / 375),
        fontFamily: fonts.type.ACaslonPro_Bold,

    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: width * (9 / 375)
    },
    buttons: {
        backgroundColor: colors.code_fff,
        height: width * (27 / 375),
        width: width * (95 / 375),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonFont: {
        color: colors.code_82c2,
        fontSize: width * (14 / 375),
        fontFamily: fonts.type.Akkurat_Bold,
    },
    feedbackForm: {
        borderRadius: 10,
        height: width * (150 / 375),
        width: width * (350 / 375),
        borderWidth: 1,
        borderColor: colors.code_fff,
        paddingTop: width * (15 / 375),
        paddingLeft: width * (15 / 375),
        paddingRight: width * (15 / 375),
        color: colors.code_fff
    },
    feedbackForm_2: {
        borderRadius: 10,
        height: width * (400 / 375),
        width: width * (350 / 375),
        borderWidth: 1,
        borderColor: colors.code_fff,
        paddingTop: width * (15 / 375),
        paddingLeft: width * (15 / 375),
        paddingRight: width * (15 / 375),
        color: colors.code_fff
    },
    reviewTitle: {
        marginTop: 10,
        fontSize: 22,
        color: colors.code_fff,
        fontFamily: font.type.Akkurat_Bold,
        fontWeight: 'bold'
    },
    errView: {
        marginTop: width * (5 / 375),
        width: width * (350 / 375),
        marginLeft: width * (12 / 375),

    },


    /* Modal */
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    close_view: {
        width: width * (60 / 375),
        marginTop: width * (50 / 375)
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
    text_view: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * (50 / 375),
        backgroundColor: colors.code_82c2,
    },
    text: {
        color: colors.code_fff,
        fontSize: width * (18 / 375),
        fontFamily: font.type.Akkurat_Bold,
        textAlign: 'center'
    },
    text_yes_no: {
        color: colors.code_fff,
        fontSize: width * (18 / 375),
        fontFamily: font.type.Akkurat_Bold,
        color: colors.code_82c2
    },
    btn_no: {
        marginRight: width * (20 / 375),
        height: width * (40 / 375),
        width: width * (80 / 375),
        backgroundColor: colors.code_fff,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_yes: {
        marginLeft: width * (20 / 375),
        height: width * (40 / 375),
        width: width * (80 / 375),
        backgroundColor: colors.code_fff,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }


})