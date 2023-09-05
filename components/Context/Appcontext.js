
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(1);
  const [thongtin, setThongtin] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const savedLoginStatus = await AsyncStorage.getItem('isLoggedIn');
      const savedUser = await AsyncStorage.getItem('user');
      const savedThongtin = await AsyncStorage.getItem('thongtin');
      setIsLoggedIn(savedLoginStatus === 'true');
      setUser(JSON.parse(savedUser));
      setThongtin(JSON.parse(savedThongtin));
    };
    checkLoginStatus();
  }, []);

  const loginContext = async (user, thongtin) => {
    setIsLoggedIn(true);
    setUser(user);
    setThongtin(thongtin);
    console.log(thongtin);
    await AsyncStorage.setItem('isLoggedIn', 'true');
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('thongtin', JSON.stringify(thongtin));
  };

  const logoutContext = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await AsyncStorage.setItem('isLoggedIn', 'false');
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loginContext, logoutContext, thongtin }}>
      {children}
    </AuthContext.Provider>
  );
};