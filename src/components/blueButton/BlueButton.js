import React, { Component } from 'react';
import { View, Text, TouchableOpacity ,StatusBar} from 'react-native';
import { styles } from './styles';

export default class BlueButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const { title, onClick, bgcolor = 'rgb(83,179,214)', textColor = '#fff', blackColor } = this.props;
        return (
            <View style={styles.buttonView}>
                   <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
                <TouchableOpacity style={[styles.buttonFree, { backgroundColor: blackColor ? blackColor : bgcolor }]} onPress={() => onClick ? onClick() : ''}>
                    <Text style={[styles.btntxt, { color: textColor }]}>{title ? title : ''}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
