import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {images} from '../../../src/Theme';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../assets/utility/ToastMessage';
import NetInfo from '@react-native-community/netinfo';
export default class BottomTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      screen: this.props.screen,
      prevState: this.props.prevState,
    };
  }

  onChangeColor(num) {
    var alpha = true;
    var rememberLesson;
    NetInfo.addEventListener(state => {
      console.log('Is connected?', state.isConnected);
      if (state.isConnected != true) {
        alpha = false;
      }
    });
    if (num == 1 && alpha == true) {
      AsyncStorage.getItem('rememberLesson', (err1, item1) => {
        if (item1 != null) {
          rememberLesson = JSON.parse(item1);
          console.log("rememberLesson", rememberLesson);
          console.log("this.state.screen", this.state.screen);
          if (rememberLesson == '') {
            this.props.navigation.navigate('LessonOverviewChoose');
          } else if (rememberLesson && this.state.screen != 'lessonList') {
            this.props.navigation.navigate("LessonOverview", {screen:'LessonOverviewChoose'})
            // this.props.navigation.navigate('lessonOverviewDownload', {
            //   lessonId: rememberLesson._id,
            //   familyName: this.props.appString[rememberLesson.Lfamily],
            // });
          } else if (rememberLesson && this.state.screen == 'lessonList') {
            AsyncStorage.removeItem('rememberLesson');
            this.props.navigation.navigate('LessonOverviewChoose');
          }
        } else {
          this.props.navigation.navigate('LessonOverviewChoose');
        }
      });
    } else if (num == 2) {
      this.props.navigation.navigate('Settings',{screen:'SettingsMenu'});
    } else if (num == 3) {
      this.props.navigation.navigate("Downloads", {screen: 'DownloadsList'});
    } else {
      this.props.navigation.navigate("LessonOverview", {screen: 'LessonOverviewChoose'});
    }
  }

  render() {
    var {appString, tabNum} = this.props;
    return (
      <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => this.onChangeColor(1)}
          style={styles.touchView}>
          <Image
            source={images.overView}
            style={tabNum == 1 ? styles.imgBlue : styles.img}
          />
          <Text style={tabNum == 1 ? styles.textBlue : styles.text}>
            {appString?.lbl_lesson_overview}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onChangeColor(2)}
          style={styles.touchView}>
          <Image
            source={images.settings}
            style={tabNum == 2 ? styles.imgBlue : styles.img}
          />
          <Text style={tabNum == 2 ? styles.textBlue : styles.text}>
            {appString?.lbl_Settings}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onChangeColor(3)}
          style={styles.touchView}>
          <Image
            source={images.download}
            style={tabNum == 3 ? styles.imgBlue : styles.img}
          />
          <Text style={tabNum == 3 ? styles.textBlue : styles.text}>
            {appString?.lbl_downloads}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
