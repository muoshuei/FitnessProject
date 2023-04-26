/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './Assets/Components/HomePage';
import SecondPage from './Assets/Components/SecondPage';
import CameraPage from './Assets/Components/CameraPage';
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {HomePage} />
        <Stack.Screen name = "Second" component = {SecondPage} />
        <Stack.Screen name = "Camera" component = {CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
      
  );
}



export default App;
