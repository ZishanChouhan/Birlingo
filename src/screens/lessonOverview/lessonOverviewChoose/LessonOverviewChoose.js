import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Alert,
  BackHandler,
  StatusBar,
  Platform,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {colors, images} from '../../../Theme';
import {styles} from './styles';
//import * as Progress from 'react-native-progress';
import HandleBack from '../../../components/container/Back';
import {getLessonFamilyAction, getSubscriptionStatusAction} from '../actions';
import {BlueButton, BottomTab, Loader, NetMoadal, Progress} from '../../../components';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/container/Button';
import {getService} from '../../../services/getServices';
import NetInfo from '@react-native-community/netinfo';
import { apiUrls } from '../../../api/constants/constants';
import { doGet, doPost } from '../../../actions/fetchApiActions';
import { showDangerToast } from '../../../assets/utility/ToastMessage';

const {width} = Dimensions.get('window');
var isDissbled = false;

class LessonOverviewChoose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonArr: [],
      appString: "",
      allowed: true,
      visible: false,
      netConnected: true,
      loading: false
    };
  }
  
  componentWillMount() { 
    this._sub2 = this.props.navigation.addListener(
      'focus', () => {
        this.viewWillAppear(),
        this.props.getubScriptionStatus();
        this.backSubs = BackHandler.addEventListener("hardwareBackPress", this.onBack)
        this.removeSubs = this.props.navigation.addListener("blur" , () => {
          console.log("dkfkfk");
          // BackHandler.removeEventListener("hardwareBackPress", this.blur);
          this.backSubs?.remove();
        })
    }); 

    doGet(`${apiUrls.getStoreUrl}`).then(async res => {
      console.log('res getSettingData', res);
      await AsyncStorage.setItem(
        'system_setting',
        JSON.stringify(res.data.system_setting),
        ); 
      });
  }
      
  // componentDidMount() { 
      
  // }

  // componentWillUnmount(){
    
  // }
  isConnected = async () => { 
    console.log('asdfghjjjjjjjjj')
    await fetch('https://www.google.com/').then(response => { 
      if (response.ok) { 
        global.isConnected = true;
        this.setState({netConnected: true});
        this.state.netConnected=true;
        this.viewWillAppear()
      } else { 
        //console.log("enter in else condition ===>");
      }
    })
    .catch(error => { 
      return false;
    });
  };

  async viewWillAppear() {
    console.log("global.isConnected", global.isConnected);
    if(global.isConnected == undefined){
      const net = await NetInfo.fetch()
      if (net.isConnected) { 
        AsyncStorage.getItem('appTerms', (err1, item1) => { 
          // console.log("item1", item1);
          if (item1 != null) { 
            var appTerms = JSON.parse(item1);
            this.setState({netConnected: true, appString: appTerms}); 
          }
        });
      } else { 
        AsyncStorage.getItem('appTerms', (err1, item1) => {
          if (item1 != null) { 
            var appTerms = JSON.parse(item1);
            this.setState({appString: appTerms});
            // setTimeout(() => {
            //   this.setState({netConnected: false,loading: false});
            // }, 1500)
          }
        });
      }
    }else if(global.isConnected == true){
      AsyncStorage.getItem('appTerms', (err1, item1) => { 
        if (item1 != null) { 
          var appTerms = JSON.parse(item1);
          this.setState({netConnected: true, appString: appTerms}); 
        }
      });
    }else if(global.isConnected == false){
      AsyncStorage.getItem('appTerms', (err1, item1) => { 
        if (item1 != null) { 
          var appTerms = JSON.parse(item1);
          this.setState({appString: appTerms, loading: false}); 
          setTimeout(() => {
            this.setState({netConnected: false, });
          }, 1500)
        }
      });
    }

    console.log(' global.userLanguageId', global.userLanguageId);
    if(global.userLanguageId){
      const postData = {
        language_id: global.userLanguageId,
      };
      this.setState({loading: true})
      // this.props.getLessonFamily(postData, this.state.appString);
      doPost(`${apiUrls.lesson_family}`, postData).then(res => {
        console.log("res", res);
        if(res.success){
          var newArray = [];
          res.data.family.map((ele, index) => {
            if (index != 0) {
              const obj = {
                Lfamily: ele.term,
                image: ele.image,
                lesson_id: ele.lesson_id,
                // levels: ele.levels,
                level1progress: Math.round(ele.level1progress),
                level2progress: Math.round(ele.level2progress),
                level3progress: Math.round(ele.level3progress),
                _id: ele._id,
                started: ele.started,
              };
              newArray.push(obj);
            }else{
              showDangerToast(res?.message)
            }
          }); 
          this.setState({lessonArr: newArray, loading: false});
        }
      }).catch(err => console.log('err', err))
    }else{
      AsyncStorage.getItem('language', (err1, item1) => {
        if (item1 != null) { 
          var userDetails = JSON.parse(item1);
          console.log('userDetails', userDetails);
          
          const postData = {
            language_id: userDetails.language_id,
          };
          this.setState({loading: true})
          // this.props.getLessonFamily(postData, this.state.appString);
          doPost(`${apiUrls.lesson_family}`, postData).then(res => {
            console.log("res", res);
            if(res.success){
              var newArray = [];
              res.data.family.map((ele, index) => {
                if (index != 0) {
                  const obj = {
                    Lfamily: ele.term,
                    image: ele.image,
                    lesson_id: ele.lesson_id,
                    // levels: ele.levels,
                    level1progress: Math.round(ele.level1progress),
                    level2progress: Math.round(ele.level2progress),
                    level3progress: Math.round(ele.level3progress),
                    _id: ele._id,
                    started: ele.started,
                  };
                  newArray.push(obj);
                }
              }); 
              this.setState({lessonArr: newArray, loading: false});
            }else{
              showDangerToast(res?.message)
            }
          }).catch(err => console.log('err', err))
        }
      });
    }
  }

  
  //**** For handling back button in android /
  onBack = () => {
    const {appString} = this.state;
    Alert.alert(
      appString && appString.msg_app_close,
      '',
      [
        {
          text: appString && appString.lbl_no,
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: appString && appString.lbl_yes,
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );
    return true;
  };

  levelFilter = async (item, index) => {
    const {appString} = this.state;
    if (isDissbled) {
      return;
    }
    isDissbled = true;

    if (this.state.allowed == true) {
      this.props.navigation.navigate('LessonOverviewDownload', {
        lessonfamily_id: item.fId,
        familyName: appString[item.fName],
        levelID: item.level_id,
      });
    }

    setTimeout(() => {
      isDissbled = false;
    }, 2000);
  };

  handleClick = async (item, index) => {
    console.log("fjkf");
    const {appString} = this.state;

    if (isDissbled) {
      return;
    }
    isDissbled = true;

    await AsyncStorage.setItem('rememberLesson', JSON.stringify(item));
    this.props.navigation.navigate('LessonOverviewDownload', {
      lessonfamily_id: item._id,
      familyName: appString[item.Lfamily],
    });

    setTimeout(() => {
      isDissbled = false;
    }, 2000);
  };

  showPercentage = (item) => {
    return item.compeleted * 100 / item.total
  }
  // _renderLevel = ({item, index}) => { 
  //   const {appString} = this.state;
  //   console.log("item", item);
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         this.levelFilter(item, index);
  //       }}
  //       style={styles.levelOuterView}>
  //       <View style={styles.levelNameView}>
  //         <Text style={styles.levelName}>{appString[item.label]}</Text>
  //       </View>
  //       <View style={styles.progressView}>
  //         <Progress
  //           height={5}
  //           prog={item.compeleted}
  //           size={300}
  //           total={item.total}
  //         />
  //       </View>
  //       <View style={styles.circleOuterView}>
  //         <Text style={styles.levelNumber}>
  //           {item.compeleted} {'/'} {item.total}
  //           {/* {this.showPercentage(item)}% */}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  _renderItem = ({item, index}) => {
    // console.log("item",item);
    const {appString} = this.state;
    return (
      <View style={styles.renderouterView}>
        <View style={styles.midView}>
          <TouchableOpacity
            onPress={() => {
              this.handleClick(item, index);
            }}>
          

            <ImageBackground
              source={{
                uri: 'https://birlingo.de/backend/public/lf/' + item.image,
              }}
              imageStyle={{
                borderTopRightRadius: width * (5 / 375),
                borderTopLeftRadius: width * (5 / 375),
              }}
              style={styles.backImg}
              resizeMode={'cover'}>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <LinearGradient colors={colors.lessonTitleBack}>
                  <Text style={styles.renderSubTitle}>
                    {appString && appString[item.Lfamily]}
                  </Text>
                </LinearGradient>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <View style={styles.nestedView}>
            <View
              style={{
                backgroundColor: colors.progressBackColor,
                marginHorizontal: 10,
                // height: 110,

                borderRadius: 4,
                paddingVertical: 20,
                marginVertical: 40,
              }}>
              <View
                style={{
                  paddingTop: 30,
                  paddingBottom: 30,
                  paddingLeft: 10,
                }}>
                <TouchableOpacity
                  // onPress={() => {
                  //   this.levelFilter(item, index);
                  // }}
                  style={styles.levelOuterView}>
                  <View style={styles.levelNameView}>
                    <Text style={styles.levelName}>{appString && appString["lbl_level_one"]}</Text>
                  </View>
                  <View style={styles.progressView}>
                    <Progress
                      height={5}
                      prog={item.level1progress}
                      size={300}
                      total={item.total}
                    />
                  </View>
                  <View style={styles.circleOuterView}>
                    <Text style={styles.levelNumber}>
                      {item.level1progress} %
                      {/* {'/'} {item.level1progress} */}
                      {/* {this.showPercentage(item)}% */}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => {
                  //   this.levelFilter(item, index);
                  // }}
                  style={styles.levelOuterView}>
                  <View style={styles.levelNameView}>
                    <Text style={styles.levelName}>{appString && appString["lbl_level_two"]}</Text>
                  </View>
                  <View style={styles.progressView}>
                    <Progress
                      height={5}
                      prog={item.level2progress}
                      size={300}
                      total={item.total}
                    />
                  </View>
                  <View style={styles.circleOuterView}>
                    <Text style={styles.levelNumber}>
                      {item.level2progress} %
                      {/* {'/'} {item.level1progress} */}
                      {/* {this.showPercentage(item)}% */}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => {
                  //   this.levelFilter(item, index);
                  // }}
                  style={styles.levelOuterView}>
                  <View style={styles.levelNameView}>
                    <Text style={styles.levelName}>{appString && appString["lbl_level_three"]}</Text>
                  </View>
                  <View style={styles.progressView}>
                    <Progress
                      height={5}
                      prog={item.level3progress}
                      size={300}
                      total={item.total}
                    />
                  </View>
                  <View style={styles.circleOuterView}>
                    <Text style={styles.levelNumber}>
                      {item.level3progress} %
                      {/* {'/'} {item.level1progress} */}
                      {/* {this.showPercentage(item)}% */}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> 
              {item?.started == 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    marginTop: -10,
                    backgroundColor: colors.green,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      marginHorizontal: 20,
                      marginVertical: 5,
                      color: colors.code_fff,
                    }}>
                    {'IHR FORTSCHRITT'}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    position: 'absolute',
                    marginTop: -10,
                    backgroundColor: colors.orange,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      marginHorizontal: 20,
                      marginVertical: 5,
                      color: colors.code_fff,
                    }}>
                    {'NOCH NICHT BEGONNEN'}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                alignItems: 'center',
                paddingBottom: 20,
                marginBottom: 15,
              }}>
              <Button
                bgcolor={colors.maroon}
                label={
                  item?.started && item?.started == 1
                    ? appString && appString?.lbl_choose
                    : appString && appString?.lbl_begin
                }
                onPress={() => this.handleClick(item, index)}
                buttonHeight={width * (36 / 375)}
                buttonWidth={width * (175 / 375)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {appString} = this.state;
  //  console.log("appString", appString);
   console.log("this.state", this.state);
    return (
      <SafeAreaView style={{flex: 1, paddingBottom: Platform.OS == "ios" ? -50 : 0}} >
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        <Loader loading={this.state.loading} />
        <LinearGradient colors={colors.backGround} style={{flex: 1}}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{global.Terms['lbl_chooseTopic']}</Text>
          </View>
          <ScrollView>
            <View style={{marginTop: 30, flex: 1}}>
              <FlatList
                style={{flex: 1}}
                data={this.state.lessonArr}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                key={item => item.id}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    lessonFamilyList: state.lessonFamily.lessonFamilyList,
    getAppString: state.appLanguage.getAppString,
    checkNet: state.netReducer.checkNet,
    loading : state.systemWorking.visible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLessonFamily: (data, appString) => {
      dispatch(getLessonFamilyAction(data, appString));
    },
    getubScriptionStatus: () => {
      dispatch(getSubscriptionStatusAction());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LessonOverviewChoose);
