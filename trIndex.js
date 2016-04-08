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


import TorridArtPreview from './trPreview';

var apiUrl = require('./settings').apiUrl;

export default class TorridArtIndex extends React.Component {
  constructor(props) {
    super(props);   //这一句不能省略，照抄即可
    this.state = {
      pageIndex:1,
      isRefreshing:false,
      loaded: false,
      collections:[],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let REQUEST_URL = apiUrl;
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          pageIndex:1,
          isRefreshing:false,
          loaded: true,
          collections:responseData.collections,
          dataSource: this.state.dataSource.cloneWithRows(responseData.collections),
        });
      })
      .done();
  }

  loadNextPage() {
    let REQUEST_URL = apiUrl;
    var _pageIndex = this.state.pageIndex + 1;
    REQUEST_URL = REQUEST_URL + '/page/'+_pageIndex+'/';

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.collections.length>0){
          const collections = this.state.collections;
          responseData.collections.map(function(item){
            collections.push(item);
          });
          this.setState({
            pageIndex:_pageIndex,
            isRefreshing:false,
            loaded: true,
            collections:collections,
            dataSource: this.state.dataSource.cloneWithRows(collections),
          });
        }else{
          this.setState({
            isRefreshing:false,
          });
        }
        
      })
      .done();
  }

  _onEndReached(){
    //Alert.alert('Alert Title',this.state.pageIndex+1+'',[{text: 'OK', onPress: () => console.log('OK Pressed!')},]);
    this.setState({
      isRefreshing:true
    });
    this.loadNextPage();
  }
    
  _onRefresh(){
    //Alert.alert('Alert Title','刷新',[{text: 'OK', onPress: () => console.log('OK Pressed!')},]);
    this.setState({pageIndex:1,isRefreshing: true});
    this.fetchData();
  }



  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            每日看胸{require('./settings').apiUrl}
          </Text> 
        </View>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCollections.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#ff0000"
            title="Loading..."
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#f69dad"
          />}
        //onEndReachedThreshold={1}
        onEndReached = {this._onEndReached.bind(this)}
        contentContainerStyle={styles.contentContainer} />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            每日看胸{require('./settings').apiUrl}
          </Text> 
        </View>
        <Text>
          正在加载每日看胸数据……
        </Text>
      </View>
    );
  }

  _onPressButton(name) {
    Alert.alert('',name);
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
      navigator.push({
        name: 'TorridArtPreview',
        component: TorridArtPreview,
        params: {
          id: 'aaa'
        }
      });
    }
  }

  renderCollections(collection){
    //var self = this;
    return (
      <View>
        <TouchableOpacity onPress={()=>this._onPressButton(collection.name)}>
          <Image
            source={{uri: collection.preview}}
            style={styles.preview}
          />
        </TouchableOpacity>
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
    width:Dimensions.get('window').width*0.33,
    height:(Dimensions.get('window').height-PixelRatio.getPixelSizeForLayoutSize(20))/3
    //height:500
  }
});
