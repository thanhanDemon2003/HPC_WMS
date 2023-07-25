// Xuatkho.js
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, BackHandler } from 'react-native';
import axios from '../API/Api';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Xuatcat = ({ user }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [filterType, setSelectedFilter] = useState('all');
  const [filterTypeTT, setSelectedFilterTT] = useState('1');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate('Hangxuatcat', { sp: item.ID_TRANSFER });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setItems([]);
    setPage(1);
    setDate(date);
    fetchData(filterType, filterTypeTT, date);
  };
  const handleFilterChange = (value) => {
    setSelectedFilter(value.value);
    if (value.value === 'custom') {
      showDatePicker();
    } else {
      setItems([]);
      setPage(1);
      fetchData(value.value, filterTypeTT, date);
    }
  };
  const loaddulieubandau = async () => {
    setSelectedFilterTT('1');
    setSelectedFilter('all');
    const savedData = await AsyncStorage.getItem('itemsXuat');
    data = JSON.parse(savedData);
  }
  const handleFilterChangeTT = (status) => {
    setSelectedFilterTT(status.status);
    setItems([]);
    setPage(1);
    fetchData(filterType, status.status, date, 1);
  }
  useEffect(() => {
    setPage(1);
    fetchData();
  }, []);

  const fetchData = async (filterType = 'all', filterTypeTT = '1', date = new Date(), retry = 0) => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 5000);
    try {
      const state = await NetInfo.fetch();
      let data;
      let url;

      if (filterType === 'all' && filterTypeTT === '1') {
        url = await axios.getItemBan(user, filterType, page, date, filterTypeTT);
      } else {
        url = await axios.locItemBan(user, filterType, page, date, filterTypeTT);
      }
      if (state.isConnected) {
        clearTimeout(timer);
        setIsLoading(false);
        const response = url;
        data = response.items;
        await AsyncStorage.setItem('itemsXuat', JSON.stringify(data));
      } else {
        clearTimeout(timer);
        setIsLoading(false);
        const savedData = await AsyncStorage.getItem('itemsXuat');
        data = JSON.parse(savedData);
      }
      if (page === 1) {
        setItems(data);
      } else {
        setItems((prevItems) => [...prevItems, ...data]);
      }

    } catch (error) {
      Alert.alert(
        'Thông báo',
        'Lỗi dữ liệu, bạn có muốn load lại dữ liệu được lưu không?',
        [
          { text: 'Không', style: 'cancel' },
          { text: 'Có', onPress: loaddulieubandau }
        ]
      )

    }
  };

  const renderItem = ({ item }) => {
    const jsonData = item.GHI_CHU;
    const formattedData = jsonData.replace(/\n/g, ' ');

    return (
      <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
        <View style={styles.itemContent}>
          <Text style={styles.text} allowFontScaling={false}>ND: {formattedData}</Text>
          <View style={styles.itemRow}>
            <Text style={styles.labelText}>Ngày xuất: {moment.utc(item.NGAY_CHUYEN).format('DD-MM-YYYY')}</Text>
            <Text style={styles.valueText1}>Trạng thái: {item.TRANG_THAI}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.valueText2}>{item.SO_THUNG} Thùng</Text>
            <Text style={styles.valueText}>{item.KHOI_LUONG} Kg</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData(filterType, filterTypeTT, date);
  };

  const filterOptions = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Ngày', value: 'today' },
    { label: 'Tuần', value: 'thisWeek' },
    { label: 'Tháng', value: 'thisMonth' },
    { label: 'Tùy chọn', value: 'custom' },
  ];
  const filterOptionsTT = [
    { label: 'Tất cả', status: '1' },
    { label: 'Hoàn tất', status: '2' },
    { label: 'Đang xử lý', status: '3' },
    { label: 'Hủy', status: '4' },
  ];
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon style={{ left: 10 }} name="calendar-outline" size={18} color="#808080"></Icon>
          <SelectDropdown
            data={filterOptions}
            defaultButtonText="Tất cả"
            defaultValue={filterType}
            onSelect={(value) => handleFilterChange(value)}
            buttonTextAfterSelection={(selectedItem) => selectedItem.value === 'custom' ? moment(date).format('DD-MM-YYYY') : selectedItem.label}
            rowTextForSelection={(item) => item.label}
            buttonStyle={styles.filterButton}
            buttonTextStyle={styles.filterButtonText}
            dropdownStyle={styles.filterDropdown}
            dropdownTextStyle={styles.filterDropdownText}
            rowStyle={{ borderBottomWidth: 0 }}
          />{isDatePickerVisible && (
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          )}
          <Icon style={{ right: 40 }} name="caret-down-outline" size={18} color="#808080" />
        </View>
        <View style={{ left: 30, flexDirection: 'row', alignItems: 'center' }}>
          <Icon style={{ left: 10 }} name="options-outline" size={18} color="#808080"></Icon>
          <SelectDropdown
            data={filterOptionsTT}
            defaultButtonText="Tất cả"
            defaultValue={filterTypeTT}
            onSelect={(status) => handleFilterChangeTT(status)}
            buttonTextAfterSelection={(selectedItem) => selectedItem.label}
            rowTextForSelection={(item) => item.label}
            buttonStyle={styles.filterButton}
            buttonTextStyle={styles.filterButtonText}
            dropdownStyle={styles.filterDropdown}
            dropdownTextStyle={styles.filterDropdownText}
            rowStyle={{ borderBottomWidth: 0 }}
          />
          <Icon style={{ right: 40 }} name="caret-down-outline" size={18} color="#808080" />
        </View>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
      />
      {isLoading && <ActivityIndicator size="100" color={'#00AFCE'} />}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 0,
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
    left: 5
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    left: 10,
    width: 140
  },
  filterButtonText: {
    color: '#808080',
    fontWeight: 'thin',
    fontFamily: 'seguisb',
    textAlign: 'left',
    fontSize: 16,
    left: 20
  },
  filterDropdown: {
    marginLeft: -40,
    marginRight: 10,
    backgroundColor: '#ffff',
    borderWidth: 0,

  },
  filterDropdownText: {
    fontSize: 16,
    color: '#333333',
    alignItems: 'right',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  item: {
    alignItems: 'left',
    justifyContent: 'center',
    height: 140,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderBottomWidth: 0.5,
  },
  itemContent: {
    position: 'relative',
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
    marginTop: 10,
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
  }
});

export default Xuatcat;
