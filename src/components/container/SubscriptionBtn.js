import React, { Component, PropTypes } from "react";
import { Dimensions, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { metrics, colors, fonts } from '../../Theme';
// import { withNavigation } from 'react-navigation'


const height = metrics.screenHeight;
const width = metrics.screenWidth;

class SubscriptionBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        // console.log("", this.props.navLink);

        return (
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.navLink, { subscriptionData: this.props.subscriptionData })} activeOpacity={0.9} style={styles.button}>
                    <Text style={styles.buttonFont}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    };
}


export default SubscriptionBtn;



const styles = StyleSheet.create({
    buttonView: {
        marginTop: width * (50 / 375),
        marginHorizontal: width * (40 / 375),
    },
    button: {
        backgroundColor: colors.code_82c2,
        height: width * (45 / 375),
        borderRadius: 50,
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonFont: {
        color: colors.code_fff,
        fontSize: width * (18 / 375),
        fontFamily: fonts.type.Akkurat_Bold,
    }
})