import React from "react";
import { Platform, Image, TouchableOpacity, Text } from "react-native";
import { colors, images } from "../../Theme";

export default function Checkbox({
  placeholder = "Submit",
  checked = false,
  fontSize = 14,
  marginRight = 5,
  onPress,
  tint_color = "#fff",
}) {
  return (
    <TouchableOpacity style={{ flexDirection: "row" }} onPress={onPress}>
      <Image
        source={checked ? images.check : images.uncheck}
        style={{
          tintColor: tint_color ? tint_color : colors.code_fff,
          marginRight: marginRight,
          height: 15,
          width: 15,
          marginTop: 4,
        }}
      />
      <Text
        style={[styles.textStyle, { fontSize: fontSize, flexWrap: "wrap" }]}
      >
        {placeholder}
      </Text>
    </TouchableOpacity>
  );
}

const styles = {
  textStyle: {
    color: colors.code_fff,
    flex: 1,
    marginTop: Platform.OS === "ios" ? 3 : 2,
  },
};
