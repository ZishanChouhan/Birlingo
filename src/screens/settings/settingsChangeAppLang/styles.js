
import { StyleSheet } from 'react-native';
import { metrics, colors, fonts } from '../../../Theme';

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const localStyle = StyleSheet.create({
    backArrowImg: {
        width: width * (14 / 375),
        tintColor: '#fff'
    },
    navTitle: {
        color: colors.code_fff,
        fontSize: width * (12 / 375),
        fontFamily: fonts.type.Akkurat_Bold
    },
    title: {
        color: colors.code_fff,
        fontSize: width * (32 / 375),
        fontFamily: fonts.type.ACaslonPro_Bold
    },
    subTitle: {
        //marginVertical: 20,
        color: colors.code_fff,
        fontSize: width * (14 / 375),
        fontFamily: fonts.type.Akkurat,
    },
    flatlistContainerView: {
        flex: 0.5,
        backgroundColor: colors.code_d6eb,
        height: width * (100 / 375),
        margin: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * (20 / 375)
    },
    flatListText: {
        color: colors.code_82c2,
        fontSize: width * (12 / 375),
        fontFamily: fonts.type.Akkurat_Bold
    },
    formContainer: {
        marginHorizontal: width * (40 / 375),
        marginTop: width * (10 / 375),

    },
    nextButton: {
        backgroundColor: 'rgb(83,179,214)',
        height: width * (50 / 375),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: width * (60 / 375),
        width: '90%',
        alignSelf: 'center',
        borderRadius: 50,
        //marginTop: width * (40 / 375),
        position: 'absolute',
        bottom: 0
    },
    nextText: {
        color: colors.code_fff,
        fontSize: width * (16 / 375),
        fontFamily: fonts.type.Akkurat_Bold
    },

})