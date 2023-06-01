import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {images} from '../../../Theme';
import {styles} from './styles';
import * as Progress from 'react-native-progress';
import HandleBack from '../../../components/container/Back';

const {height, width} = Dimensions.get('window');

class downloadsOffline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appString: '',
    };
  }

  componentDidMount() {
    if (
      this.props &&
      this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString
    ) {
      this.setState({appString: this.props.getAppString.data});
      // console.log('did mount data', this.props.allData)
    }
  }
  onBack = () => {
    console.log('onBack===');

    this.props.navigation.goBack();

    return true;
  };

  render() {
    const {appString} = this.state;
    return (
      <HandleBack onBack={this.onBack}>
        <View>
          <View style={styles.titleView}>
            <Text style={styles.title}>
              {appString && appString.lbl_your_download}
            </Text>
          </View>
          <ScrollView>
            <View style={styles.subTitleView}>
              <View style={styles.subTitleInnerView}>
                <Text style={styles.subTitle}>
                  {appString && appString.lbl_offline_subtitle}
                </Text>
              </View>
            </View>

            <View style={styles.formContainer} />
          </ScrollView>
        </View>
      </HandleBack>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAppString: state.appLanguage.getAppString,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getLessonFamily: (data, appString) => {
    //     dispatch(getLessonFamilyAction(data, appString))
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(downloadsOffline);

//export default downloadsOffline;
