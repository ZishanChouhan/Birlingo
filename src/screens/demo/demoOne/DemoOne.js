import React, {Component} from 'react';
import {
  AppState,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  BackHandler,
  Dimensions,
  StatusBar,
  PermissionsAndroid,
  SafeAreaView,
  Platform,
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
import {demoAction, saveHistoryAction} from './actions';
import NetInfo from '@react-native-community/netinfo';
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
import font from '../../../Theme/font';
import KeepAwake from 'react-native-keep-awake';
import CallDetectorManager from 'react-native-call-detection';
import LinearGradient from 'react-native-linear-gradient';
import hasNotch from '../../../components/container/Deviceinfo';
var RNFS = require('react-native-fs');
import * as Progress from 'react-native-progress';
import { CommonActions } from '@react-navigation/native';
import { showDangerToast } from '../../../assets/utility/ToastMessage';
import { doPost } from '../../../actions/fetchApiActions';
import { apiUrls } from '../../../api/constants/constants';

const {width} = Dimensions.get('window');
const {AudioServiceModule} = NativeModules;

var goBackIndex;
var lastRepeatIndex = null;

class DemoOne extends Component {

  constructor(props) {
    super(props);
    this.sentanceLoopIndex = -1;

    this.state = {
      tabState:'',
      listenPassiveIndex: 0,
      speakIndex: 0,
      navType: '',
      appState: AppState.currentState,
      appString: '',
      timeSound: 0,
      multiRunning: false,
      currentIndex: 1,
      currentTab: 'first',
      songLoopIndex: 0,
      songType: 'solo',
      lessions: [],
      isApi: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLoading: false,
      activeIndex: 0,
      lessonProgress: 0,
      sentenceListIndex: 0,
      dataStates: '',
      tabNum: 1,
      systemSetting: '',
      repeatData: [],
      toggle: false,
      ItemSong: [],
      familyName: this.props?.route?.params?.familyName,
      levelId: this.props?.route?.params?.levelId,
      active_Text: global.active,
      loopRunning: false,
      backgroundActiveTime: 0,
      backgroundInactiveTime: 0,
      learnLang:"",
      historyData: {
        active: {indexArray: [], total: 0, max: 0},
        passive: {indexArray: [], total: 0, max: 0},
        speak: {indexArray: [], total: 0, max: 0},
        repeat: {indexArray: [], total: 0, max: 0},
        current: 1,
      },
      screenFrom: this.props.route.params.screenFrom,
      demoDetails: this.props?.route?.params?.demoDetails,
      // isFirst: this.props?.route?.params?.isFirst,
      passiveTimeloop: 0
    };
  }

  async componentDidMount() {
    try{
      this._sub1 = this.props.navigation.addListener('focus', () => {
        if (this.props?.getAppString?.data !== this.state.appString) {
          this.setState({appString: this.props.getAppString.data});
        }
        this.viewWillAppear()
        this.backSubscribtion = BackHandler.addEventListener("hardwareBackPress", this.goBack)
        global.appStateDemo = AppState.addEventListener('change', this._handleAppStateChange);
        this.handleInternetConnectivity();
        this.startListenerTapped();
        this.changeKeepAwake(true);
      });

      this._sub2 = this.props.navigation.addListener('blur', () => {
        this.backSubscribtion?.remove();
      });

      this.sentanceLoopIndex = -1;

    }catch(err){
      console.log(err);
    }
  }

  async componentWillUnmount() { 
    console.log("global.appStateDemo", global.appStateDemo);
    if(this.newEvent){
      this.newEvent.remove()
    }
    if(this.eventListener){
      this.eventListener.remove()
    }
    this.setState({multiRunning: false, loopRunning: false})
    this.changeKeepAwake(false);
    if(global.appStateDemo){
      global.appStateDemo.remove()
    }
    this.unsubscribe();
    this.stopListenerTapped();
  }

  viewWillAppear() { 
    Sound.setCategory('Playback');
    this.setState({isLoading : true})
    AsyncStorage.getItem('authUser', (err1, item1) => {
      if (item1 != null) {
        var userDetails = JSON.parse(item1); 
        AsyncStorage.getItem('learning_language_id', (err2, item2) => {
          if (item2 != null) {
            var language_id = JSON.parse(item2);
            this.setState({learnLang:JSON.parse(item2)});

            const data = {
              lesson_id: this.props?.route?.params?.demoDetails?.lesson_id,
              language_id: userDetails.language_id,
              learning_language_id: language_id,
              user_id: userDetails._id,
            }; 
            // this.props.getDemoLession(data);
            doPost(`${apiUrls.app_demo}`, data).then(async res => {
              console.log("res", res);
              if(res.success){
                const soundData = [];
                const repeatDataArray = [];
                let index = 0;
                var store_path = RNFS.ExternalDirectoryPath;
                if (Platform.OS === 'ios') {
                  store_path = RNFS.DocumentDirectoryPath;
                }
                var alpha = store_path + '/cureentAudio' + `/${this.state.demoDetails.lesson_id}`;
                RNFS.stat(alpha).then(stats => {
                    console.log('stats===', stats);
                  }).catch(err => {
                    console.log('stats===err', err);
                  });
                RNFS.unlink(alpha);
                RNFS.mkdir( store_path + '/cureentAudio' + `/${this.state.demoDetails.lesson_id}` );
                store_path = store_path + '/cureentAudio' + `/${this.state.demoDetails.lesson_id}`;
                RNFS.readDir(store_path).then(async result => {
                  console.log('result', result)
                  for(let i =0; i< res?.data.demo.length; i++){
                    // console.log("hi");
                    if(res.data.demo[i].sound){
                      let audioPath = store_path + '/' + i + 'audio.mp3';
                      const soundPath = await this.downloadFile(res.data.demo[i].base64, audioPath);
                      const sound = await this.loadSound(soundPath);
                      // console.log("sound", sound);
                      soundData.push({soundFile: sound, index:index})
                      res.data.demo[i].soundFile = sound
                      index++;
                    }
                    if(res.data.demo[i].type == "slow_song_with_sentence"){
                      this.setState({speakIndex: i-1});
                    }
                    if (res.data.demo[i].type == 'sentenceList') {
                      this.setState({sentenceListIndex: i});
                    }
                    if (res.data.demo[i].type == 'songLoop') {
                      this.setState({listenPassiveIndex: i});
                    }
                    if (res.data.demo[i].state == 'repeat') {
                      repeatDataArray.push(res.data.demo[i])
                    }
                  }
                }).catch(err => console.log('err', err))
                
                this.secondsToTime(res?.data?.progress?.time_loop);
                var SongDataArr = [];
                res.data.demo.map((songData, index) => { 
                  if (songData.type == 'song') {
                    var MsongList = songData;

                    MsongList.index = index;

                    SongDataArr.push(MsongList);
                  }
                }); 

                // this.setState({ItemSong: SongDataArr});
                this.setState({
                  lessions: res?.data.demo,
                  ItemSong: SongDataArr,
                  dataStates: res?.data.stateCount,
                  soundData: soundData,
                  repeatData: repeatDataArray,
                  lessonProgress: res?.data?.progress,
                  passiveTimeloop: res?.data?.progress?.time_loop,
                  historyData: {
                    active: {
                      indexArray:
                      res?.data?.progress?.active_indexArray != 0
                          ? res?.data?.progress?.active_indexArray
                          : [0],
                      total: res?.data?.stateCount?.active,
                      max: res?.data?.progress?.active_read,
                    },
                    passive: {
                      indexArray:
                      res?.data?.progress?.passive_indexArray != 0
                          ? res?.data?.progress?.passive_indexArray
                          : [],
                      total: res?.data?.stateCount?.passive,
                      max: res?.data?.progress?.passive_read,
                    },
                    speak: {
                      indexArray:
                      res?.data?.progress?.speak_indexArray != 0 ? res?.data?.progress?.speak_indexArray : [],
                      total: res?.data?.stateCount?.speak,
                      max: res?.data?.progress?.speak_read,
                    },
                    repeat: {
                      indexArray:
                      res?.data?.progress?.repeat_indexArray != 0 ? res?.data?.progress?.repeat_indexArray : [],
                      total: res?.data?.stateCount?.repeat,
                      max: res?.data?.progress?.repeat_read,
                    },
                    current: res?.data?.progress?.current,
                  },
                });
                
                if (this.state.lessonProgress.current > 1) {
                  if (this.state.lessions.length != this.state.lessonProgress.current) {
                    setTimeout(() => {
                      this.goToSentence(this.state.lessonProgress.current - 1);
                    }, 10);
                  } else {
                    setTimeout(() => {
                      this.goToSentence(0);
                    }, 10);
                  }
                } else {
                  this.setState({isLoading: false});
                }
              }
            }).catch(err => console.log('err', err))
          }
        });
      }
    });
    
    AsyncStorage.getItem('system_setting', (err1, item1) => {
      if (item1 != null) {
        var systemSetting = JSON.parse(item1);
        this.setState({systemSetting: systemSetting});
      }
    });
  }

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
    this.unsubscribe = NetInfo.addEventListener(async state => { 
      if (state.isConnected != true) {
        AudioServiceModule.stopSound();
        this.input.onButtonStop(4)
        this.setState({multiRunning: false, loopRunning: false});
        if(this.newEvent){
          this.newEvent.remove()
        }
        if(this.eventListener){
          this.eventListener.remove()
        }
        if (this.state.lessions.length > 0) {
          let array = this.state.lessions;
          for(let i=0; i < array.length; i++){
            if (array[i] && array[i].toggle) {
              array[i].toggle = 'pause';
            }
          }
          this.setState({lessions: array});
        }
      }
    });
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
    }
  }
  stopListenerTapped() {
    this.callDetector && this.callDetector.dispose();
  }

  callDetectorHandler(){
    this.callDetector = new CallDetectorManager(
      (event, phoneNumber) => {
        if (event === 'Disconnected') {
          // console.log('Disconnected');
        } else if (event === 'Connected') {
          // console.log('Connected');
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
    console.log("nextAppState", nextAppState);
    console.log('this.state.songType', this.state.songType );
    this.sentanceLoopIndex= -1
    if (this.state.lessions.length > 0) {
      if(this.state.songType == 'soloLoop'){

      }else{
        AudioServiceModule.stopSound();
      }
      if(this.newEvent){
        this.newEvent.remove()
      }
      if(this.eventListener){
        this.eventListener.remove()
      }

      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        let time = moment(new Date()).format('hh:mm:ss'); 
        this.setState({backgroundInactiveTime: time});
        var startTime = moment(this.state.backgroundActiveTime, 'HH:mm:ss a');
        var endTime = moment(this.state.backgroundInactiveTime, 'HH:mm:ss a');

        var duration = moment.duration(endTime.diff(startTime)); 
        // newTime = duration.asSeconds();
        
      } else {
        const historyData = {
          lesson_id: this.state.demoDetails.lesson_id,
          lessonfamily_id: this.state.demoDetails.lessonfamily_id,
          total: this.state.dataStates[this.state.activeState],
          current: this.state.historyData.current,
          is_demo: 1,
          time_loop: this.state.passiveTimeloop,
          active: this.state.historyData.active,
          passive: this.state.historyData.passive,
          speak: this.state.historyData.speak,
          repeat: this.state.historyData.repeat,
          level_id: 1,
          learning_language_id: this.state.learnLang,
        }; 
        console.log("historyData", historyData);
        this.props.saveHistory(historyData, this.state.navType); 
        let array = this.state.lessions;
        for(let i=0; i < array.length; i++){
          if (array[i] && array[i].toggle) {
            array[i].toggle = 'pause';
          }
        }
        this.setState({lessions: array, appState: nextAppState, multiRunning: false});
      }
    }
  };

  secondsToTime = sec => {
    var hours = Math?.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = '00');
    var min = Math?.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = '00');
    sec < 1 ? (sec = '00') : void 0;

    min?.toString().length == 1 ? (min = '0' + min) : void 0;
    sec?.toString().length == 1 ? (sec = '0' + sec) : void 0;
    
    this.setState({hours: hours, minutes: min, seconds: sec});
  };
  timerValue = timeTotal => {
    console.log("ndfjkdfdkjfhkdjfh");
    let tt = timeTotal.split(':');
    let totalSec = tt[0] * 3600 + tt[1] * 60 + tt[2] * 1;
    this.setState({passiveTimeloop : totalSec})
  };

  Langsam = async (i, item) => { 
    var data = global.active == 'Langsam' ? 'Normal' : 'Langsam';
    global.active = data;
    this.setState({active_Text: data}); 
    await AsyncStorage.setItem('appLanguage', JSON.stringify(data));
    this.pauseActive(i)
  };

  Langsam_beta = async (i, item) => { 
    var data = global.active == 'Langsam' ? 'Normal' : 'Langsam';
    global.active = data;
    this.setState({active_Text: data, loopRunning: false});
    this.input.onButtonPause();
    await AsyncStorage.setItem('appLanguage', JSON.stringify(data));
    this.pauseSoundLoop();
  };

  Langsam_speak = async (i) => {
    var data = global.active == 'Langsam' ? 'Normal' : 'Langsam';
    global.active = data;
    this.setState({ active_Text: data});
    await AsyncStorage.setItem('appLanguage', JSON.stringify(data));
    this.setState({multiRunning: false, songIndex: -1});
    this.pauseSpeakSound();
  }

  playActive = (item , index) => {
    global.demoActiveIndex = index;
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

  pauseActive = (index) =>{
    let array = this.state.lessions;
    if (array[index] && array[index].toggle) { 
      array[index].toggle = 'pause';
    }
    this.setState({lessions: array, songType: 'solo'});
    AudioServiceModule.pauseActiveSound();
  }

  _getSelectSongIndexLoop = (index, item,) => {
    this.sentanceLoopIndex = index;
    AudioServiceModule.stopSound();
    this.sentance_loop1(index, item);
  };

  sentance_loop1 = async (index, item,) => {
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
      } 
      else if(Platform.OS == "ios"){
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
  }

  playSoundLoop = async (index, item,) => {
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

  pauseSoundLoop = async () => {
    this.setState({loopRunning: false})
    this.input.onButtonPause();
    AudioServiceModule.pauseLoop();
  };

  saveLessonHistory = async (type) => { 
    this.setState({multiRunning: false})
    if (this.state.lessions.length > 0) {
      const historyData = {
        lesson_id: this.state.demoDetails.lesson_id,
        lessonfamily_id: this.state.demoDetails.lessonfamily_id,
        total: this.state.dataStates[this.state.activeState],
        current: this.state.historyData.current,
        is_demo: 1,
        time_loop: this.state.passiveTimeloop,
        active: this.state.historyData.active,
        passive: this.state.historyData.passive,
        speak: this.state.historyData.speak,
        repeat: this.state.historyData.repeat,
        level_id: 1,
        learning_language_id: this.state.learnLang,
      }; 
      console.log('historyData',historyData)
      // this.props.saveHistory(historyData, this.state.navType);
      doPost(`${apiUrls.saveLessonHistory}`, historyData).then(async res => {
        console.log('getLessonSentences =>', res);
        if(res.success){

          if(type == 1){
            this.props.navigation.replace("LessonOverviewChoose");
          } 
          else if(type == 2){
            this.props.navigation.replace("LessonOverviewChoose");
          }else if(type == 3){
            this.props.navigation.replace("LessonOverviewDownload",{ lessonfamily_id: this.state.demoDetails.lessonfamily_id, familyName : this.state.familyName, level_id: this.state.levelId })
          }else if(type == 4){

          }
          else if(this.state.screenFrom == "Dashboard"){
            this.props.navigation.replace("LessonOverviewDownload", { lessonfamily_id: this.state.demoDetails.lessonfamily_id, familyName : this.state.familyName, level_id: this.state.levelId })
          }else{
            this.props.navigation.goBack();
          }
        }else{
          showDangerToast("Something went Wrong")
        }
      }).catch(err => console.log(err))
    } 
  };

  goBack = async index => { 
    console.log("start.");
    AudioServiceModule.stopSound();
    this.input.onButtonStop();
    this.setState({isLoading: true,});
    var store_path = RNFS.ExternalDirectoryPath;
    if (Platform.OS === 'ios') {
      store_path = RNFS.DocumentDirectoryPath;
    }
    var path = store_path + '/cureentAudio';

    return (
      RNFS.unlink(path)
        .then(() => { 

          if (this.state.lessions.length > 0) {
            if(index){
              let array = this.state.lessions;
              if (array[index] && array[index].toggle) {
                array[index].toggle = 'pause';
              }
              this.setState({lessions: array});
            }
          }
          this.setState({timeSound: 0, isLoading: false});
            if(this.state.lessions.length > 0){
              this.saveLessonHistory();
              
            }else{
              this.props.navigation.goBack()
            }
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch(err => {
          console.log(err.message);
        })
    );
  };

  onTabClick(num, index) {
    if(this.newEvent){
      this.newEvent.remove()
    }
    if(this.eventListener){
      this.eventListener.remove()
    }
    this.setState({tabNum: num, toggle: false, isLoading: true, timeSound: 0,})
    if (this.state.lessions.length > 0) {
      let array = this.state.lessions;
      if (array[index] && array[index].toggle) {
        array[index].toggle = 'pause';
      }
      this.setState({lessions: array, multiRunning: false, loopRunning: false});
    };
    AudioServiceModule.stopSound();
    if (num == 1) {
      if (this.state.lessions.length > 0) {
        this.input.onButtonStop();
        this.saveLessonHistory(1);
      }
    } else if (num == 2) {
      if (this.state.lessions.length > 0) {
        this.input.onButtonStop();
        this.saveLessonHistory();
      }
      this.props.navigation.dispatch(state => {
        const newState = state.routes.filter(item => item.name == "LessonOverviewChoose")
        return CommonActions.reset({
          ...newState,
          index: 0,
          routes: [
            { name: 'Settings' },
          ],
        })
      });
    } else if (num == 3) {
      if (this.state.lessions.length > 0) {
        this.input.onButtonStop();
        this.saveLessonHistory();
      }
      this.props.navigation.dispatch(state => {
        const newState = state.routes.filter(item => item.name == "LessonOverviewChoose")
        return CommonActions.reset({
          ...newState,
          index: 0,
          routes: [
            { name: 'Downloads' },
          ],
        })
      });
    }
  }

  goToLesson = () => {
    this.saveLessonHistory(2);
  };

  goTolessonDownload = () => {
    this.saveLessonHistory(3);
  };

  goToSentence = index => {
    console.log("index", index);
    this.AppIntroSlider.goToSlide(index);
    this.setState({isLoading: false}, () => {
      this.onSlideChange(index, null, null);
      this.setState({currentIndex: index + 1,});
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

  onSlideChange = (index, lastindex, item) => {
    const array1 = this.state.lessions;
    if(index == 0){

    }else{
      if (array1[index - 1].toggle) {
        array1[index - 1].toggle = 'pause';
        this.setState({lessions: array1});
      }
    }
    this.setState({activeIndex: index + 1, isLoading: false});
    clearInterval(this.interval1);
    this.input.onButtonPause();
    this.sentanceLoopIndex = -1;

    if (this.state.currentIndex <= index) {
      this.setState({currentIndex: index}, () => {
        this.checkCurrentTab(
          this.state.lessions[index].type,
          index,
          this.state.lessions[index].state,
        );
      });
    } else {
      this.setState({currentIndex: this.state.currentIndex - 1}, () => {
        this.checkCurrentTab(
          this.state.lessions[index].type,
          index,
          this.state.lessions[index].state,
        );
      });
    }

    let array = this.state.lessions;
    this.setState({selected: array[index] && array[index].tab});
    if (array[index] && array[index].toggle) {
      array[index].toggle = 'pause';
    }
    this.setState({lessions: array});
  };

  checkCurrentTab = async (type, index, state) => {
    try{
      if(this.newEvent){
        this.newEvent.remove()
      }
      if(this.eventListener){
        this.eventListener.remove()
      }
      AudioServiceModule.stopSound();
      this.setState({
        tabState:state,
        multiRunning: false,
        songIndex: -1,
        loopRunning: false
      })

      const array = this.state.lessions;
      
      if (array[global.demoActiveIndex] && array[global.demoActiveIndex].toggle) {
        array[global.demoActiveIndex].toggle = 'pause';
      }
      if (array[lastRepeatIndex] && array[lastRepeatIndex].toggle) {
        array[lastRepeatIndex].toggle = 'pause';
      }
      this.setState({activeState: state, lessions: array});

      console.log('tabState',this.state.tabState,)
      if (state != 'repeat') {
        this.historyAdd(state, index);
      }
      
      if (type == 'title' && state == 'final') {
        this.setState({currentTab: 'four', });
      } else if (type == 'title' && state == 'repeat') {
        this.setState({currentTab: 'four', });
        if (this.state.repeatData.length == 3) {
          this.state.historyData['repeat'].total = this.state.repeatData.length;
          this.state.historyData['repeat'].max = this.state.repeatData.length;
          this.state.historyData['repeat'].indexArray = this.state.repeatData;
        }
      } else if (type == 'sentenceList') {
        this.setState({currentTab: 'four',});
        if (this.state.repeatData.length == 3) {
          this.state.historyData['repeat'].total = this.state.repeatData.length;
          this.state.historyData['repeat'].max = this.state.repeatData.length;
          this.state.historyData['repeat'].indexArray = this.state.repeatData;
        }
      } else if (type == 'songLoop') {
        this.setState({
          currentTab: 'second',
          songLoopIndex: index,
        });
      } else if (
        type == 'song_with_sentance' ||
        type == 'slow_song_with_sentence'
      ) {
        this.setState({currentTab: 'third', });
      } else if (type == 'title' && state == 'passive') {
        this.setState({currentTab: 'second',});
      } else {
        this.setState({currentTab: 'first', }, () => {
          if (index == this.state.songLoopIndex + 1 && index != 1) {
            this.setState({currentTab: 'third', });
          }
        });
      }
      // this.setState({isFirst: false});
    }catch(err){
      console.log('err', err);
    }
  };

  _renderItem = ({item, index}) => { 
    return (
      <View style={styles.slides} key={index}>
        {item.type == 'title'
          ? this._renderShowMessage(item, index)
          : item.type == 'imagination'
          ? this._renderImagination(item, index)
          : item.type == 'song'
          ? this._renderSong(item, index)
          : item.type == 'repeat'
          ? this._renderRepeat(item, index)
          : item.type == 'songLoop'
          ? this._renderSongLoop(item, index)
          : item.type == 'slow_song_with_sentence'
          ? this._renderSlowSongSentanceStep(item, index)
          : item.type == 'sentenceList'
          ? this._renderSentenceList(item, index)
          : null
          }
      </View>
    );
  };

  _renderShowMessage = (item, index) => { 
    let bgColor = '';
    goBackIndex = index;
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
      <View style={{flex: 1}}>
        {this.state.lessions.length == 0 ? (
          <CustomInstruction
            position={'flex-start'}
            appString={this.state.appString}
            item={item}
            index={index}
            lessonID={this.state.lessions[0] && this.state.lessions[0].lessonID}
            title={item.lessonID}
            onExit={() => this.goBack(index)}
          />
        ) : (
          <LinearGradient colors={bgColor} style={{flex: 1}}>
            <View
              style={{
                backgroundColor: bgColor,
              }}>
              <View style={styles.statusBarContainer_1}>
                <TouchableOpacity
                  onPress={() => this.goBack(index)}
                  activeOpacity={0.8}
                  style={styles.closeView}>
                  <Image
                    source={require('../../../assets/images/arrow/close_icon/close3x.png')}
                    style={styles.closeImg_1}
                  />
                </TouchableOpacity>
                <View style={styles.headingView}>
                  <Text style={styles.headingText_1}>
                    {this.state?.appString[item.lessonID]}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.arrowDownView}
                />
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgb(255,255,255)',
                  marginHorizontal: 15,
                }}
              />
            </View>
            <View style={styles.instructionSet}>
              <Text style={styles.heading_text}>
                {item?.title
                  ? item?.title
                  : this.state?.appString[item.heading]}
              </Text>
            </View>
            {index == 0 ? (
              <View
                style={{
                  marginTop: 50,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Image source={images.fingerSwipe} />
              </View>
            ) : null}
            {item.button === true ? (
              <View
                style={{
                  marginBottom: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <BlueButton
                  title={this.state.appString.lbl_to_lesson}
                  onClick={() => this.goToLesson()}
                  blackColor="black"
                />

                {this.state.systemSetting != 0 ? (
                  <BlueButton
                    blackColor={colors.maroon}
                    title={this.state?.appString?.lbl_free_trail}
                    onClick={() => this.goTolessonDownload()}
                  />
                ) : null}
              </View>
            ) : null}
          </LinearGradient>
        )}
      </View>
    );
  };

  _renderImagination = (item, index) => {
    goBackIndex = index;
    return (
      <LinearGradient colors={colors.backGround} style={styles.container}>
        <HeadingNav
          bgColor={this.state.currentIndex > 1 ? true : colors.backGround[0]}
          lessonID={this.state.appString[item.lessonID]}
          onExit={() => this.goBack(index)}
          currentIndex={this.state.currentIndex - 1}
          totalIndex={this.state.lessions.length}
          onScreen={'demo'}
          title={this.state.lessions}
          navigation={this.props.navigation}
        />
        <View style={styles.formContainer}>
          <View style={styles.instructionView}>
            <Image source={images.imaginationImg} style={styles.imagineImg} />
            <View style={styles.instructionText}>
              <BodyDescription subTitle={this.state?.appString[item.heading]} />
            </View>
          </View>

          <View style={styles.imageSentence}>
            <Text style={styles.imagin_text}>{item?.sentence}</Text>
          </View>
        </View>
      </LinearGradient>
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
            <View style={styles.sentance_view_1}>
              <Text style={styles.latin_text}>{data?.sentence3}</Text>
            </View>
          ) : null}

          <Text style={styles.listen_sub_sentance_text}>{data?.sentence2}</Text>
        </View>
      );
    });
    return (
      <View style={styles.container}>
        <HeadingNav
          bgColor={colors.backGround[0]}
          lessonID={this.state.appString[item.lessonID]}
          onExit={(i) => this.goBack(index)}
          totalIndex={this.state.lessions.length}
          currentIndex={this.state.currentIndex - 1}
          navigation={this.props.navigation}
          title={this.state?.lessions}
         
        />
        <View style={styles.formContainer}>
          <View style={styles.instructionView}>
            <View>
              <Image source={images.iconListen} style={styles.earImg} />
            </View>
            <View style={styles.instructionText}>
              <BodyDescription subTitle={this.state?.appString[item.heading]} />
            </View>
          </View>
          <View
            style={{
              flex: 0.85,
              marginTop: 30,
              paddingBottom: 45,
              borderRadius: 10,
              backgroundColor: 'rgba(255,255,255,0.2)',
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
                // +(this.state?.timeSound / item?.sound?.getDuration()) * 100
              // }
              radius={40}
              borderWidth={2}
              color="#c3d6eb"
              shadowColor="#c3d6eb"
              bgColor="#fff">
              <View>
                {item?.toggle != undefined && item?.toggle == 'pause' ? (
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      this.playActive(item, index)}
                    }
                    >
                    <Image source={images.playIcon} style={styles.playIcon} />
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
                bottom: Platform.OS == 'ios' ? 50 : 50,
                left: 100,
                paddingVertical: 4,
                paddingHorizontal: 10,
              }}
              onPress={() => this.Langsam(index, item.sound)}>
              <Text style={{color: colors.code_fff, fontSize:Dimensions.get('window').width > 670 ?22:12}}>
                {this.state?.active_Text}
                
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  _renderRepeat = (item, index) => {
    goBackIndex = index;
    let sentence1 = item.sentence1.trim().split(' ');
    let sentence2 =
      item.sentence2 && item.sentence2.trim()
        ? item.sentence2.trim().split(' ')
        : '';
    let sentence3 =
      item.latin_sentence && item.latin_sentence.trim()
        ? item.latin_sentence.trim().split(' ')
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
          <Text style={styles.sentance_text_listen}>{data.sentence1}</Text>
          {sentence3 != '' ? (
            <View style={styles.sentance_view_1}>
              <Text style={styles.latin_text}>{data?.sentence3}</Text>
            </View>
          ) : null}

          <Text style={styles.listen_sub_sentance_text}>{data?.sentence2}</Text>
        </View>
      );
    });
    return (
      <View style={styles.container}>
        <HeadingNav
          bgColor={colors.backGround[0]}
          lessonID={this.state.appString[item.lessonID]}
          onExit={() => this.goBack(index)}
          totalIndex={this.state.lessions.length}
          currentIndex={this.state.currentIndex - 1}
          navigation={this.props.navigation}
          title={this.state.lessions}
        />
        <View style={styles.formContainer}>
          <View style={styles.instructionView}>
            <Image source={images.iconRepeat} style={styles.imagineImg} />
            <View style={styles.instructionText}>
              <BodyDescription subTitle={this.state?.appString[item.heading]} />
            </View>
          </View>

          <View style={{flex: 0.85, marginTop: 30}}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 10,
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
      </View>
    );
  };

  _renderSongLoop = (item, i) => {
    goBackIndex = i;

    return (
      <LinearGradient colors={colors.loopBack} style={{flex: 1}}>
        <HeadingNav
          bgColor={colors.loopBack[0]}
          lessonID={this.state.appString[item.lessonID]}
          onExit={() => this.goBack(i)}
          totalIndex={this.state.lessions.length}
          currentIndex={this.state.currentIndex - 1}
          navigation={this.props.navigation}
          title={this.state?.lessions}
        />
        <View style={styles.fifth_formContainer}>
          <View style={styles.instructionView}>
            <View style={styles.instructionText}>
              <BodyDescription subTitle={this.state?.appString[item.heading]} />
            </View>
          </View>
        </View>
        <View style={{flex: 0.5}}>
          <View style={{flex: 0.8}}>
            
            <StopWatch
              _hour={this.state?.hours}
              _minutes={this.state?.minutes}
              _seconds={this.state?.seconds}
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
                ) : (
                  <TouchableOpacity
                    style={{}}
                    onPress={() => this.pauseSoundLoop(i, item.data)}>
                    <Image source={images.pauseIcon} />
                  </TouchableOpacity>
                ) }
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
        <LinearGradient colors={colors.speechBack} style={{flex: 1}}>
          <HeadingNav
            bgColor={colors.speechBack[0]}
            lessonID={this.state.appString[item.lessonID]}
            onExit={() => this.goBack(index)}
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
                  subTitle={this.state?.appString[item.heading]}
                />
              </View>
            </View>
            <View style={styles.list_view}>
              <FlatList
                contentContainerStyle={{
                  flexGrow: 1,
                  marginTop: 20,
                  paddingBottom: 100,
                }}
                ref={ref => (this.slowFlastlist = ref)}
                showsVerticalScrollIndicator={false}
                persistentScrollbar={true}
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
                    if ( index ==  this.state.songIndex) {
                      // console.log("in 1");
                      return (
                        <View>
                          <TouchableOpacity
                            opacity={1}
                            style={styles.sentance_view_1}
                            onPress={() => this._getSelectSongIndexLoop(index, item, )
                            }>
                            <Text style={styles.sentance_text_1}>
                              {data.sentence1}
                            </Text>
                          </TouchableOpacity>
                          {sentence3 != '' ? (
                            <TouchableOpacity
                              opacity={1}
                              style={styles.sentance_view_1}
                              onPress={() => this._getSelectSongIndexLoop( index, item )
                              }>
                              <Text style={styles.loop_sub_sentance_text}>
                                {data?.sentence3}
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      );
                    } else {
                      // console.log("in 2");
                      return (
                        <View>
                          <TouchableOpacity
                            opacity={1}
                            hitSlop={{top: 100, left: 200, right: 200, bottom: 100}}
                            pressRetentionOffset={200}
                            style={styles.sentance_view_1}
                            onPress={() => this._getSelectSongIndexLoop( index, item )
                            }>
                            <Text style={styles.sentance_loop_text}>
                              {data?.sentence1}
                            </Text>
                          </TouchableOpacity>
                          {sentence3 != '' ? (
                            <TouchableOpacity
                              opacity={1}
                              hitSlop={{top: 100, left: 200, right: 200, bottom: 100}}
                              pressRetentionOffset={200}
                              style={styles.sentance_view_1}
                              onPress={() => this._getSelectSongIndexLoop( index, item)
                              }>
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
                    <ScrollView style={{marginHorizontal: 20}}>
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
                  {this.state.multiRunning == false ? (
                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        this.sentance_loop1(index, item)
                      }}>
                      <Image source={images.playIcon} style={styles.playIcon} />
                    </TouchableOpacity>
                  ) : null}
                  {this.state.multiRunning ? (
                    <TouchableOpacity
                      style={{padding: 10}}
                      onPress={() => this.pauseSpeakSound()}>
                      <Image source={images.pauseIcon} />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </ProgressCircle>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.code_blk,
                 position:Dimensions.get('window').width > 670 ?'relative':null,
              top:Dimensions.get('window').width > 670 ?-55:null,
                  borderRadius: 5,
                  bottom: hasNotch
                    ? width * (50 / 375)
                    : Platform.OS == 'ios'
                    ? width * (50 / 375)
                    : width * (45 / 375),
                  left: 100,
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                }}
                onPress={() => this.Langsam_speak(index)}>
                <Text style={{color: colors.code_fff, fontSize:Dimensions.get('window').width > 670 ?22:12}}>
                  {this.state?.active_Text}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      );
  };

  _renderSentenceList = (item, index) => {
    var Item = '';
    return (
      <>
        <LinearGradient colors={colors.sentenceListBack} style={{flex: 1}}>
          <HeadingNav
            bgColor={colors.sentenceListBack[0]}
            lessonID={this.state.appString[item.lessonID]}
            onExit={() => this.goBack(index)}
            totalIndex={this.state.lessions.length}
            currentIndex={this.state.currentIndex - 1}
            navigation={this.props.navigation}
            title={this.state.lessions}
          />

          <View style={styles.instructionView}>
            <View style={styles.instructionText}>
              <BodyDescription subTitle={this.state?.appString[item.heading]} />
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

  _renderRepeation = (item, index) => {
    // console.log("i", item, index);
    let obj;
    {
      obj = item.sentence.split(' '); 
    }

    this.state.ItemSong.map((sng, index) => { 
      // console.log("sng",sng);
      if (item.index == sng.index) { 
        item.sound = sng.sound;
        item.toggle = sng.toggle;
        item.index = item.index - 1;
        item.soundFile = sng.soundFile;
      } else if (item.index == sng.index + 1) {
        item.sound = sng.sound;
        item.toggle = sng.toggle;
        item.soundFile = sng.soundFile;
      } else {
        if (item.index == sng.index - 1) { 
          item.sound = sng.sound;
          item.toggle = sng.toggle;
          item.soundFile = sng.soundFile;
        }
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
          {item.toggle != undefined && item?.toggle == 'pause' ? (
            <TouchableOpacity
              onPress={() => this.playRepeatSound(item, item.index + 1)}   
            >
              <Image
                source={images.playIcon}
                resizeMode={'contain'}
                style={[styles.playIcon]}
              />
            </TouchableOpacity>
          ) : null}
          {item.toggle != undefined && item?.toggle == 'play' ? (
            <TouchableOpacity
              style={{}}
              onPress={() => this.pauseRepeatSound(item.index + 1,)}>
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
                  paddingVertical: Platform.OS === 'ios' ? width * (10 / 375) : 0,
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

  render() { 
    console.log("this.state", this.state);
    const {appString} = this.state;
    return (
      <SafeAreaView style={{flex:1, marginBottom: hasNotch && Platform.OS == "ios" ? -22 : 0, backgroundColor: "#fff"}}>
         <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        <View style={{flex: 1}}>
          <Loader loading={this.state.isLoading} />
          <View style={{flex: 1}}>
            {this.state?.lessions?.length > 0 ? (
              <AppIntroSlider
                ref={ref => (this.AppIntroSlider = ref)}
                slides={this.state.lessions}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => `key` + index}
                onDone={this._onDone}
                onSkip={this._onSkip}
                screenName={'Demo'}
                btnStyle={'DemoStyle'}
                doneLabel={'Done'}
                nextLabel={'Next'}
                totalIndex={this.state.lessions.length}
                currentIndex={this.state.currentIndex}
                showSkipButton={false}
                showNextButton={true}
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
                      color: colors.code_fff,
                      fontFamily: font.type.Akkurat_Bold,
                    }}>
                    {appString.msg_no_demo_data}
                  </Text>
                ) : (
                  <Loader loading={false} />
                )}
              </LinearGradient>
            )}
          </View>
          {this.state.activeIndex > 1 ? (
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
                      this.state.dataStates &&
                      this.state.historyData['active'].indexArray.length /
                        this.state.dataStates.active
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
                      this.state.dataStates &&
                      this.state.historyData['speak'].indexArray.length /
                        this.state.dataStates.speak
                    }
                    width={width - (width * 285) / 375}
                    borderRadius={0}
                  />
                </View>
                <View style={{marginLeft: 5}} s>
                  <Progress.Bar
                    height={width * (7 / 375)}
                    color={colors.code_black}
                    unfilledColor="rgb(220, 220, 220)"
                    borderWidth={0}
                    progress={
                      this.state.dataStates &&
                      this.state.historyData['repeat'].indexArray.length /
                        this.state.dataStates.repeat
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
                  onPress={() => this.goToSentence(4)}
                  activeOpacity={0.8}
                  style={styles.bottomOptionFirst}>
                  <Image
                    source={images.eye}
                    style={[
                      styles.headphoneIcon,
                      {
                        tintColor:
                        this.state.tabState === 'active'
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
                          this.state.tabState === 'active'
                              ? colors.code_black
                              : 'rgb(171,171,171)',
                        },
                      ]}>
                      {appString && appString.lbl_hearActively}
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
                      styles.headphoneIcon,
                      {
                        tintColor:
                        this.state.tabState === 'speak'
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
                          this.state.tabState === 'speak'
                              ? colors.code_black
                              : 'rgb(171,171,171)',
                        },
                      ]}>
                      {appString && appString.lbl_speak}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.goToSentence(this.state.sentenceListIndex)
                  }
                  activeOpacity={0.8}
                  style={styles.bottomOptionThird}>
                  <Image
                    source={images.rotate}
                    style={[
                      styles.headphoneIcon,
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
                      {appString && appString.lbl_repeat_term}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.goToSentence(this.state.listenPassiveIndex)
                  }
                  activeOpacity={0.8}
                  style={styles.bottomOptionSecond}>
                  <Image
                    source={images.headphones}
                    style={[
                      styles.headphoneIcon,
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
                      {appString && appString.lbl_listen_passively}
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
                    this.state.toggle == false
                      ? this.setState({toggle: true})
                      : this.state.toggle == true
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
                      this.onTabClick(1, goBackIndex);
                    }}
                    style={styles.touchView}>
                    <Image
                      source={images.overView}
                      style={
                        this.state.tabNum == 1 ? styles.imgBlue : styles.img
                      }
                    />
                    <Text
                      style={
                        this.state.tabNum == 1 ? styles.textBlue : styles.text
                      }>
                      {appString.lbl_lesson_overview}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.onTabClick(2, goBackIndex);
                    }}
                    style={styles.touchView}>
                    <Image
                      source={images.settings}
                      style={
                        this.state.tabNum == 2 ? styles.imgBlue : styles.img
                      }
                    />
                    <Text
                      style={
                        this.state.tabNum == 2 ? styles.textBlue : styles.text
                      }>
                      {appString.lbl_Settings}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.onTabClick(3, goBackIndex);
                    }}
                    style={styles.touchView}>
                    <Image
                      source={images.download}
                      style={
                        this.state.tabNum == 3 ? styles.imgBlue : styles.img
                      }
                    />
                    <Text
                      style={
                        this.state.tabNum == 3 ? styles.textBlue : styles.text
                      }>
                      {appString.lbl_downloads}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : null}
        </View> 
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    getAppString: state.appLanguage.getAppString,
    demoLesson: state.demoLesson.demoLessonDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDemoLession: data => {
      dispatch(demoAction(data));
    },
    saveHistory: (data, navType) => {
      dispatch(saveHistoryAction(data, navType));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DemoOne);

const options = {
  container: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#000',
    marginLeft: 7,
  },
};