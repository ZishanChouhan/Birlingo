import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {images, colors} from '../../../Theme';
import {styles} from './styles';
import {paymentAction, subscribedForApplePay} from './actions';
import {showToast, showDangerToast} from '../../../assets/utility/ToastMessage';
import {SettingHeaderTitle} from '../../../components';
import {getService} from '../../../services/getServices';
import IAP from 'react-native-iap';
import LinearGradient from 'react-native-linear-gradient';
import { apiUrls } from '../../../api/constants/constants';
import { doGet } from '../../../actions/fetchApiActions';
const items = Platform.select({
  ios: [
    'Birlingo_Subs1',
    'Birlingo_Subs3',
    'Birlingo_Subs6',
    'Birlingo_Subs12',
    'Birlingo_SubsUn1',
  ],
});

// let purchasseUpdatedListener
// let purchaseErrorListener

class SettingsPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appString: '',
      token: null,
      allowed: '',
      userName: '',
      userEmail: '',
      promoCodeError: '',

      subscriptionData:
        this.props.navigation.state.params &&
        this.props.navigation.state.params.payData,
      purchased: false,
      products: {},
      inAppDataProductId:
        this.props.navigation.state.params &&
        this.props.navigation.state.params.inAppDataProductId,
      purchased: false,
      products: {},
    };
  }

  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;

  async componentDidMount() {
    console.log('this.state.subscriptionData', this.state.subscriptionData);
    if (
      this.props &&
      this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString
    ) {
      this.setState({appString: this.props.getAppString.data});
    }

    doGet(`${apiUrls.getStoreUrl}`).then(async res => {
    // getService('getSettingData').then(res => {
      console.log("res from getService('getSettingData')", res);
      global.payment_mode = res.data.payment_mode;
      global.public_key_test = res.data.public_key_test;
      global.public_key_live = res.data.public_key_live;
    //   stripe.setOptions({
    //     publishableKey:
    //       res.data.data.payment_mode == 0
    //         ? res.data.data.public_key_test
    //         : res.data.data.public_key_live,
    //     // merchantId: 'merchant.com.birlingoApp1', //"merchant.com.app.multiparkvalet", // Optional
    //     androidPayMode: 'test', // Android only
    //   });
    });
    AsyncStorage.getItem('authUser', (err1, item1) => {
      if (item1 != null) {
        var userDetails = JSON.parse(item1);
        this.setState({
          userID: userDetails._id,
          userName: userDetails.name,
          userEmail: userDetails.email,
        });
      }
    });

    if (Platform.OS == 'ios') {
      console.log('alpha 21');
      IAP.initConnection()
        .catch(() => {
          console.log('error connecting to store..');
        })
        .then(async () => {
          console.log('Connected to store....');
          await IAP.getSubscriptions(items)
            .catch(() => {
              console.log('error in finding purchases');
            })
            .then(res => {
              console.log('got products', res);
              this.setState({products: res});
              this.state.products = res;
              // console.log('this.state.products', this.state.products);
            });

          this.purchaseUpdateSubscription = IAP.purchaseUpdatedListener(
            purchase => {
              console.log('purchase', purchase);
              const reciept = purchase.transactionReceipt;
              console.log('reciept', reciept);
              var AppleBody;
              if (reciept) {
                this.validate(reciept).then(result => {
                  console.log('validate result', result);
                  if (result.status == 0) {
                    console.log('IAP purchase function called');
                    IAP.finishTransactionIOS(purchase.transactionId);
                    let purchaseDetail = result.latest_receipt_info[0];
                    console.log('purchaseDetail', purchaseDetail);
                    IAP.finishTransaction(purchase, true);
                    console.log(
                      'this.state.subscriptionData12',
                      this.state.subscriptionData,
                    );
                    AppleBody = {
                      transaction_id: purchaseDetail.transaction_id,
                      purchase_date: purchaseDetail.purchase_date_ms,
                      is_trial_period: purchaseDetail.is_trial_period,
                      subscription_id: this.state.subscriptionData.planId,
                      product_id: purchaseDetail.product_id,
                    };
                    console.log('before sending to the server ', AppleBody);
                    this.props.subscribedForApplePay(
                      AppleBody,
                      this.state.appString,
                    );
                  }
                });
              }
            },
          );

          this.purchaseErrorSubscription = IAP.purchaseErrorListener(error => {
            console.log('purchaseErrorListener error part', error);
          });
        });
    }
  }

  // componentWillUnmount() {

  //     if (Platform.OS == 'ios') {
  //         if (this.purchasseUpdatedListener) {
  //             this.purchasseUpdatedListener.remove();
  //             this.purchasseUpdatedListener = null;
  //         }
  //         if (this.purchaseErrorSubscription) {
  //             this.purchaseErrorSubscription.remove();
  //             this.purchaseErrorSubscription = null;
  //         }
  //     }
  // }

  componentWillUnmount() {
    if (Platform.OS == 'ios') {
      if (this.purchaseUpdateSubscription) {
        this.purchaseUpdateSubscription.remove();
        this.purchaseUpdateSubscription = null;
      }
      if (this.purchaseErrorSubscription) {
        this.purchaseErrorSubscription.remove();
        this.purchaseErrorSubscription = null;
      }
    }
  }

  validate = async receipt => {
    console.log('repppp', receipt);
    const receiptBody = {
      'receipt-data': receipt,
      password: '071acd0592ff4a9c91914e97742ccc7e',
    };
    // The second parameter, you should pass whether this is test environment. If true, it will request to sandbox and false it will request to production
    const result = await IAP.validateReceiptIos(receiptBody, true)
      .then(receipt => {
        console.log('repppp====', receipt);
        return receipt;
        // try {
        //     console.log('reccccccc', receipt);
        // } catch (error) {

        // }
      })
      .catch(err => {
        return {status: 'Failed'};
      });
    return result;
  };

  handleApplePayPress = async () => {
    // let deviceSupport = await stripe.deviceSupportsNativePay();
    // let makePayment = await stripe.canMakeNativePayPayments();

    // if (!deviceSupport) {
    //     showDangerToast(this.state.appString.msg_applepay_not_support);
    //     return;
    // }

    // if (!makePayment) {
    //     showDangerToast(this.state.appString.msg_payment_cards);
    //     return;
    // }

    // const items = [
    //     {
    //         label: `${this.state.userName}`,
    //         amount: `${this.state.subscriptionData.total_price}`,
    //     }
    // ];

    // const shippingMethods = [
    //     {
    //         id: "fedex",
    //         label: "FedEX",
    //         detail: "Test @ 10",
    //         amount: "1.00"
    //     }
    // ];
    // const options = {
    //     requiredBillingAddressFields: ["all"],
    //     requiredShippingAddressFields: ["phone", "postal_address"],
    //     // shippingMethod: shippingMethods
    // };

    // try {
    //     this.setState({ token: null });
    //     const token = await stripe.paymentRequestWithApplePay(
    //         items,
    //         options
    //     );
    //     stripe.completeApplePayRequest();

    //     this.setState({ token }, () => {
    //         if (this.state.token != null) {
    //             this.requestToMakePayment(token.tokenId, "applepay");   // paymentType = applepay  =>  for apple pay
    //         }
    //     });

    // } catch (error) {
    //     console.log("token error on makepayment  screen ", error);
    //     stripe.cancelApplePayRequest();
    // }
    IAP.requestSubscription(this.state.inAppDataProductId);
  };

  androidPayment = async () => {
    try {
      console.log('in try block', this.state.subscriptionData);
      this.setState({token: null});
      let token;
      // await stripe
      //   .paymentRequestWithNativePay({
      //     total_price: `${this.state.subscriptionData.total_price.toFixed(2)}`,
      //     currency_code: 'EUR',
      //     // shipping_address_required: true,
      //     // phone_number_required: true,
      //     // shipping_countries: ["US", "CA"],
      //     line_items: [
      //       {
      //         currency_code: 'EUR',
      //         description: 'birlingo',
      //         total_price: `${this.state.subscriptionData.total_price.toFixed(
      //           2,
      //         )}`,
      //         unit_price: `${this.state.subscriptionData.total_price.toFixed(
      //           2,
      //         )}`,
      //         quantity: '1',
      //       },
      //     ],
      //   })
      //   .then(Token => {
      //     console.log('token from then', Token);
      //     token = Token;
      //   })
      //   .catch(err => {
      //     console.log('err from catch.....', err);
      //   });

      console.log('in try block token', token);

      this.setState({token}, () => {
        if (this.state.token != null) {
          console.log('googlePay');
          this.requestToMakePayment(token.tokenId, 'googlepay'); // paymentType = googlepay  =>  for android pay
        }
      });
      // stripe.completeNativePayRequest();
    } catch (error) {
      showDangerToast(this.state.appString.msg_googlepay_not_support);
      console.log('token error on makepayment  screen ', error);
    }

    // const allowedCardNetworks = [
    //   'AMEX',
    //   'DISCOVER',
    //   'JCB',
    //   'MASTERCARD',
    //   'VISA',
    // ];
    // const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
    // const requestData = {
    //   cardPaymentMethod: {
    //     tokenizationSpecification: {
    //       type: 'PAYMENT_GATEWAY',
    //       // stripe (see Example):
    //       gateway: 'stripe',
    //       gatewayMerchantId: '',
    //       stripe: {
    //         publishableKey:
    //         global.public_key_live,
    //         // publishableKey: 'pk_test_51J5Od1LuHYJfNo16sGevFY4xrdq6ExtfIB2w4J1xqOi9w5EvLkJsibdDVg90kDyQWfJcuzKOXF9mQifKOJDMFLXF00xhtB6yhI',

    //         version: '2018-11-08',
    //       },
    //     },
    //     allowedCardNetworks,
    //     allowedCardAuthMethods,
    //   },
    //   transaction: {
    //     totalPrice: this.state.subscriptionData.total_price.toFixed(2),
    //     totalPriceStatus: 'FINAL',
    //     currencyCode: 'EUR',
    //   },
    //   merchantName: 'Example Merchant',
    // };

    // GooglePay.setEnvironment(GooglePay.ENVIRONMENT_PRODUCTION);

    // // Check if Google Pay is available
    // GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
    //   ready => {
    //     if (ready) {
    //       // Request payment token
    //       console.log('yhaa aa gya');
    //       GooglePay.requestPayment(requestData)
    //         .then(token => {
    //           // Send a token to your payment gateway
    //           const newToken = JSON.parse(token);
    //           console.log('my token', newToken);
    //           // notaryRequest(newToken?.id);
    //           this.requestToMakePayment(newToken?.id, 'googlepay'); // paymentType = googlepay  =>  for android pay
    //         })
    //         .catch(error => console.log('bhjvfhjuvhjadfv ', error));
    //     }
    //   },
    // );
  };

  handleCardPayPress = async () => {
    try {
      this.setState({token: null});
      const token = await stripe
        .paymentRequestWithCardForm({
          smsAutofillDisabled: true,
          // requiredBillingAddressFields: 'full',
          // prefilledInformation: {
          //     billingAddress: {
          //         name: this.state.userName,
          //         line1: '',
          //         line2: '',
          //         city: '',
          //         state: '',
          //         country: '',
          //         postalCode: '',
          //         email: this.state.userEmail,
          //     },
          // },
        })
        .catch(error => {
          console.log('error of handleCardPayPress', error);
        });

      console.log('token =>', token);
      this.setState({token}, () => {
        if (this.state.token != null) {
          console.log('token stripe====', token);
          this.requestToMakePayment(token.tokenId, 'stripe'); // paymentType = stripe  =>  for card payment
        }
      });
    } catch (error) {
      console.log('token error on makepayment  screen ', error);
    }
  };

  requestToMakePayment = (token, paymentType) => {
    console.log('12333333', token);
    const payData = {
      stripeToken: token,
      user_id: this.state.userID,
      payment_type: paymentType,
      subscription_id: this.state.subscriptionData.planId,
      stripe_id: this.state.subscriptionData.stripe_id,
      coupon: this.state.subscriptionData.coupon,
    };

    console.log('payData =>', payData);
    this.props.payment(payData, this.state.appString);
  };

  render() {
    const {appString} = this.state;

    return (
      <LinearGradient colors={colors.backGround} style={{flex: 1}}>
        <ScrollView>
          <SettingHeaderTitle
            title={appString && appString.lbl_Settings}
            navigation={this.props.navigation}
            fSize={ Dimensions.get('window').width > 670 ?40:22}
            goBack={() => {
              this.props.navigation.goBack();
            }}
          />
          {/* <View style={styles.nav_bar}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.nav_view}
              onPress={() => this.props.navigation.goBack()}
            >
              <Image source={images.backArrow} style={styles.backArrowImg} />
              <Text style={styles.navTitle}>
                {appString && appString.lbl_Settings}
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.titleView}>
            <Text style={styles.title}>
              {appString && appString.lbl_payment_title}
            </Text>
          </View>
          <View style={styles.subTitleView}>
            <Text style={styles.subTitle}>
              {appString && appString.lbl_payment_desc}
            </Text>
          </View>
          <View style={{alignSelf: 'center', marginLeft: 80}}>
            {console.log(
              'this.state.subscriptionData',
              this.state.subscriptionData,
            )}
            {this.state.subscriptionData.couponData.statuscode == 200 ? (
              <View
                style={{
                  marginTop: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                    <Text style={styles.subTitle}>
                      {appString && appString.lbl_total_price}
                    </Text>
                  </View>
                  <View style={{flex: 0.5}}>
                    <Text style={styles.subTitle}>
                      {appString &&
                        ':  ' +
                          this.state.subscriptionData.couponData.data.total.toFixed(
                            2,
                          )}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                    <Text style={styles.subTitle}>
                      {appString && appString.lbl_subscription_amount}
                    </Text>
                  </View>
                  <View style={{flex: 0.5}}>
                    <Text style={styles.subTitle}>
                      {appString &&
                        ':  ' +
                          this.state.subscriptionData.couponData.data.discount_less.toFixed(
                            2,
                          )}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                    <Text style={styles.subTitle}>
                      {appString && appString.lbl_discount}{' '}
                    </Text>
                  </View>
                  <View style={{flex: 0.5}}>
                    <Text style={styles.subTitle}>
                      {appString &&
                        ':  ' +
                          this.state.subscriptionData.couponData.data.discount_amount.toFixed(
                            2,
                          )}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  marginTop: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                    <Text style={styles.subTitle}>
                      {appString && appString.lbl_total_price}
                    </Text>
                  </View>
                  <View style={{flex: 0.5}}>
                    <Text style={styles.subTitle}>
                      {appString &&
                        ':  ' +
                          `€ ${this.state.subscriptionData.total_price.toFixed(
                            2,
                          )}`}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.formContainer}>
            <View>
              {Platform.OS == 'ios' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.handleApplePayPress();
                  }}
                  style={styles.paymentButtonView}>
                  <View style={styles.alignAppleIcon}>
                    <Image
                      source={images.applePayIcon}
                      style={styles.applePayIcon}
                    />
                  </View>
                  <View style={styles.alignArrow}>
                    <Image
                      source={images.rightArrowGray}
                      style={styles.arrowIcon}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <>
                  {/* <TouchableOpacity
                    onPress={this.handleCardPayPress}
                    style={styles.paymentButtonView}>
                    <View style={styles.card_outer_view}>
                    
                      <Image
                        source={images.creditCardIcon}
                        style={styles.creditCardIcon}
                      />
                      <View style={styles.cardText}>
                        <Text style={styles.cardTitle}>
                          {appString && appString.lbl_credit_card}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.alignArrow}>
                      <Image
                        source={images.rightArrowGray}
                        style={styles.arrowIcon}
                      />
                    </View>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={this.androidPayment}
                    style={styles.paymentButtonView}>
                    <View style={styles.alignIcon}>
                      <Image source={images.gpay} style={styles.gPayIcon} />
                    </View>
                    <View style={styles.alignArrow}>
                      <Image
                        source={images.rightArrowGray}
                        style={styles.arrowIcon}
                      />
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
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
    payment: (data, appString) => {
      dispatch(paymentAction(data, appString));
    },
    subscribedForApplePay: (data, appString) => {
      dispatch(subscribedForApplePay(data, appString));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPayment);

//export default settingsPayment;
