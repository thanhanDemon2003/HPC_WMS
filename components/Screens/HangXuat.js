import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, SafeAreaView, BackHandler} from 'react-native';
import axios from '../API/Api';
import moment from 'moment';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Hangxuat = ({ route, navigation }) => {
  const [items, setItems] = useState([]);
  const { sp } = route.params;

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
      const response = await axios.detailSanPhamXuat(sp);
      const data = response.items;
      setItems((prevItems) => [...prevItems, ...data]);
    } catch (error) {
    }
  };

  const renderItem = ({ item }) => (
    <SafeAreaProvider style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.text}>Tên sản phẩm: {item.TEN_SP}</Text>
        <View style={styles.itemRow}>
        <Text style={styles.text1}>HSD: {moment.utc(item.HSD).format('DD-MM-YYYY')}</Text>
        <Text style={styles.text2}>Ref: {item.REF}</Text>
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.detailText}>{item.SL_XUAT} Thùng </Text>
          <Text style={styles.detailText1}> {item.KL_XUAT} Kg</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
    backgroundColor: '#F2F2F2',
    backgroundColor:'white'

  },
  item: {
    alignItems: 'left',
    justifyContent: 'space-around',
    marginBottom: 10,
    minHeight: 170,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 0.5,
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
    marginTop: 10,
    marginBottom: 10,
  },
  text1: {
    left: 5,
    flex:0,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
    fontFamily: 'Segoe UI',
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
    textAlign: 'right',
    flex:1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00AFCE',
    fontFamily: 'seguisb'

  },
});

export default Hangxuat;
