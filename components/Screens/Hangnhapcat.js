import React, { useEffect, useState  } from 'react';
import { FlatList, Text, View, StyleSheet, BackHandler, SafeAreaView } from 'react-native';
import axios from '../API/Api';
import moment from 'moment';



const Hangnhapcat = ({route, navigation}) => {
  
  const [items, setItems] = useState([]);
  const {sp} = route.params;
  

  useEffect(() => {
    fetchData();
  }, []);
  
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
  const fetchData = async () => {
    try {
      const response = await axios.itemMua(sp);
      const data = response.items;
      setItems((prevItems) => [...prevItems, ...data]);
    } catch (error) {
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.text}>Tên sản phẩm: {item.TEN_SP}</Text>
        <View style={styles.itemRow}>
        <Text style={styles.text1}>HSD: {moment.utc(item.HSD).format('DD-MM-YYYY')}</Text>
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(items, index) => index.toString()}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'

  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  item: {
    alignItems: 'left',
    justifyContent: 'space-around',
    marginBottom: 10,
    minHeight: 120,
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
    textAlign: 'justify'
  },
  itemRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : 'space-between',
    marginTop: 5,
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

export default Hangnhapcat;
