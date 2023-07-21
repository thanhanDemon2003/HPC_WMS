
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const savedLoginStatus = await AsyncStorage.getItem('isLoggedIn');
      const savedUser = await AsyncStorage.getItem('user');
      setIsLoggedIn(savedLoginStatus === 'true');
      setUser(JSON.parse(savedUser));
    };

    checkLoginStatus();
  }, []);

  const loginContext = async (user) => {
    setIsLoggedIn(true);
    setUser(user);
    await AsyncStorage.setItem('isLoggedIn', 'true');
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const logoutContext = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await AsyncStorage.setItem('isLoggedIn', 'false');
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};