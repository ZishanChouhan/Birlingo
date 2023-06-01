

import { StyleSheet } from 'react-native';
import { metrics, colors, fonts } from '../../../Theme';

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const demoStyles = StyleSheet.create({
    nativeText: {
        color: colors.code_blk,
        fontSize: width * (18 / 375),
        fontFamily: fonts.type.ACaslonPro_Bold,
    },
    learnText: {
        color: colors.code_blk,
        fontSize: width * (18 / 375),
        fontFamily: fonts.type.ACaslonPro_Regular,
    },
    marginView: {
        height: width * (50 / 375),
    },
})