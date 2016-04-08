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
  RefreshControl,
  Alert,
  Navigator,
  TouchableOpacity
} from 'react-native';

import TorridArtIndex from './trIndex';
import TorridArtPreview from './trPreview';

import FirstPageComponent from './FirstPageComponent';

var apiUrl = require('./settings').apiUrl;

class TorridArt extends Component {
  render(){
     let defaultName = 'TorridArtIndex';
        let defaultComponent = TorridArtIndex;
        return (
        <Navigator
          initialRoute={{ name: defaultName, component: defaultComponent }}
          configureScene={(route) => {
            return Navigator.SceneConfigs.VerticalDownSwipeJump;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }} />
        );
  } 
}


AppRegistry.registerComponent('TorridArt', () => TorridArt);

