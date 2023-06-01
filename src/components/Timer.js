import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { metrics, colors, fonts } from '../Theme';
import font from '../Theme/font';
import { sprintf } from 'sprintf-js';
const width = metrics.screenWidth;
export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            until: Math.max(this.props.time, 0),
        };
    }
    getTimeLeft = () => {
        const { until } = this.state;
        return {
            seconds: until % 60,
            minutes: parseInt(until / 60, 10) % 60,
            hours: parseInt(until / (60 * 60), 10) % 24,

        };
    };

    render() {
        // const { time } = this.props;
        // let getTime = time;
        // var minutes = Math.floor(getTime / 60);
        // var seconds = Math.floor(getTime % 60);

        const { days, hours, minutes, seconds } = this.getTimeLeft();
        const newTime = sprintf('%02d:%02d:%02d:%02d', hours, minutes, seconds).split(':');

        return (
            <View style={styles.timer_view}>
                <Text style={styles.timerText}>min.</Text>
                <Text style={styles.timerText}>{`${newTime ? newTime[0] : "00"}:${newTime ? newTime[1] : '00'}:${newTime ? newTime[2] : '00'}`}</Text>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    timer_view: {
        alignItems: 'center',
        marginBottom: width * (30 / 375)
    },
    timerText: {
        color: '#c3d6eb',
        fontSize: width * (24 / 375),
        fontWeight: 'bold'
    },
})

