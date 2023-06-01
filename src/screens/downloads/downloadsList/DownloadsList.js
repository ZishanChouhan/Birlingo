import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  FlatList,
  Dimensions,
  BackHandler,
  StatusBar,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {images} from '../../../Theme';
import {styles} from './styles';
import {colors, fonts} from '../../../Theme';
import font from '../../../Theme/font';
import {Progress} from '../../../components';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/container/Button';
var RNFS = require('react-native-fs');

const {height, width} = Dimensions.get('window');

class DownloadsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appString: '',
      learnLang:'',
      // languageArr: [
      //     { name: 'Hindi', rate: 3.1, type: 'Restaurant', level: 'Beginner', progress: false },
      //     { name: 'English', rate: 3.2, type: 'Hotel', level: 'Beginner', progress: true, completed: 0.2 },
      // ],
      languageArr: [],
      userId: '',
    };
  }

  // componentDidMount() {
  //   // this.viewWillAppear();
    
  // }

  componentWillMount() {
    this._sub2 = this.props.navigation.addListener('focus', () => {
      this.viewWillAppear();
      this.backSubs = BackHandler.addEventListener("hardwareBackPress", this.onBack)
    });
    this.removeSubs = this.props.navigation.addListener("blur" , () => {
      console.log("dkfkfk");
      this.backSubs?.remove();
    })
  }

  viewWillAppear() {
    this.readFile();
    global.isClikedInOffline = true
    if (this.props?.getAppString?.data !== this.state.appString) {
      this.setState({appString: this.props.getAppString.data});
    }
  }

  readFile = () => {
    try{
      var filePath = RNFS.ExternalDirectoryPath;
      if (Platform.OS === 'ios') {
        filePath = RNFS.DocumentDirectoryPath;
      }
      let lessonList = [];
      AsyncStorage.getItem('authUser', (err1, item1) => {
        AsyncStorage.getItem('learning_language_id', (err2, item2) => {
          console.log("learning_language_id", JSON.parse(item2));
          if (item2 != null) {
          this.setState({learnLang:JSON.parse(item2)});
            if (item1 != null) {
              var userDetails = JSON.parse(item1);
              console.log("userDetails from download list",userDetails);
              console.log("filePath from download list",filePath);
              let content_lessondata = RNFS.readDir(
                filePath + '/birlingo/' + userDetails._id,
              )
                .then(result => {
                  console.log("result from download list",result);
                  result.map(ele => {
                    console.log("ele from download list",ele);
                    RNFS.readFile(ele.path + '/info.json', 'utf8').then(
                      content_info => {
                        console.log("content_info", content_info);
                        let data = JSON.parse(content_info);
                        console.log("data from download list",data);
                        // console.log("data", data);
                        // data.learning_language_id = this.state.learnLang
                      
                        if(data.learning_language_id == this.state.learnLang){
                          lessonList.push(data);
                          // console.log("lessonList from download list",lessonList);
                          this.setState({languageArr: lessonList});
                        }
                      },
                    ).catch(err => console.log(err))
                  });
                  // console.log("lessonList", lessonList);
                  this.setState({languageArr: lessonList});
              
                })
                .catch(err => {
                  console.log(err.message, err.code);
                });
            }
          }
        });
      });
    }catch(err){
      console.log(err);
    }
  };

  componentWillUnmount(){
    // this._sub2()
    // this.subs()
  }

  goToDownloadLesson = item => {
    console.log("item from goToDownloadLesson", item);
    this.props.navigation.navigate('LessonSentenceDownloads', {
      lessonDetails: item,
      // getScreen: 'downloadList',
    });
    global.isClikedInOffline = true
  };

  _renderItem = ({item, index}) => {
    // console.log('item==== from download', item);
    const {appString} = this.state;

    let level = '';
    if (item.level_id == 1) {
      level = 'lbl_level_one';
    } else if (item.level_id == 2) {
      level = 'lbl_level_two';
    } else if (item.level_id == 3) {
      level = 'lbl_level_three';
    }

    return (
      <View style={styles.renderOuterView}>
        <View style={styles.navRenderView}>
          <View style={styles.listTitleView}>
            <View style={styles.levelsubTitleView}>
              <Text style={styles.levelSubTitle}>
                {item.title}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, marginTop: 20}}>
            <View style={styles.bottomOptionContainer}>
              <View style={styles.bottomOptionFirst}>
                <View style={styles.progressBarView}>
                  <Progress
                    height={5}
                    size={320}
                    prog={item.active_progress}
                    // total={item.active && item.active.total}
                  />
                </View>
                <View>
                  <Text style={styles.bottomOptionFirstTxt}>
                    {appString ? appString.lbl_hearActively : global.Terms ? global.Terms.lbl_hearActively: ""}
                  </Text>
                </View>
              </View>

              <View style={styles.bottomOptionThird}>
                <View style={styles.progressBarView}>
                  <Progress
                    height={5}
                    size={320}
                    prog={item.speak_progress}
                    // total={item.speak && item.speak.total}
                  />
                </View>
                <View>
                  <Text style={styles.bottomOptionFirstTxt}>
                    {appString ? appString.lbl_method_speak : global.Terms ? global.Terms.lbl_method_speak: ""}
                  </Text>
                </View>
              </View>
              <View style={styles.bottomOptionFour}>
                <View style={styles.progressBarView}>
                  <Progress
                    height={5}
                    size={320}
                    // prog={0.5}
                    prog={item.repeat_progress}
                    // total={item.repeat && item.repeat.total}
                  />
                </View>
                <View>
                  <Text style={styles.bottomOptionFirstTxt}>
                    {appString ? appString.lbl_repetition : global.Terms ? global.Terms.lbl_repetition : ""}
                  </Text>
                </View>
              </View>
              <View style={styles.bottomOptionSecond}>
                <View style={styles.progressBarView}>
                  <Progress
                    height={5}
                    size={320}
                    prog={item.passive_progress}
                    // total={1200}
                  />
                </View>
                <View>
                  <Text style={styles.bottomOptionFirstTxt}>
                    {appString ? appString.lbl_listen_passively : global.Terms ? global.Terms.lbl_listen_passively : ""}
                  </Text>
                </View>
              </View>
            </View>
            {console.log('item.current_percentage===', item.current_percentage)}
            {item.current_percentage == 0 ? (
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
                    fontSize: 10,
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
                    fontSize: 10,
                    color: colors.code_fff,
                    fontFamily: fonts.type.Roboto_Medium,
                  }}>
                  {'IHR FORTSCHRITT'}
                </Text>
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <Button
                bgcolor={colors.maroon}
                // label={appString.lbl_start}
                label={
                  item.current_percentage == 0
                    ? appString ? appString?.lbl_begin : global.Terms ? global.Terms.lbl_begin : "lbl_begin"
                    : appString ? appString?.lbl_continue : global.Terms ? global.Terms.lbl_continue : "lbl_continue"
                }
                onPress={() => this.goToDownloadLesson(item, index)}
                buttonHeight={width * (36 / 375)}
                buttonWidth={width * (200 / 375)}
              />
              <View style={{marginLeft: 15}}>
                <TouchableOpacity
                  style={styles.rowBack}
                  danger
                  onPress={() => this._deleteLesson(item)}>
                  <Image
                    source={images.trashImage}
                    style={{tintColor: '#fff'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
              }}>
              {appString ? appString[level] : global.Terms ? global.Terms.level : ""}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  onBack = () => {
    const {appString} = this.state;
    Alert.alert(
      appString ? appString.msg_app_close : global.Terms ? global.Terms.msg_app_close: "",
      '',
      [
        {
          text: appString ? appString.lbl_no : global.Terms ? global.Terms.lbl_no : "",
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: appString ? appString.lbl_yes : global.Terms ? global.Terms.lbl_yes : "",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );
    return true;
  };

  removeItem = data => {
    try{
      AsyncStorage.getItem('authUser', (err1, item1) => {
        if (item1 != null) {
          var userDetails = JSON.parse(item1);
          var filePath = RNFS.ExternalDirectoryPath;
          if (Platform.OS === 'ios') {
            filePath = RNFS.DocumentDirectoryPath;
          }
          var path = filePath + '/birlingo/' + userDetails._id + '/' + data._id;
  
          return (
            RNFS.unlink(path)
              .then(() => {
                this.readFile();
                console.log('FILE DELETED');
              })
              // `unlink` will throw an error, if the item to unlink does not exist
              .catch(err => {
                console.log(err.message);
              })
          );
        }
      });

    }catch(err){
      console.log(err);
    }
  };

  _deleteLesson = data => {
    const {appString} = this.state;
    Alert.alert(
      appString ? appString.lbl_delete_lesson : global.Terms ? global.Terms.lbl_delete_lesson : "" ,
      '',
      [
        {
          text: appString ? appString.lbl_no : global.Terms ? global.Terms.lbl_no : "",
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: appString ? appString.lbl_yes : global.Terms ? global.Terms.lbl_no : "",
          onPress: () => this.removeItem(data),
        },
        // { text: appString && appString.lbl_yes, onPress: () => this.logout() }
      ],
      {cancelable: false},
    );
    return true;
  };

  render() {
    const {appString} = this.state;
    return (
      <SafeAreaView style={{flex: 1, paddingBottom: Platform.OS ? -15 : 0}}>
         <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        <View style={{flex: 1}}>
          <LinearGradient colors={colors.backGround} style={{flex: 1}}>
            <View style={styles.titleView}>
              <Text style={styles.title}>
                {appString ? appString.lbl_your_download : global.Terms ? global.Terms.lbl_your_download: ""}
              </Text>
            </View>

            <View style={styles.formContainer}>
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
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    contentContainerStyle={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontSize:Dimensions.get('window').width > 670 ?30: 18,
                        textAlign: 'center',
                        color: colors.code_fff,
                        fontFamily: font.type.Akkurat_Bold,
                      }}>
                      {appString ? appString.msg_no_download_data : global.Terms ? global.Terms.msg_no_download_data : ""}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            {/* <BottomTab
              tabNum={3}
              navigation={this.props.navigation}
              appString={appString}
            /> */}
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    getAppString: state.appLanguage.getAppString,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getLessonFamily: (data, appString) => {
    //     dispatch(getLessonFamilyAction(data, appString))
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DownloadsList);
