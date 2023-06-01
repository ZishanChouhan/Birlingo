import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  I18nManager,
  Image,
} from 'react-native';
import DefaultSlide from './DefaultSlide';
// import {Icon} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get('window');
import {colors, fonts} from '../../Theme';
import font from '../../Theme/font';
// import Dots from 'react-native-dots-pagination';
import images from '../../../src/Theme/Images';
// import hasNotch from '../../../components/container/Deviceinfo';
import hasNotch from '../../components/container/Deviceinfo';
const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812);

const isAndroidRTL = I18nManager.isRTL && Platform.OS === 'android';

export default class AppIntroSlider extends React.Component {
  static defaultProps = {
    screenName: 'AppInfo',
    btnStyle: 'AppInfoStyle',
    activeDotStyle: {
      backgroundColor: 'rgba(255, 255, 255, .9)',
    },
    dotStyle: {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },

    skipLabel: '',
    doneLabel: 'Done',
    nextLabel: 'Next',
    prevLabel: 'Back',
    buttonStyle: null,
    buttonTextStyle: null,
    paginationStyle: null,
    showDoneButton: true,
    showNextButton: true,
  };
  state = {
    width,
    height,
    activeIndex: 0,
  };

  goToSlide = pageNum => {
    this.setState({activeIndex: pageNum});
    this.flatList.scrollToOffset({
      offset: this._rtlSafeIndex(pageNum) * this.state.width,
    });
  };

  // Get the list ref
  getListRef = () => this.flatList;

  _onNextPress = () => {
    this.goToSlide(this.state.activeIndex + 1);
    this.props.onSlideChange &&
      this.props.onSlideChange(
        this.state.activeIndex + 1,
        this.state.activeIndex,
      );
  };
  _onPrevPress = () => {
    if (this.state.activeIndex > 0) {
      this.goToSlide(this.state.activeIndex - 1);
      this.props.onSlideChange &&
        this.props.onSlideChange(
          this.state.activeIndex - 1,
          this.state.activeIndex,
        );
    }
  };

  _onPaginationPress = index => {
    const activeIndexBeforeChange = this.state.activeIndex;
    this.goToSlide(index);
    this.props.onSlideChange &&
      this.props.onSlideChange(index, activeIndexBeforeChange);
  };

  _renderItem = (flatListArgs, index) => {
    const {width, height} = this.state;
    const props = {...flatListArgs, dimensions: {width, height}};
    var btmHeight = this.props.screenName == 'lesson' ? 80 : 80;
// console.log("this.props.slides.length + this.state.activeIndex",this.props.slides.length, this.state.activeIndex);
    return (
      <View style={{width, flex: 1,}}>
        {this.props.renderItem ? (
          this.props.renderItem(props)
        ) : (
          <DefaultSlide bottomButton={this.props.bottomButton} {...props} />
        )}
        <View style={{bottom: Platform.OS == "ios" ? width * (btmHeight / 375) :  width * (btmHeight / 375) + 16}}>
          {/* {this.state.activeIndex + 1 !== 1 ? ( */}
            <View>
              {this.state.activeIndex + 1 !== 1 ? (
                <TouchableOpacity
                  style={styles.leftButtonView12}
                  onPress={this._onPrevPress}>
                  <Image source={images.left_Icon} resizeMode={'contain'} />
                </TouchableOpacity>
              ) : null}
              <View style={styles.indexView}>
                {/* <Text style={styles.indexCount}>{`${this.state.activeIndex + 1}/${this.props.totalIndex}`}</Text> */}
              </View>
              {this.props.slides.length - 1 != this.state.activeIndex ? (
                <TouchableOpacity
                  style={styles.rightButtonView12}
                  onPress={this._onNextPress}>
                  <Image source={images.right_Icon} resizeMode={'contain'} />
                </TouchableOpacity>
              ) : null}
            </View>
          {/* // ) : null} */}
        </View>
      </View>
    );
  };

  _renderButton = (name, onPress) => {
    const show = this.props[`show${name}Button`];
    const content = this.props[`render${name}Button`]
      ? this.props[`render${name}Button`]()
      : this._renderDefaultButton(name);
    return show && this._renderOuterButton(content, name, onPress);
  };

