import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Bottomtab');
    }, 5000);

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts.
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;