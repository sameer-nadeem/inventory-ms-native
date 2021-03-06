import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native";
import PurchaseUpdateModal from "./PurchaseUpdateModal";
import axios from 'axios'
import { uri } from '../api.json'
import ShowAlert from '../components/ShowAlert';
import { FontAwesome } from "@expo/vector-icons";
import moment from 'moment'
const PurchaseDetailModal = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = React.useState(false);
  const [warehouse, setWarehouse] = useState(``)
  const [location, setLocation] = useState(``)
  const [productName, setProductName] = useState(``)
  const [quantityVal, setQuantityVal] = useState(0)
  const [amountReceived, setAmountReceived] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [clientName, setClientName] = useState(``)
  const [formInputs, setFormInputs] = useState({
    clients: [],
    products: [],
    warehouses: []
  })
  useEffect(() => {
    setModalVisible(props.state);
  }, [props.state]);

  useEffect(() => {
    getPreFormValues()
  }, [])

  const handleCloseUpdate = () => {
    setUpdateModalVisible(false)
  }
  const catchWarning = () => {
    setAlertState(!alertState) 
    setAlertTitle('Attention')
    setAlertMsg('Something went wrong. Please restart')
  }
  const getPreFormValues = async () => {
    try{

    
    const res = await axios.get(`${uri}/api/purchase/form-inputs`)
    setFormInputs(res.data)
    setProductName(res.data.products[0]._id)
    setWarehouse(res.data.warehouses[0]._id)
    setClientName(res.data.clients[0]._id)
    }
    catch(err){
      catchWarning()
    }
  }
  function handleClose() {
    setModalVisible(false);
  }
  const [alertState, setAlertState] = useState(false)
  const [alertTitle, setAlertTitle] = useState(``)
  const [alertMsg, setAlertMsg] = useState(``)
  const show = () => {
    setAlertState(!alertState)
  }
  return (

    <View style={styles.centeredView}>
      <ShowAlert state={alertState} handleClose={show} alertTitle={alertTitle} alertMsg={alertMsg} style={styles.buttonModalContainer} />
      <PurchaseUpdateModal getPurchases={props.getPurchase} initialModalClose={props.handleClose} state={isUpdateModalVisible} handleClose={handleCloseUpdate}  warehouse={warehouse} title='Update Purchase' obj={props.object} formInputs={formInputs} />
      <Modal
        animationType="slide"
        transparent={true}
        swipeDirection="left"
        visible={modalVisible}
        onSwipeComplete={() => props.handleClose()}
        onRequestClose={() => {
          props.handleClose();
        }}
      >
        <TouchableWithoutFeedback onPress={() => props.handleClose()}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style = {{flexDirection: 'row'}}>
                    <View style = {{ right: Dimensions.get('window').height > 900 ? Dimensions.get('window').width * 0.1 : Dimensions.get('window').width * 0.04, top: 18}}>
                      <TouchableOpacity onPress = {() => props.handleClose()}>
                        <FontAwesome
                          name = {"arrow-left"}
                          size = {Dimensions.get('window').height > 900 ? 30:25}
                          color = {"#008394"}
                        />
                      </TouchableOpacity>
                      
                    </View>
                    <Text style={styles.modalTitle}>{props.title}</Text>
                  </View> 
            <ScrollView>
              <View style={styles.modalBody}>
                <Text style={styles.bodyText}>Product: {props.object.product === undefined ? "---" : props.object.product.title} </Text>
                <Text style={styles.bodyText}>Quantity: {props.object.quantity}</Text>
                <Text style={styles.bodyText}>Client Name: {props.object.client === undefined ? "---" : props.object.client.userName}  </Text>
                <Text style={styles.bodyText}>Payment Type: {props.object.payment} </Text>
                <Text style={styles.bodyText}>Total Amount: {props.object.total !== undefined ? props.object.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'} </Text>
                <Text style={styles.bodyText}>Amount Sent: {props.object.received !== undefined ? props.object.received.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'}  </Text>
                <Text style={styles.bodyText}>Notes:  {props.object.note} </Text>
                <Text style={styles.bodyText}>Date: {props.object.date === undefined ? '---' : moment(props.object.date).local().format('YYYY-MM-DD HH:mm:ss') }   </Text>
                <Text style={styles.bodyText}>Type:  {props.object.typeOfPurchase === undefined ? (null) : props.object.typeOfPurchase} </Text>
                {props.object.typeOfPurchase === undefined ? (null) :(props.object.typeOfPurchase === 'Warehouse' ? (<Text style={styles.bodyText}>No Location</Text>) : (<Text style={styles.bodyText}>Location: {props.object.deliveryOrder.location === undefined ? '' :props.object.deliveryOrder.location }</Text>))}

              </View>
            </ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => props.handleClose()}>
                <View style={styles.buttonModalContainer}>
                  <Text style={styles.buttonModalText}>Back</Text>
                </View>
              </TouchableOpacity>
              {props.screen === undefined ? <TouchableOpacity onPress={() => { setUpdateModalVisible(true) }}>
                <View style={styles.backButtonModalContainer}>
                  <Text style={styles.buttonModalText}>Update</Text>
                </View>
              </TouchableOpacity> : null}
            </View>
          </View>


        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'Roboto',
    fontSize: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 24 : 18) : 14,
    paddingTop: Dimensions.get('window').height > 900 ? 25 : 16
  },
  modalTitle: {
    color: '#006270',
    //fontSize: Dimensions.get('window').height > 900 ? 30 : 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 28 : 21) : 24,
    top: 15,
  },
  //Dimensions.get('window').height < 900 ? Dimensions.get('window').height * 0.11 : Dimensions.get('window').height * 0.1
  buttonModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius: 40,
    backgroundColor: '#00E0C7',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? 35 : 15,
    margin: 20,
    display: 'flex',

  },
  backButtonModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius: 40,
    backgroundColor: '#008394',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? 35 : 15,
    margin: 20,
    display: 'flex',

  },
  deleteButtonModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius: 40,
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? 35 : 15,
    margin: 20,
    display: 'flex',

  },
  buttonModalText: {
    color: '#ffffff',
    fontSize: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 24 : 16) : 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalBody: {
    paddingVertical: '15%',
    paddingHorizontal: 10
  },
  modalView: {
    borderColor: "#008394",
    borderWidth: 2,
    borderRadius: 20,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: '80%',
    height: Dimensions.get('window').height > 900 ? '65%' : Dimensions.get('window').height * 0.60
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

});

export default PurchaseDetailModal;