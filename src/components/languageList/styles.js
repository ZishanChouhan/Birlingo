
import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../Theme';
const width = metrics.screenWidth;
const height = metrics.screenHeight;

export default StyleSheet.create({
    option_view: {
        backgroundColor: 'rgba(195, 214, 235, 0.9  )',
        marginHorizontal: width * (8 / 375),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: width * (15 / 375),
        borderColor: colors.code_82c2,
        width: width * (140 / 375),
        height: width * (100 / 375)
    },
    option_view_1: {
        backgroundColor: colors.code_82c2,
        marginHorizontal: width * (8 / 375),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: width * (15 / 375),
        borderColor: colors.code_82c2,
        width: width * (140 / 375),
        height: width * (100 / 375)
    },
    lang_name: {
        color: colors.code_82c2,
        fontWeight: 'bold'
    },
    lang_name_1: {
        color: colors.code_fff
    }

})
