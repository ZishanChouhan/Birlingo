import React from "react";
import { StyleSheet, View, Modal, ActivityIndicator, Image } from "react-native";
import { colors, images, metrics } from '../../Theme';
import { Bubbles } from 'react-native-loader';
const width = metrics.screenWidth;
// import { normalize } from "./Dimensions";
const Loader = props => {
  const { loading } = props;
  return (
    loading && (
    <View style={{  
      flex: 1, 
      position: "absolute", 
      zIndex: 10000, 
      backgroundColor : colors.backGround, 
      justifyContent: "center", 
      alignItems: "center", 
      top: 0, 
      bottom: 0,
      left: 0,
      right: 0
    }}
      // transparent={true}
      // animationType={"none"}
      // visible={loading}
      // onRequestClose={() => {
        // console.log("close modal");
      // }}
    >
      <View style={styles.modalBackground}>
        <Bubbles size={10} color="#FFF" />
        {/* <Image
          source={images.ringLoader}
          style={{ width: width * (70 / 375), height: width * (70 / 375) }}
        /> */}
        {/* </View> */}
      </View>
    </View>
    )
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    height: "100%", 
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0, 0.4)"
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default Loader;
