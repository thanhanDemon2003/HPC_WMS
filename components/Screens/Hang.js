import React, { useEffect, useState  } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../API/Api';
import moment from 'moment';



const Hang = ({route}) => {
  
  const [items, setItems] = useState([]);
  const {sp} = route.params;
  console.log(sp)
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.detailSanPham(sp);
      const data = response.items;
      setItems((prevItems) => [...prevItems, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.text}>Tên sản phẩm: {item.TEN_SP}</Text>
        <View style={styles.itemRow}>
        <Text style={styles.text1}>HSD: {moment(item.HSD).format('DD-MM-YYYY')}</Text>
        <Text style={styles.text2}>Ref: {item.REF}</Text>
        </View>
        <View style={styles.itemDetails}>
        <Text style={styles.detailText}>{item.SO_LUONG} Thùng </Text>
        <Text style={styles.detailText1}>{item.KHOI_LUONG} Kg </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(items, index) => index.toString()}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white'


  },
  item: {
    alignItems: 'left',
    justifyContent: 'space-around',
    height: 170,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderBottomWidth: 0.5,

  },
  itemContent: {
    position: 'relative',
    margin: 10,
  },
  text: {
    left: 5,
    fontSize: 16,
    fontWeight: 'medium',
    color: 'black',
    fontFamily: 'seguisb',

  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
    marginBottom:10
  },
  text1: {
    flex:0,
    left: 5,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
    fontFamily: 'Segoe UI'

  },
  text2: {
    textAlign: 'right',
    flex:1,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
    fontFamily: 'Segoe UI'

  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    flex:0,
    left: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00AFCE',  
    fontFamily: 'seguisb'

  },
  detailText1: {
    left: 3,
    textAlign: 'right',
    flex:1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00AFCE',
    fontFamily: 'seguisb'

  },
});

export default Hang;
