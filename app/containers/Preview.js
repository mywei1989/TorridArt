'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  PixelRatio,
  Dimensions,
  Text,
  View,
  RefreshControl,
  Alert,
  Navigator,
  TouchableWithoutFeedback,
} from 'react-native';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.setState({
      loaded:true,
      collectionName: this.props.collectionName,
      name:this.props.name,
      preview:this.props.preview
    });
  }

  _onBackClick(){
    const {navigator} = this.props;
    if(navigator) {
      navigator.pop();
    }
  }

  render(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.container}>
        <View>
          <TouchableWithoutFeedback onPress={()=>this._onBackClick()}>
            <Image
              source={{uri: this.state.preview}}
              style={styles.preview}
              resizeMode={Image.resizeMode.contain}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载每日看胸数据……
        </Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    height:Dimensions.get('window').height,
    backgroundColor: '#4d4d65'
  },

  preview:{
    marginTop:PixelRatio.getPixelSizeForLayoutSize(12),
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height-PixelRatio.getPixelSizeForLayoutSize(30)
    //height:500
  }
});

export{ Preview as default };