import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Pressable, BackHandler } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from '../API/Api';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from '../Context/Appcontext';
import { useNavigation } from '@react-navigation/native';

const ChangePass = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const { logoutContext, thongtin } = useContext(AuthContext);
    const navigation = useNavigation();

    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const handleChangePass = async () => {
        const username = thongtin.username;
        if (password === '' || newPassword === '' || reNewPassword === '') {
            Alert.alert('Thông Báo', 'Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        if (newPassword === password) {
            Alert.alert('Thông Báo', 'Mật khẩu mới không được giống mật khẩu cũ.');
            return;
        }
        if (newPassword !== reNewPassword) {
            Alert.alert('Thông Báo', 'Mật khẩu mới và mật khẩu xác nhận không giống nhau.');
            return;
        }
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
        if (!passwordRegex.test(newPassword) || newPassword.length < 8) {
            Alert.alert('Thông Báo', 'Mật khẩu mới phải chứa ít nhất một chữ cái, một số, một ký tự đặc biệt và có ít nhất 8 ký tự.');
            return;
        }
        try {
            const response = await axios.ChangePass(username, password, newPassword);
            if (response) {
                let timeoutId = setTimeout(() => {
                    logoutContext();
                }, 5000);

                Alert.alert('Thông Báo', 'Đổi mật khẩu thành công, bạn sẽ được đăng xuất sau 5 giây.', [
                    {
                        text: 'OK',
                        onPress: () => {
                            clearTimeout(timeoutId);
                            logoutContext();
                        }
                    }
                ]);
            }
        }
        catch (error) {
            Alert.alert('Thông Báo', 'Lỗi');
        }
    }
    return (
        <SafeAreaProvider style={styles.container}>
            <Text style={styles.Text}>Mật khẩu phải gồm chữ, số, ký tự đặc biệt và ít nhất có 8 ký tự</Text>
            <View>
                <TouchableOpacity style={styles.check} onPress={() => setShowPassword(!showPassword)} >
                    <Text style={styles.TextCheck}>{showPassword ? 'Hiện' : 'Ẩn'}</Text>
                </TouchableOpacity>
                <TextInput
                    placeholderTextColor='gray'
                    fontSize={15}
                    color='black'
                    fontFamily='seguisb'
                    style={styles.input}
                    placeholder="Nhập mật khẩu hiện tại"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                    placeholderTextColor='gray'
                    fontSize={15}
                    fontFamily='seguisb'
                    color='black'
                    style={styles.input}
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    secureTextEntry={!showPassword}
                    onChangeText={text => setNewPassword(text)}
                />
                <TextInput
                    placeholderTextColor='gray'
                    fontSize={15}
                    fontFamily='seguisb'
                    color='black'
                    style={styles.input}
                    placeholder="Nhập lại mật khẩu mới"
                    value={reNewPassword}
                    secureTextEntry={!showPassword}
                    onChangeText={text => setReNewPassword(text)}
                />
                <Pressable style={styles.button} onPress={handleChangePass}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'seguisb'
                    }}>Đổi mật khẩu</Text>
                </Pressable>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    Text: {
        fontSize: 16,
        fontFamily: 'seguisb',
        color: 'black',
        marginTop: 20,
        textAlign: 'center'
    },
    check: {
        alignItems: 'flex-end',
        right: 5,
    },
    TextCheck: {
        fontSize: 17,
        fontFamily: 'seguisb',
        color: 'gray',
        marginBottom: 5,
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    buttonContainer: {
        marginTop: '20%',
    },
    button: {
        top: 50,
        alignItems: 'center',
        backgroundColor: '#00AFCE',
        height: 48,
        borderRadius: 5,
        justifyContent: 'center',
        width: '100%'

    }
});

export default ChangePass;
