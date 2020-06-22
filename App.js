import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import constants from 'expo-constants'
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


function App() {
  const myOptions = {
    title: "Employee App",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#4fd183"
    }
  }
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen name="Create" component={CreateEmployee} options={{ ...myOptions, title: "Create Employee" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ ...myOptions, title: "Profile" }} />
      </Stack.Navigator>
    </View>
  );
}
export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cfd4d1',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: constants.statusBarHeight
  },
});
