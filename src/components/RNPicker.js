import React, { Component } from "react";
import { View } from "react-native";
import RNPicker from "rn-modal-picker";
import Lable from "../components/container/Lable";
//import colors from "../assets/colors/Color";
var Lables = "";
export default function DropDown({
  dataSource,
  dummyDataSource,
  defaultValue = false,
  pickerTitle,
  showSearchBar = true,
  disablePicker = false,
  changeAnimation = "none",
  searchBarPlaceHolder,
  showPickerTitle = true,
  selectedLabel,
  placeHolderLabel,
  selectedValue,
  placeholderColor,
  selectedId = false,
}) {

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",

        }}
      >

      </View>
      <RNPicker
        placeholderColor={placeholderColor}
        dataSource={dataSource}
        dummyDataSource={dummyDataSource}
        defaultValue={defaultValue}
        pickerTitle={pickerTitle}
        showSearchBar={showSearchBar}
        disablePicker={disablePicker}
        changeAnimation={changeAnimation}
        searchBarPlaceHolder={searchBarPlaceHolder}
        showPickerTitle={showPickerTitle}
        searchBarContainerStyle={Styles.searchBarContainerStyle}
        pickerStyle={Styles.pickerStyle}
        pickerItemTextStyle={Styles.listTextViewStyle}
        selectedLabel={selectedLabel}
        placeHolderLabel={placeHolderLabel}
        selectLabelTextStyle={Styles.selectLabelTextStyle}
        placeHolderTextStyle={Styles.placeHolderTextStyle}
        dropDownImageStyle={Styles.dropDownImageStyle}
        selectedId={selectedId}
        //dropDownImage={require("../assets/images/ic_drop_down.png")}
        selectedValue={selectedValue}
      />
    </View>
  );
}
const Styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: '#4782c5',
    padding: 15,
    textAlign: "left",
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",

  },
  placeHolderTextStyle: {
    color: '#4782c5',
    padding: 10,
    textAlign: "left",
    width: "90%",
    flexDirection: "row",
    alignSelf: "center"
  },
  dropDownImageStyle: {
    marginRight: 15,
    width: 16,
    height: 8,
    alignSelf: "center",

  },
  listTextViewStyle: {
    color: 'rgb(48,75,195)',
    marginVertical: 2,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left",
    fontWeight: 'bold',
  },
  pickerStyle: {
    width: "96%",
    height: 50,
    marginRight: 15,
    marginLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    borderColor: "#cdcdcd",
    flexDirection: "row",
    justifyContent: "space-between"
  }
};
