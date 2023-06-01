import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, Keyboard, Image,Dimensions } from "react-native";
//import colors from "../../res/colors";
import Lable from "./Lable";
import fonts from "../../res/fonts";
import { colors, metrics } from "../../Theme";
import font from "../../Theme/font";

const height = metrics.screenHeight;
const width = metrics.screenWidth;
export default function Button({
  bgcolor,
  onPress,
  label = "Submit",
  textColor,
  extraStyle,
  btnContainer = null,
  buttonHeight = width * (50 / 375),
  buttonWidth = width * (240 / 375),
  opacity = 1,
  color,
  image,
  tint,
  borderRadius,
}) {
  return (
    <LinearGradient
      style={[
        {
          width: buttonWidth,
          height: buttonHeight,
          opacity: opacity,
          borderRadius: 10,
        },
        btnContainer,
      ]}
      colors={[colors.code_fff, colors.code_fff]}
    >
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: bgcolor ? bgcolor : "rgb(141, 81, 130)",
            borderRadius: borderRadius ? borderRadius : 6,
          },
        ]}
        onPress={() => {
          Keyboard.dismiss();
          onPress();
        }}
      >
        {!image ? (
          <Lable
            size={width * (20 / 375)}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: font.type.Akkurat_Bold,
            }}
            font={fonts.medium}
            color={color ? color : colors.code_fff}
            title={label}
          />
        ) : (
          <Image
            source={image}
            style={{
              tintColor: tint,
              height:Dimensions.get('window').width > 670 ? 40:20,
            }}
          />
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = {
  buttonStyle: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgb(141, 81, 130)",
    borderRadius: 6,
  },
};
