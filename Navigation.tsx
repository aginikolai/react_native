import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {TouchableOpacity, Image} from 'react-native';

import Doctors from "./Doctors";
import AddNew from "./AddNew";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const Main = createStackNavigator();

// @ts-ignore
const MainNavigation: React.FC = () => {
  return (
    <Main.Navigator initialRouteName="/main">
      <Main.Screen name='/main' component={Doctors} options={{headerShown: false}}/>
      <Main.Screen
        name='/create'
        component={AddNew}
        options={(props) => ({
          title: '',
          headerStyle: {
            shadowColor: 'transparent'
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image source={require('./assets/arrow.png')} style={{width: 18, paddingLeft: 25, marginLeft: 20}}/>
            </TouchableOpacity>
          )
        })}
      />
    </Main.Navigator>
  )
}

export default () => (
  <NavigationContainer theme={MyTheme}>
    <MainNavigation />
  </NavigationContainer>
);