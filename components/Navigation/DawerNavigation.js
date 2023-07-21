import { StyleSheet, Button, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DawerNavigation = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Filter" component={FilterScreen} />
  </Drawer.Navigator>
);

const handleApplyFilter=()=>{
}
const FilterScreen = ({ navigation }) => (
  <View>
    <Button title="Apply" onPress={handleApplyFilter} />
    <Button title="Cancel" onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} />
  </View>
);

export default DawerNavigation

const styles = StyleSheet.create({})