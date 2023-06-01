import React, {Component} from 'react';
import {
  AppState,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  StatusBar,
  Platform,
  PermissionsAndroid,
  BackHandler,
  SafeAreaView,
  NativeModules,
  NativeEventEmitter
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import HeadingNav from '../../../components/learn/headingNav/headingNav';
import BodyDescription from '../../../components/learn/bodyDescription/bodyDescription';
import images from '../../../Theme/Images';
import {AppIntroSlider, Loader} from '../../../components';
import Sound from 'react-native-sound';
import ProgressCircle from 'react-native-progress-circle';
import {lessonAction, saveHistoryAction} from './actions';
import moment from 'moment';
import {
  BlueButton,
  StopWatch,
  ConformationModal,
  CustomInstruction,
  BottomTab,
} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors, fonts} from '../../../Theme';
import CallDetectorManager from 'react-native-call-detection';
import font from '../../../Theme/font';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import KeepAwake from 'react-native-keep-awake';
import hasNotch from '../../../components/container/Deviceinfo';
// import TrackPlayer, {State, PitchAlgorithm, Track, RepeatMode,} from 'react-native-track-player';
import { apiUrls } from '../../../api/constants/constants'
import { doPost, doGet } from '../../../actions/fetchApiActions';
import { CommonActions } from '@react-navigation/native';
import { showDangerToast } from '../../../assets/utility/ToastMessage';
import { setVisible } from '../../../navigation/AppReducer';
import NetInfo from "@react-native-community/netinfo";

const {width} = Dimensions.get('window');
const {AudioServiceModule} = NativeModules;
var RNFS = require('react-native-fs');

var goBackIndex;
var lastRepeatIndex = null;

class LessonSentence extends Component {
  constructor(props) {
    super(props);
    this.sentanceLoopIndex = -1;
    
    this.state = {
      listenPassiveIndex: 0,
      speakIndex: 0,
      appState: AppState.currentState,
      // timeSound: 0,
      // lastSoundData: [],
      // soundDataSentance: '',
      multiRunning: false,
      currentTab: 'first',
      songLoopIndex: 0,
      // speedType: 'slow',
      songType: 'solo',
      lessions: [],
      userId: '',
      sentenceListIndex: 0,
      isApi: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      visibleModal: false,
      isLoading: true,
      activeState: 'active',
      dataStates: '',
      repeatData: [],
      toggle: false,
      // netConnected: true,
      appString: '',
      ItemSong: [],
      backgroundActiveTime: 0,
      backgroundInactiveTime: 0,
      tabNum: 1,
      active_Text: global.active,
      loopRunning: false,
      learnLang:'',
      historyData: {
        active: {indexArray: [], total: 0, max: 0},
        passive: {indexArray: [], total: 0, max: 0},
        speak: {indexArray: [], total: 0, max: 0},
        repeat: {indexArray: [], total: 0, max: 0},
        final: {indexArray: [], total: 0, max: 0},
        current: 1,
      },
      currentIndex: '',
      lessonDetails: this.props?.route?.params?.lessonDetails,
      getScreen: this.props?.route?.params?.getScreen,
      // isFirst: this.props?.route?.params?.isFirst,
      passiveTimeloop: 0
    };
  }

  async componentDidMount() {
    try{
      this._subsDownloads = this.props.navigation.addListener('focus', () => {
        this.getDownloadLessonData();
        this.backSubscribe = BackHandler.addEventListener("hardwareBackPress", this.goBack)
        global.appStateDownload = AppState.addEventListener('change', this._handleAppStateChange);
        this.handleInternetConnectivity();
        this.changeKeepAwake(true);
        this.sentanceLoopIndex = -1;
        this.startListenerTapped();
      });
      this.removeSubscribe = this.props.navigation.addListener("blur" , () => {
        this.backSubscribe?.remove();
      })
      
    }catch(err){
      console.log("err", err);
    }
  }

  async componentWillUnmount() {
    if(this.newEvent){
      this.newEvent.remove()
    }
    if(this.eventListener){
      this.eventListener.remove()
    }

    this.setState({multiRunning: false, loopRunning: false})

    this.changeKeepAwake(false);

    if(global.appStateDownload){
      global.appStateDownload.remove()
    }
    this.unsubscribe();
    this.stopListenerTapped();
    // this.unsubscribe();
  }

  getDownloadLessonData = () => {
    if (this.props.getAppString?.data !== this.state.appString) {
      this.setState({appString: this.props.getAppString.data});
    }
    AsyncStorage.getItem('learning_language_id', (err2, item2) => {
      if (item2 != null) {
        this.setState({learnLang:JSON.parse(item2)});
      }
    });
    const soundData = [];
    const repeatDataArray = [];
    let index = 0;
    
    var filePath = RNFS.ExternalDirectoryPath;
    if (Platform.OS === 'ios') {
      filePath = RNFS.DocumentDirectoryPath;
    }

    RNFS.mkdir( filePath + '/cureentAudio' + `/${this.state.lessonDetails.lesson_id}` );
    let store_path = filePath + '/cureentAudio' + `/${this.state.lessonDetails.lesson_id}`;
    AsyncStorage.getItem('authUser', (err1, item1) => {
      if (item1 != null) {
        var userDetails = JSON.parse(item1);
        RNFS.readFile(
          filePath +
            '/birlingo/' +
            userDetails._id +
            '/' +
            this.state.lessonDetails.lesson_id +
            '/file.json',
          'utf8',
        ).then(async content_lesson => {

            var data = JSON.parse(content_lesson);
            console.log("data", data);
            for(let i = 0; i < data?.sentenceslist.length; i++){
              if(data.sentenceslist[i].sound){
                let audioPath = store_path + '/' + i + 'audio.mp3';
                const soundPath = await this.downloadFile(data.sentenceslist[i].base64, audioPath);
                const sound = await this.loadSound(soundPath);
                // console.log("sound", sound);
                soundData.push({soundFile: sound, index:index})
                data.sentenceslist[i].soundFile = sound
                index++;
              }
              if(data.sentenceslist[i].type == "slow_song_with_sentence"){
                this.setState({speakIndex: i-1});
              }
              if (data.sentenceslist[i].type == 'sentenceList') {
                this.setState({sentenceListIndex: i});
              }
              if (data.sentenceslist[i].type == 'songLoop') {
                this.setState({listenPassiveIndex: i});
              }
              if (data.sentenceslist[i].state == 'repeat') {
                repeatDataArray.push(data.sentenceslist[i])
              }
            }

            this.getTime(this.state.lessonDetails.time_loop);
            var SongDataArr = [];
            data.sentenceslist.map((songData, index) => {
              if (songData?.type == 'song') {
                var MsongList = songData;
                MsongList.index = index;
                SongDataArr.push(MsongList);
              }
            });

            this.setState({
              lessions: data.sentenceslist,
              ItemSong: SongDataArr,
              dataStates: data.test,
              soundData: soundData,
              repeatData: repeatDataArray,
              passiveTimeloop: this.state.lessonDetails.time_loop,
              historyData: this.state?.lessonDetails?.historyData,
              userId: userDetails._id
            });

          if (this.state.lessonDetails.progress > 1) {
            if (this.state.lessions.length != this.state.lessonDetails.progress) {
              setTimeout(() => {
                this.goToSentence(this.state.lessonDetails.progress - 1);
              }, 10);
            } else {
              setTimeout(() => {
                this.goToSentence(0);
              }, 10);
            }
          } else {
            this.setState({isLoading: false});
          }
        }).catch(err => console.log("err", err));
      }
    });
  };

