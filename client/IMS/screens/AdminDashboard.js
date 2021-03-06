import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderNavigation from '../components/HeaderNavigation';
import { uri } from '../api.json'
import axios from "axios"

const AdminDashboard = props => {

  // useEffect(() => {
  //   console.log('dashboarddd')
  //   props.navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Profile' }],
  //   });
  // }, [props.navigation])

  const [outOfStock, setOutOfStock] = React.useState(0);
  const [todayRevenue, settodayRevenue] = React.useState(0);
  const [pendingDeliveries, setPendingDeliveries] = React.useState(0);


  const getOutofStock = async () => {
    const res = await axios.get(
      `${uri}/api/dashboard/outOfStock`
    )

    console.log('/////////////', res.data.outOfStock)
    setOutOfStock(res.data.outOfStock)
  }

  const getToday = async () => {
    const res = await axios.get(
      `${uri}/api/dashboard/todayRevenue`
    )


    try {
      settodayRevenue(res.data.todaysRevenue.revenue)
    }
    catch (err) { }
  }

  const getPending = async () => {
    const res = await axios.get(
      `${uri}/api/dashboard/pendingDeliveries`
    )

    console.log('//////pending', res.data.pendingDeliveries)
    setPendingDeliveries(res.data.pendingDeliveries)


  }

  useEffect(() => {
    console.log('112211')
    getOutofStock()
    getToday()
    getPending()
  }, [])



  return (
    <ScrollView>
    <View style={{ marginTop: Dimensions.get('window').height < 900 ? 5 : 60 }}>
      <View style={{ justifyContent: 'center', alignSelf: 'center', }}>
        <Text style={styles.titleText}>Admin Dashboard</Text>
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate({ routeName: 'Stocks' })}>
        <View style={styles.containers}>
          <Text style={styles.containerText}>Goods out of stock {outOfStock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate({ routeName: 'Sales' })}>
        <View style={styles.containers}>
          <Text style={styles.containerText}>Today's Revenue {todayRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => props.navigation.navigate({ routeName: 'Delivery' })}>
        <View style={styles.containers}>
          <Text style={styles.containerText}>Pending Deliveries {pendingDeliveries}</Text>
        </View>
      </TouchableOpacity> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate({ routeName: 'Sales' })}>
          <View elevation={5} style={styles.buttons}>
            <Text style={styles.buttonContainerText}>Make a Sale</Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingLeft: 20 }}>
          <TouchableOpacity onPress={() => props.navigation.navigate({ routeName: 'MakePurchase' })}>
            <View elevation={5} style={styles.buttons}>
              <Text style={styles.buttonContainerText}>Make a Purchase</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  )
}

AdminDashboard.navigationOptions = navigationData => {
  return {
    headerTitle: 'Zaki Sons',
    headerTitleAlign: 'center',
    headerTitleStyle: { color: 'white' },
    headerStyle: {
      backgroundColor: '#008394',
    },
    headerLeft: () =>(
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderNavigation navigation={navigationData.navigation} />
    )
  };
};

const styles = StyleSheet.create({
  titleText: {
    color: '#008394',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height > 900 ? 32 : 24

  },
  containers: {
    borderColor: '#00E0C7',
    borderRadius: 30,
    width: Dimensions.get('window').width * 0.65,
    height: Dimensions.get('window').height * 0.15,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height < 900 ? Dimensions.get('window').height * 0.04 : Dimensions.get('window').height * 0.045,
  },
  containerText: {
    color: '#008394',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height > 900 ? 26 : 20
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: Dimensions.get('window').height < 900 ? 30 : Dimensions.get('window').height * 0.045,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5
  },

  buttons: {
    width: Dimensions.get('window').width * 0.65 / 2,
    height: Dimensions.get('window').height * 0.15,
    borderColor: '#00E0C7',
    backgroundColor: '#00E0C7',
    borderRadius: 30,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  buttonContainerText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height > 900 ? 26 : 20,
    textAlign: 'center'

  },
})


export default AdminDashboard