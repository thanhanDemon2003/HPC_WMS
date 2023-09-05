import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/Appcontext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const Information = ({ user }) => {
  const navigation = useNavigation();
  const { logoutContext, thongtin } = useContext(AuthContext);

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
  const handleChangePass = () => {
    navigation.navigate('ChangePass');
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <Text style={styles.thongtin}>{thongtin.name}</Text>
      <TouchableOpacity onPress={handleChangePass}
        style={styles.btn}>
        <Icon
          name={'lock'}
          size={25}
          color="#00AFCE"
          style={styles.icon}
        />
        <Text style={styles.textBtn}>Đổi mật khẩu</Text>
        <Icon
          name={'angle-right'}
          size={25}
          color="#000"
          style={styles.iconNext}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}
        style={styles.btn}>
        <Icon
          name={'sign-in'}
          size={25}
          color="#00AFCE"
          style={styles.icon}
        />
        <Text style={styles.textBtn}>Đăng xuất</Text>
        <Icon
          name={'angle-right'}
          size={25}
          color="#000"
          style={styles.iconNext}
        />
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Information

const styles = StyleSheet.create({
  thongtin: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Segoe UI',
    top: 30,
    color: '#000',
    textAlign: 'center'
  },
  icon:{
    position: 'absolute',
    left: 10,
    top: 17,
  },
  iconNext: {
    position: 'absolute',
    right: 10,
    top: 17,
  },
  btn: {
    top: 50,
    height: 60,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'left',
    margin: 10,
    flexDirection: 'row',
    padding: 10,
  },
  textBtn: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Segoe UI',
    fontWeight: 'semibold',
    marginLeft: 40,
  }
})