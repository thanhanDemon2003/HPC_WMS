import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput, StatusBar, ActivityIndicator, BackHandler, ToastAndroid } from 'react-native';
import axios from '../API/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

const Kho = ({ user }) => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let lastPress = 0;
  const timer = useRef(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleItemPress = (item) => {
    navigation.navigate('Chitiettonkho', { user: user, maSP: item.MA_SP });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const backAction = () => {
      if (lastPress + 3000 >= Date.now()) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('Nhấn lần nữa để thoát', ToastAndroid.SHORT);
        lastPress = Date.now();
        navigation.jumpTo('KhoScreen');
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const fetchData = useCallback(async () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setIsLoading(true);
    timer.current = setTimeout(() => setIsLoading(false));
    try {
      const state = await NetInfo.fetch();
      let data;

      if (state.isConnected) {
        const response = await axios.getItemsPage(user, page, searchTerm);
        data = response.products;
        clearTimeout(timer);
        setIsLoading(false);
        await AsyncStorage.setItem('products', JSON.stringify(data));
      } else {
        clearTimeout(timer);
        setIsLoading(false);
        const savedData = await AsyncStorage.getItem('products');
        data = JSON.parse(savedData);
      }

      if (page === 1) {
        setItems(data);
      } else {
        setItems((prevItems) => [...prevItems, ...data]);
      }
    } catch (error) {
      clearTimeout(timer);
      const savedData = await AsyncStorage.getItem('products');
      const data = JSON.parse(savedData);
      setItems(data);
    }setIsSearching(false);
  }, [user, page, searchTerm]);

  const handleSearchButtonPress = () => {
    setItems([]);
    setPage(1);
    fetchData();
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
        <View style={styles.itemContent}>
          <Text style={styles.text}>{item.TEN_SP}</Text>
          <View style={styles.itemRow}>
            <Text style={styles.valueText2}>{item.SL_TONKHO} Thùng</Text>
            <Text style={styles.valueText}>{item.KHOI_LUONG} Kg</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const handleLoadMore = _.throttle(() => {
    if (!isSearching) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 1000);

  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <StatusBar backgroundColor="#00AFCE" />
      <View style={{
        flexDirection: 'column',
        paddingHorizontal: 'center',
        marginBottom: 5, backgroundColor: 'white', borderBottomWidth: 0.5, alignItems: 'flex-start',
      }}>
        <TextInput
          placeholderTextColor='black'
          fontSize={15}
          fontFamily='seguisb'
          color='black'
          style={styles.searchBar}
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {isLoading && <ActivityIndicator style={{ flex: 1 }} size="large" color={'#00AFCE'} />}
    </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white'
  },
  searchBar: {
    left: 5,
    marginTop: 20,
    height: 40,
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchButton: {
    marginBottom: 20,
    width: '25%',
    height: 40,
    marginLeft: '74%',
    marginTop: -50,
    backgroundColor: '#00AFCE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  item: {
    alignItems: 'left',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: 'black',
    borderBottomWidth: 0.5,
    marginBottom: 10,
    minHeight: 100,
  },
  itemContent: {
    position: 'position',
    margin: 10,
  },
  text: {
    top: -5,
    fontSize: 16,
    fontWeight: 'medium',
    color: 'black',
    fontFamily: 'seguisb'
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  labelText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '100',
    color: 'black',
    fontFamily: 'Segoe UI'
  },
  valueText: {
    textAlign: 'right',
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00AFCE',
    fontFamily: 'seguisb'
  },
  valueText2: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00AFCE',
    fontFamily: 'seguisb'
  },
  valueText1: {
    textAlign: 'right',
    flex: 1,
    fontSize: 15,
    fontWeight: '200',
    color: 'black',
    fontFamily: 'Segoe UI'
  },
});

export default Kho;
