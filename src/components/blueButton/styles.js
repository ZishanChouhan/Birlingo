
import { StyleSheet } from 'react-native';
import { metrics, colors, fonts } from '../../Theme';

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({

    buttonView: {
        alignItems: 'center',
        // marginTop: width * (50 / 375)
    },
    buttonFree: {
        marginTop: width * (30 / 375),
        backgroundColor: 'rgb(83,179,214)',
        width: width * (240 / 375),
        height: width * (50 / 375),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,

    },
    btntxt: {
        fontSize: width * (15 / 375),
        color: colors.code_fff,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})