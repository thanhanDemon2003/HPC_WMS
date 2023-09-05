import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, BackHandler, SafeAreaView} from 'react-native';
import axios from '../API/Api';
import moment from 'moment';



const SpKho = ({ route, navigation }) => {

  const [items, setItems] = useState([]);
  const { user, maSP } = route.params;
  console.log(user, maSP);


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
      const response = await axios.detailSanPhamKho(user, maSP);
      const data = response.items;
      setItems((prevItems) => [...prevItems, ...data]);
    } catch (error) {
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
    <View style={styles.itemContent}>
      <Text style={styles.text} >{item.TEN_SP}</Text>
      <View style={styles.itemRow}>
        <Text style={styles.labelText}>HSD: {moment.utc(item.HSD).format('DD-MM-YYYY')}</Text>
        {item.SO_CONT && <Text style={styles.valueText1}>Số cont: {item.SO_CONT}</Text>}
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
        position: 'relative',
        backgroundColor: 'white'
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
        width: '100%',
      },
      labelText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '400',
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
        fontWeight: '400',
        color: 'black',
        fontFamily: 'Segoe UI'
      },
    });

export default SpKho;
