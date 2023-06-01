

import { StyleSheet } from 'react-native';
import { metrics, colors, fonts } from '../../../Theme';

const height = metrics.screenHeight;
const width = metrics.screenWidth;

export const styles = StyleSheet.create({

    titleView: {
        marginTop: width * (50 / 375),
        marginHorizontal: width * (40 / 375),
    },
    title: {
        color: colors.code_82c2,
        fontSize: width * (32 / 375),
        fontFamily: fonts.type.ACaslonPro_Bold
    },
    subTitleView: {
        marginTop: width * (11 / 375),
        marginHorizontal: width * (40 / 375),
        flexDirection: 'row',
    },
    subTitle: {
        color: colors.code_82c2,
        marginTop: width * (12 / 375),
        fontSize: width * (14 / 375),
        fontFamily: fonts.type.Akkurat,
    },
    marginView: {
        height: width * (50 / 375),
    },
    formContainer: {
        marginHorizontal: width * (40 / 375)
    },
    subTitleInnerView: {
        flex: 1,
    },
    statusBarContainer: {
        flexDirection: 'row',
        borderBottomColor: colors.code_d6eb,
        borderBottomWidth: 1,
        borderWidth: 0,
        marginHorizontal: width * (12 / 375),
        paddingBottom: width * (10 / 375),
    },
    closeView: {
        flex: 1,
        paddingLeft: '5%',
        marginTop: '1%'
    },
    headingView: {
        flex: 3,
        alignItems: 'center'
    },
    arrowDownView: {
        flex: 1,
        paddingRight: '5%',
        alignItems: 'flex-end'
    },
    headingText: {
        color: colors.code_82c2,
        fontSize: width * (12 / 375),
        fontFamily: fonts.type.Akkurat_Bold,
        paddingTop: '2%'
    },
    closeImg: {
        height: width * (12 / 375),
        width: width * (12 / 375),
    },
    downImg: {
        height: width * (21 / 375),
        width: width * (21 / 375),
    },
    arrowForwardView: {
        flex: 1
    },
    arrowBackView: {
        flex: 1,
        alignItems: 'flex-end'
    },
    arrowBack: {
        fontSize: width * (13 / 375),
        color: colors.code_82c2,
    },
    bottomNavContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    breadcrum: {
        color: colors.code_82c2,
        fontSize: width * (12 / 375),
        fontFamily: fonts.type.Akkurat_Bold,
    },
    breadcrumView: {
        alignItems: 'center',
        flex:0.4
    },
    topFlex: {
        height: height - 300, 
    },
    bottomOptionFirst: {
        backgroundColor: colors.code_d6eb,
        height: width * (45/375),
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    bottomOptionSecond: {
        backgroundColor: colors.code_d6eb,
        height: width * (45/375),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '1%',
        marginRight: '1%',
        flex:1
    },
    bottomOptionThird: {
        backgroundColor: colors.code_d6eb,
        height: width * (45/375),
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    bottomOptionFirstTxt: {
        color: colors.code_82c2,
        fontSize: width * (12 / 375),
        fontFamily: fonts.type.Akkurat_Bold,
    },
    bottomOptionContainer: {
        flexDirection: 'row',
        flex:1,
        marginTop: 40
    }


})