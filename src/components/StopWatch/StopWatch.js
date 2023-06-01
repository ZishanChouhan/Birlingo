import React, {Component} from 'react';
import {Platform,Dimensions} from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../Theme';
import font from '../../Theme/font';
import BackgroundTimer from 'react-native-background-timer';

export default class StopWatch extends Component {
  constructor(props) {
    super(props);
    console.log("propsssss", props);
    this.state = {
      timer: null,
      minutes_Counter: this.props._minutes ? this.props._minutes : '00',
      seconds_Counter: this.props._seconds ? this.props._seconds : '00',
      // minutes_Counter: 15,
      // seconds_Counter: 40,
      // hour_Counter: this.props._hours ? this.props._hours : '00',
      startDisable: false,
    };
  }

  // componentDidMount() {
  //   this.setState({seconds_Counter: this.props._seconds});
  // }

  componentWillUnmount() {
    let hr = '00'
    // if(this.props.testing == true) {
      // this.props.getSeconds(
      //   `${hr +
      //     ':' +
      //     this.state.minutes_Counter +
      //     ':' +
      //     this.state.seconds_Counter}`,
        
      // );
    // }
    // clearInterval(this.state.timer);
    if(Platform.OS == "ios"){
      clearInterval(this.state.timer);
    }else if(Platform.OS == "android"){
      BackgroundTimer.clearInterval(this.state.timer);
    }
  }

  onButtonStart = () => {
    if(Platform.OS == "ios"){
      if (!this.state.startDisable) {
        let timer = setInterval(() => {
          console.log('vdvdgdvdgd', this.state.seconds_Counter);

          let sec = this.state.seconds_Counter;
          let min = this.state.minutes_Counter;
          let hou = this.state.hour_Counter;

          var num = (Number(sec) + 1).toString(),
          count = min;

          if (Number(sec) == 59) {
            count = (Number(min) + 1).toString();
            num = '00';
          }
          if (Number(min) == 59) {
            count = (Number(hou) + 1).toString();
            num = '00';
          }
          console.log("count.length", count.toString().length);
          this.setState({
            minutes_Counter: count.toString().length == undefined || count.toString().length == 1 ? '0' + count : count,
            seconds_Counter: num.length == 1 ? '0' + num : num,
            hour_Counter: num.length == 1 ? '0' + num : num,
          });
          let hr = '00';
          this.props.timerValue(
            `${hr +
              ':' +
              this.state.minutes_Counter +
              ':' +
              this.state.seconds_Counter}`,
          );
        }, 1000);
        this.setState({timer});
      } else {
        clearInterval(this.interval);
      }
      this.setState({startDisable: true});
    }else if(Platform.OS == "android"){
      if (!this.state.startDisable) {
        let timer = BackgroundTimer.setInterval(() => {
          console.log('vdvdgdvdgd', this.state.seconds_Counter);

          let sec = this.state.seconds_Counter;
          let min = this.state.minutes_Counter;
          let hou = this.state.hour_Counter;

          var num = (Number(sec) + 1).toString(),
          count = min;

          if (Number(sec) == 59) {
            count = (Number(min) + 1).toString();
            num = '00';
          }
          if (Number(min) == 59) {
            count = (Number(hou) + 1).toString();
            num = '00';
          }
          console.log("count.length", count.toString().length);
          this.setState({
            minutes_Counter: count.toString().length == undefined || count.toString().length == 1 ? '0' + count : count,
            seconds_Counter: num.length == 1 ? '0' + num : num,
            hour_Counter: num.length == 1 ? '0' + num : num,
          });
          let hr = '00';
          this.props.timerValue(
            `${hr +
              ':' +
              this.state.minutes_Counter +
              ':' +
              this.state.seconds_Counter}`,
          );
        }, 1000);
        this.setState({timer});
      } else {
        BackgroundTimer.clearInterval(this.interval);
      }
      this.setState({startDisable: true});
    }
  };

  onButtonStop =() => {
    this.setState({startDisable: false});
    let hr = '00';
    if(Platform.OS == "ios"){
      clearInterval(this.state.timer);
    }else if(Platform.OS == "android"){
      BackgroundTimer.clearInterval(this.state.timer);
    }
    // const value = this.props.getSeconds(
    //   `${hr +
    //     ':' +
    //     this.state.minutes_Counter +
    //     ':' +
    //     this.state.seconds_Counter}`
    // );
    // return value;
  };

  // onGetSeconds = () => {

  // }

  onButtonPause = type => {
    this.setState({startDisable: false});
    // let hr = '00';
    // this.props.getSeconds(`${hr + ':' + this.state.minutes_Counter + ':' + this.state.seconds_Counter}`, type)
    if(Platform.OS == "ios"){
      clearInterval(this.state.timer);
    }else if(Platform.OS == "android"){
      BackgroundTimer.clearInterval(this.state.timer);
    }
  };

  onButtonBackground = type => {
    //  this.setState({ startDisable: false })
    let hr = '00';
    this.props.getSeconds(
      `${hr +
        ':' +
        this.state.minutes_Counter +
        ':' +
        this.state.seconds_Counter}`,
      type,
    );
    // clearInterval(this.state.timer);
  };

  onButtonClear = () => {
    this.setState({
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
      hour_Counter: '00',
    });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        {this.state.minutes_Counter < 10 &&
        this.state.minutes_Counter > 0 &&
        Platform.OS == 'android' ? (
          <Text style={styles.counterText}>
           
            {'00'} : {''}
            {this.state.minutes_Counter} : {this.state.seconds_Counter}
          </Text>
        ) : (
          <Text style={styles.counterText}>
            {'00'} : {this.state.minutes_Counter} : {this.state.seconds_Counter}
          </Text>
        )}

        {/* <TouchableOpacity
                    onPress={this.onButtonStart}
                    activeOpacity={0.6}
                    style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]}
                    disabled={this.state.startDisable} >

                    <Text style={styles.buttonText}>START</Text>

                </TouchableOpacity> */}

        {/* <TouchableOpacity
                    onPress={this.onButtonStop}
                    activeOpacity={0.6}
                    style={[styles.button, { backgroundColor: '#FF6F00' }]} >

                    <Text style={styles.buttonText}>STOP</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.onButtonClear}
                    activeOpacity={0.6}
                    style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]}
                    disabled={this.state.startDisable} >

                    <Text style={styles.buttonText}> CLEAR </Text>

                </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  button: {
    width: '80%',
    // paddingTop: 8,
    // paddingBottom: 8,
    borderRadius: 7,
    // marginTop: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  counterText: {
    fontFamily: font.type.Akkurat,
    fontSize:Dimensions.get('window').width > 670 ?45:32,
    color: colors.code_fff,
  },
});
