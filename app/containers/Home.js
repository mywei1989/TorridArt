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
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  StatusBar
} from 'react-native';

import {connect} from 'react-redux';
import {fetchTorridArt} from '../actions/homeAction';

import Preview from './Preview';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex:1,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      progressValue: new Animated.Value(0)
    };
  }
  componentDidMount() {
    Animated.timing(this.state.progressValue, {
      toValue: width,
      duration: 1500,
      easing: Easing.linear
    }).start();
  }
  componentDidMount() {
    let {dispatch} = this.props;
    dispatch(fetchTorridArt(this.state.pageIndex));
  }

  _onPressButton(props,collectionName,name,preview){
    let { navigator} = props;
    if(navigator) {
      navigator.push({
        name: 'Preview',
        component: Preview,
        params: {
          collectionName: collectionName,
          name:name,
          preview:preview
        }
      });
    }
  }
  _onEndReached(){
    let {homeReducers} = this.props;
    let {dispatch} = this.props;
    if(homeReducers.hasNextPage){
      dispatch(fetchTorridArt(homeReducers.pageIndex+1));
    }
    //this.loadNextPage();
  }


  renderList(){
    let {homeReducers,navigator} = this.props;
    let dataSource = this.state.dataSource.cloneWithRows(homeReducers.thumbnail);
    return (
      <ListView 
        dataSource={dataSource}
        renderRow={this.renderThumbnailCollections.bind(this)}
        onEndReachedThreshold={20}
        onEndReached = {this._onEndReached.bind(this)}
        contentContainerStyle={styles.contentContainer} />
    );
  }


  renderThumbnailCollections(dataRow,sectionID,rowID){
    return (
       <View>
         <StatusBar
           backgroundColor="blue"
           barStyle="light-content"
           hidden={true}
         />
        <TouchableOpacity onPress={()=>this._onPressButton(this.props,dataRow.collectionName,dataRow.name,dataRow.preview)}>
          <Image
            source={{uri: dataRow.thumbnail}}
            style={styles.thumbnail}
          />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            每日看胸
          </Text> 
        </View>
        {this.renderList()}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    height:Dimensions.get('window').height,
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
    fontSize:18,
    fontWeight:'bold',
    color:'#fff'
  },

  contentContainer: {
    backgroundColor:"#4d4d65",
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  thumbnail:{
    marginTop:1,
    width:Dimensions.get('window').width*0.33,
    height:(Dimensions.get('window').height-PixelRatio.getPixelSizeForLayoutSize(20))/3-1
  }
});


function mapStateToProps(state) {
  const {homeReducers} = state;
  return {
    homeReducers
  }
}
export default connect(mapStateToProps)(Home);

