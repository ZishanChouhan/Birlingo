import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  Alert,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView
} from "react-native";
import { colors, images, metrics } from "../../../Theme";
import { styles } from "./styles";
import { getTransactionHistoryAction } from "./actions";
import { connect } from "react-redux";
import HandleBack from "../../../components/container/Back";
import { Loader, SettingHeaderTitle } from "../../../components";
import LinearGradient from "react-native-linear-gradient";
import Moment from 'moment';

const width = metrics.screenWidth;
class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      appString: "",
      page: 1,
      transactions : [],
      currentPage: 0,
      totalPages : 0,
      show: true,
    };
  }

  componentWillMount() {
    this.props.getTransactionHistory(this.state.page)
    
    if (this.props?.getAppString?.data !== this.state.appString) {
      this.setState({ appString: this.props.getAppString.data });
    }
    console.log(this.state.currentPage)
    console.log("this.props?.transactionData?.history?.currentPage", this.props?.transactionData?.history?.currentPage);
    if(this.props?.transactionData?.history?.currentPage > 1){
      console.log("in");
      this.setState({show: true})
    }else{
      if(this.props?.transactionData?.history?.transactions){
        this.setState({
          transactions: this.props?.transactionData?.history?.transactions,
          currentPage: this.props?.transactionData?.history?.currentPage,
          totalPages: this.props?.transactionData?.history?.totalPages,
        })
      }
    }
  }

  componentDidUpdate(prevProps){
    console.log('this.props',this.props);
    console.log('currentPage', this.state.currentPage);
    if(this.props?.transactionData?.history?.currentPage >  this.state.currentPage && this.state.currentPage != 0){
      console.log("1111");
      // global.showTransaction = 1
      this.setState({
        transactions: [ ...this.state.transactions , ...this.props?.transactionData?.history?.transactions],
        currentPage: this.props?.transactionData?.history?.currentPage,
        totalPages: this.props?.transactionData?.history?.totalPages,
      })
      // return;
    }
    else if(this.props?.transactionData?.history?.currentPage == 1 && this.state.show == true ){
      console.log("2222");
      this.setState({
        transactions: this.props?.transactionData?.history?.transactions,
        currentPage: this.props?.transactionData?.history?.currentPage,
        totalPages: this.props?.transactionData?.history?.totalPages,
        show: false
      })
    }
  }
  // componentWillUnmount(nextProps) {
  //   console.log('nextProps', nextProps);
  //   console.log("nkwd");
  //   // nextProps?.transactionData = {}
  // }
  // componentWillReceiveProps(nextProps){
  //   console.log("this.state.transactions", this.state.transactions);
  //   console.log("nextProps", nextProps);
  //   console.log('this.state.currentPage', this.state.currentPage);
    // if(nextProps?.transactionData?.history?.currentPage >  this.state.currentPage){
    //   console.log("1111");
    //   this.setState({
    //     transactions: [ ...this.state.transactions , ...nextProps?.transactionData?.history?.transactions],
    //     currentPage: nextProps?.transactionData?.history?.currentPage,
    //     totalPages: nextProps?.transactionData?.history?.totalPages,
    //   })
    // }
    // else{
    //   this.setState({
    //     transactions: [ ...this.state.transactions , ...this.props?.transactionData?.history?.transactions],
    //     currentPage: this.props?.transactionData?.history?.currentPage,
    //     totalPages: this.props?.transactionData?.history?.totalPages,
    //   })
    // }
    
  // }
  // onLoad = () => {
  //       // console.log("PostData----", PostData);
  //       this.props.getTransactionHistory(PostData)
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('prevProps', prevProps);
  // }
  onBack = () => {
    const { appString } = this.state;
    Alert.alert(
      appString && appString.msg_app_close,
      "",
      [
        {
          text: appString && appString.lbl_no,
          onPress: () => {},
          style: "cancel",
        },
        {
          text: appString && appString.lbl_yes,
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  getData = () => {
    console.log("on end reached");
    if(this.state.currentPage < this.state.totalPages){
      this.props.getTransactionHistory(this.state.page  + 1)
      // this.setState({page: this.state.page + 1})
      // this.setState({
      //   transactions: [ ...this.state.transactions , ...this.props?.transactionData?.history?.transactions],
      //   currentPage: this.props?.transactionData?.history?.currentPage,
      //   totalPages: this.props?.transactionData?.history?.totalPages,
      // })
    }
  }

  getDate = (newDate) => {
    // const date = date.toISOString().split('T')[0] +  " " +new Date(item.created).toISOString().split('T')[1]
    // const date = new Date(newDate).toISOString().split('T');
     
    // const date = new Date(newDate).toLocaleString().split(',');
    // const dateTime = date.split(',');
    // const date = new Date(newDate);
    // console.log("date", date[0] + " " + date[1]);
    const dateTime = Moment(newDate).format('DD/MM/YYYY, hh:mm:ss')
    const date = dateTime.split(',');
    console.log("date", date);
    return date[0] + " " + date[1];
  }

  render() {
    console.log('this.state', this.state);
    const { appString } = this.state;
    const { isLoading } = this.props;
    return (
      <HandleBack onBack={this.onBack}>
        <SafeAreaView style={styles.outerContainer}>
          <LinearGradient colors={colors.backGround} style={{ flex: 1 }}>
            <Loader loading={isLoading} />

            <SettingHeaderTitle
              title={appString && appString.lbl_transaction_history}
              navigation={this.props.navigation}
              fSize={ Dimensions.get('window').width > 670 ?40:22}
              goBack={() => {
                this.props.navigation.goBack();
              }}
            />

            <FlatList 
              data={this.state?.transactions ? this.state?.transactions : []}
              initialNumToRender={10}
              onEndReachedThreshold={0.001}
              onEndReached={this.getData}
              ListEmptyComponent={() => {
                return(
                  <View style={{flex:1, justifyContent: "center", alignItems: "center", paddingTop: 30 }}>
                    <Text style={{ fontSize: 18, color: "#fff"}}>No data Found</Text>
                  </View>
              )}
              }
              renderItem={({item, index}) => (
                <View style={styles.renderouterView}>
                  <View style={styles.midView}>
                    <View style={{
                      backgroundColor: colors.progressBackColor,
                      marginHorizontal: 10,
                      borderRadius: 4,
                      // paddingVertical: 30,
                      marginTop: 20,
                    }}>
                      <View
                        style={{
                          // paddingTop: 30,
                          paddingBottom: 20,
                          paddingLeft: 10,
                        }}>
                        <View style={styles.levelOuterView}>
                          <View style={styles.levelNameView}>
                            <Text style={styles.levelName}>{appString["lbl_subscription"]}</Text>
                          </View>
                          
                          <View style={styles.circleOuterView}>
                            <Text>: </Text>
                            <Text style={styles.levelNumberBold}>
                              {item.subscriptionDetails.title}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={styles.levelOuterView}>
                          <View style={styles.levelNameView}>
                            <Text style={styles.levelName}>{appString["lbl_transaction_id"]}</Text>
                          </View>
                          
                          <View style={styles.circleOuterView}>
                            <Text>: </Text>
                            <Text style={[styles.levelNumberId, {fontSize : item.transaction_id == "offline" ? width * (15 / 375) : width * (9 / 375)}]}>
                              {/* :  {item.payment_type == 'offline' && item.payment_type[0].toUpperCase() + item.payment_type.slice(1,)}
                                 {item.payment_type == 'charge_automatically' && item.payment_type[0].toUpperCase() + item.payment_type.slice(1,).replace("_", ' ')} */}
                                {item.transaction_id}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={styles.levelOuterView}>
                          <View style={styles.levelNameView}>
                            <Text style={styles.levelName}>{appString["lbl_coupon"]}</Text>
                          </View>
                          
                          <View style={styles.circleOuterView}>
                            <Text>: </Text >
                            <Text style={styles.levelNumberCoupon}>{item.coupon_applied ? "Yes" : "Not Applied"}</Text>
                          </View>
                        </View>
                        <View style={styles.levelOuterView}>
                          <View style={styles.levelNameView}>
                            <Text style={styles.levelName}>{appString["lbl_amount"]}</Text>
                          </View>
                          
                          <View style={styles.circleOuterView}>
                            <Text style={styles.levelNumber}>
                              :  € {item.amount}
                            </Text>
                          </View>
                        </View>
                        
                        <View
                          style={styles.levelOuterView}>
                          <View style={styles.levelNameView}>
                            <Text style={styles.levelName}>{appString["lbl_status"]}</Text>
                          </View>
                          
                          <View style={styles.circleOuterView}>
                            <Text>: </Text>
                            <Text style={[styles.levelNumberStatus, {backgroundColor: item.payment_status == "active" || item.payment_status == "paid" ? colors.maroon : "red"}]}>
                              {item.payment_status == "active" || item.payment_status == "paid" ? "Success" : "Failed"}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={styles.levelOuterView}>
                          <View style={styles.levelNameView}>
                            <Text style={styles.levelName}>{appString["lbl_invoice"]}</Text>
                          </View>
                          
                          <View style={styles.circleOuterView}>
                            <Text style={styles.levelNumber}>
                              :  { item.hosted_invoice_url ? "Download" : "N/A" }
                            </Text>
                          </View>
                        </View>
                        <View
                          style={styles.levelOuterView}>
                          <View style={styles.levelNameView}>
                            <Text style={styles.levelName}>{appString["lbl_transaction_date"]}</Text>
                          </View>
                          
                          <View style={styles.circleOuterView}>
                            <Text style={styles.levelNumber}>
                              :  { this.getDate(item.created) }
                            </Text>
                          </View>
                        </View>
                      </View> 
                
                    </View>
                  </View>
                </View>

              )}
            />
          </LinearGradient>
        </SafeAreaView>
      </HandleBack>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAppString: state.appLanguage.getAppString,
    transactionData: state.transactionHistory.history,
    // getLearningLang: state.signUpReducer.getLearningLanguages,
    isLoading: state.serviceReducer.isLoading,
  //   error: state.serviceReducer.error,
  //   data: state.serviceReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionHistory: (page) => {
      dispatch(getTransactionHistoryAction(page));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionHistory);
