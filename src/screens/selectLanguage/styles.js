
import { StyleSheet } from 'react-native';
import { metrics, colors, fonts } from '../../Theme';

const height = metrics.screenHeight;
const width = metrics.screenWidth;
export const styles = StyleSheet.create({
    backArrowImg: {
        width: width * (14 / 375)
    },
    nav_view: {
        marginHorizontal: width * (20 / 375),
        flexDirection: 'row',
        marginTop: width * (50 / 375),
        alignItems: 'center'
    },
    navTitle: {
        color: colors.code_82c2,
        fontSize: width * (12 / 375)
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
    list_view: {
        marginHorizontal: width * (20 / 375),
        marginTop: width * (30 / 375),
        alignItems: 'center',
        flex: 1,

    },
    nextButton: {
        backgroundColor: 'rgb(83,179,214)',
        height: width * (50 / 375),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: width * (35 / 375),
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10

    },
    nextText: {
        color: colors.code_fff,
        fontSize: width * (16 / 375),
        fontFamily: fonts.type.Akkurat_Bold
    }
})