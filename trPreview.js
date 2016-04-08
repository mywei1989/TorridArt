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
  TouchableOpacity
} from 'react-native';

var apiUrl = require('./settings').apiUrl;


export default class TorridArtPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
    }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            每日看胸{require('./settings').apiUrl}
          </Text> 
        </View>
        <View>
          <Image
            source={{uri: 'http://192.168.1.100:3002/thumbnail/2012-12-03 No.753 Sara/0003_P1cEFnyn.jpg'}}
            style={styles.preview}
            resizeMode={Image.resizeMode.stretch}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height:Dimensions.get('window').height-PixelRatio.getPixelSizeForLayoutSize(12),
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#4d4d65'
  },
  title:{
    height: PixelRatio.getPixelSizeForLayoutSize(20),
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor:'#f69dad'
  },
  titleText:{
    textAlign:'center',
    textAlignVertical:'center',
    //textAlign:'justify',
    fontSize:18,
    fontWeight:'bold',
    color:'#fff'
  },

  contentContainer: {
    backgroundColor:"#4d4d65",
    flexDirection: 'row',
    //justifyContent:'space-between',
    flexWrap:'wrap',
  },
  preview:{
    marginTop:1,
    width:Dimensions.get('window').width,
    height:(Dimensions.get('window').height-PixelRatio.getPixelSizeForLayoutSize(0))
    //height:500
  }
});
