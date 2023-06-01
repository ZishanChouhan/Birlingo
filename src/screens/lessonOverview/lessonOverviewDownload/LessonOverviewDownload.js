import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {fonts, images} from '../../../Theme';
import {styles} from './styles';
//import * as Progress from 'react-native-progress';
import {getLessonLibraryAction} from '../actions';
const {width} = Dimensions.get('window');
import {colors} from '../../../Theme';
import font from '../../../Theme/font';
import {
  SubscribeModal,
  BottomTab,
  Loader,
  Progress,
  LevelView,
  NetMoadal,
} from '../../../components';
import {showToast, showDangerToast} from '../../../assets/utility/ToastMessage';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/container/Button';
import { apiUrls } from '../../../api/constants/constants'
import { doPost, doGet } from '../../../actions/fetchApiActions';
import AntDesign from "react-native-vector-icons/AntDesign";

var isDissbled = false;
var RNFS = require('react-native-fs');

class LessonOverviewDownload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageArr: [],
      appString: '',
      selected1: '',
      // selected2: '',
      lessonData: [],
      userId: '',
      visible: false,
      isApi: false,
      subscribeStatus: 0,
      isLoading: true,
      level: 'all',
      status: 'all',
      systemSetting: '',
      // netConnected: true,
      lessonfamily_id: this.props?.route?.params?.lessonfamily_id,
      lessonFamilyName: this.props?.route?.params?.familyName,
      level_id:  this.props?.route?.params?.levelId,
    };
  }

  componentDidMount() {
    // if (!this.state.level_id) {
      this._sub2 = this.props.navigation.addListener( 'focus', () => this.viewWillAppear() );
      // this.viewWillAppear();
    // }
  }

  // componentWillUnmount(){
  // }

  async viewWillAppear() {
    console.log("this.props", this.props);
    this.setState({isLoading: true});
    if (this.props?.getAppString?.data !== this.state.appString) {
      this.setState({ appString: this.props.getAppString.data });
    }
    AsyncStorage.getItem('subscriptionStatus', (err1, item1) => {
      if (item1 != null) {
        var subscribeStatus = JSON.parse(item1);
        console.log("subscribeStatus",subscribeStatus);
        this.setState({subscribeStatus: subscribeStatus.is_subsribed});
      }
   
      AsyncStorage.getItem('system_setting', (err1, item1) => {
        if (item1 != null) {
          var systemSetting = JSON.parse(item1);
          this.setState({systemSetting: systemSetting});
        }

        AsyncStorage.getItem('authUser', async (err1, item1) => {
          if (item1 != null) {
            var userDetails = JSON.parse(item1);
            this.setState({userId: userDetails._id});
          }

        const levelString = await AsyncStorage.getItem("filterHistory")
        const level = JSON.parse(levelString);
        console.log("level", level);
        if(level){
          if(level == "all"){
            this.setState({selected1: 1})
          }else{
            this.setState({selected1: level + 1})
          }
        }else{
          this.setState({selected1: 1})
        }
        const postData = {
          lessonfamily_id: this.props?.route?.params?.lessonfamily_id,
          level: level ? level : 'all',
          status: 'all',
        };
        console.log('postData====', postData);
        // showToast(JSON.stringify(postData))
        doPost(`${apiUrls.lesson_library}`, postData).then(res => {
          console.log("res.data.data from lesson", res);
          if (res?.data?.list != this.state.languageArr) {
            var filePath = RNFS.ExternalDirectoryPath;
            if (Platform.OS === 'ios') {
              filePath = RNFS.DocumentDirectoryPath;
            }
            let lessonList = [];
            AsyncStorage.getItem('authUser', (err1, item1) => {
              if (item1 != null) {
                var userDetails = JSON.parse(item1);

                let content_lessondata = RNFS.readDir(
                  filePath + '/birlingo/' + userDetails._id,
                )
                  .then(result => {
                    result.map(ele => {
                      RNFS.readFile(ele.path + '/info.json', 'utf8').then(
                        content_info => {
                          let data = JSON.parse(content_info);
                          lessonList.push(data._id);

                          let array = res.data.list.map(ele => {
                            if (lessonList.indexOf(ele._id) != -1) {
                              ele.downloaded = 1;
                            } else {
                              ele.downloaded = 0;
                            }
                            return ele;
                          });
                          this.setState({languageArr: array, isLoading: false});
                        },
                      );
                    });
                    let array = res.data.list.map(ele => {
                      ele.downloaded = 0;
                      return ele;
                    });
                    this.setState({languageArr: array, isLoading: false});
                  })
                  .catch(err => {
                    let array = res.data.list.map(ele => {
                      ele.downloaded = 0;
                      return ele;
                    });
                    this.setState({languageArr: array, isLoading: false});
                    console.log('catch ==>', err.message, err.code);
                  });
                }
              });
            }
          }).catch(error => console.log('error', error));

        });
      });
    });
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.props?.getAppString?.data !== this.state.appString ) {
  //     this.setState({
  //       appString: this.props.getAppString.data,
  //       selected1: this.state.level_id ? this.state.level_id + 1 : 1,
  //       selected2: 5,
  //     });
  //   }
  // }

  goToLesson = (item, index) => {
    console.log("item", item);
    if (item.is_demo == 1) {
      if (isDissbled) {
        return;
      }
      isDissbled = true;
      this.props.navigation.navigate('DemoOne', {
        demoDetails: item,
        isFirst: true,
        screenFrom: 'LessonOverviewDownload',
        familyName: this.props?.route?.params?.familyName,
        levelId : this.state.level_id
      });
      setTimeout(() => {
        isDissbled = false;
      }, 2000);
    } else if (item.is_free == 1) {
      if (isDissbled) {
        return;
      }
      isDissbled = true;
      this.props.navigation.navigate('LessonSentence', {
        lessonDetails: item,
        isFirst: true,
        familyName: this.props?.route?.params?.familyName,
      });
      setTimeout(() => {
        isDissbled = false;
      }, 2000);
    } else {
      if (this.state.subscribeStatus == 1) {
        if (isDissbled) {
          return;
        }
        isDissbled = true;
        this.props.navigation.navigate('LessonSentence', {
          lessonDetails: item,
          isFirst: true,
          familyName: this.props?.route?.params?.familyName,
        });
        setTimeout(() => {
          isDissbled = false;
        }, 2000);
      } else {
        this.setState({visible: true});
      }
    }
  };

  downloadFile = (from, to) => {
    // console.log("to => ", from, to)
    return new Promise(async (resolve, reject) => {
      try {
        await RNFS.downloadFile({
          fromUrl: from,
          toFile: to,
        }).promise;
        resolve(to);
      } catch (e) {
        reject(e);
      }
    });
  };

  downloadLesson = item => {
    console.log('in account screen function',item);
    this.setState({isLoading: true});

    if (this.state.subscribeStatus == 1 || item.is_free == 1) {
      const data = {
        lesson_id: item.lesson_id,
        baselesson_id: item.baselesson_id,
      };
      //this.props.getLession(data);
         console.log("downloadLesson data => 2", data);
      doPost(`${apiUrls.sentencesByLessonId}`, data).then(async  res => {
      // postService('sentencesByLessonId', data).then(async res => {
        console.log('res.data => 2', res);
        if(res.success){
          let array = res.data;
          var stateData = res.data.test;
          var progress = res.data.progress;
          let info = {
            _id: item._id,
            lesson_id: item.lesson_id,
            baselesson_id: item.baselesson_id,
            learning_language_id: res.data?.progress?.learning_language_id,
            title: item.title,
            lessonfamily_id: item.lessonfamily_id,
            progress: progress.current,
            stateData: res.data.test,
            max_read_slide: 1,
            current_percentage: 0,
            time_loop: res.data.progress.time_loop,
            level_id: item.level_id,
            active_progress: item.active_progress,
            speak_progress: item.speak_progress,
            repeat_progress: item.repeat_progress,
            passive_progress: item.passive_progress,
            historyData: {
              active: {
                indexArray:
                  progress.active_indexArray != 0
                    ? progress.active_indexArray
                    : [0],
                total: stateData.active,
                max: progress.active_read,
              },
              passive: {
                indexArray:
                  progress.passive_indexArray != 0
                    ? progress.passive_indexArray
                    : [],
                total: stateData.passive,
                max: progress.passive_read,
              },
              speak: {
                indexArray:
                  progress.speak_indexArray != 0 ? progress.speak_indexArray : [],
                total: stateData.speak,
                max: progress.speak_read,
              },
              repeat: {
                indexArray:
                  progress.repeat_indexArray != 0
                    ? progress.repeat_indexArray
                    : [],
                total: stateData.repeat,
                max: progress.repeat_read,
              },
              current: progress.current,
            }
          }
        console.log("info from up",info);
        var store_path = RNFS.ExternalDirectoryPath;
        if (Platform.OS === 'ios') {
          store_path = RNFS.DocumentDirectoryPath;
        }
        RNFS.mkdir(store_path + '/cureentAudio');
        RNFS.mkdir(store_path + '/birlingo');
        store_path = store_path + '/birlingo';
        RNFS.mkdir(store_path + `/${this.state.userId}`);
        store_path = store_path + `/${this.state.userId}`;
        RNFS.mkdir(store_path + `/${item.lesson_id}`);
        store_path = store_path + `/${item.lesson_id}`;
        var ArrayPath = [];
        var ArrayNew = [];
        await array.sentenceslist.reduce(async (promise, ele, i) => {
          await promise;
          if (ele.sound) {
            let audioPath = store_path + '/' + i + 'audio.mp3';
            try {
              audioPath = await this.downloadFile(ele.sound, audioPath);
              ele.sound = audioPath;
              ArrayPath.push(audioPath);
            } catch (e) {}
          }
          if (ele.data) {
            var newArray = [];
            await ele.data.reduce(async (promise2, ele2, j) => {
              await promise2;
              if (ele2.sound) {
                // let loop_audio_path = store_path + '/' + i + j + 'loop_audio.mp3';
                let audioPath = ArrayPath[j];
                try {
                  // loop_audio_path = await this.downloadFile(ele2.sound, loop_audio_path)
                  ele2.sound = audioPath;
                } catch (e) {}
              }
              newArray.push(ele2);
            }, Promise.resolve());
            ele.data = newArray;
          }
          ArrayNew.push(ele);
        }, Promise.resolve());
         console.log("ArrayNew =>", ArrayNew);
        RNFS.writeFile(
          store_path + '/file.json',
          JSON.stringify({test: res.data.test, sentenceslist: ArrayNew}),
          'utf8',
        )
          .then(success => {
            var filePath = RNFS.ExternalDirectoryPath;
            if (Platform.OS === 'ios') {
              filePath = RNFS.DocumentDirectoryPath;
            }
            let lessonList = [];
            AsyncStorage.getItem('authUser', (err1, item1) => {
              if (item1 != null) {
                var userDetails = JSON.parse(item1);
                let content_lessondata = RNFS.readDir(
                  filePath + '/birlingo/' + userDetails._id,
                )
                  .then(result => {
                    result.map(ele => {
                      RNFS.readFile(ele.path + '/info.json', 'utf8').then(
                        content_info => {
                          let data = JSON.parse(content_info);

                          lessonList.push(data._id);

                          let array = this.state.languageArr.map(ele => {
                            if (lessonList.indexOf(ele._id) != -1) {
                              ele.downloaded = 1;
                            } else {
                              ele.downloaded = 0;
                            }
                            return ele;
                          });
                          this.setState({
                            languageArr: array,
                            isLoading: false,
                          });
                        },
                      );
                    });
                  })
                  .catch(err => {
                    let array = this.state.languageArr.map(ele => {
                      ele.downloaded = 0;
                      return ele;
                    });
                    this.setState({languageArr: array, isLoading: false});
                    console.log('catch ==>', err.message, err.code);
                  });
              }
            });

            console.log('FILE WRITTEN!');
            showToast(this.state.appString.lbl_download_success);
          })
          .catch(err => {
            showDangerToast(err.message);
            console.log(err.message);
          });
          console.log("info",info);
        RNFS.writeFile(store_path + '/info.json', JSON.stringify(info), 'utf8')
          .then(success => {
            console.log('FILE WRITTEN!');
            showToast(this.state.appString.lbl_download_success);
            
          })
          .catch(err => {
            showDangerToast(err.message);
            console.log(err.message);
          });
        }else{
          showDangerToast(res?.message)
        }
      });
    } else {
      this.setState({visible: true, isLoading: false});
    }
  };

  downloadMessage = () => {
    const {appString} = this.state;
    showToast(appString.lbl_lesson_downloded);
  };
  _renderItem = ({item, index}) => {
    // console.log(' ===item====', item);
    const {appString} = this.state;

    let level = '';
    if (item.level_id == 1) {
      // level = 'lbl_demo';
      level = "lbl_level_one";
    } else if (item.level_id == 2) {
      level = 'lbl_level_two';
    } else if (item.level_id == 3) {
      level = 'lbl_level_three';
    } else if (item.level_id == 4) {
      level = 'lbl_level_four';
    }

    return (
      <View style={styles.renderOuterView}>
        <View style={styles.navRenderView}>
          <View style={styles.listTitleView}>
            <View style={styles.levelsubTitleView}>
              <Text style={styles.levelSubTitle}>
                {item.title == 'lbl_demo' ? appString[item.title] : item.title}
              </Text>
            </View>

            {item.is_free == 0 ? (
              this.state.subscribeStatus != 1 ? (
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={images.lock}
                    style={styles.checkImg}
                    resizeMode={'contain'}
                  />
                </View>
              ) : null
            ) : null }
          </View>
          <View style={{flex: 1, marginTop: 20}}>
            <View style={styles.bottomOptionContainer}>
              <View style={styles.bottomOptionFirst}>
                <View style={styles.progressBarView}>
                  <Progress height={5} size={320} prog={item.active_progress} />
                </View>
                <View>
                  <Text style={styles.bottomOptionFirstTxt}>
                    {appString.lbl_hearActively}
                  </Text>
                </View>
              </View>

              <View style={styles.bottomOptionThird}>
                <View style={styles.progressBarView}>
                  <Progress height={5} size={320} prog={item.speak_progress} />
                </View>
                <View>
                  <Text style={styles.bottomOptionFirstTxt}>
                    {appString.lbl_method_speak}
                  </Text>
                </View>
              </View>
              <View style={styles.bottomOptionFour}>
                <View style={styles.progressBarView}>
                  <Progress height={5} size={320} prog={item.repeat_progress} />
                </View>
                <View>
                  <Text style={styles.bottomOptionFirstTxt}>
                    {appString.lbl_repetition}
                  </Text>
                </View>
              </View>
              <View style={styles.bottomOptionSecond}>
                <View style={styles.progressBarView}>
                  <Progress
                    height={5}
                    size={320}
                    prog={item.passive_progress}
                  />
                </View>
                <View>
                  <Text style={styles.bottomOptionFirstTxt}>
                    {appString.lbl_listen_passively}
                  </Text>
                </View>
              </View>
            </View>
            {item.active_progress == 0 ? (
              <View
                style={{
                  position: 'absolute',
                  marginTop: -10,
                  backgroundColor: colors.orange,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    marginHorizontal: 15,
                    marginVertical: 5,
                    color: colors.code_fff,
                    fontSize: Dimensions.get('window').width > 670 ?20:10,
                    fontFamily: fonts.type.Roboto_Medium,
                  }}>
                  {'NOCH NICHT BEGONNEN'}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  position: 'absolute',
                  marginTop: -10,
                  backgroundColor: colors.green,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    marginHorizontal: 15,
                    marginVertical: 5,
                    fontSize: Dimensions.get('window').width > 670 ?20:10,
                    color: colors.code_fff,
                    fontFamily: fonts.type.Roboto_Medium,
                  }}>
                  {appString["lbl_your_progress"].toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <View style={{flex: 1}}>
              <Button
                bgcolor={colors.maroon}
                label={
                  item.active_progress == 0
                    ? appString?.lbl_begin
                    : appString?.lbl_continue
                } //appString.lbl_start
                onPress={() => this.goToLesson(item, index)}
                buttonHeight={width * (36 / 375)}
                buttonWidth={width * (190 / 375)}
              />
            </View>
            {item.is_demo != 1 ? (
              <View style={{alignSelf: 'flex-end'}}>
                {item.downloaded == 0 ? (
                  <Button
                    bgcolor={colors.maroon}
                    image={images.download}
                    onPress={() =>
                      //   this.props.navigation.navigate('settingsAccount')
                      // }
                      this.downloadLesson(item)
                    }
                    buttonHeight={width * (36 / 375)}
                    buttonWidth={width * (40 / 375)}
                    borderRadius={30}
                    tint={'#fff'}
                  />
                ) : (
                  <Button
                    bgcolor={colors.code_blk}
                    image={images.download}
                    onPress={() => this.downloadMessage(item)}
                    buttonHeight={width * (36 / 375)}
                    buttonWidth={width * (36 / 375)}
                    borderRadius={30}
                    tint={colors.code_fff}
                  />
                )}
              </View>
            ) : null}
          </View>
          {/* {console.log("appString[level]",appString[level])} */}
          <View
            style={{
              position: 'absolute',
              marginTop: -10,
              backgroundColor: colors.code_blk,
              alignSelf: 'flex-end',
              right: 20,
              borderRadius: 5,
            }}>
            <Text
              style={{
                marginHorizontal: 20,
                marginVertical: 5,
                color: colors.code_fff,
                fontSize:Dimensions.get('window').width > 670 ?25:null,
              }}>
              {appString[level]}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  onModalDisable = () => {
    this.setState({visible: false});
  };

  // goToAccount = () => {
  //   // this.props.onDisable();
  //   this.setState({visible: false});
  //   this.props.navigation.navigate("Settings",{screen:'SettingsAccount',});
  // };

  levelFilter = (data, type, val) => {
    const postData = {
      lessonfamily_id: this.state.lessonfamily_id,
      level: this.state.level_id,
      status: 'all',
    };
    console.log('postData ==>', postData);
    doPost(`${apiUrls.lesson_library}`, postData).then(res => {
    // postService('lessonList', postData).then(res => {
       console.log("res.data ==>  ", res);
      this.setState({isLoading: false});

      if (res.data.list != this.state.languageArr) {
        var filePath = RNFS.ExternalDirectoryPath;
        if (Platform.OS === 'ios') {
          filePath = RNFS.DocumentDirectoryPath;
        }
        let lessonList = [];
        AsyncStorage.getItem('authUser', (err1, item1) => {
          if (item1 != null) {
            var userDetails = JSON.parse(item1);

            let content_lessondata = RNFS.readDir(
              filePath + '/birlingo/' + userDetails._id,
            )
              .then(result => {
                result.map(ele => {
                  RNFS.readFile(ele.path + '/info.json', 'utf8').then(
                    content_info => {
                      let data = JSON.parse(content_info);
                      lessonList.push(data._id);

                      let array = res.data.list.map(ele => {
                        if (lessonList.indexOf(ele._id) != -1) {
                          ele.downloaded = 1;
                        } else {
                          ele.downloaded = 0;
                        }
                        return ele;
                      });
                      this.setState({languageArr: array, isLoading: false});
                    },
                  );
                });
                let array = res.data.list.map(ele => {
                  ele.downloaded = 0;
                  return ele;
                });
                this.setState({languageArr: array, isLoading: false});
              })
              .catch(err => {
                let array = res.data.list.map(ele => {
                  ele.downloaded = 0;
                  return ele;
                });
                this.setState({languageArr: array, isLoading: false});
                console.log('catch ==>', err.message, err.code);
              });
          }
        });
      }
    });
  };

  select = async (data, type, val) => {
    console.log('type, val', type, val, data);
    await AsyncStorage.setItem("filterHistory", JSON.stringify(val));
    this.setState({ isLoading:true })
    if (type == 1) {
      this.setState({selected1: data, level: val});
    } 
    // else {
    //   this.setState({selected2: data, status: val});
    // }
    const postData = {
      lessonfamily_id: this.state.lessonfamily_id,
      level: type == 1 ? val : this.state.level,
      status: type == 2 ? val : this.state.status,
    };
    console.log("res.data ==>", postData);
    doPost(`${apiUrls.lesson_library}`, postData).then(res => {
    // postService('lessonList', postData).then(res => {
       console.log("res.data ==>", res);
      this.setState({isLoading: false});

      if (res.data.list != this.state.languageArr) {
        var filePath = RNFS.ExternalDirectoryPath;
        if (Platform.OS === 'ios') {
          filePath = RNFS.DocumentDirectoryPath;
        }
        let lessonList = [];
        AsyncStorage.getItem('authUser', (err1, item1) => {
          if (item1 != null) {
            var userDetails = JSON.parse(item1);

            let content_lessondata = RNFS.readDir(
              filePath + '/birlingo/' + userDetails._id,
            )
              .then(result => {
                result.map(ele => {
                  RNFS.readFile(ele.path + '/info.json', 'utf8').then(
                    content_info => {
                      let data = JSON.parse(content_info);
                      lessonList.push(data._id);

                      let array = res.data.list.map(ele => {
                        if (lessonList.indexOf(ele._id) != -1) {
                          ele.downloaded = 1;
                        } else {
                          ele.downloaded = 0;
                        }
                        return ele;
                      });
                      this.setState({languageArr: array, isLoading: false});
                    },
                  );
                });
                let array = res.data.list.map(ele => {
                  ele.downloaded = 0;
                  return ele;
                });
                this.setState({languageArr: array, isLoading: false});
              })
              .catch(err => {
                let array = res.data.list.map(ele => {
                  ele.downloaded = 0;
                  return ele;
                });
                this.setState({languageArr: array, isLoading: false});
                console.log('catch ==>', err.message, err.code);
              });
          }
        });
      }
    });
  };

  render() {
    const {appString} = this.state;
    console.log("this.statte", this.state);
    let title = this.props?.route?.params?.familyName; //this.state.lessonFamilyName;
    var NewTitle = title?.replace('-', '\n');

    return (
      <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors={colors.backGround} style={{flex: 1}}>
          <Loader loading={this.state.isLoading} />
          <View style={styles.titleView}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('LessonOverviewChoose')
              }
              style={styles.backIconView}>
              {/* <Image source={images.backArrow} style={styles.backIcon} /> */}
              <AntDesign name='left' size={20} color={'#fff'}/>
            </TouchableOpacity>
            <View style={styles.screenTitleView}>
              <Text style={styles.titleText}>{NewTitle}</Text>
            </View>
          </View>
          <ScrollView style={{flex: 1}}>
            <View style={{flex: 1, marginTop: 20}}>
              {/* <View style={styles.subTitleView}>
                                <Text style={styles.subTitleText}>{appString && appString.lbl_chooseLevel}</Text>
                            </View> */}
              <LevelView
                type={1}
                title1={'Alle Levels'}
                title2={'Level A1'}
                title3={'Level A2'}
                title4={'Level B1'}
                slected1={this.state.selected1}
                onClick={this.select}
              />

              <View style={{flex: 1, marginTop: 30}}>
                {this.state.languageArr.length > 0 ? (
                  <FlatList
                    data={this.state.languageArr}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderItem}
                    key={item => item.id}
                  />
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: '#fff',
                        fontFamily: font.type.Akkurat_Bold,
                      }}>
                      {appString.lbl_no_record}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </LinearGradient>

        <SubscribeModal
          systemSetting={this.state.systemSetting}
          visible={this.state.visible}
          onDisable={this.onModalDisable}
          appString={appString}
          navigation={this.props.navigation}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    getAppString: state.appLanguage.getAppString,
    lessonLibraryList: state.lessonLibrary.lessonLibraryList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getLessonFamily: (data) => {
          // dispatch(getLessonFamilyAction(data))
      // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LessonOverviewDownload);
