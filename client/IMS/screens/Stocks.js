import * as React from 'react';
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';
import StockModal from '../components/StockModal';
import FilterButton from '../components/FilterButton';
import { uri } from '../api.json'
import axios from "axios"
import Spinner from '../components/Spinner';
import ShowAlert from '../components/ShowAlert'
import ExportButton from '../components/ExportAsExcel'
import { connect } from 'react-redux'


const optionsPerPage = [2, 3, 4];

const Stocks = (props) => {


  const [products, setProducts] = useState([])
  const [touchedProduct, setTouchedProduct] = useState([])
  const [filters, setFilters] = useState({
    page: 1,
    query: '*',
    sort: '*',
    sortBy: '*'
  })
  const [loading, setLoading] = useState(true)
  const [stock, setStock] = useState([])
  const [alertState, setAlertState] = useState(false)
  const [alertTitle, setAlertTitle] = useState(``)
  const [alertMsg, setAlertMsg] = useState(``)

  const show = () => {
    setAlertState(!alertState)
  }
  const setError = () => {
    setAlertTitle('Error')
    setAlertMsg('Client with this name already exists.')
    show()
  }


  useEffect(() => {
    setModalVisible(props.state);
  }, [props.state]);


  const getStock = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${uri}/api/product/stock/`
        + `${filters.page}/${filters.query}/${props.stockFilters.product.join(',')}`
        + `/${props.stockFilters.ware.join(',')}/`
        + `${props.stockFilters.stock}/${filters.sort}/${filters.sortBy}`
      )
      res.data.stocks.length === 0 ? searchWarning() : null
      setProducts(res.data.stocks.reverse())
    }
    catch (err) {
      catchWarning()
    }
    setLoading(false)
    //setSelectedProduct(res.data.warehouse[0]._id)
  }
  useEffect(() => {
    props.navigation.addListener('didFocus', () => {
      getStock()
    })
  }, [])

  const catchWarning = () => {
    setAlertState(!alertState)
    setAlertTitle('Attention')
    setAlertMsg('Something went wrong. Please restart')
  }


  const [page, setPage] = React.useState(0); //for pages of table
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]); //for items per page on table

  const [isModalVisible, setModalVisible] = React.useState(false); //to set modal on and off

  const toggleModal = () => { //to toggle model on and off -- function
    setModalVisible(!isModalVisible);
  };

  const searchWarning = () => {
    setAlertState(!alertState)
    setAlertTitle('Attention')
    setAlertMsg('No stock found!')
  }

  React.useEffect(() => { //for table
    setPage(0);
  }, [itemsPerPage]);


  const [search, setSearch] = React.useState(``) //for keeping track of search
  const onChangeSearch = (searchVal) => { //function to keep track of search as the user types
    setSearch(searchVal);
    let q = searchVal.trim()
    setFilters({ ...filters, query: q === '' ? '*' : q })
  }

  const searchFunc = () => {
    //printing search value for now
    getStock()
  }


  // make a sale variables below:
  const [serialNo, setSerialNo] = React.useState(``)
  const [productName, setProductName] = React.useState(``)
  const [amountVal, setAmountVal] = React.useState(0)
  const [color, setColor] = React.useState(``)
  const [brand, setBrand] = React.useState(``)
  const [description, setDescription] = React.useState(``)
  const [isTableDetailModalVisible, setTableDetailModalVisible] = React.useState(false);

  const onPressModal = (prod) => {
    setTableDetailModalVisible(true),
      setTouchedProduct(prod)
  }

  const handleClose = () => {
    setTableDetailModalVisible(false)
  }




  return (
    // <KeyboardAvoidingView style = {styles.containerView} behavior = "padding">
    <ScrollView>
      <ShowAlert state={alertState} handleClose={show} alertTitle={alertTitle} alertMsg={alertMsg} style={styles.buttonModalContainer} />
      <StockModal state={isTableDetailModalVisible} handleClose={handleClose} object={touchedProduct !== [] ? touchedProduct : null} title='Stock Detail' getStock={getStock} />
      <View style={styles.screen}>
        <View>
          <Text style={styles.title}>Stocks</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <View style={styles.buttonContainer}>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
          <View style={styles.searchBar}>
            <TextInput onChangeText={onChangeSearch} style={styles.buttonInput} placeholder="type here..." autoCorrect={false} />
          </View>
          <View style={{ top: 15 }}>
            <TouchableOpacity onPress={() => { searchFunc() }}>
              <View style={styles.searchButton}>
                <FontAwesome
                  name={"search"}
                  size={16}
                  color={"#006270"}
                  style={{ right: 10, top: 3 }}
                />
                <Text style={styles.searchButtonText}>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingRight: 60, bottom: 60 }}>
        <View>
          <FilterButton page="stock" getStock={getStock} />
        </View>
        <View style={{ marginTop: 25 }}>
          <ExportButton data={products} title={'stocks.xlsx'} screenName='stocks' />
        </View>
      </View>
      <Spinner loading={loading} />

      <DataTable style={{ bottom: 40 }}>
        <DataTable.Header>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Serial No.</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Product</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Warehouse</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Stock</Text></DataTable.Title>

        </DataTable.Header>

        {!loading && <ScrollView>
          <View>
            {
              products.map((product, i) => (
                <TouchableOpacity key={i} onPress={() => onPressModal(product)}>
                  <DataTable.Row>
                    <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{product.product === undefined ? 0 : product.product.serial}</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{product.product === undefined ? 0 : product.product.title}</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{product.warehouse === undefined ? '--' : product.warehouse.name}</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{product === undefined ? '--' : product.stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>

              ))
            }
          </View>
        </ScrollView>}
      </DataTable>


    </ScrollView>




  )
}


Stocks.navigationOptions = navigationData => {
  return {
    headerTitle: 'Zaki Sons',
    headerTitleAlign: 'center',
    headerTitleStyle: { color: 'white' },
    headerStyle: {
      backgroundColor: '#008394',
    },
    headerLeft: (
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
  };
};


const mapStateToProps = (state) => (
  {
    stockFilters: state.stockFilters
  }
)

export default connect(mapStateToProps)(Stocks)



const styles = StyleSheet.create({
  title: {
    color: '#006270',
    fontSize: 30,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height > 900 ? 36 : 28,
    bottom: 20
  },
  modalTitle: {
    color: '#006270',
    fontSize: 30,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height > 900 ? 36 : 28,
    top: 20,
  },
  modalStyle: {
    backgroundColor: "#fff",
    width: Dimensions.get('window').height > 900 ? 600 : 320,
    height: Dimensions.get('window').height > 900 ? 680 : 600,
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: "#008394",
    marginTop: Dimensions.get('window').height > 750 ? Dimensions.get('window').height * 0.1 : 0
  },
  subtitle: {
    color: '#008394',
    fontSize: 25,
    marginTop: 50,
    fontFamily: 'Roboto',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height > 900 ? 50 : 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    left: 15
    // right: Dimensions.get('window').width / 5
    // we can also change the container to center and implement the right styling
  },
  buttonModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius: 40,
    backgroundColor: '#00E0C7',
    paddingVertical: 8,
    paddingHorizontal: 24,
    //top: 45,
    margin: 20,
    display: 'flex'
  },
  buttonModalContainerCross: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius: 40,
    backgroundColor: '#ff0000',
    paddingVertical: 8,
    paddingHorizontal: 24,
    //top: 45, //here is the problem
    margin: 20,
    display: 'flex'
  },
  buttonModalText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    bottom: 60
  },
  input: {
    width: Dimensions.get('window').width * 0.65,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 40,
    marginBottom: 20,
    fontSize: 12,
    borderColor: "#008394",
    //top: 60,
    height: 40,
    padding: 10,
  },
  filterInput: {
    width: Dimensions.get('window').width * 0.35,
    height: 1000,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 20,
    fontSize: 12,
    borderColor: "#008394",
  },
  searchBar: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    bottom: 30,
    left: Dimensions.get('window').height > 900 ? Dimensions.get('window').width / 11 : 0,

  },
  searchButton: {
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height > 600 ? 15 : 8,
    borderRadius: 25,
    backgroundColor: '#008394',
    paddingVertical: 12,
    paddingHorizontal: 30,
    //top: 43, //HERE IS THE ISSUE
    right: 20,
  },
  searchButtonText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  buttonInput: {
    width: Dimensions.get('window').width * 0.65,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 40,
    marginBottom: 20,
    fontSize: 14,
    borderColor: "#008394",
    top: 60,
    height: 44,
    padding: 15,
    left: 30,
    paddingBottom: 13,
  },
  cells: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    //paddingRight: 40,
    alignItems: 'center',
    alignContent: 'center',
  },
  tableText: {
    fontSize: Dimensions.get('window').height > 900 ? 18 : 14,
  },
  tableTitleText: {
    fontSize: Dimensions.get('window').height > 900 ? 18 : 14,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalBody: {
    paddingVertical: Dimensions.get('window').height < 900 ? Dimensions.get('window').height * 0.11 : Dimensions.get('window').height * 0.1,
    paddingHorizontal: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').height > 900 ? Dimensions.get('window').width * 0.7 : Dimensions.get('window').width * 0.80,
    height: Dimensions.get('window').height > 900 ? Dimensions.get('window').height * 0.5 : Dimensions.get('window').height * 0.60
  },
  addButton: {
    borderRadius: 40,
    backgroundColor: '#00E0C7',
    height: 24,
    width: 80,

  },
  modalbuttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
    marginTop: 3.5,
  },
  modalBody: {
    paddingVertical: '30%',
    paddingHorizontal: 10
  },
  backButtonModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius: 40,
    backgroundColor: '#008394',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 35 : null) : null,
    margin: 20,
    display: 'flex',

  },
})
