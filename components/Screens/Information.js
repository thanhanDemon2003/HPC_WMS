import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, {useContext } from 'react'
import { AuthContext } from '../Context/Appcontext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Information = ({user}) => {
    const { logoutContext } = useContext(AuthContext);

    const handleLogout = () => {
      Alert.alert(
        'Xác nhận',
        'Bạn có chắc chắn muốn đăng xuất?',
        [
          { text: 'Không', style: 'cancel' },
          { text: 'Có', onPress: logoutContext }
        ]
      );
    };
  return (
    <SafeAreaProvider style={{flex: 1,backgroundColor:'white', alignItems: 'center'}}>
      <TouchableOpacity onPress={handleLogout}
      style={{top:30,height:50, width:200, alignItems: 'center', backgroundColor: '#00AFCE', borderRadius: 10, justifyContent:'center'}}>
        <Text style={{fontSize:20, color: 'white', fontFamily: 'Segoe UI', fontWeight: 'bold' }} >Đăng Xuất</Text></TouchableOpacity>
    </SafeAreaProvider>
  )
}

export default Information

const styles = StyleSheet.create({})