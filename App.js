import React, { createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { AuthProvider, AuthContext } from './components/Context/Appcontext';
import AppNavigationContainer from './components/Navigation/NavigationContainer';
import LoginForm from './components/Login';
import { StyleSheet, Text, View } from 'react-native';


const NavigationFinal =() =>{
  const { isLoggedIn } = useContext(AuthContext);
  console.log('......', isLoggedIn);
  return(
    <NavigationContainer>
    {isLoggedIn ? <AppNavigationContainer /> : <LoginForm />}
  </NavigationContainer>
  )
}
const App = () => {


  return (
    <AuthProvider>
     <NavigationFinal/>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
