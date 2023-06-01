import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../../res/colors";
import fonts from "../../res/fonts";
import images from "../../res/images";
import { BASEURL, ImageBASEURL } from "../../services/Constant";

const ImageView = props => {
  const {
    title,
    borderRadius,
    color = colors.textColor,
    size = 17,
    font = fonts.regular,
    style,
    numberOfLines = 1,
    marginTop = 0,
    uri,
    source = images.dummy_photo
  } = props;
  return (
    <Image
      style={{
        marginRight: 8,
        width: 50,
        height: 50,
        borderRadius: borderRadius,
        ...style,
        backgroundColor: "white"
      }}
      source={uri ? { uri: ImageBASEURL + uri } : source}
    />
  );
};

export default ImageView;
