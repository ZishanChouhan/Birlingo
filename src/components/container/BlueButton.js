import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, Keyboard } from "react-native";
//import colors from "../../res/colors";
import Lable from "./Lable";
import fonts from "../../res/fonts";
import {colors, metrics} from '../../Theme';

const height=metrics.screenHeight;
const width=metrics.screenWidth;
export default function Button({
  onPress,
  label = "Submit",
  textColor,
  extraStyle,
  btnContainer = null,
  buttonHeight =width*(50/375),
  buttonWidth = width*(240/375),
  opacity = 1,
  color
}) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          width: buttonWidth,
          height: buttonHeight,
          opacity: opacity,
          borderRadius:30,          
        },
        btnContainer
      ]}
      colors={[colors.code_fff, colors.code_fff]}
    >
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          Keyboard.dismiss();
          onPress();
        }}
      >
        <Lable
          size={width*(20/375)}
          style={{ textAlign: "center",fontWeight: 'bold', }}
          font={fonts.medium}
          color={color ? color : colors.code_82c2}
          title={label}
        />
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
    backgroundColor:colors.code_82c2
  }
};
