import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import HeadingNav from '../../components/learn/headingNav/headingNav';
import images from '../../Theme/Images';
import {BlueButton} from '../../components'; //../../../components
import {colors} from '../../Theme';
export default class CustomInstruction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClose = () => {
    this.props.onExit();
  };

  render() {
    const {
      appString,
      item,
      index,
      position = 'center',
      title,
      lessonLength,
    } = this.props;

    let bgColor = '';
    if (item.state == 'passive') {
      bgColor = colors.loopBack;
    } else if (item.state == 'repeat') {
      bgColor = colors.sentenceListBack;
    } else if (item.state == 'speak') {
      bgColor = colors.speechBack;
    } else {
      bgColor = colors.backGround;
    }

    return (
      <LinearGradient colors={bgColor} style={{flex: 1}}>
        <View style={{backgroundColor: 'rgb(83,179,214)'}}>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgb(255,255,255)',
              marginHorizontal: 15,
            }}
          />
        </View>
        <View style={{flex: 0.8, justifyContent: 'center'}}>
          {item.title ? (
            // <Text style={styles.heading_text_2}>{item.title}</Text>
             <Text style={styles.heading_text_2}>{item.title}</Text>
          ) : index == 0 ? (
            <View style={{flex: 1}}>
              <HeadingNav
                bgColor={bgColor[0]}
                lessonID={item.lessonID}
                onExit={(index) => this.props.onExit(index)}
                totalIndex={item.length}
                currentIndex={this.state.currentIndex - 1}
                navigation={this.props.navigation}
                title={item.lessonID}
              />
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{}}>
                  <Text style={styles.heading_text}>
                    {appString['lbl_welcome_to'] + ': ' + item.lessonID}
                  </Text>
                  <Text style={styles.heading_text_2}>
                    {appString[item.heading]}
                  
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 50,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Image source={images.fingerSwipe} />
                </View>
              </View>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <HeadingNav
                bgColor={bgColor[0]}
                lessonID={item.lessonID}
                onExit={(index) => this.props.onExit(index)}
                totalIndex={item.length}
                currentIndex={this.state.currentIndex - 1}
                navigation={this.props.navigation}
                title={item.lessonID}
              />
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styles.heading_text_2}>
                  {appString[item.heading]}
                </Text>
                {item.message != 'msg_passive' ? (
                  <Text style={styles.message_text}>
                    {appString[item.message]}
                  </Text>
                ) : null}
              </View>
              {lessonLength == index ? (
                <View
                  style={{
                    marginTop: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <BlueButton
                    title={appString.lbl_to_lesson}
                    onClick={() => {
                      this.props.goToLesson();
                    }}
                    blackColor="black"
                  />
                </View>
              ) : null}
            </View>
          )}
        </View>
      </LinearGradient>
    );
  }
}
