import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Pressable, BackHandler, SafeAreaView } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import axios from './API/Api';
import { AuthContext } from './Context/Appcontext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(true);
  const { loginContext } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.Login(username, password);
      const user = response.user;
      const thongtin =  response.TT
      if (user) {
        loginContext(user, thongtin);
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Thông báo',
          text2: 'Đăng Nhập Thành Công',
          visibilityTime: 2000, 
        });
        if (rememberPassword) {
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('password', password);
        } else {
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('password');
        }
      }
      else {
        Alert.alert('Thông Báo', response.message)
      }
    }
    catch (error) {
      Alert.alert('Thông Báo', 'Lỗi từ server hoặc lỗi mạng');
    }
  };
  useEffect(() => {
    const getStoredCredentials = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');

      if (storedUsername && storedPassword) {
        setUsername(storedUsername);
        setPassword(storedPassword);
        setRememberPassword(true);
      }
    };

    getStoredCredentials();
  }, []);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  let lastPress = 0;

  useEffect(() => {
    const backAction = () => {
      if (lastPress + 3000 >= Date.now()) {
        BackHandler.exitApp();
      } else {
        lastPress = Date.now();
      }
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  
    return () => backHandler.remove(); // Hủy đăng ký listener khi unmount
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Đăng Nhập</Text>
      <TextInput
        placeholderTextColor='black'
        fontSize={15}
        color='black'
        fontFamily='seguisb'
        style={styles.input}
        placeholder="Tài khoản"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholderTextColor='black'
          fontSize={15}
          fontFamily='seguisb'
          color='black'
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.passwordIconContainer}
          onPress={toggleShowPassword}
        >
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="gray"
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={rememberPassword}
          onPress={() => setRememberPassword(!rememberPassword)}
          checkedColor="#00AFCE"
        />
        <Text style={styles.checkboxLabel}>Lưu mật khẩu</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'seguisb'
          }}>Đăng Nhập</Text>
        </Pressable>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00AFCE',
    marginBottom: 50
  }
  ,
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '90%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '90%',
  },
  passwordIconContainer: {
    position: 'absolute',
    right: 20,
  },
  passwordIcon: {
    marginLeft: 5,
    marginTop: -10
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight:'62%'
  },
  checkboxLabel: {
    marginLeft: -15,
    fontSize: 15,
    color: 'black',
    fontFamily: 'seguisb',
    fontWeight: 'thin',
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00AFCE',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',

  }
});

export default LoginForm;
