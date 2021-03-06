import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from "react-native";
import { connect } from 'react-redux'
import { logout } from "../actions/auth";
const UserInfoModal = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({})
  useEffect(() => {
    setModalVisible(props.state);
    setUser(props.auth)
  }, [props.state]);


  function handleClose() {
    setModalVisible(false);
  }
  return (

    <View style={styles.centeredView}>
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
            <Text style={styles.modalTitle}>User Information</Text>
            <View style={styles.modalBody}>
              <Text style={styles.bodyText}>Name: {props.auth?.userName}</Text>
              <Text style={styles.bodyText}>Status: {props.auth?.type}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => props.handleClose()}>
                <View style={styles.buttonModalContainer}>
                  <Text style={styles.buttonModalText}>Back</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { props.handleClose(); /*props.navigation.navigate({ routeName: 'AdminLogin' });*/ props.logout(props.navigation); console.log('logout') }}>
                <View style={styles.backButtonModalContainer}>
                  <Text style={styles.buttonModalText}>Logout</Text>
                </View>
              </TouchableOpacity>
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
    fontSize: Dimensions.get('window').height > 900 ? 22 : 14,
    paddingTop: Dimensions.get('window').height > 900 ? 25 : 16
  },
  modalTitle: {
    color: '#006270',
    fontSize: 30,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height > 900 ? 36 : 28,
    top: 15,
  },
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
  buttonModalText: {
    color: '#ffffff',
    fontSize: Dimensions.get('window').height < 900 ? 16 : 24,
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
    paddingVertical: Dimensions.get('window').height < 900 ? Dimensions.get('window').height * 0.11 : Dimensions.get('window').height * 0.1,
    paddingHorizontal: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#008394",
    width: Dimensions.get('window').height > 900 ? Dimensions.get('window').width * 0.7 : Dimensions.get('window').width * 0.80,
    height: Dimensions.get('window').height > 900 ? Dimensions.get('window').height * 0.5 : Dimensions.get('window').height * 0.60
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

});

const mapStateToProps = (state) => {
  console.log("AUTH-->", state.auth)
  return {
    auth: state.auth.user
  }
}

export default connect(mapStateToProps, { logout })(UserInfoModal)