import React, {
  Component,
  Navigator
} from 'react-native';

import Home from './Home';
class App extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator){
    var Component = route.component;
    return (
      <Component navigator={navigator} route={route} {...route.passProps} />
    );
  }

  render() {
    let name = 'Home';
    let home = Home;
    return (
        <Navigator
         ref="navigator"
         renderScene={this.renderScene}
         initialRoute={{name: name, component: home }}
         configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
         renderScene={(route, navigator) => {
           let Component = route.component;
           return <Component {...route.params} navigator={navigator} />
         }} />
    );

  }
}

export{ App as default };