import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
  Linking,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {colors, images} from '../../../Theme';
import {styles} from './styles';
import {
  getSubscriptionAction,
  cancelPlanAction,
  getSubscriptionContentAction,
  getAgbAction,
  getAccessTokenAction,
} from '../settingAction';
import {
  subscribedForApplePay,
  subscribedForGooglePay,
} from '../settingsPayment/actions';
import {
  Loader,
  SettingHeaderTitle,
} from '../../../components';
import {showDangerToast} from '../../../assets/utility/ToastMessage';
import Checkbox from '../../../components/container/Checkbox';
import LinearGradient from 'react-native-linear-gradient';
import AutoHeightWebView from '../../../components/autoheight_webview/autoHeightWebView';
import validate from '../../../assets/validations/validate_wrapper';
import Lable from '../../../components/container/Lable';
import { WebView } from 'react-native-webview';
import moment from 'moment';
import Unorderedlist from 'react-native-unordered-list';
import Iap, { 
  getSubscriptions, 
  getProducts, 
  finishTransaction, 
  flushFailedPurchasesCachedAsPendingAndroid, 
  requestSubscription, 
  initConnection,
  acknowledgePurchaseAndroid,
  purchaseErrorListener,
  purchaseUpdatedListener,
  validateReceiptAndroid,
  validateReceiptIos,
  requestPurchase,
} from 'react-native-iap';
import axios from 'axios';
import {baseApiUrl, apiUrls} from '../../../api/constants/constants';
import RenderHtml from 'react-native-render-html';
import { doPost } from '../../../actions/fetchApiActions';

const items = Platform.select({
  ios: ['Birlingo_Subs3', 'Birlingo_Subs6', 'Birlingo_SubsUn1'],
  android: ['birlingo_subsun1', 'birlingo_subs3', 'birlingo_subs6'],
});

class SettingsAccount extends Component {
  constructor(props) {
    super(props);
    this.flag = true;
    this.state = {
      basis: false,
      standard: false,
      premium: false,
      deluxe: false,
      appString: '',
      subscriptionData: '',
      subscribeStatus: '',
      packageArr: [],
      modalVisible: false,
      // isLoading: this.props.isLoading,
      androidSubscription: false,
      iosSubscription: false,
      selectItem: '',
      promoCodeError: '',
      checked2: false,
      check2Error: '',
      heading: '',
      description: '',
      description_mob: "",
      purchased: false,
      products: {},
      visible1: false,
      agbDetails: '',
      accessToken: '',
      steNew:false
    };
    this.token();
    
  }

  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;

