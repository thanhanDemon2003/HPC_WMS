import React, { useEffect } from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Bottomtab');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
      <ActivityIndicator size={30} color={'#00AFCE'} />
    </SafeAreaView>
  );
};

export default LoadingScreen;