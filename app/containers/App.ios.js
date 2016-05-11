import React, {
  Component,
  Navigator
} from 'react-native';

import Home from './Home';



class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let name = 'Home';
    let home = Home;
    return (
        <Navigator
         initialRoute={{name: name, component: home}}
         configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
         renderScene={(route, navigator) => {
           let Component = route.component;
           return <Component route={route} {...route.passProps} navigator={navigator} />
         }} />
    );

  }
}

export{ App as default };