  _renderIcon = (type, name, onPress) => {
    let content = <View />;

    if (this.props.screenName == 'lesson') {
      content = (
        <View>
          {this.state.activeIndex + 1 !== 1 ? (
            <View>
              {this.state.activeIndex + 1 !== 1 ? (
                <TouchableOpacity
                  style={styles.leftButtonView}
                  onPress={this._onPrevPress}>
                  <Icon
                    name={'caretleft'}
                    // type="AntDesign"
                    style={styles.arrowBack}
                  />
                </TouchableOpacity>
              ) : null}
              <View style={styles.indexView}>
                {/* <Text style={styles.indexCount}>{`${this.state.activeIndex + 1}/${this.props.totalIndex}`}</Text> */}
              </View>
              {name != '' ? (
                <TouchableOpacity
                  style={styles.rightButtonView}
                  onPress={this._onNextPress}>
                  <Icon
                    name={'caretright'}
                    // type="AntDesign"
                    style={styles.arrowBack}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </View>
      );
    } else {
      if (this.props.screenName == 'Demo') {
        content = (
          <View>
            {this.state.activeIndex == this.props.totalIndex ? (
              <View>
                <TouchableOpacity
                  style={styles.leftButtonView}
                  onPress={this._onPrevPress}>
                  <Icon
                    name={'caretleft'}
                    // type="AntDesign"
                    style={styles.arrowBack}
                  />
                </TouchableOpacity>
                <View style={styles.indexView}>
                  {/* <Text style={styles.indexCount}>{`${this.state.activeIndex + 1}/${this.props.totalIndex}`}</Text> */}
                </View>
                {name != '' ? (
                  <TouchableOpacity
                    style={styles.rightButtonView}
                    onPress={this._onNextPress}>
                    <Icon
                      name={'caretright'}
                      // type="AntDesign"
                      style={styles.arrowBack}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
        );
      }
    }

    return (
      <View style={{justifyContent: 'flex-end'}}>{content}</View>

      // <View style={type == "next" ? styles.rightButtonView : styles.leftButtonView
      // }>
      //     <TouchableOpacity onPress={onPress}>
      //         <Icon name={name} type='AntDesign' style={styles.arrowBack} />
      //     </TouchableOpacity>
      // </View>
    );
  };

  _renderDefaultButton = name => {
    let content = (
      <Text style={[styles.buttonText, this.props.buttonTextStyle]}>
        {this.props[`${name.toLowerCase()}Label`]}
      </Text>
    );
    if (this.props.bottomButton) {
      content = (
        <View
          style={[
            styles.bottomButton,
            (name === 'Skip' || name === 'Prev') && {
              backgroundColor: 'transparent',
            },
            this.props.buttonStyle,
          ]}>
          {content}
        </View>
      );
    }
    return content;
  };

  _renderOuterButton = (content, name, onPress) => {
    const style =
      name === 'Skip' || name === 'Prev'
        ? styles.leftButtonContainer
        : styles.rightButtonContainer;
    return (
      <View style={!this.props.bottomButton && style}>
        <TouchableOpacity
          onPress={onPress}
          style={
            this.props.bottomButton ? styles.flexOne : this.props.buttonStyle
          }>
          {content}
        </TouchableOpacity>
      </View>
    );
  };

  _renderNextButton = () =>
    this._renderIcon('next', 'caretright', this._onNextPress);
  _renderPreviousButton = () => this._renderIcon('next', '', this._onNextPress);

  _renderPrevButton = () => this._renderButton('Prev', this._onPrevPress);

  _renderDoneButton = () =>
    this._renderButton('Done', this.props.onDone && this.props.onDone);

  _renderSkipButton = () =>
    // scrollToEnd does not work in RTL so use goToSlide instead
    this._renderButton('Skip', () =>
      this.props.onSkip
        ? this.props.onSkip()
        : this.goToSlide(this.props.slides.length - 1),
    );

  _renderPagination = () => {
    const isLastSlide = this.state.activeIndex === this.props.slides.length - 1;
    const isFirstSlide = this.state.activeIndex === 0;

    const skipBtn = !isFirstSlide && this._renderPrevButton();
    const btn = isLastSlide
      ? this.props.screenName !== 'AppInfo'
        ? this._renderPreviousButton()
        : this._renderDoneButton()
      : this._renderNextButton();

    return (
      <View style={{}}>
        {this.props.hidePagination ? (
          <View
            style={[styles.paginationContainer, this.props.paginationStyle]}>
            <View style={styles.paginationDots}>
              {this.props.slides.length > 1 &&
                this.props.slides.map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.dot,
                      this._rtlSafeIndex(i) === this.state.activeIndex
                        ? this.props.activeDotStyle
                        : this.props.dotStyle,
                    ]}
                    onPress={() => this._onPaginationPress(i)}
                  />
                ))}
            </View>
            {/* <Dots length={10} active={this.state.activeIndex} /> */}
            {skipBtn}
          </View>
        ) : (
          <View>
            <View
              style={
                this.props.screenName == 'Demo'
                  ? styles.paginationContainer_1
                  : styles.paginationContainer
              }>
              {/* <Dots
                length={this.props.slides.length}
                active={1}
                width={100}
                activeDotWidth={7}
                activeDotHeight={7}
                passiveDotWidth={6}
                passiveDotHeight={6}
                activeColor={'rgb(83,179,214)'}
                passiveColor={'rgb(220,220,220)'}
                active={this.state.activeIndex}
              /> */}
              {skipBtn}
            </View>
          </View>
        )}
      </View>
    );
  };

  _rtlSafeIndex = i => (isAndroidRTL ? this.props.slides.length - 1 - i : i);

  _onMomentumScrollEnd = e => {
    const offset = e.nativeEvent.contentOffset.x;
    // Touching very very quickly and continuous brings about
    // a variation close to - but not quite - the width.
    // That's why we round the number.
    // Also, Android phones and their weird numbers
    const newIndex = this._rtlSafeIndex(Math.round(offset / this.state.width));
    if (newIndex === this.state.activeIndex) {
      // No page change, don't do anything
      return;
    }
    const lastIndex = this.state.activeIndex;
    this.setState({activeIndex: newIndex});
    this.props.onSlideChange && this.props.onSlideChange(newIndex, lastIndex);
  };

  _onLayout = () => {
    if (width !== this.state.width || height !== this.state.height) {
      // Set new width to update rendering of pages
      this.setState({width, height});
      // Set new scroll position
      const func = () => {
        this.flatList.scrollToOffset({
          offset: this._rtlSafeIndex(this.state.activeIndex) * width,
          animated: false,
        });
      };
      Platform.OS === 'android' ? setTimeout(func, 0) : func();
    }
  };

  render() {
    // Separate props used by the component to props passed to FlatList
    const {
      btnStyle,
      screenName,
      hidePagination,
      activeDotStyle,
      dotStyle,
      skipLabel,
      doneLabel,
      nextLabel,
      prevLabel,
      buttonStyle,
      buttonTextStyle,
      renderItem,
      data,
      ...otherProps
    } = this.props;

    return (
      <View style={styles.flexOne}>
        <FlatList
          ref={ref => (this.flatList = ref)}
          data={this.props.slides}
          initialNumToRender={this.props.slides.length}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.flatList}
          renderItem={this._renderItem}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          // extraData={this.state.width}
          extraData={this.state}
          onLayout={this._onLayout}
          {...otherProps}
        />
        {this._renderPagination()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrowBack: {
    fontSize: width * (13 / 375),
    color: colors.code_82c2,
  },
  flexOne: {
    flex: 1,
    // backgroundColor: "red",
    // paddingBottom: 60
  },
  flatList: {
    flex: 1,
    flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    //bottom: ,
    left: 16,
    right: 16,
  },
  paginationContainer_1: {
    position: 'absolute',
    // bottom: width * (67 / 375),
    // bottom: 8 + (isIphoneX ? 34 : -10),
    bottom: 0,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 4,
    margin: 4,
    flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 0,
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 0,
  },
  indexView: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    //borderWidth: 1,
  },
  leftButtonView: {
    position: 'absolute',
    // left: width * (60 / 375),
    right: width * (110 / 375),
    paddingTop: Platform.OS === 'ios' ? 2 : 3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'rgba(0,0,0,0.7)', //83,179,214
    // backgroundColor: colors.code_fff,
    borderRadius: 100,
  },
  rightButtonView: {
    position: 'absolute',
    // right: width * (70 / 375),
    right: width * (50 / 375),
    paddingTop: Platform.OS === 'ios' ? 2 : 3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 50,
    width: 50,
    backgroundColor: 'rgba(0,0,0,0.7)',
    // backgroundColor: colors.code_fff,
    borderRadius: 100,
  },
  leftButtonView12: {
    position: 'absolute',
    top: hasNotch
      ? width * (-5 / 375)
      : Platform.OS == 'ios'
      ? width * (10 / 375)
      : width * (10 / 375),
    right: width * (110 / 375),
    paddingTop: Platform.OS === 'ios' ? 2 : 3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    marginTop:Dimensions.get('window').width > 670 ?90:0,
    backgroundColor: colors.code_fff,
    borderRadius: 100,
  },
  rightButtonView12: {
    position: 'absolute',
    right: width * (50 / 375),
    top: hasNotch
      ? width * (-5 / 375)
      : Platform.OS == 'ios'
      ? width * (10 / 375)
      : width * (10 / 375),
    paddingTop: Platform.OS === 'ios' ? 2 : 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    width: 50,
    marginTop:Dimensions.get('window').width > 670 ?90:0,
    backgroundColor: colors.code_fff,
    borderRadius: 100,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
    padding: 12,
  },
  indexCount: {
    fontSize: 14,
    color: colors.code_82c2,
    fontFamily: font.type.Akkurat_Bold,
  },
});
