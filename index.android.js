/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

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
  ScrollView
} from 'react-native';

/*var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';*/
var apiUrl = require('./settings').apiUrl;


class TorridArt extends Component {
  constructor(props) {
    super(props);   //这一句不能省略，照抄即可
    this.state = {
      dataSource: [],
      loaded: false,
    };
  }

  componentDidMount() {
    console.log(1)
    this.fetchData();
  }
  fetchData() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: responseData.collections,
          loaded: true,
        });
      })
      .done();
  }

  makeItems(){
    var items = [];
    for(var i=0;i<this.state.dataSource.length;i++){
      if(this.state.dataSource[i].preview!==''){
        items.push(
          <Image
            key={this.state.dataSource[i].name}
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri:this.state.dataSource[i].preview}}
            >
          </Image>
        );
      }
    }
    return items;
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
        <ScrollView showsVerticalScrollIndicator={true} 
          contentContainerStyle={styles.contentContainer}>
          {this.makeItems()}
        </ScrollView>
        
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

  renderMovie() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            每日看胸{require('./settings').apiUrl}
          </Text> 
        </View>
        <ScrollView showsVerticalScrollIndicator={true} 
          contentContainerStyle={styles.contentContainer}>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri: 'http://192.168.56.1:3002/Sara/0000.jpg'}}
          >
          </Image>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:Dimensions.get('window').height-PixelRatio.getPixelSizeForLayoutSize(10),
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#4d4d65'
  },
  title:{
    height: PixelRatio.getPixelSizeForLayoutSize(10),
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
    justifyContent:'space-between',
    flexWrap:'wrap',
  },
  preview:{
    //flex:1,
    marginTop:1,
    width:Dimensions.get('window').width*0.33,
    height:(Dimensions.get('window').height-PixelRatio.getPixelSizeForLayoutSize(10))/3
  }
});


AppRegistry.registerComponent('TorridArt', () => TorridArt);






/*<View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            每日看胸{require('./settings').apiUrl}
          </Text> 
        </View>
        <ScrollView showsVerticalScrollIndicator={true} 
          contentContainerStyle={styles.contentContainer}>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri: 'http://192.168.56.1:3002/thumbnail/2011-03-16 No.512 Sara/0000_6LeDOnUq.jpg'}}
          >
          </Image>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri: 'http://192.168.56.1:3002/thumbnail/2011-03-16 No.512 Sara/0000_6LeDOnUq.jpg'}}
          >
          </Image>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri: 'http://192.168.56.1:3002/thumbnail/2011-03-16 No.512 Sara/0000_6LeDOnUq.jpg'}}
          >
          </Image>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri: 'http://192.168.56.1:3002/thumbnail/2011-03-16 No.512 Sara/0000_6LeDOnUq.jpg'}}
          >
          </Image>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri: 'http://192.168.56.1:3002/thumbnail/2011-03-16 No.512 Sara/0000_6LeDOnUq.jpg'}}
          >
          </Image>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri: 'http://192.168.56.1:3002/thumbnail/2011-03-16 No.512 Sara/0000_6LeDOnUq.jpg'}}
          >
          </Image>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri: 'http://192.168.56.1:3002/thumbnail/2011-03-16 No.512 Sara/0000_6LeDOnUq.jpg'}}
          >
          </Image>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri: 'http://192.168.56.1:3002/thumbnail/2011-03-16 No.512 Sara/0000_6LeDOnUq.jpg'}}
          >
          </Image>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.preview}
            source={{uri: 'http://192.168.56.1:3002/thumbnail/2011-03-16 No.512 Sara/0000_6LeDOnUq.jpg'}}
          >
          </Image>


        </ScrollView>
      </View>*/
