import React from 'react';
import {
  SafeAreaView,
  Text,
  Button
} from 'react-native';
const SecondPage = ({navigation}:any) => {
    
    return (
      <SafeAreaView>
        <Text> This is my second page </Text>
        <Button
          title = "Go to Home Page" 
          onPress = {()=>
            { 
              console.log("Second Page Button Pressed");
              navigation.navigate("Home")
            }
          }
        />
        <Button
          title = "Go to Camera Page" 
          onPress = {()=>
            { 
              console.log("Second Page Button Pressed");
              navigation.navigate("Camera")
            }
          }
        />
      </SafeAreaView>
    
    )
  }
export default SecondPage