  downloadFile = (base64, to) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await RNFS.writeFile(to, base64, 'base64');
        resolve(to);
      } catch (e) {
        reject(e);
      }
    });
  };

  loadSound = url => {
    return new Promise((resolve, reject) => {
      let response = new Sound(url, null, error => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  };

  handleInternetConnectivity() {
    this.unsubscribe = NetInfo.addEventListener( async state => {
      console.log('Is connected?', state.isConnected);
      if(!state.isConnected){
        // if(this.state.songType == "soloLoop"){

        // }else{
        //   AudioServiceModule.stopSound();
        // }
        // this.input.onButtonStop()
        // this.setState({multiRunning: false,});
        // if(this.newEvent){
        //   this.newEvent.remove()
        // }
        // if(this.eventListener){
        //   this.eventListener.remove()
        // }
        // if (this.state.lessions.length > 0) {
        //   let array = this.state.lessions;
        //   for(let i=0; i < array.length; i++){
        //     if (array[i] && array[i].toggle) {
        //       array[i].toggle = 'pause';
        //     }
        //   }
        //   this.setState({lessions: array});
        // }

        const historyData = {
          lesson_id: this.state.lessonDetails.lesson_id,
          lessonfamily_id: this.state.lessonDetails.lessonfamily_id,
          current: this.state.historyData.current,
          is_demo: 2,
          time_loop: this.state.passiveTimeloop,
          active: this.state.historyData.active,
          passive: this.state.historyData.passive,
          speak: this.state.historyData.speak,
          repeat: this.state.historyData.repeat,
          level_id: this.state.lessonDetails.level_id,
          learning_language_id: this.state.learnLang,
        };
        
        AsyncStorage.setItem('learnedLessonToBeUpdated', JSON.stringify(historyData));
      }else{
        setTimeout(() => {
          AsyncStorage.removeItem('learnedLessonToBeUpdated');
        }, 1500)
      }
    })
  }

  startListenerTapped() {
    if(Platform.OS == "android"){

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE)
    .then(response => {
      console.log('permission response == ', response);
      if(response == "granted"){
        this.callDetectorHandler();
      }else{
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE).then(res => {
          console.log("resp", res);
          if(res == "granted"){
            this.callDetectorHandler();
          }else if(res == "blocked"){

            // Linking.openSettings();
          }else{
            
          }
        })
      }
    }).catch(err => console.log("err", err))
    }else{
      this.callDetectorHandler();
    }
  }

  stopListenerTapped() {
    this.callDetector && this.callDetector.dispose();
  }

  callDetectorHandler(){
    this.callDetector = new CallDetectorManager(
      (event, phoneNumber) => {
        if (event === 'Disconnected') {
          // Do something call got disconnected
        } else if (event === 'Connected') {
          // This clause will only be executed for iOS
        } else if (event === 'Incoming') {
          AudioServiceModule.stopSound();
          if (this.state.lessions.length > 0) {
            let array = this.state.lessions;
            for(let i=0; i < array.length; i++){
              if (array[i] && array[i].toggle) {
                array[i].toggle = 'pause';
              }
            }
            this.setState({lessions: array, multiRunning: false, loopRunning: false});
          }
          this.input.onButtonPause();
        } else if (event === 'Dialing') {
          // console.log('Dialing');
        } else if (event === 'Offhook') {
          // console.log('Offhook');
        } else if (event === 'Missed') {
          // console.log('Missed');
        }
      },
      false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => {}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      }, // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    );
  }

  changeKeepAwake(shouldBeAwake) {
    if (shouldBeAwake) {
      KeepAwake.activate();
    } else {
      KeepAwake.deactivate();
    }
  }

  _handleAppStateChange = async nextAppState => {
    console.log( '_handleAppStateChange ', this.state.appState, );
    this.sentanceLoopIndex= -1
    if(this.newEvent){
      this.newEvent.remove()
    }
    if(this.eventListener){
      this.eventListener.remove()
    }
    if(this.state.songType == 'soloLoop'){

    }else{
      AudioServiceModule.stopSound();
      this.setState({multiRunning: false})
    }

    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      let time = moment(new Date()).format('hh:mm:ss');
      console.log('time12====', time);
      this.setState({backgroundInactiveTime: time});
      var startTime = moment(this.state.backgroundActiveTime, 'HH:mm:ss a');
      var endTime = moment(this.state.backgroundInactiveTime, 'HH:mm:ss a');
      var duration = moment.duration(endTime.diff(startTime));
      // console.log('duration====', duration);
     
    } else {
      console.log('this.state?.songType=====', this.state?.songType);
      if(!this.props.isConnected){
        let infoForSaveLessonAfterClose = {
          lesson_id: this.state.lessonDetails.lesson_id,
          lessonfamily_id: this.state.lessonDetails.lessonfamily_id,
          current: this.state.historyData.current,
          is_demo: 2,
          time_loop: this.state.passiveTimeloop,
          active: this.state.historyData.active,
          passive: this.state.historyData.passive,
          speak: this.state.historyData.speak,
          repeat: this.state.historyData.repeat,
          level_id: this.state.lessonDetails.level_id,
        };
        AsyncStorage.setItem('learnedLessonHistory', JSON.stringify(infoForSaveLessonAfterClose));
        return 
      }
      const historyData = {
        lesson_id: this.state.lessonDetails.lesson_id,
        lessonfamily_id: this.state.lessonDetails.lessonfamily_id,
        current: this.state.historyData.current,
        is_demo: 2,
        time_loop: this.state.passiveTimeloop,
        active: this.state.historyData.active,
        passive: this.state.historyData.passive,
        speak: this.state.historyData.speak,
        repeat: this.state.historyData.repeat,
        level_id: this.state.lessonDetails.level_id,
        learning_language_id: this.state.learnLang,
      };
      // this.props.saveHistory(historyData);
      doPost(`${apiUrls.saveLessonHistory}`, historyData).then(async res => {
        console.log("response", res);
        if(res.success){

        }
      }).catch(err => console.log(err))
      let array = this.state.lessions;
        for(let i=0; i < array.length; i++){
          if (array[i] && array[i].toggle) {
            array[i].toggle = 'pause';
          }
        }
        this.setState({lessions: array, appState: nextAppState,});
    }
  };

  getTime = sec => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = '00');
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = '00');
    sec < 1 ? (sec = '00') : void 0;
    min.toString().length == 1 ? (min = '0' + min) : void 0;
    sec.toString().length == 1 ? (sec = '0' + sec) : void 0;
    this.setState({hours: hours, minutes: min, seconds: sec});
  };

  timerValue = timeTotal => {
    let tt = timeTotal.split(':');
    let totalSec = tt[0] * 3600 + tt[1] * 60 + tt[2] * 1;
    this.setState({passiveTimeloop : totalSec});
  };

  Langsam = async (i) => {
    console.log('global.active', global.active);
    var data = global.active == 'Langsam' ? 'Normal' : 'Langsam';
    global.active = data;
    this.setState({active_Text: data});
    await AsyncStorage.setItem('appLanguage', JSON.stringify(data));
    this.pauseActive(i);
  };

  Langsam_beta = async (i, item) => {
    var data = global.active == 'Langsam' ? 'Normal' : 'Langsam';
    global.active = data;
    this.setState({ active_Text: data, loopRunning: false});
    this.input.onButtonPause();
    await AsyncStorage.setItem('appLanguage', JSON.stringify(data));
    this.pauseSoundLoop();
  };

  Langsam_speak = async (i) => {
    var data = global.active == 'Langsam' ? 'Normal' : 'Langsam';
    global.active = data;
    this.setState({ active_Text: data,});
    await AsyncStorage.setItem('appLanguage', JSON.stringify(data));
    this.setState({multiRunning: false, songIndex: -1});
    this.pauseSpeakSound();
  }

  playActive = async (item, index,) => {
    console.log("item", item);
    global.downloadActiveIndex = index;
    if(Platform.OS == "android"){
      console.log("item", item , index);
      let array = this.state.lessions;
      if (array[index] && array[index].toggle) { 
        array[index].toggle = 'play';
      }
      this.setState({lessions: array, songType: 'solo'});
      AudioServiceModule.playActiveSound(item.soundFile._filename, this.state.active_Text);
    }else if(Platform.OS == "ios"){
      console.log("item", item);
      let array = this.state.lessions;
      if (array[index] && array[index].toggle) { 
        array[index].toggle = 'play';
      }
      this.setState({lessions: array, songType: 'solo'});
      AudioServiceModule.playActiveSound(item.soundFile._filename, this.state.active_Text);
    }
  }

  pauseActive = async (index) => {
    let array = this.state.lessions;
    if (array[index] && array[index].toggle) { 
      array[index].toggle = 'pause';
    }
    this.setState({lessions: array, songType: 'solo'});
    AudioServiceModule.pauseActiveSound();
  };

  _getSelectSongIndexLoop = (index, item,) => {
    this.sentanceLoopIndex = index;
    AudioServiceModule.stopSound();
    this.sentance_loop1(index, item);
  };

  sentance_loop1 = async (index, item) => {
    console.log(index, item);
    try{
      if(Platform.OS == "android"){
        console.log('this.eventListener', this.eventListener);
        if(this.eventListener){
          this.eventListener.remove();
        }
        this.setState({multiRunning: true, songType: "solo"});
        goBackIndex = index;

        var track = [];
        if(this.sentanceLoopIndex >= 0){
          for(let i = this.sentanceLoopIndex; i < this.state.soundData.length; i++){
            track.push({
              url: this.state.soundData[i].soundFile._filename,
              index: this.state.soundData[i].index,
            })
          }
        }else{
          for(let i = 0; i < this.state.soundData.length; i++ ){
            track.push({
              url: this.state.soundData[i].soundFile._filename,
              index: this.state.soundData[i].index,
            })
          }
        }
        console.log('track', track);
        AudioServiceModule.playSpeak(JSON.stringify(track), this.state.active_Text);
        global.inde = track[0].index;
        console.log('indexing', global.inde);
        this.setState({songIndex : global.inde})
        this.slowFlastlist?.scrollToIndex({animated: true, index: global.inde});
        global.inde++;

        const eventEmitter = new NativeEventEmitter(AudioServiceModule);
        this.eventListener = eventEmitter.addListener('audioChange', event => {
          console.log("eventing", event)
          console.log("global.inde", global.inde)
          if(global.inde <= track[track.length - 1].index){
            this.setState({songIndex : global.inde})
            this.slowFlastlist?.scrollToIndex({animated: true, index: global.inde});
            global.inde++;
          }else{
            this.setState({songIndex : -1, multiRunning: false})
            AudioServiceModule.stopSound();
            this.sentanceLoopIndex= -1
          }
        }); 
      }else if(Platform.OS == "ios"){
        console.log('this.eventListener', this.eventListener);
        if(this.eventListener){
          this.eventListener.remove();
        }
        
        this.setState({multiRunning: true, songType: "solo"});
        goBackIndex = index;
      
        var track = [];
        var indexArray = [];
        if(this.sentanceLoopIndex >= 0){
          for(let i = this.sentanceLoopIndex; i < this.state.soundData.length; i++){
            track.push(this.state.soundData[i].soundFile._filename,)
            indexArray.push(this.state.soundData[i].index)
          }
        }else{
          for(let i = 0; i < this.state.soundData.length; i++){
            track.push(this.state.soundData[i].soundFile._filename,)
            indexArray.push(this.state.soundData[i].index)
          }
        }
        console.log('track', track);
        AudioServiceModule.playSpeak(track, this.state.active_Text);

        global.inde = indexArray[0];
        console.log('indexing', global.inde);
        this.setState({songIndex : global.inde})
        this.slowFlastlist?.scrollToIndex({animated: true, index: global.inde});
        global.inde++;

        const eventEmitter = new NativeEventEmitter(AudioServiceModule);
        this.eventListener = eventEmitter.addListener('audioChange', event => {
          console.log("eventing", event)
          console.log("global.inde", global.inde)
          console.log("indexArray.length", indexArray[indexArray.length-1])
          if(global.inde <= indexArray[indexArray.length-1]){
            this.setState({songIndex : global.inde})
            this.slowFlastlist?.scrollToIndex({animated: true, index: global.inde});
            global.inde++;
          }else{
            this.setState({songIndex : -1, multiRunning: false})
            AudioServiceModule.stopSound();
            this.sentanceLoopIndex= -1
          }
        })
      }
    }catch(err){
      console.log(err);
    }
  };

  pauseSpeakSound = async (index) => {
    this.setState({multiRunning: false});
    AudioServiceModule.pauseSpeak();
    this.sentanceLoopIndex= -1
  }

  playRepeatSound = async (item, index) => {
    console.log('item', item);
    if(Platform.OS == "android"){
      let array = this.state.lessions;
      console.log("array", array);
      if(lastRepeatIndex){
        if(array[lastRepeatIndex] && array[lastRepeatIndex].toggle){
          array[lastRepeatIndex].toggle = "pause";
        }
      }
      lastRepeatIndex = index

      if (array[index] && array[index].toggle) {
        array[index].toggle = 'play';
      }
    
      this.setState({lessions: array, songType: 'solo'});
      AudioServiceModule.playRepeat(item.soundFile._filename, this.state.active_Text).then(success => {
        console.log("success", success);
        if(success){
          let array = this.state.lessions;
          if (array[index] && array[index].toggle) {
            array[index].toggle = 'pause';
          }
          this.setState({lessions: array});
        }
      }).catch(err => console.log(err))
    }else if(Platform.OS == "ios"){
      if(this.newEvent){
        this.newEvent.remove();
      }
      let array = this.state.lessions;
      console.log("array", array);
      if(lastRepeatIndex){
        if(array[lastRepeatIndex] && array[lastRepeatIndex].toggle){
          array[lastRepeatIndex].toggle = "pause";
        }
      }
      lastRepeatIndex = index

      if (array[index] && array[index].toggle) {
        array[index].toggle = 'play';
      }
    
      this.setState({lessions: array, songType: 'solo'});
      AudioServiceModule.playRepeat(item.soundFile._filename, this.state.active_Text);
      const eventEmitter = new NativeEventEmitter(AudioServiceModule);
      this.newEvent = eventEmitter.addListener('Completed', event => {
        console.log("event", event) // "someValue"
        let array = this.state.lessions;
          if (array[index] && array[index].toggle) {
            array[index].toggle = 'pause';
          }
          this.setState({lessions: array,});
      })
    }
  }

  pauseRepeatSound = async (index) => {
    let array = this.state.lessions;
    if (array[index] && array[index].toggle) {
      array[index].toggle = 'pause';
    }
    this.setState({lessions: array});
    AudioServiceModule.pauseRepeat();
  };

  playSoundLoop = async (index, item, timer) => {
    if(Platform.OS == "android"){
      this.setState({loopRunning: true, songType: "soloLoop"});
      var track = [];
      for(let i = 0; i < this.state.soundData.length; i++ ){
        track.push({
          url: this.state.soundData[i].soundFile._filename,
        })
      }
      console.log('track', track);
      this.input.onButtonStart();
      AudioServiceModule.playLoop(JSON.stringify(track), this.state.active_Text);
    }else if(Platform.OS == "ios"){
      this.setState({loopRunning: true, songType: "soloLoop"});
      
      var track = [];
      for(let i = 0; i < this.state.soundData.length; i++ ){
        track.push(this.state.soundData[i].soundFile._filename)
      }
      
      console.log('track', track);
      this.input.onButtonStart();
      AudioServiceModule.playLoop(track, this.state.active_Text);
    }
  };

  pauseSoundLoop = async (index,) => {
    this.setState({loopRunning: false})
    this.input.onButtonPause();
    AudioServiceModule.pauseLoop();
  };

  saveLessonHistory = async (type) => {
    this.setState({multiRunning: false})
    
    if (this.state.lessions.length >= 0) {
      const historyData = {
        lesson_id: this.state.lessonDetails.lesson_id,
        lessonfamily_id: this.state.lessonDetails.lessonfamily_id,
        current: this.state.historyData.current,
        is_demo: 2,
        time_loop: this.state.passiveTimeloop,
        active: this.state.historyData.active,
        passive: this.state.historyData.passive,
        speak: this.state.historyData.speak,
        repeat: this.state.historyData.repeat,
        level_id: this.state.lessonDetails.level_id,
        learning_language_id: this.state.learnLang,
      };
      
      this.downloadLesson(this.state.lessonDetails, type );
      
      // this.props.saveHistory(historyData, type, this.props?.route?.params?.familyName);
      if(this.props.isConnected){
        console.log('historyData from saveLessonHistory', historyData);
        doPost(`${apiUrls.saveLessonHistory}`, historyData).then(async res => {
          this.setState({isLoading: false});
          console.log('res', res);
          if(res.success){
            if(type == 1 || type == 2 || type == 3){

            }
            else if(type == 4){
              this.props.navigation.navigate("LessonOverview", {screen: "LessonOverviewChoose"});
            }
            else{
              this.props.navigation.goBack();
            }
      
          }else{
            showDangerToast(res.message);
          }
        }).catch(err => console.log('err', err))
      }else{
        let infoForSaveLessonAfterOffline = {
          lesson_id: this.state.lessonDetails.lesson_id,
          lessonfamily_id: this.state.lessonDetails.lessonfamily_id,
          current: this.state.historyData.current,
          is_demo: 2,
          time_loop: this.state.passiveTimeloop,
          active: this.state.historyData.active,
          passive: this.state.historyData.passive,
          speak: this.state.historyData.speak,
          repeat: this.state.historyData.repeat,
          level_id: this.state.lessonDetails.level_id,
        };

        await AsyncStorage.setItem("learnedLesson", JSON.stringify(infoForSaveLessonAfterOffline))
        this.props.navigation.goBack()
      }
    } else {
      this.props.navigation.goBack();
    }
  };
  downloadLesson = async (item, type) => {
    console.log('this.state',this.state, );
    let prog = 0;
    if (this.state.currentIndex >= this.state.lessonDetails.max_read_slide) {
      prog = (this.state.currentIndex * 100) / this.state.lessions.length;
    } else {
      prog = (this.state.lessonDetails.max_read_slide * 100) / this.state.lessions.length;
    }
    let activeReadLength = this.state.historyData.active.indexArray.length;
    let speakReadLength = this.state.historyData.speak.indexArray.length;
    let repeatReadLength = this.state.historyData.repeat.indexArray.length;
    
    let info = {
      _id: item._id,
      lesson_id: item.lesson_id,
      lessonfamily_id: item.lessonfamily_id,
      learning_language_id: item.learning_language_id,
      baselesson_id: item.baselesson_id,
      level_id: item.level_id,
      title: item.title,
      progress: this.state.historyData.current,
      historyData: this.state?.historyData,
      stateData: this.state.dataStates,
      current_percentage: parseInt(prog),
      time_loop: this.state.passiveTimeloop,
      active_progress:
        (activeReadLength * 100) / this.state.historyData.active.total,
      speak_progress:
        (speakReadLength * 100) / this.state.historyData.speak.total,
      repeat_progress:
        (repeatReadLength * 100) / this.state.historyData.repeat.total,
      passive_progress:
      (this.state.passiveTimeloop * 100) / 1200,
    };

    var store_path = RNFS.ExternalDirectoryPath;
    if (Platform.OS === 'ios') {
      store_path = RNFS.DocumentDirectoryPath;
    }
    await RNFS.mkdir(store_path + '/birlingo');
    store_path = store_path + '/birlingo';
    await RNFS.mkdir(store_path + `/${this.state.userId}`);
    store_path = store_path + `/${this.state.userId}`;
    await RNFS.mkdir(store_path + `/${item.lesson_id}`);
    store_path = store_path + `/${item.lesson_id}`;
    
    RNFS.writeFile(store_path + '/info.json', JSON.stringify(info), 'utf8').then(success => {
      console.log('FILE WRITTEN!', success);
      // type = 'DownloadsList' ? this.props.navigation.navigate('DownloadsList') : '';
      if(type == 3){
        this.props.navigation.goBack();
      }
    }).catch(err => {
      console.log("errrrrr", err);
    });
  };

  
  goBack = async index => {
    console.log("starting...");
    AudioServiceModule.stopSound();
    this.input.onButtonStop();
    this.setState({isLoading: true, loopRunning: false});
    if (this.state.lessions.length > 0) {
      // const {speedType} = this.state;
      if(index){
        let array = this.state.lessions;
        if (array[index] && array[index].toggle) {
          array[index].toggle = 'pause';
        }
        this.setState({lessions: array});
      }
      this.saveLessonHistory();
    }else{
      this.props.navigation.goBack()
    }
  };

  async onTabClick(num,) {
    if(this.newEvent){
      this.newEvent.remove()
    }
    if(this.eventListener){
      this.eventListener.remove()
    }
    AudioServiceModule.stopSound();
    this.setState({tabNum: num, toggle: false,});
    if (num == 1) {
      if(this.props.isConnected){
        this.setState({isLoading: true})
        this.saveLessonHistory(1);
        this.props.navigation.dispatch(state => {
          return CommonActions.reset({
            index: 0,
            routes: [
              { name: 'LessonOverview' },
            ],
          })
        })
      }else{
        this.props.setVisibility(true)
      }
    } else if (num == 2) {
      if(this.props.isConnected){
        this.setState({isLoading: true})
        this.saveLessonHistory(2);
        this.props.navigation.dispatch(state => {
          const newState = state.routes.filter(item => item.name == "LessonOverviewChoose")
          console.log("newState", newState);
          console.log("sta", state);
          return CommonActions.reset({
            ...newState,
            index: 0,
            routes: [
              { name: 'Settings' },
            ],
          })
        });
      }else{
        this.props.setVisibility(true)
      }
    } else if (num == 3) {
      if(this.props.isConnected){
        this.setState({isLoading: true})
        this.saveLessonHistory(3);
      }else{
        this.downloadLesson(this.state.lessonDetails, 3 );
        const historyData = {
          lesson_id: this.state.lessonDetails.lesson_id,
          lessonfamily_id: this.state.lessonDetails.lessonfamily_id,
          current: this.state.historyData.current,
          is_demo: 2,
          time_loop: this.state.passiveTimeloop,
          active: this.state.historyData.active,
          passive: this.state.historyData.passive,
          speak: this.state.historyData.speak,
          repeat: this.state.historyData.repeat,
          level_id: this.state.lessonDetails.level_id,
          learning_language_id: this.state.learnLang,
        };
        
        AsyncStorage.setItem('learnedLessonToBeUpdated', JSON.stringify(historyData));
      }
    }
  }

  goToSubscription = () => {
    this.props.navigation.navigate('ChooseSubscription');
  };

  goToSentence = index => {
    this.AppIntroSlider?.goToSlide(index);
    this.setState({isLoading: false}, () => {
      this.onSlideChange(index, null, null);
      this.setState({currentIndex: index + 1,
        playvalue:true
      });
    });
  };

  historyAdd = (state, index) => {
    this.state.historyData.current = index < 1 ? 1 : index + 1;

    if (this.state.historyData[state].indexArray.indexOf(index) == -1) {
      this.state.historyData[state].total = this.state.dataStates[state];
      this.state.historyData[state].max =
        this.state.historyData[state].indexArray.length + 1;
      this.state.historyData[state].indexArray.push(index);
    }
  };

  onSlideChange = (index, lastindex) => {
    const array1 = this.state.lessions;
    if(index == 0){

    }else{
      if (array1[index - 1].toggle) {
        array1[index - 1].toggle = 'pause';
        this.setState({lessions: array1});
      }
    }
    console.log('onSlideChange visible', index);

    this.setState({isLoading: false, selected: array1[index] && array1[index].tab});
    
    this.input.onButtonPause();
    clearInterval(this.interval1);;
    this.sentanceLoopIndex = -1;

    if (this.state.currentIndex <= index) {
      this.setState({currentIndex: index + 1}, () => {
        this.checkCurrentTab(
          this.state.lessions[index].type && this.state.lessions[index].type,
          index,
          this.state.lessions[index].state,
        );
      });
    } else {
      this.setState({currentIndex: this.state.currentIndex - 1}, () => {
        this.checkCurrentTab(
          this.state.lessions[index].type && this.state.lessions[index].type,
          index,
          this.state.lessions[index].state,
        );
      });
    }
  };

  checkCurrentTab = async (type, index, state) => {
    try{
      AudioServiceModule.stopSound();
      this.setState({multiRunning: false, songIndex: -1, loopRunning: false});
      if (state != 'repeat') {
        this.historyAdd(state, index);
      }
      const array = this.state.lessions;
      if (global.repeatIndex) {
        array[global.repeatIndex].toggle = 'pause';
      }
      if (lastRepeatIndex) {
        array[lastRepeatIndex].toggle = 'pause';
      }
      this.setState({activeState: state, lessions: array});

      if (type == 'title' && state == 'final') {
        this.setState({currentTab: 'four'});
      } else if (type == 'title' && state == 'repeat') {
        this.setState({currentTab: 'four'});
      } else if (type == 'sentenceList') {
        this.setState({currentTab: 'four'});
        if (this.state.repeatData.length == 2) {
          this.state.historyData['repeat'].total = this.state.repeatData.length;
          this.state.historyData['repeat'].max = this.state.repeatData.length;
          this.state.historyData['repeat'].indexArray = this.state.repeatData;
        }
      } else if (type == 'songLoop') {
        this.setState({
          currentTab: 'second',
          songLoopIndex: index,
        });
      } else if (type == 'title' && state == 'speak') {
        this.setState({
          currentTab: 'third',
          songLoopIndex: index,
        });
      } else if (type == 'title' && state == 'passive') {
        this.setState({
          currentTab: 'second',
          songLoopIndex: index,
        });
      } else if (
        type == 'song_with_sentance' ||
        type == 'slow_song_with_sentence' 
      ) {
        this.setState({currentTab: 'third',});
      } else {
        this.setState({currentTab: 'first'}, () => {
          if (index == this.state.songLoopIndex + 1 && index != 1) {
            this.setState({currentTab: 'third'});
          }
        });
      }
    }catch(err){
      console.log('err', err);
    }
  };

  _renderItem = ({item, index}) => {
    // console.log('item=========>>>>',item)
    return (
      <View style={styles.slides} key={'key' + index}>
        {item?.type == 'title'
          ? this._renderShowMessage(item, index)
          : item?.type == 'imagination'
          ? this._renderImagination(item, index)
          : item?.type == 'song'
          ? this._renderSong(item, index)
          : item?.type == 'repeat'
          ? this._renderRepeat(item, index)
          : item?.type == 'songLoop'
          ? this._renderSongLoop(item, index)
          : item?.type == 'slow_song_with_sentence'
          ? this._renderSlowSongSentanceStep(item, index)
          // : item?.type == 'fast_song_with_sentence'
          // ? this._renderFastSongSentanceStep(item, index)
          : item?.type == 'sentenceList'
          ? this._renderSentenceList(item, index)
          : item?.type == 'finish'
          ? this._renderFinish(item, index)
          : null}
      </View>
    );
  };

  _renderShowMessage = (item, index) => {
    goBackIndex = index;
    return (
      <CustomInstruction
        appString={this.state.appString ? this.state.appString : global.Terms}
        item={item}
        index={index}
        navigation={this.props.navigation}
        lessonID={this.state.lessions[0] && this.state.lessions[0].lessonID}
        onExit={index => this.goBack(index)}
        goToLesson={index =>this.saveLessonHistory(4)
          // this.props.navigation.navigate('LessonOverviewChoose')
        }
        lessonLength={this.state.lessions.length - 1}
      />
    );
  };

  _renderImagination = (item, index) => {
    goBackIndex = index;

    return (
      <LinearGradient colors={colors.backGround} style={styles.container}>
        <HeadingNav
          bgColor={colors.backGround[0]}
          lessonID={this.state.lessions[0] && this.state.lessions[0].lessonID}
          onExit={index => this.goBack(index)}
          totalIndex={this.state.lessions.length}
          currentIndex={this.state?.currentIndex - 1}
          navigation={this.props.navigation}
          title={this.state?.lessions}
        />
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.instructionView}>
              <Image source={images.imaginationImg} style={styles.imagineImg} />
              <View style={styles.instructionText}>
                <BodyDescription
                  subTitle={this.state.appString ? this.state.appString[item?.heading] : global.Terms ? global.Terms[item?.heading] : ""}
                />
              </View>
            </View>

            <View style={styles.imageSentance}>
              <Text style={styles.imagin_text}>{item?.sentence}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  };

  _renderRepeat = (item, index) => {
    goBackIndex = index;
    let sentence1 = item?.sentence1.trim().split(' ');
    let sentence2 =
      item?.sentence2 && item?.sentence2.trim()
        ? item?.sentence2.trim().split(' ')
        : '';
    let sentence3 =
      item?.latin_sentence && item?.latin_sentence.trim()
        ? item?.latin_sentence.trim().split(' ')
        : '';
    let newArray = [];
    sentence1?.forEach((element, k) => {
      let obj = {};
      obj['sentence1'] = element.split('*').join(' ');
      obj['sentence2'] = sentence2[k] ? sentence2[k].split('*').join(' ') : '';
      obj['sentence3'] = sentence3[k] ? sentence3[k].split('*').join('') : '';
      if (sentence3.length > 0) {
        if (k == 0) {
          obj['sentence3'] = '[' + obj['sentence3'];
        }
        if (k == sentence1.length - 1) {
          obj['sentence3'] = obj['sentence3'] + ']';
        }
      }
      newArray.push(obj);
    });

    let content = newArray.map((data, index) => {
      return (
        <View style={styles.sentance_view}>
          <Text style={styles.sentance_text_listen}>{data?.sentence1}</Text>
          {sentence3 != '' ? (
            <Text style={styles.latin_text}>{data?.sentence3}</Text>
          ) : null}

          <Text style={styles.listen_sub_sentance_text}>{data?.sentence2}</Text>
        </View>
      );
    });
    return (
      <LinearGradient colors={colors.backGround} style={styles.container}>
        <HeadingNav
          bgColor={colors.backGround[0]}
          lessonID={this.state.lessions[0] && this.state.lessions[0].lessonID}
          onExit={index => this.goBack(index)}
          totalIndex={this.state.lessions.length}
          currentIndex={this.state.currentIndex - 1}
          navigation={this.props.navigation}
          title={this.state?.lessions}
        />
        <View style={styles.formContainer}>
          <View style={styles.instructionView}>
            <Image source={images.iconRepeat} style={styles.imagineImg} />
            <View style={styles.instructionText}>
              <BodyDescription subTitle={this.state?.appString ? this.state?.appString[item.heading] : global.Terms ? global.Terms[item.heading] : ""} />
            </View>
          </View>

          <View style={{flex: 0.85, marginTop: 30}}>
            <ScrollView
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                // backgroundColor: 'red',
                borderRadius: 10,
                flex: 1,
              }}>
              <View
                style={{
                  marginTop: 10,
                  marginHorizontal: 20,
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {content}
              </View>
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  };

  _renderCompare = (item, index) => {
    let sentence1 = item.sentence1.trim().split(' ');
    let sentence2 =
      item?.sentence2 && item?.sentence2.trim()
        ? item?.sentence2.trim().split(' ')
        : '';
    let sentence3 =
      item?.latin_sentence && item?.latin_sentence.trim()
        ? item?.latin_sentence.trim().split(' ')
        : '';
    let newArray = [];
    sentence1?.forEach((element, k) => {
      let obj = {};
      obj['sentence1'] = element.split('*').join(' ');
      obj['sentence2'] = sentence2[k] ? sentence2[k].split('*').join(' ') : '';
      obj['sentence3'] = sentence3[k] ? sentence3[k].split('*').join(' ') : '';
      if (sentence3.length > 0) {
        if (k == 0) {
          obj['sentence3'] = '[' + obj['sentence3'];
        }
        if (k == sentence1.length - 1) {
          obj['sentence3'] = obj['sentence3'] + ']';
        }
      }
      newArray.push(obj);
    });

    let content = newArray.map((data, index) => {
      return (
        <View style={styles.sentance_view}>
          <Text style={styles.sentance_text}>{data?.sentence1}</Text>
          {sentence3 != '' ? (
            <Text style={styles.latin_text}>{data?.sentence3}</Text>
          ) : null}
          <Text style={styles.sub_sentance_text}>{data?.sentence2}</Text>
        </View>
      );
    });
    return (
      <View style={styles.formContainer}>
        <View style={styles.instructionView}>
          <View>
            <Image source={images.iconTopCompare} style={styles.compareImg} />
          </View>
          <View style={styles.instructionText}>
            <BodyDescription subTitle={this.state?.appString ? this.state?.appString[item.heading] : global.Terms ? global.Terms[item.heading] : ""} />
          </View>
        </View>
      </View>
    );
  };

  _renderSong = (item, index) => {
    goBackIndex = index;
    let sentence1 = item?.sentence1.trim().split(' ');
    let sentence2 =
      item?.sentence2 && item?.sentence2.trim()
        ? item?.sentence2.trim().split(' ')
        : '';
    let sentence3 =
      item?.latin_sentence && item?.latin_sentence.trim()
        ? item?.latin_sentence.trim().split(' ')
        : '';
    let newArray = [];
    sentence1.forEach((element, k) => {
      let obj = {};
      obj['sentence1'] = element.split('*').join(' ');
      obj['sentence2'] = sentence2[k] ? sentence2[k].split('*').join(' ') : '';
      obj['sentence3'] = sentence3[k] ? sentence3[k].split('*').join('') : '';
      if (sentence3.length > 0) {
        if (k == 0) {
          obj['sentence3'] = '[' + obj['sentence3'];
        }
        if (k == sentence1.length - 1) {
          obj['sentence3'] = obj['sentence3'] + ']';
        }
      }
      newArray.push(obj);
    });

    let content = newArray.map((data, index) => {
      return (
        <View style={styles.sentance_view}>
          <Text style={styles.sentance_text_listen}>{data?.sentence1}</Text>
          {sentence3 != '' ? (
            <Text style={styles.latin_text}>{data?.sentence3}</Text>
          ) : null}

          <Text style={styles.listen_sub_sentance_text}>{data?.sentence2}</Text>
        </View>
      );
    });
    return (
      <LinearGradient colors={colors.backGround} style={{flex: 1}}>
        <HeadingNav
          bgColor={colors.backGround[0]}
          lessonID={this.state?.lessions[0] && this.state?.lessions[0].lessonID}
          onExit={index => this.goBack(index)}
          totalIndex={this.state?.lessions.length}
          currentIndex={this.state?.currentIndex - 1}
          navigation={this.props.navigation}
          title={this.state?.lessions}
        />

        <View style={styles.formContainer}>
          <View style={styles.instructionView}>
            <View>
              <Image source={images.iconListen} style={styles.earImg} />
            </View>
            <View style={styles.instructionText}>
              <BodyDescription subTitle={this.state?.appString ? this.state?.appString[item.heading] : global.Terms ? global.Terms[item.heading] : ""} />
            </View>
          </View>
          <View
            style={{
              flex: 0.85,
              marginTop: 30,
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 10,
              paddingBottom: 50,
            }}>
            <ScrollView showsVerticalScrollIndicator={true} style={{}}>
              <View
                style={{
                  marginTop: 10,
                  marginHorizontal: 20,
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {content}
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              width: width,
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              justifyContent: 'center',
              height: width * (110 / 375),
            }}>
            <View style={styles.sound_btn_container}>
              <ProgressCircle
                // percent={
                //   +(this.state?.timeSound / item?.sound
                //     ? item?.sound.getDuration()
                //     : 1) * 100
                // }
                radius={40}
                borderWidth={2}
                color="#fff"
                shadowColor="#c3d6eb"
                bgColor="#fff">
                <View>
                  {item?.toggle != undefined && item?.toggle == 'pause' ? (
                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        this.playActive(item, index)}
                      }>
                      <Image
                        source={images.playIcon}
                        style={styles.playIcon}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {item?.toggle != undefined && item?.toggle == 'play' ? (
                    <TouchableOpacity
                      style={{}}
                      onPress={() => this.pauseActive(index)}>
                      <Image source={images.pauseIcon} />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </ProgressCircle>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.code_blk,
                  borderRadius: 5,
                  bottom: Platform.OS == 'ios' ? 52 : 50,
                  left: 100,
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                }}
                onPress={() => this.Langsam(index)}>
                <Text style={{color: colors.code_fff, fontSize:Dimensions.get('window').width > 670 ?22:12}}>
                {this.state?.active_Text}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  };
  
  _renderSongLoop = (item, i) => {
    // console.log("itemone", item);
    goBackIndex = i;

    return (
      <LinearGradient colors={colors.loopBack} style={styles.container}>
        <HeadingNav
          bgColor={colors.loopBack[0]}
          lessonID={this.state?.lessions[0] && this.state?.lessions[0].lessonID}
          onExit={index => this.goBack(index)}
          totalIndex={this.state?.lessions.length}
          currentIndex={this.state?.currentIndex - 1}
          navigation={this.props.navigation}
          title={this.state?.lessions}
        />
        <View style={styles.timerSlide}>
          <View style={styles.instructionView}>
            <View style={styles.instructionText}>
              <BodyDescription subTitle={this?.state.appString ? this?.state.appString[item.heading] : global.Terms ? global.Terms[item.heading] : ""} />
            </View>
          </View>
        </View>
        <View style={{flex: 0.5}}>
          <View style={{flex: 0.8}}>
            <StopWatch
              _hour={this.state.hours}
              _minutes={this.state.minutes}
              _seconds={this.state.seconds}
              getSeconds={this.getSeconds}
              timerValue={this.timerValue}
              ref={ref => (this.input = ref)}
            />
          </View>
          <View style={styles.passiveBottom}>
            <ProgressCircle
              radius={40}
              shadowColor="#fff"
              bgColor="#fff"
              percent={0}>
              <View>
                {this.state.loopRunning == false ? (
                  <TouchableOpacity
                    style={{}}
                    onPress={() => this.playSoundLoop(i, item.data)}>
                    <Image source={images.playIcon} style={styles.playIcon} />
                  </TouchableOpacity>
                ) :(
                  <TouchableOpacity
                    style={{}}
                    onPress={() => this.pauseSoundLoop(i, item.data)}>
                    <Image source={images.pauseIcon} />
                  </TouchableOpacity>
                  )
                }
              </View>
            </ProgressCircle>
            <TouchableOpacity
              style={{
                backgroundColor: colors.code_blk,
                borderRadius: 5,
                position: 'absolute',

                top: 30,

                left: 100,
                paddingVertical: 4,
                paddingHorizontal: 10,
              }}
              onPress={() => this.Langsam_beta(i, item.data)}>
              <Text style={{color: colors.code_fff, fontSize:Dimensions.get('window').width > 670 ?22:12}}>
                {this.state?.active_Text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };

  _renderSlowSongSentanceStep = (item, index) => {
    goBackIndex = index;
    
    return (
      <LinearGradient colors={colors.speechBack} style={styles.container}>
        <HeadingNav
          bgColor={colors.speechBack[0]}
          lessonID={this.state.lessions[0] && this.state.lessions[0].lessonID}
          onExit={index => this.goBack(index)}
          totalIndex={this.state.lessions.length}
          currentIndex={this.state.currentIndex - 1}
          navigation={this.props.navigation}
          title={this.state?.lessions}
        />
        <View style={styles.fifth_formContainer}>
          <View style={styles.instructionView}>
            <View>
              <Image source={images.speakIcon} style={styles.compareImg} />
            </View>
            <View style={styles.instructionText}>
              <BodyDescription
                subTitle={this.state?.appString ? this.state?.appString[item.heading] : global.Terms ? global.Terms[item.heading] : ""}
              />
            </View>
          </View>
          <View style={styles.list_view}>
            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'flex-end',
                paddingBottom: 100,
              }}
              ref={ref => (this.slowFlastlist = ref)}
              showsVerticalScrollIndicator={false}
              data={item.data}
              renderItem={({item, index}) => {
                let sentence1 = item?.sentence1.split(' ');
                let sentence3 =
                  item?.latin_sentence && item?.latin_sentence.trim()
                    ? item?.latin_sentence.trim().split(' ')
                    : '';
                let newArray = [];
                sentence1.forEach((element, k) => {
                  let obj = {};
                  obj['sentence1'] = element.split('*').join(' ');
                  obj['sentence3'] = sentence3[k]
                    ? sentence3[k].split('*').join(' ')
                    : ' ';
                  if (sentence3.length > 0) {
                    if (k == 0) {
                      obj['sentence3'] = '[' + obj['sentence3'];
                    }
                    if (k == sentence1.length - 1) {
                      obj['sentence3'] = obj['sentence3'] + ']';
                    }
                  }
                  newArray.push(obj);
                });

                let content = newArray.map(data => {
                  // if(Platform.OS == "android"){
                  if (index == this.state.songIndex ) {
                    return (
                      <View>
                        <TouchableOpacity
                          style={styles.sentance_view_1}
                          onPress={() => this._getSelectSongIndexLoop( index,  item ) }
                        >
                          <Text style={styles.sentance_text_1}>
                            {data?.sentence1}
                          </Text>
                        </TouchableOpacity>
                        {sentence3 != '' ? (
                          <TouchableOpacity
                            style={styles.sentance_view_1}
                            onPress={() => this._getSelectSongIndexLoop( index, item, )}
                          >
                            <Text style={styles.loop_sub_sentance_text}>
                              {data?.sentence3}
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    );
                  } else {
                    return (
                      <View>
                        <TouchableOpacity
                          style={styles.sentance_view_1}
                          onPress={() => this._getSelectSongIndexLoop(index, item)}
                        >
                          <Text style={styles.sentance_loop_text}>
                            {data?.sentence1}
                          </Text>
                        </TouchableOpacity>
                        {sentence3 != '' ? (
                          <TouchableOpacity
                            style={styles.sentance_view_1}
                            onPress={() => this._getSelectSongIndexLoop( index, item ) }
                          >
                            <Text style={styles.loop_latin_sentance_text}>
                              {data?.sentence3}
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    );
                  }
                });
                return (
                  <ScrollView
                    style={{
                      marginHorizontal: 20,
                    }}>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {content}
                    </View>
                  </ScrollView>
                );
              }}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            height: width * (110 / 375),
            width: width,
            position: 'absolute',
            bottom: 0,
          }}>
          <View style={styles.fifth_section_btn_container}>
            <ProgressCircle
              percent={0}
              radius={40}
              borderWidth={2}
              color={colors.code_black}
              shadowColor="#fff"
              bgColor="#fff">
              <View>
                {this.state.multiRunning == false  ? (
                  <TouchableOpacity
                    style={{}}
                    onPress={() => this.sentance_loop1(index, item)}>
                    <Image source={images.playIcon} style={styles.playIcon} />
                  </TouchableOpacity>
                ) : null}
                {this.state.multiRunning ? (
                  <TouchableOpacity
                    // style={{padding: 10}}
                    onPress={() => this.pauseSpeakSound()}>
                    <Image source={images.pauseIcon} />
                  </TouchableOpacity>
                ) : null}

              </View>
            </ProgressCircle>
            <TouchableOpacity
              style={{
                backgroundColor: colors.code_blk,
                borderRadius: 5,

                bottom: hasNotch
                  ? width * (50 / 375)
                  : Platform.OS == 'ios'
                  ? width * (50 / 375)
                  : width * (48 / 375),
                  position:Dimensions.get('window').width > 670 ?'relative':null,
                  top:Dimensions.get('window').width > 670 ?-55:null,
                left: 100,
                paddingVertical: 4,
                paddingHorizontal: 10,
              }}
              onPress={() =>  this.Langsam_speak(index)}>
              <Text style={{color: colors.code_fff, fontSize:Dimensions.get('window').width > 670 ?22:12}}>
                {this.state?.active_Text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };

  _renderRepeation = (item, index) => {
    let obj;
    {
      obj = item.sentence.split(' ');
    }
    
    this.state.ItemSong.map((sng, index) => {
      if (item.index == sng.index) {
        item.index = item.index;
        item.soundFile = sng.soundFile;
        item.sound = sng.sound;
        item.toggle = sng.toggle;
      }
    });
    return (
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: colors.code_fff,
          flex: 1,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <View style={{}}>
          {item?.toggle != undefined && item?.toggle == 'pause' ? (
            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.playRepeatSound(item, item.index)
              }}>
              <Image
                source={images.playIcon}
                resizeMode={'contain'}
                style={[styles.playIcon]}
              />
            </TouchableOpacity>
          ) : null}
          {item?.toggle != undefined && item?.toggle == 'play' ? (
            <TouchableOpacity
              style={{}}
              onPress={() => this.pauseRepeatSound(item.index)}>
              <Image
                source={images.pauseIcon}
                resizeMode={'contain'}
                style={[styles.playIcon]}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',

            marginLeft: width * (15 / 375),

            flexWrap: 'wrap',

            width: '80%',
          }}>
          {obj.map(sng => (
            <View
              style={{
                paddingHorizontal: 5,
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontSize: width * (20 / 375),
                  fontFamily: font.type.ACaslonPro_Bold,
                  paddingVertical:
                    Platform.OS === 'ios' ? width * (10 / 375) : 0,

                  color: colors.code_fff,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  paddingHorizontal: 3,
                }}>
                {sng}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  _renderSentenceList = (item, index) => {
    goBackIndex = index;

    return (
      <>
        <LinearGradient colors={colors.sentenceListBack} style={{flex: 1}}>
          <HeadingNav
            bgColor={colors.sentenceListBack[0]}
            lessonID={this.state.lessions[0] && this.state.lessions[0].lessonID}
            onExit={index => this.goBack(index)}
            totalIndex={this.state.lessions.length}
            currentIndex={this.state.currentIndex - 1}
            navigation={this.props.navigation}
            title={this.state.lessions}
          />
          <View style={styles.instructionView}>
            <View style={styles.instructionText}>
              <BodyDescription subTitle={this.state?.appString ? this.state?.appString[item.heading] : global.Terms ? global.Terms[item.heading] : ""} />
            </View>
          </View>

          <View style={styles.sentence_list_view}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={item.data}
              renderItem={({item, index}) => this._renderRepeation(item, index)}
              ListFooterComponent={<View style={{height: 80}} />}
            />
          </View>
        </LinearGradient>
      </>
    );
  };

  
  _renderFinish = (item, index) => {
    goBackIndex = index;

    return (
      <View style={{flex: 1}}>
        <View style={styles.instructionView}>
          <Text style={styles.heading_text}>{item.title}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BlueButton
            title={this.state.appString ? this.state.appString.lbl_free_trail ? global.Terms : global.Terms.lbl_free_trail: ""}
            onClick={() => this.goToSubscription()}
          />
        </View>
      </View>
    );
  };

  render() {
    const {appString} = this.state;
    console.log('this.props', this.props);
    console.log('this.state', this.state);
    return (
      <SafeAreaView style={{flex: 1 , marginBottom: hasNotch && Platform.OS == "ios" ? -22 : 0, backgroundColor: "#fff"}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        <View style={{flex: 1}}>
          <Loader loading={this.state.isLoading} />

          <View style={{flex: 1}}>
            {this.state.lessions.length > 0 ? (
              <AppIntroSlider
                ref={ref => (this.AppIntroSlider = ref)}
                slides={this.state.lessions}
                renderItem={this._renderItem}
                onDone={this._onDone}
                onSkip={this._onSkip}
                screenName={'lesson'}
                btnStyle={'DemoStyle'}
                doneLabel={'Done'}
                nextLabel={'Next'}
                totalIndex={this.state.lessions.length}
                currentIndex={this.state.currentIndex}
                showSkipButton={false}
                showNextButton={true}
                skipLabel={'Skip'}
                hidePagination={false}
                onSlideChange={(index, lastIndex, item) =>
                  this.onSlideChange(index, lastIndex, item)
                }
              />
            ) : (
              <LinearGradient
                colors={colors.backGround}
                style={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}>
                {this.state.isApi != false ? (
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      color: colors.code_82c2,
                      fontFamily: font.type.Akkurat_Bold,
                    }}>
                    {appString ? appString.msg_no_demo_data : global.Terms ? global.Terms.msg_no_demo_data : ""}
                  </Text>
                ) : (
                  <Loader loading={false} />
                )}
              </LinearGradient>
            )}
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{marginRight: 5}}>
                <Progress.Bar
                  height={width * (7 / 375)}
                  color={colors.code_black}
                  unfilledColor="rgb(220, 220, 220)"
                  borderWidth={0}
                  progress={
                    this.state?.dataStates &&
                    this.state?.historyData['active'].indexArray.length /
                      this.state?.dataStates.active
                  }
                  width={width - (width * 285) / 375}
                  borderRadius={0}
                />
              </View>

              <View style={{marginRight: 5}}>
                <Progress.Bar
                  height={width * (7 / 375)}
                  color={colors.code_black}
                  unfilledColor="rgb(220, 220, 220)"
                  borderWidth={0}
                  progress={
                    this.state?.dataStates &&
                    this.state?.historyData['speak'].indexArray.length /
                      this.state?.dataStates.speak
                  }
                  width={width - (width * 285) / 375}
                  borderRadius={0}
                />
              </View>
              <View style={{marginLeft: 5}}>
                <Progress.Bar
                  height={width * (7 / 375)}
                  color={colors.code_black}
                  unfilledColor="rgb(220, 220, 220)"
                  borderWidth={0}
                  progress={
                    this.state?.dataStates &&
                    this.state?.historyData['repeat'].indexArray.length /
                      this.state?.dataStates.repeat
                  }
                  width={width - (width * 285) / 375}
                  borderRadius={0}
                />
              </View>
              <View style={{marginLeft: 5}}>
                <Progress.Bar
                  height={width * (7 / 375)}
                  color={colors.code_black}
                  unfilledColor="rgb(220, 220, 220)"
                  borderWidth={0}
                  progress={this.state.passiveTimeloop / 1200}
                  width={width - (width * 285) / 375}
                  borderRadius={0}
                />
              </View>
            </View>

            <View style={styles.bottomOptionContainer}>
              <TouchableOpacity
                onPress={() => this.goToSentence(1)}
                activeOpacity={0.8}
                style={styles.bottomOptionFirst}>
                <Image
                  source={images.eye}
                  style={[
                    styles.bottomIcon,
                    {
                      tintColor:
                        this.state.currentTab === 'first'
                          ? colors.code_black
                          : 'rgb(171,171,171)',
                    },
                  ]}
                  resizeMode={'cover'}
                />
                <View
                  style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.bottomOptionFirstTxt,
                      {
                        color:
                          this.state.currentTab === 'first'
                            ? colors.code_black
                            : 'rgb(171,171,171)',
                      },
                    ]}>
                    {appString ? appString.lbl_hearActively : global.Terms ? global.Terms.lbl_hearActively : "" }
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.goToSentence(this.state.speakIndex)}
                activeOpacity={0.8}
                style={styles.bottomOptionThird}>
                <Image
                  source={images.messageIcon}
                  style={[
                    styles.bottomIcon,
                    {
                      tintColor:
                        this.state.currentTab === 'third'
                          ? colors.code_black
                          : 'rgb(171,171,171)',
                    },
                  ]}
                  resizeMode={'cover'}
                />
                <View
                  style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.bottomOptionFirstTxt,
                      {
                        color:
                          this.state.currentTab === 'third'
                            ? colors.code_black
                            : 'rgb(171,171,171)',
                      },
                    ]}>
                    {appString ? appString.lbl_speak : global.Terms ? global.Terms.lbl_speak : ""}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.goToSentence(this.state.sentenceListIndex)}
                activeOpacity={0.8}
                style={styles.bottomOptionThird}>
                <Image
                  source={images.rotate}
                  style={[
                    styles.bottomIcon,
                    {
                      tintColor:
                        this.state.currentTab === 'four'
                          ? colors.code_black
                          : 'rgb(171,171,171)',
                    },
                  ]}
                  resizeMode={'contain'}
                />
                <View
                  style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.bottomOptionFirstTxt,
                      {
                        color:
                          this.state.currentTab === 'four'
                            ? colors.code_black
                            : 'rgb(171,171,171)',
                      },
                    ]}>
                    {appString ? appString.lbl_repeat_term : global.Terms ? global.Terms.lbl_repeat_term : ""}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.goToSentence(this.state.listenPassiveIndex)}
                activeOpacity={0.8}
                style={styles.bottomOptionSecond}>
                <Image
                  source={images.headphones}
                  style={[
                    styles.bottomIcon,
                    {
                      tintColor:
                        this.state.currentTab === 'second'
                          ? colors.code_black
                          : 'rgb(171,171,171)',
                    },
                  ]}
                  resizeMode={'cover'}
                />
                <View
                  style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.bottomOptionFirstTxt,
                      {
                        color:
                          this.state.currentTab === 'second'
                            ? colors.code_black
                            : 'rgb(171,171,171)',
                      },
                    ]}>
                    {appString ? appString.lbl_listen_passively : global.Terms ? global.Terms.lbl_listen_passively : ""}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: width * (40 / 375),
                borderTopWidth: 0.5,
                borderTopColor: '#C0C0C0',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: width * (50 / 375),
                  width: width * (50 / 375),
                }}
                onPress={() => {
                  this.state?.toggle == false
                    ? this.setState({toggle: true})
                    : this.state?.toggle == true
                    ? this.setState({toggle: false})
                    : null;
                }}>
                <Image
                  style={{
                    width: width * (25 / 375),
                    height: width * (19 / 375),
                    marginTop: width * (8 / 375),
                    marginLeft: width * (8 / 375),
                  }}
                  source={images.menuImg}
                />
              </TouchableOpacity>
            </View>
            {this.state.toggle && (
              <View style={styles.topView}>
                <TouchableOpacity
                  onPress={() => {
                    this.onTabClick(1);
                  }}
                  style={[styles.touchView,{opacity : 0.5 } ]}>
                  <Image
                    source={require('../../../assets/images/SubscriptionNav/lesson_overview_black.png')}
                    style={styles.imgBlue}
                  />
                  <Text
                    style={styles.textBlue}>
                    {appString ? appString.lbl_lesson_overview : global.Terms ? global.Terms.lbl_lesson_overview : ""}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.onTabClick(2);
                  }}
                  style={[styles.touchView,{opacity: 0.5} ]}>
                  <Image
                    source={require('../../../assets/images/SubscriptionNav/settings_black.png')}
                    style={styles.imgBlue}
                  />
                  <Text
                    style={styles.textBlue}>
                    {appString ? appString.lbl_Settings : global.Terms ? global.Terms.lbl_Settings : ""}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.onTabClick(3);
                  }}
                  style={[styles.touchView, {opacity:  1 }]}>
                  <Image
                    source={require('../../../assets/images/SubscriptionNav/downloads_black.png')}
                    style={styles.imgBlue}
                  />
                  <Text
                    style={styles.textBlue}>
                    {appString ? appString.lbl_downloads : global.Terms ? global.Terms.lbl_downloads : ""}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    getAppString: state.appLanguage.getAppString,
    lessonDetails: state.lessonSentence.lessonDetails,
    isConnected: state.isNetConnected.isConnected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLession: data => {
      dispatch(lessonAction(data));
    },
    saveHistory: (data, type, familyName) => {
      dispatch(saveHistoryAction(data, type, familyName));
    },
    setVisibility:(visible) => {
      dispatch(setVisible(visible))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LessonSentence);