  token = async () => {
    // console.log('`${baseApiUrl}/accessToken`', `${baseApiUrl}/accessToken`);
    axios({
      method: 'get',
      url: `${baseApiUrl}/accessToken`,
      timeout: 1000 * 60,
      // params: getParams,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${global.AuthToken}`,
      },
    })
      .then(async reponse => {
        // console.log('hello there is access token', reponse);
        // state.accessToken = reponse.data;
        // this.state.accessToken = reponse.data;
        this.setState({accessToken: reponse.data})
      })
      .catch(error => {
        console.warn('error from subs axios', error);
      });
  };

  async componentDidMount() {
    try{
    // console.log('beta 2');
    this.props.getSubscriptionContent();
    // this.props.getAccessToken()
    this.token();

    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    this.getAgb();
    
    if (Platform.OS == 'ios') {
      Iap.initConnection().then(async () => {
        // console.log('init connection');
        try {
          const products = await Iap.getSubscriptions(items);
          console.log('subscription', products);
          this.setState({subscription: products});
          this.state.products = products;
        } catch (err) {
          console.warn(err); // standardized err.code and err.message available
        }
        try {
          const products = await Iap.getProducts(items);
          console.log('products==4', products);
          this.setState({products: products});
          this.state.products = products;
        } catch (err) {
          console.warn(err); // standardized err.code and err.message available
        }
        // we make sure that "ghost" pending payment are removed
        // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
        // IAP.flushFailedPurchasesCachedAsPendingAndroid()
        //   .catch((err) => {
        //     console.log(err);
        //     // exception can happen here if:
        //     // - there are pending purchases that are still pending (we can't consume a pending purchase)
        //     // in any case, you might not want to do anything special with the error
        //   })
        //   .then(() => {
            this.purchaseUpdateSubscription = purchaseUpdatedListener(
              purchase => {
                console.log('purchaseUpdatedListener', purchase);
                if(this.state?.selectItem?._id){
                const receipt = purchase.transactionReceipt;
                if (receipt) {
                  this.validate(purchase.transactionReceipt).then(
                    async deliveryResult => {
                      await finishTransaction(purchase);
                      console.log('deliveryResult', deliveryResult);
                      let purchaseDetail =
                        deliveryResult.latest_receipt_info[0];
                      let pending_renewal_info =
                        deliveryResult.pending_renewal_info &&
                        deliveryResult.pending_renewal_info[0] &&
                        deliveryResult.pending_renewal_info[0];
                      await finishTransaction(purchase, false);
                      let original_transaction_id =
                        pending_renewal_info &&
                        pending_renewal_info.original_transaction_id;
                      let auto_renew_product_id =
                        pending_renewal_info &&
                        pending_renewal_info.auto_renew_product_id;
                      let auto_renew_status =
                        pending_renewal_info &&
                        pending_renewal_info.auto_renew_status;
                      let product_id;
                      if (auto_renew_product_id && auto_renew_status == '0') {
                        console.log('if in');
                        product_id = purchaseDetail.product_id;
                      } else {
                        console.log('else in');
                        product_id = auto_renew_product_id;
                      }
                      // const AppleBody = {
                      //   transaction_id: original_transaction_id ? original_transaction_id: purchaseDetail.original_transaction_id,
                      //   purchase_date: purchaseDetail.purchase_date_ms,
                      //   is_trial_period: purchaseDetail.is_trial_period,
                      //   subscription_id: this.state.selectItem._id,
                      //   product_id: auto_renew_product_id ? auto_renew_product_id : purchaseDetail.product_id,
                      // };
                      const AppleBody = {
                        event: deliveryResult,
                        original_transaction_id: purchaseDetail.original_transaction_id,
                        transaction_id: purchase.transactionId,
                        purchase_date_ms: purchaseDetail.purchase_date_ms,
                        purchase_date: purchaseDetail.purchase_date,
                        expire_date: purchaseDetail.expires_date,
                        expire_date_ms: purchaseDetail.expires_date_ms,
                        is_trial_period: purchaseDetail.is_trial_period,
                        subscription_id: this.state.selectItem._id,
                        product_id: purchase.productId,
                      };
                      // console.log('before sending to the server ', AppleBody);
                      this.props.subscribedForApplePay(
                        AppleBody,
                        this.state.appString,
                      );
                      //   } else {
                      //     // Retry / conclude the purchase is fraudulent, etc...
                      //   }
                    },
                  );
                }
              }
              },
            );
            this.purchaseErrorSubscription = purchaseErrorListener(error => {
              console.log('purchaseErrorListener', error);
            });
      //     });
      // }).catch(err => console.log(err));
    })
  }

    if (Platform.OS == 'android') {
      // console.log('lwvgfjgvs');
      // if (this.purchaseUpdateSubscription) {
      //   this.purchaseUpdateSubscription.remove();
      //   this.purchaseUpdateSubscription = null;
      // }
      // if (this.purchaseErrorSubscription) {
      //   this.purchaseErrorSubscription.remove();
      //   this.purchaseErrorSubscription = null;
      // }
      Iap.initConnection().then(async () => {
        console.log('init connection');
        try {
          console.log("sdsf");
          const subscription = await Iap.getSubscriptions(items);
          console.log('subscriptions', subscription);
          this.setState({subscription: subscription});
          // this.state.products = products;
        } catch (err) {
          console.log('err', err); // standardized err.code and err.message available
        }
        try {
          const products = await Iap.getProducts(items);
          console.log('products==4', products);
          this.setState({products: products});
          // this.state.products = products;
        } catch (err) {
          console.warn(err); // standardized err.code and err.message available
        }

          // we make sure that "ghost" pending payment are removed
          // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
          flushFailedPurchasesCachedAsPendingAndroid()
            .catch(err => {
              // exception can happen here if:
              // - there are pending purchases that are still pending (we can't consume a pending purchase)
              // in any case, you might not want to do anything special with the error
              console.log('purchaseErrorListener', err);
            })
            .then( async () => {
              console.log("hi");
              this.purchaseUpdateSubscription = purchaseUpdatedListener( async purchase => {
                try {
                  console.log( 'purchase from purchaseUpdateSubscription ==',  purchase, );
                  if(this.state.selectItem._id){
                  const reciept = purchase.purchaseToken;
                  if (reciept) {
                    const result = await this.validateAndroid(reciept);
                      // .then(async result => {
                    console.log("res", result);
                    if (result) {
                      let purchaseDetail = result;
                      console.log('purchaseDetail==', purchaseDetail);
                      await finishTransaction(purchase, false);
                      const res =  await acknowledgePurchaseAndroid(purchase.purchaseToken, );
                      console.log("acknowledge", res)
                      // await IAP.finishTransaction(purchase, false);

                      const userData = await AsyncStorage.getItem("authUser")
                      // console.log(userData);
                      const user = JSON.parse(userData);
                      const AndroidBody = {
                        transaction_id: purchase.transactionId,
                        purchase_date: purchase.transactionDate,
                        is_trial_period: result.paymentState, // 0. Payment pending 1. Payment received 2. Free trial 3. Pending deferred upgrade/downgrade
                        subscription_id: this.state.selectItem._id,
                        product_id: purchase.productId,
                        subs_source: "android",
                        token: purchase.purchaseToken,
                        user_id: user._id,
                        expire_date: parseInt(result.expiryTimeMillis)
                      };
                      console.log('before sending to the server android body', AndroidBody );
                      this.props.subscribedForGooglePay(
                        AndroidBody,
                        this.state.appString,
                      );
                      // IAP.consumePurchaseAndroid(purchase.purchaseToken);
                      // await IAP.finishTransaction(purchase, false);
                    }
                  }
                }
                } catch (error) {
                    console.log(error);
                }
              },
            );
                      
                      
              // setTimeout(() => {
              //   this.purchaseUpdateSubscription.remove();
              // this.purchaseUpdateSubscription = null;
              // }, 1000);

              // if (this.purchaseUpdateSubscription) {
              //   this.purchaseUpdateSubscription.remove();
              //   this.purchaseUpdateSubscription = null;
              // }
              // if (this.purchaseErrorSubscription) {
              //   this.purchaseErrorSubscription.remove();
              //   this.purchaseErrorSubscription = null;
              // }

              this.purchaseErrorSubscription = purchaseErrorListener(error => {
                console.log('purchaseErrorListener', error);
              });
            });
        }).catch(err => console.log(err))
        // setTimeout(() => {
        //   // this.purchaseUpdateSubscription.remove();
        // this.purchaseUpdateSubscription = null;
        // }, 1000);
    }
  }catch(err){
    console.log(err);
  }
}

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }

  validate = async receipt => {
    try{
    const receiptBody = {
      'receipt-data': receipt,
      password: 'd9e12ca57936411f902f430a33050096',
    };

    // console.log("receiptBody", receiptBody)
    // The second parameter, you should pass whether this is test environment. If true, it will request to sandbox and false it will request to production
    const result = await validateReceiptIos(receiptBody, false)
      // .then(receipt => {
      //   console.log("receipt", receipt)
      //   return receipt;
      // })
      // .catch(err => {
      //   return {status: 'Failed'};
      // });
      // console.log("result", result);
    return result;
  }catch(err){
    console.log(err);
  }
  };

  validateAndroid = async receipt1 => {
      return new Promise( async (resolve, reject) => {
    // try{
    validateReceiptAndroid(
      'com.birlingo',
      this.state.selectItem.google_product_id,
      receipt1,
      this.state.accessToken,
      this.state.selectItem.google_product_id == 'birlingo_subsun1'
        ? false
        : true,
    ).then(receipt => {
        // console.log("receipt from validateAndroid", receipt);
        return resolve(receipt);
      })
      .catch(err => {
        // return {status: `Failed with status code = ${err.statusCode}`};
        reject(err);
        console.log(err);
      });
    // return result;
    // }catch(err){
    //   console.log(err);
    // }

    }
  )}

  getAgb = () => {
    try{
      AsyncStorage.getItem('language', (err1, item1) => {
        if (item1 != null) {
          var userDetails = JSON.parse(item1);
          const agbData = {
            language_id: userDetails.language_id
              ? userDetails.language_id
              : '5dea0938ec155c3df111d13c',
            slug: 'agb',
            device: 'web',
          };

          this.props.getAgb(agbData, this.state.appString);
        }
      });
    }catch(err){
      console.log(err);
    }
  }

  componentWillMount() {
    this._sub2 = this.props.navigation.addListener(
      'focus',
      this.viewWillAppear.bind(this),
    );
  }

  // validate = async receipt => {
  //     console.log('repppp', receipt);
  //     const receiptBody = {
  //         "receipt-data": receipt,
  //         "password": "071acd0592ff4a9c91914e97742ccc7e"
  //     }
  //     // The second parameter, you should pass whether this is test environment. If true, it will request to sandbox and false it will request to production
  //     const result = await IAP.validateReceiptIos(receiptBody, true).then(receipt => {
  //         return receipt
  //         // try {
  //         //     console.log('reccccccc', receipt);
  //         // } catch (error) {

  //         // }
  //     }).catch((err) => {
  //         return { status: 'Failed' }
  //     })
  //     return result

  // }

  viewWillAppear() {
    try{
      this.props.getSubscriptionContent();
      AsyncStorage.getItem('subscriptionStatus', (err1, item1) => {
        if (item1 != null) {
          var subscribeStatus = JSON.parse(item1);

          this.setState({subscribeStatus: subscribeStatus.is_subsribed});
        }
      });

      if (
        this.props &&
        this.props.getAppString &&
        this.props.getAppString.data !== this.state.appString
      ) {
        this.setState({appString: this.props.getAppString.data});
      }

      AsyncStorage.getItem('authUser', (err1, item1) => {
        if (item1 != null) {
          var userDetails = JSON.parse(item1);
          const postData = {
            language_id: userDetails.language_id,
            user_id: userDetails._id,
          };

          this.props.getSubscription(postData, this.state.appString);
          this.props.getSubscriptionContent();
        } else {
        }
      });
    }catch(err){
      console.log(err)
    }
  }

  componentWillReceiveProps(newProps) {
    try{
    if (
      newProps &&
      newProps.getAppString &&
      newProps.getAppString.data !== this.state.appString
    ) {
      this.setState({appString: newProps.getAppString.data});
    }
    // console.log('newProps-------',newProps)
    this.setState({subscriptionList : newProps.subscriptionList})
    // console.log();
    if (newProps && newProps.subscriptionList !== this.state.packageArr) {
      newProps.subscriptionList?.map(item => {
        if (item.user_sub_checked && item.user_sub_checked == 1) {
          this.setState({
            selectedSub: item._id,
            subscriptionData: {
              total_price: item.total_price,
              planId: item._id,
            },
          });
          this.flag = true;
        }
      });

      var newArray = [];
      newProps.subscriptionList?.map((ele, index) => {
        if(ele?.subs_source=='website'){
          this.setState({steNew:true})
        }else if(ele.payment_status == "processing"){
          this.setState({steNew:true})
        }else if(ele?.subs_source== "android" && Platform.OS == "ios"){
          this.setState({steNew:true, androidSubscription: true})
        }else if(ele?.subs_source== "ios" && Platform.OS == "android"){
          this.setState({steNew:true, iosSubscription : true})
        }
        })
       console.log('newProps.subscriptionList',newProps.subscriptionList)
      newProps.subscriptionList?.map((ele, index) => {
        // console.log('ele', ele);
        let obj = {
          cancel_scheduled: ele.cancel_scheduled,
          description: ele.description,
          description_mob: ele.description_mob,
          expire: ele.expire,
          is_cancel: ele.is_cancel,
          name: ele.name,
          payment_status: ele.payment_status,
          plan_ended: ele.plan_ended,
          month_price: ele.price,
          price: ele.total,
          startdate: ele.startdate,
          status: ele.status,
          stripe_id: ele.stripe_id,
          subscribed_id: ele.subscribed_id,
          subscription_saving: ele.subscription_saving,
          subscription_schedule_name: ele.subscription_schedule_name,
          susbcrition_name: ele.susbcrition_name,
          validity: ele.validity,
          _id: ele._id,
          active: false,
          error: '',
          apple_product_id: ele.apple_product_id,
          google_product_id: ele.google_product_id,

          subs_srource:ele?.subs_srource?ele.subs_srource:'',
          subs_srource1:ele?.subs_srource?true:false,
        };
        newArray.push(obj);
      });
      // console.log('newArray ===>', newArray);
      this.setState({packageArr: newArray});
    }
    if (newProps && newProps.subscriptionContent) {
      this.setState({
        heading:
          newProps.subscriptionContent && newProps.subscriptionContent.heading,
        description:
          newProps.subscriptionContent &&
          newProps.subscriptionContent.description,
        agbDetails: newProps.agbDetails?.AgbDetails[0]?.description,
      });
    }
  }catch(err){
    console.log(err);
  }
}

  convertUnicode = input => {
    return input.replace(/\\u(\w{4,4})/g, function(a, b) {
      var charcode = parseInt(b, 16);
      return String.fromCharCode(charcode);
    });
  };

  getText = (appString, item) => {
    console.log("item", item);
    console.log(this.state.subscriptionList[0].payment_status != "");
    if(this.state.subscriptionList[0].payment_status != "" && this.state.subscriptionList[1].payment_status != "" && item.payment_status == "not_started"){
      return "es wird aktiviert" + ' ' + moment(item.expire).format('DD.MM.YY')
    }
    if(item.cancel_scheduled){
      return "Abbrechen geplant am" + ' ' + moment(item.expire).format('DD.MM.YY')
    }else{
      return appString.lbl_Your_current_subscription  + ' | ' + appString.lbl_Date_of_Expiry + ' ' + moment(item.expire).format('DD.MM.YY')

    }
  } 

  cancelPlan = item => {
    let data = {
      subscribed_id: item.subscribed_id,
    };

    console.log('item from cancelPlan', item);

    if (Platform.OS == 'ios') {
      Linking.openURL('https://apps.apple.com/account/subscriptions');
    } else {
      // this.props.cancelPlan(data, this.state.appString);
      Linking.openURL(
        `https://play.google.com/store/account/subscriptions?package=com.birlingo&sku=${
          item.google_product_id
        }`,
      );
    }

    // this.props.cancelPlan(data, this.state.appString);
  };

  _cancelSubsPlan = data => {
    const {appString} = this.state;
    Alert.alert(
      appString && appString.lbl_cancel_subs_confirm,
      '',
      [
        {
          text: appString && appString.lbl_no,
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: appString && appString.lbl_yes,
          onPress: () => this.cancelPlan(data),
        },
        // { text: appString && appString.lbl_yes, onPress: () => this.logout() }
      ],
      {cancelable: false},
    );
    return true;
  };

  toggle = index => {
    let data = this.state.packageArr;
    data?.map((item, key) => {
      if (key == index) {
        if (item.expend == true) {
          item.expend = false;
        } else {
          item.expend = true;
        }
      } else {
        item.expend = false;
      }
    });

    this.setState({packageArr: data});
  };

  accountList = (item, index) => {
    // console.log('lbl_subscribed_from_web',item)
    // console.log('item-------',item.subs_srource1,this.state.steNew)
    const {appString} = this.state;

    if (item.user_sub_checked === 1 && this.flag) {
      this.setState({subscriptionId: index});
      this.flag = false;
    }
    let price = item.price * item.validity;
    let netPrice = price.toFixed(2);
    // console.log('item======', item.validity);
    const source = {
      html: item.description_mob
    };
    return (
      <View style={{marginTop: 50, flex: 1}}>
       
        {item.payment_status == 'trialing' ||
        item.payment_status == 'active' ||
        item.payment_status == 'not_started' ||
        item.payment_status == "processing" ? (
          
          <View
            activeOpacity={0.8}
            style={item.expend ? styles.accordianView_2 : styles.accordianView}
            onPress={() => {
              this.toggle(index);
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: colors.progressBackColor,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              {item.validity != 240 ? (
                <Text
                  style={
                    item.expend
                      ? styles.subcriptionType_2
                      : styles.subcriptionType
                  }>
                  {item.validity}-{appString.lbl_monthly_subscription}
                </Text>
              ) : (
                <Text
                  style={
                    item.expend
                      ? styles.subcriptionType_2
                      : styles.subcriptionType
                  }>
                  {appString.lbl_Lifetime_access}
                </Text>
              )}
            </View>
            <View style={styles.accordianSecondRowView}>
              <View style={styles.accordianSecondRowView_colTwo}>
                {item.validity != 240 ? (
                  <Text
                    style={
                      item.expend ? styles.amountText_2 : styles.amountText
                    }>
                    {/* {'Preis Total € '} {item.price.toFixed(2)} */}
                    {'€ '} {item.price.toFixed(2)} {'alle'} {item.validity}{' '}
                    {'Monate'}
                  </Text>
                ) : null}
                {item.validity != 240 ? (
                  <Text
                    style={
                      item.expend
                        ? styles.accordinSecondRowText_colTwo_2
                        : styles.accordinSecondRowText_colTwo
                    }>
                    € {item.month_price.toFixed(2)} {appString.lbl_per_month}
                  </Text>
                ) : (
                  <Text
                    style={
                      item.expend ? styles.amountText_2 : styles.amountText
                    }>
                    € {item.month_price.toFixed(2)} {appString.lbl_unique}
                  </Text>
                )}
              {/* <AutoHeightWebView
                startInLoadingState={true}
                customStyle={`p {font-size: ${this.fontsize}px;}`}
                style={{
                  width:'100%',
            
         
                  //backgroundColor: "white"
                }}
                // customScript={`document.body.style.background = 'white';`}
            
                // or uri
                source={{
                  html: `${item.description}`,
                }}
                zoomable={false}
              /> */}
              <RenderHtml source={source}/>
              </View>
            </View>
            {/* <View style={{paddingHorizontal: 20, paddingTop: 20}}>
              <TouchableOpacity onPress={() => this._cancelSubsPlan(item)}>
                <Text
                  style={{
                    fontSize: 14,
                    // color: '#fff',
                    textDecorationLine: 'underline',
                  }}>
                  {appString && appString.lbl_cancel_subscription}
                </Text>
              </TouchableOpacity>

              <Lable
                style={{marginBottom: 10}}
                size={12}
                color={colors.red}
                title={item.error}
              />
            </View> */}
            <View style={styles.accordianSecondRowView}>
              {/* {item.validity != 240 && (
                <TouchableOpacity
                  // onPress={() => this._goToPayment(item, index)}
                  disabled={true}
                  style={styles.touchableButton_3}>
                  <Text style={styles.touchableText_3}>
                    {appString.lbl_Your_current_subscription} {'|'}{' '}
                    {appString.lbl_Date_of_Expiry}{' '}
                    {moment(item.expire).format('DD.MM.YY')}
                  </Text>
                </TouchableOpacity>
              )} */}
              {
                console.log('item',item.subs_srource)
              }
              <TouchableOpacity
                // onPress={() => this._goToPayment(item, index)}
                disabled={true}
                style={styles.touchableButton_3}>
                <Text style={styles.touchableText_3}>
                  {this.getText(appString, item)}
                  
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            activeOpacity={0.8}
            style={item.expend ? styles.accordianView_2 : styles.accordianView}
            onPress={() => {
              this.toggle(index);
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: colors.progressBackColor,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              {item.validity != 240 ? (
                <Text
                  style={
                    item.expend
                      ? styles.subcriptionType_2
                      : styles.subcriptionType
                  }>
                  {item.validity}-{appString.lbl_monthly_subscription}
                </Text>
              ) : (
                <Text
                  style={
                    item.expend
                      ? styles.subcriptionType_2
                      : styles.subcriptionType
                  }>
                  {appString.lbl_Lifetime_access}
                </Text>
              )}
            
            </View>
            <View style={styles.accordianSecondRowView}>
              {/* <View style={styles.accordianSecondRowView_colOne}>
                <Text
                  style={
                    item.expend
                      ? styles.accordinFirstRowText_2
                      : styles.accordinFirstRowText
                  }
                >
                  {item.name}
                </Text>
              </View> */}

              <View style={styles.accordianSecondRowView_colTwo}>
                {item.validity != 240 ? (
                  <Text
                    style={
                      item.expend ? styles.amountText_2 : styles.amountText
                    }>
                    {/* {'Preis Total € '} {item.price.toFixed(2)} */}
                    {'€ '} {item.price.toFixed(2)} {'alle'} {item.validity}{' '}
                    {'Monate'}
                  </Text>
                ) : null}

                {item.validity != 240 ? (
                  <Text
                    style={
                      item.expend
                        ? styles.accordinSecondRowText_colTwo_2
                        : styles.accordinSecondRowText_colTwo
                    }>
                    € {item.month_price.toFixed(2)} {appString.lbl_per_month}
                  </Text>
                ) : (
                  <Text
                    style={
                      item.expend ? styles.amountText_2 : styles.amountText
                    }>
                    € {item.month_price.toFixed(2)} {appString.lbl_unique}
                  </Text>
                )}
              {/* <AutoHeightWebView
                startInLoadingState={true}
                customStyle={`p {font-size: ${this.fontsize}px;}`}
                style={{
                  width:'100%',
         
            //backgroundColor: "white"
                }}
          // customScript={`document.body.style.background = 'white';`}
      
          // or uri
                source={{
                  html: `${item.description}`,
                }}
                zoomable={false}
              /> */}
              {/* <WebView source={{html:`${item.description}`}} originWhitelist={['*']}/> */}
              <RenderHtml source={source}/>
              </View>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <View
                style={[
                  styles.termCheck,
                  {alignItems: 'center', marginLeft: -10, marginTop: 0},
                ]}>
                  {
                    this.state.steNew==false?
                    <TouchableOpacity
                    activeOpacity={1}
                    style={styles.checkBoxStyle}
                    onPress={() => this.check2(index)}>
                    <Checkbox
                      placeholder={''}
                      fontSize={14}
                      checked={item.active}
                      onPress={() => this.check2(index)}
                      tint_color={colors.maroon}
                    />
                  </TouchableOpacity>
                  :null
                  }
               
                <Text
                  style={item.expend ? styles.checkText_3 : styles.checkText_4}>
                  {appString && appString.msg_privacy_policy_web}
                </Text>
                <TouchableOpacity
                  style={styles.ExpendedTextView}
                  onPress={() =>
                    // { Linking.openURL('https://birlingo.de/agb') }
                    this.setState({visible1: true})
                  }>
                  <Text
                    style={
                      item.expend ? styles.checkText_1 : styles.checkText_2
                    }>
                    {appString && appString.msg_privacy_policy_link}
                  </Text>
                </TouchableOpacity>
              </View>

              <Lable
                style={{marginBottom: 10}}
                size={12}
                color={colors.red}
                title={item.error}
              />
            </View>
            <View style={[styles.accordianSecondRowView, { marginTop: -10 }]}>
              {
                console.log('this',this.state.subscriptionList)
              }
              {this.state.subscriptionList[2].payment_status == "active" ? null : this.state.steNew == false &&
              <TouchableOpacity
                onPress={() => this._goToPayment(item, index)}
                style={
                  item.expend
                    ? styles.touchableButton_2
                    : styles.touchableButton
                }>
                <Text
                  style={
                    item.expend ? styles.touchableText_2 : styles.touchableText
                  }>
                  {appString.lbl_choose}
                </Text>
              </TouchableOpacity>}
              {/* <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                <Text style={item.expend ? styles.safeText_2 : styles.safeText}>
                  {item &&
                  item.subscription_saving != null &&
                  item.subscription_saving != 0
                    ? appString.lbl_safe + " €" + item.subscription_saving
                    : ""}
                </Text>
              </View> */}
            </View>
            {item.validity != 3 && (
              <View
                style={{
                  backgroundColor: colors.code_blk,
                  // borderRadius: 5,
                  position: 'absolute',
                  top: -15,
                  right: 10,
                  // paddingVertical: 4,
                  paddingHorizontal: 8,
                  alignItems: 'center',
                  paddingVertical: 20,
                  height:Dimensions.get('window').width > 670 ? 120:100,
                  justifyContent: 'center',
                  width:Dimensions.get('window').width > 670 ? 110:90,
                }}>
                <Text
                  style={{
                    color: colors.code_fff,
                    fontSize:Dimensions.get('window').width > 670 ?22:12,
                    
                    textAlign: 'center',
                  }}>
                  {item?.subscription_saving
                    ? // appString.lbl_safe
                      'monatlich 20 % günstiger'
                    : appString.lbl_access_forever}
                </Text>
                {/* {item?.subscription_saving && (
                  <Text
                    style={{
                      color: colors.code_fff,
                      fontSize: 12,
                      textAlign: 'center',
                    }}>
                    {`€ ${item?.subscription_saving.toFixed(2)}`}
                  </Text>
                )} */}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  async _goToPayment(item, index) {
    const userData = await AsyncStorage.getItem("authUser")
    // console.log(userData);
    const user = JSON.parse(userData);
    // console.log("user", user);
    console.log("item", item);
    const response = await doPost(`${apiUrls.isAlreadySubscribed}`, {user_id: user._id});
        console.log("subscription", response);
    try{
      if(Platform.OS == "ios" && item.apple_product_id == "Birlingo_SubsUn1"){
        const response = await doPost(`${apiUrls.isAlreadySubscribed}`, {user_id: user._id});
        // const response = await postService("isAlreadySubscribed", {user_id: user._id}) 
        console.log("subscription", response);
        if(response.data.subscribed == true){
          showDangerToast("Bereits abonniert. Bitte kündigen Sie das vorherige Abonnement")
          return
        }
      }else if(Platform.OS == "android" && item.google_product_id == "birlingo_subsun1"){
        const response = await doPost(`${apiUrls.isAlreadySubscribed}`, {user_id: user._id});
        console.log("subscription", response);
        if(response.data.subscribed == true){
          showDangerToast("Bereits abonniert. Bitte kündigen Sie das vorherige Abonnement")
          return
        }
      }else if(Platform.OS == "android" && item.google_product_id == "birlingo_subs3"){
        const response = await doPost(`${apiUrls.isAlreadySubscribed}`, {user_id: user._id}); 
        console.log("subscription", response);
        if(response.data.subscribed == true){
          showDangerToast("Bereits abonniert. Bitte kündigen Sie das vorherige Abonnement")
          return
        }
      }else if(Platform.OS == "android" && item.google_product_id == "birlingo_subs6"){
        const response = await doPost(`${apiUrls.isAlreadySubscribed}`, {user_id: user._id});
        console.log("subscription", response);
        if(response.data.subscribed == true){
          showDangerToast("Bereits abonniert. Bitte kündigen Sie das vorherige Abonnement")
          return
        }
      }
      const some_array = [...this.state.packageArr];
      var check2Error = '';
      if (some_array[index].active != true) {
        some_array[index].error = 'Bitte stimmen Sie den Bedingungen zu.';
        check2Error = 'Bitte stimmen Sie den Bedingungen zu.';
      } else {
        check2Error = '';
      }
      this.setState({packageArr: some_array});
      const {appString} = this.state;

      if (check2Error) {
      } else {
        this.setState({selectItem: item});
        // console.log('item from _goToPayment', item);
        this.state.selectItem = item;
        this._skip();
      }
    }catch(err){
      console.log("error", err);
    }
  }
  onModalDisable() {
    this.setState({visible: false, visible1: false});
  }

  _goBack = () => {
    this.setState({modalVisible: false, visible1: false});
  };
  _applyCoupon = code => {
    // this.setState({isLoading: true});

    // const couponData = {
    //   subscription_id: this.state.selectItem._id,
    //   code: code,
    // };
    // postService('apply-coupon', couponData).then(res => {
    //   this.setState({isLoading: false}, () => {
    //     if (res.data.success === false) {
    //       this.setState({
    //         promoCodeError: this.state.appString[res.data.message],
    //       });
    //       //showDangerToast(this.state.appString[res.data.message]);
    //     } else {
    //       showDangerToast(this.state.appString[res.data.message]);
    //       this.setState({modalVisible: false}, () => {
    //         setTimeout(() => {
    //           this.setState({promoCodeError: ''}, () => {
    //             if (res.data.statuscode == 200) {
    //               const obj = {
    //                 stripe_id: this.state.selectItem.stripe_id,
    //                 planId: this.state.selectItem._id,
    //                 total_price:
    //                   this.state.selectItem.price *
    //                   this.state.selectItem.validity,
    //                 pay_status: this.state.selectItem.payment_status,
    //                 couponData: res.data,
    //               };

    //               this.props.navigation.navigate('settingsPayment', {
    //                 payData: obj,
    //               });
    //             }
    //           });
    //         }, 2000);
    //       });
    //     }
    //   });
    // }).catch(err => console.log(err));
  };

  check2 = index => {
    this.setState({
      checked2: !this.state.checked2,
      check2Error: validate('check_term_condition', !this.state.checked2),
    });

    const some_array = [...this.state.packageArr];
    some_array.map((ele, i) => {
      if (index == i && some_array[index].active != true) {
        ele.active = true;
        ele.error = '';
        this.setState({packageArr: some_array});
      } else {
        ele.active = false;
        if (some_array[index].active != true) {
          some_array[index].error = 'Bitte stimmen Sie den Bedingungen zu.';
        }
      }
    });
  };

  _skip = async () => {
    try{
    this.setState({modalVisible: false});
    // const obj = {
    //   stripe_id: this.state.selectItem.stripe_id,
    //   planId: this.state.selectItem._id,
    //   total_price: this.state.selectItem.price,
    //   pay_status: this.state.selectItem.payment_status,
    //   coupon: '',
    //   couponData: {statuscode: 400},
    // };
    // console.log('this.state.accessToken from _skip', this.state.accessToken);
    // Platform.OS == 'android'
    //   ? this.props.navigation.navigate('settingsPayment', {
    //       payData: obj,
    //       inAppDataProductId: this.state.selectItem.apple_product_id,
    //     })
    //   : IAP.requestSubscription(this.state.selectItem.apple_product_id); //this.state.selectItem.apple_prod
    console.log('this.state.selectItem skip', this.state.selectItem);
    console.log('this.state.subscription', this.state.subscription);

    // var offerToken;
    // for(let i = 0; i < this.state.subscription.length ; i++){
    //   console.log(this.state.subscription[i].productId);
    //   if(this.state.subscription[i].productId == this.state.selectItem.google_product_id ){
    //     console.log(this.state.subscription[i]);
    //     offerToken = this.state.subscription[i].subscriptionOfferDetails[0].offerToken
    //   }
    // }
    // var sku =  this.state.selectItem.google_product_id;
    // console.log(offerToken);

    if(Platform.OS == "android" && this.state.selectItem.google_product_id == "birlingo_subsun1"){
      const product = await requestPurchase(this.state.selectItem.google_product_id);
      console.log("product", product);
      return;
    }
    const result = Platform.OS == 'android' ? 
      await requestSubscription(this.state.selectItem.google_product_id,) : 
      await requestSubscription(this.state.selectItem.apple_product_id );
    console.log("result", result);
    // console.log("result", result);
    }catch(err){
      console.log(err);
    }
  }

  // subContent = () => {
  //     // this.state.description.map((desc)=>{
  //         console.log('this.state.description', this.state.description.length);
  //     // })
  //     for(let i = 0; i<this.state.description;i++){
  //         console.log('ibfsmh',this.state.description[i]);
  //     }
  // }

  render() {
    const {appString} = this.state;
    console.log('this.state', this.state);
    console.log('this.props', this.props);
    const {isLoading} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Loader loading={isLoading} />
        {/* <PromoCode
          visible={this.state.modalVisible}
          _goBack={this._goBack}
          applyCoupon={this._applyCoupon}
          _skip={this._skip}
          codeError={this.state.promoCodeError}
          appString={appString}
        /> */}

        {/* <AgbModal
          visible={this.state.visible1}
          onDisable={this._goBack}
          _yes={this._yesThird}
          _no={this._noThird}
          agbDetails={this.state.agbDetails}
          appString={appString}
        /> */}
        <LinearGradient colors={colors.backGround} style={{flex: 1}}>
          <SettingHeaderTitle
            title={appString && appString.lbl_subscription_title}
            navigation={this.props.navigation}
            fSize={ Dimensions.get('window').width > 670 ?40:22}
            goBack={() => {
              this.props.navigation.goBack();
            }}
          />

          {/* <Content style={{flex: 1}}> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.subTitleView}>
                {/* <Text style={styles.subTitle}>{appString && appString.lbl_subscription_desc}</Text> */}
                <Text style={styles.subTitle}>
                  {this.state.heading
                    ? this.state.heading
                    : 'Wählen Sie ein Abo für den vollen Zugriff auf alle Lektionen in allen Sprachen:'}
                </Text>
                {/* {console.log('appStringtest',appString.lbl_subscribed_from_web)} */}
                {
                    this.state.steNew==false ? null : 
                    <View  style={styles.subtestView}>
                    <Image source={images.info} style={styles.image} />
                      <Text style={styles.puchaseby}>{this.state.androidSubscription ? appString.lbl_subscribed_from_android : this.state.iosSubscription ? appString.lbl_subscribed_from_ios :  appString.lbl_subscribed_from_web}</Text>
                    </View>
                }
            
                {/* <View style={{marginTop: 20}}>
                  <Unorderedlist
                    color="white"
                    style={{fontSize: 20}}
                    bulletUnicode={0x2022}>
                    <Text style={[styles.subTitle, {marginTop: 4}]}>
                      {this.state.description[0] != null
                        ? this.state.description[0]
                        : 'Kein Risiko: 30 Tage Geld-zurück-Garantie'}
                    </Text>
                  </Unorderedlist>
                </View> */}
                {/* <Unorderedlist
                  color="white"
                  style={{fontSize: 20}}
                  bulletUnicode={0x2022}>
                  <Text style={[styles.subTitle, {marginTop: 4}]}>
                    {this.state.description[1] != null
                      ? this.state.description[1]
                      : 'Jederzeit per sofort kündbar'}
                  </Text>
                </Unorderedlist>
                <Unorderedlist
                  color="white"
                  style={{fontSize: 20}}
                  bulletUnicode={0x2022}>
                  <Text style={[styles.subTitle, {marginTop: 4}]}>
                    {this.state.description[2] != null
                      ? this.state.description[2]
                      : 'Die ersten 14 Tage der Abos sind geschenkt'}
                  </Text>
                </Unorderedlist> */}
            </View>
          

            <View style={styles.formContainer}>
              <FlatList
                // showsVerticalScrollIndicator={false}
                
                data={this.state.packageArr}
                initialNumToRender={3}
                renderItem={({item, index}) => this.accountList(item, index)}
                keyExtractor={item => item.id}
                style={{marginTop:-40}}
                // onEndReached={(e) => console.log("e", e)}
              />
            </View>

            <View style={styles.subTitleView}>
              <Text style={styles.subTitle}>Infos zu den Abos:</Text>
              <View style={{marginTop: 10}}>
                <Unorderedlist
                  color="white"
                  style={{fontSize: 24}}
                  bulletUnicode={0x2022}>
                  <Text style={[styles.subTitle, {marginTop: 4}]}>
                    Beim 3-Monats-Abo und beim 6-Monats-Abo sind die ersten 14
                    Tage sind kostenlos. Wenn Sie in dieser Zeit kündigen,
                    entstehen keine Kosten. Ohne Kündigung wird der Totalpreis
                    gemäß Abo-Beschreibung nach 14 Tagen über Ihr iTunes oder
                    Google Play Konto abgebucht. Dort können Sie Ihr Abo
                    jederzeit per sofort kündigen. Ohne Kündigung erneuert sich
                    das Abo automatisch.
                  </Text>
                </Unorderedlist>
              </View>
              <Unorderedlist
                color="white"
                style={{fontSize: 24}}
                bulletUnicode={0x2022}>
                <Text style={[styles.subTitle, {marginTop: 4}]}>
                  Beim Lifetime-Zugang bezahlen Sie sofort und Sie erhalten
                  zeitlich unbegrenzten Zugriff auf alle Lektionen in allen
                  Sprachen.
                </Text>
              </Unorderedlist>
            </View>

            {/* <View style={styles.noteView}> */}
              {/* {this.state.packageArr[0] && this.state.packageArr[0].description ? <AutoHeightWebView
                                startInLoadingState={true}
                                scrollEnabled={false}
                                customStyle={`p {font-size: ${this.fontsize}px;}`}
                                style={{
                                    width: 375,
                                    // marginTop: 16,
                                    //marginLeft: 20,

                                }}
                                // or uri
                                source={{
                                    html: `<p>${this.state.packageArr[0] && this.state.packageArr[0].description}</p>`
                                }}
                                zoomable={false}
                            /> : null} */}
            {/* </View> */}
          {/* </Content> */}

          </ScrollView>
          {/* <BottomTab
            tabNum={2}
            navigation={this.props.navigation}
            appString={appString}
          /> */}
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriptionList: state.subscription.subscriptionList,
    getAppString: state.appLanguage.getAppString,
    subscriptionContent: state.subscription.subscriptionContent,
    accessToken: state.subscription.accessToken,
    agbDetails: state.Agb.AgbDetails,
    isLoading : state.systemWorking.visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSubscription: (data, appString) => {
      dispatch(getSubscriptionAction(data, appString));
    },
    getAccessToken: () => {
      dispatch(getAccessTokenAction());
    },
    getSubscriptionContent: () => {
      dispatch(getSubscriptionContentAction());
    },
    cancelPlan: (data, appString) => {
      dispatch(cancelPlanAction(data, appString));
    },
    getAgb: userId => {
      dispatch(getAgbAction(userId));
    },
    subscribedForApplePay: (data, appString) => {
      dispatch(subscribedForApplePay(data, appString));
    },
    subscribedForGooglePay: (data, appString) => {
      dispatch(subscribedForGooglePay(data, appString));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsAccount);
