import { StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Kho from '../Screens/Kho';
import Nhapkho from '../Screens/Nhapkho';
import Xuatkho from '../Screens/Xuatkho';
import Information from '../Screens/Information';
import { AuthContext } from '../Context/Appcontext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import MenuDrawer from 'react-native-side-drawer'
import { Text } from 'react-native-elements';
import Nhapcat from '../Screens/Nhapcat';
import Xuatcat from '../Screens/Xuatcat';

const Tab = createBottomTabNavigator();

const Bottomtab = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const drawerContent = () => {
    return (
      <TouchableOpacity onPress={toggleOpen} style={styles.animatedBox}>
      </TouchableOpacity>
    );
  };
  const navigation = useNavigation();
  return (
    <Tab.Navigator initialRouteName='KhoScreen'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'KhoScreen') {
            iconName = focused ? 'home' : 'archive';
          } else if (route.name === 'NhapkhoScreen') {
            iconName = focused ? 'plus-square' : 'pencil-square';
          } else if (route.name === 'XuatkhoScreen') {
            iconName = focused ? 'arrow-circle-right' : 'share-square';
          } else if (route.name === 'Information') {
            iconName = focused ? 'sign-in' : 'user'
          }else if (route.name === 'Nhapcat') {
            iconName = focused ? 'check' : 'shopping-cart';
          } else if (route.name === 'Xuatcat') {
            iconName = focused ? 'bus' : 'caret-square-o-down'
          }
          

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00AFCE',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: 'flex' },
      })}
    >
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            fontFamily: 'seguisb' },
          tabBarLabel: 'Tồn Kho',
          headerShown: true,
          headerTitle: 'Danh Sách Hàng Tồn',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: 'seguisb', color: 'white', fontSize: 25 },
          headerStyle: { backgroundColor: '#00AFCE' }
        }}
        name="KhoScreen">{() => <Kho user={user} />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            fontFamily: 'seguisb' },
          tabBarLabel: 'Nhập Kho',
          headerShown: true,
          headerTitle: 'Danh Sách Hàng Nhập',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
          headerStyle: { backgroundColor: '#00AFCE' },
        }}
        name="NhapkhoScreen">{() => <Nhapkho user={user} />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: 'Xuất Kho',
          tabBarLabelStyle: {
            fontFamily: 'seguisb' },
          headerShown: true,
          headerTitle: 'Danh Sách Hàng Xuất',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
          headerStyle: { backgroundColor: '#00AFCE' }
        }}
        name="XuatkhoScreen">{() => <Xuatkho user={user} />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            fontFamily: 'seguisb' },
          tabBarLabel: 'Nhập Cắt',
          headerShown: true,
          headerTitle: 'Danh Sách Hàng Nhập Cắt',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
          headerStyle: { backgroundColor: '#00AFCE' },
        }}
        name="Nhapcat">{() => <Nhapcat user={user} />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: 'Xuất Cắt',
          tabBarLabelStyle: {
            fontFamily: 'seguisb' },
          headerShown: true,
          headerTitle: 'Danh Sách Hàng Xuất Cắt',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
          headerStyle: { backgroundColor: '#00AFCE' }
        }}
        name="Xuatcat">{() => <Xuatcat user={user} />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            fontFamily: 'seguisb' },
          tabBarLabel: 'Tài Khoản',
          headerShown: true,
          headerTitle: 'Tài Khoản',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
          headerStyle: { backgroundColor: '#00AFCE' }
        }}
        name="Information">{() => <Information user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Bottomtab;

const styles = StyleSheet.create({
});
