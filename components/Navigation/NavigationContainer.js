import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Bottomtab from './Bottomtab';
import Hang from '../Screens/Hang';
import LoginForm from '../Login';
import { NavigationContainer } from '@react-navigation/native';
import Hangxuat from '../Screens/HangXuat';
import LoadingScreen from '../Screens/Loadding';
import Hangnhapcat from '../Screens/Hangnhapcat';
import Hangxuatcat from '../Screens/Hangxuatcat';
import SpKho from '../Screens/SpKho';
import ChangePass from '../Screens/ChangePass';

const Stack = createStackNavigator();


const AppNavigationContainer = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} name='Loadding' component={LoadingScreen} />
      <Stack.Screen options={{ headerTitle: 'Quay lại', headerShown: false, headerStyle: { fontFamily: 'seguisb', color: '#fff', fontSize: 25 } }} name="Bottomtab" component={Bottomtab} />
      <Stack.Screen options={{
        headerTitle: 'Chi Tiết Tồn Kho', headerTintColor: 'white', headerStyle: { fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
        headerStyle: { backgroundColor: '#00AFCE' },
      }} name="Chitiettonkho" component={SpKho} />
      <Stack.Screen options={{
        headerTitle: 'Chi tiết hàng nhập', headerTintColor: 'white', headerStyle: { fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
        headerStyle: { backgroundColor: '#00AFCE' },
      }} name="Chitiet" component={Hang} />
      <Stack.Screen options={{
        headerTitle: 'Chi tiết hàng xuất', headerTintColor: 'white', headerStyle: { fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
        headerStyle: { backgroundColor: '#00AFCE' }
      }} name="Hangxuat" component={Hangxuat} />
      <Stack.Screen options={{
        headerTitle: 'Chi tiết nhập cắt chuyển', headerTintColor: 'white', headerStyle: { fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
        headerStyle: { backgroundColor: '#00AFCE' },
      }} name="Hangnhapcat" component={Hangnhapcat} />
      <Stack.Screen options={{
        headerTitle: 'Chi tiết xuất cách chuyển', headerTintColor: 'white', headerStyle: { fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
        headerStyle: { backgroundColor: '#00AFCE' }
      }} name="Hangxuatcat" component={Hangxuatcat} />
      <Stack.Screen options={{
        headerTitle: 'Đổi mật khẩu', headerTintColor: '#00AFCE',headerTitleAlign: 'left', headerStyle: { fontFamily: 'seguisb', color: '#fff', fontSize: 25,  headerTitleAlign: 'left' },
        headerStyle: { backgroundColor: '#fff' }
      }} name="ChangePass" component={ChangePass} />
    </Stack.Navigator>

  )
}
export default AppNavigationContainer;
