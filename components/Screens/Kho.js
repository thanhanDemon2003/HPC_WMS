import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from '../API/Api';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const Kho = ({ user }) => {


  console.log(user)
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setsearchTerm] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const state = await NetInfo.fetch();
      let data;

      if (state.isConnected) {
        const response = await axios.getItemsPage(user, page, searchTerm);
        data = response.products;
        await AsyncStorage.setItem('products', JSON.stringify(data));
      } else {
        const savedData = await AsyncStorage.getItem('products');
        data = JSON.parse(savedData);
      }

      if (page === 1) {
        setItems(data);
      } else {
        setItems((prevItems) => [...prevItems, ...data]);
      }
    } catch (error) {
      console.log('error>>', error);
      const savedData = await AsyncStorage.getItem('products');
      const data = JSON.parse(savedData);
      setItems(data);
    }
    
  };

  const handleSearchButtonPress = () => {
    setItems([]);
    setPage(1);
    fetchData();
  };


  const renderItem = ({ item }) => {
  return(
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.text} >{item.TEN_SP}</Text>
        <View style={styles.itemRow}>
          <Text style={styles.labelText}>HSD: {moment(item.HSD).format('DD-MM-YYYY')}</Text>
       {item.SO_CONT &&  <Text style={styles.valueText1}>Số cont: {item.SO_CONT}</Text>}
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.labelText}>Ref: {item.REF}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.valueText2}>{item.SL_TONKHO} Thùng</Text>
          <Text style={styles.valueText}>{item.KHOI_LUONG} Kg</Text>
        </View>
      </View>
    </View>
    )
  }
  

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <View style={{  flexDirection: 'column', // Hiển thị các phần tử ngang hàng // Canh giữa các phần tử theo chiều dọc
    paddingHorizontal: 'center',
    marginBottom: 5, backgroundColor:'white',borderBottomWidth: 0.5, alignItems: 'flex-start',
     }}>
      <TextInput
        placeholderTextColor='black'
        fontSize={15}
        fontFamily='seguisb'
        color='black'
        style={styles.searchBar}
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChangeText={text => setsearchTerm(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
        <Text style={styles.searchButtonText}>Tìm kiếm</Text>
      </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(items, index) => index.toString()} 
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor:'white'
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
    marginBottom:20,
    width: '25%',
    height:40,
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
    height: 150,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderBottomWidth: 0.5,  
     },
  itemContent: {
    position: 'position',
    margin: 10,
  },
  text: {
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
