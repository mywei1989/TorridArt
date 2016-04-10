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
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    //Alert.alert(this.props.collectionName);
    this.setState({
      loaded:true,
      collectionName: this.props.collectionName,
      name:this.props.name,
      webPath:this.props.webPath,
      preview:this.props.webPath+'/preview/'+this.props.collectionName+'/'+this.props.name
    });
  }

  _pressButton() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.pop();
    }
  }

  render(){
    //Alert.alert('aa',this.state.preview);
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={{uri: this.state.preview}}
            style={styles.preview}
            resizeMode={Image.resizeMode.contain}
          />
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
    height:Dimensions.get('window').height-PixelRatio.getPixelSizeForLayoutSize(30)
    //height:500
  }
});
