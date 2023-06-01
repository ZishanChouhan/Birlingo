import React, { Component } from "react";
import { StyleSheet, TextInput, View, Image, TouchableOpacity,Dimensions } from "react-native";
import images from "../../res/images";
import fonts from "../../res/fonts";
import Lable from "./Lable";
import colors from "../../res/colors";
import { connect } from 'react-redux';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const { onChangeText,
      onEndEditing,
      borderWidth,
      secureTextEntry = false,
      placeholder = "Submit",
      editable = true,
      value,
      isPlaceHolder = true,
      keyboardType = "default",
      text = null,
      paddingBoth = 12,
      maxLength = 50,
      marginAbove = 0,
      image,
      isRightImage = false,
      onPress = "",
      rightImage = "",
      error = "",
      appString = "",
      placeholderColor = '',
      borderColor = '',
      auto = false,
      align = 'left',
      autoCapitalize = true,
      topPlaceHolder = true } = this.props;
    return (
      <>
        <View
          style={{
            borderColor: borderColor ? borderColor : "#cdcdcd",
            borderBottomWidth: borderWidth ? borderWidth : 1,
            alignContent: "center",
            justifyContent: "center",
            height: 50,
            flexDirection: "row"
          }}
        >
          <TextInput
            selectTextOnFocus={true}
            selectionColor='#98AFC7'
            defaultProps
            // style={{ flex: 1, }}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            underlineColorAndroid="transparent"
            placeholderTextColor={placeholderColor ? placeholderColor : '#fff'}
            placeholder={isPlaceHolder ? placeholder : ""}
            secureTextEntry={secureTextEntry}
            style={[
              {
                color: placeholderColor ? placeholderColor : '#fff',
                marginTop: marginAbove,
                paddingHorizontal: paddingBoth,
                flex: 1,
                fontSize:Dimensions.get('window').width > 670 ?25:15,
                textAlign: align
                // fontFamily: fonts.regular
              }
            ]}
            // autoCapitalize={autoCapitalize}
            autoCorrect={false}
            editable={editable}
            //   placeholderTextColor={CommonStyles.InputPlaceholderStyle}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            onEndEditing={onEndEditing}
          />
          {isRightImage ? (
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={onPress}>
              <Image
                style={{
                  alignSelf: "center",
                  marginRight: 16,
                  width: 20,
                  height: 20
                }}
                source={rightImage}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {error != "" && (<>{console.log("data[error]----", this.props.getAppString.data[error], error)
        }
          <Lable
            style={{ marginLeft: 12, paddingTop: 5 }}
            size={11}
            color={colors.red}
            title={this.props.getAppString.data[error]}
          /></>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    getAppString: state.appLanguage.getAppString,

  }
}


export default connect(
  mapStateToProps,

)(TextField)
