import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert,Dimensions } from "react-native";
import { colors } from "../../Theme";

import styles from "./styles";

export default class LanguageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 0,
    };
  }

  _selectLanguage(index, languages, data) {
    this.props.selectLanguage(languages);
  }
  render() {
    var { languages, index, data } = this.props;
    //console.log("languages", languages.language);
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.option_view,
            {
              backgroundColor: languages.selected == 1 ? colors.maroon : "#fff",
            },
          ]}
          onPress={() => {
            this._selectLanguage(index, languages, data);
          }}
        >
          <Text
            style={
              ([styles.lang_name],
              { color: languages.selected == 1 ? "#fff" : colors.code_blk,fontSize:Dimensions.get('window').width > 670 ?40:19} )
            }
          >
            {languages && languages.language}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
