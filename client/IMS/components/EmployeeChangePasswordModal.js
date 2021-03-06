import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback } from "react-native";
import { uri } from '../api.json'
import axios from "axios"
import ShowAlert from './ShowAlert';


const EmployeeChangePasswordModal = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [employeeName, setEmployeeName] = useState(``);
  const [password, setPassword] = useState(``);
  const [alertState, setAlertState] = useState(false)
  const [alertTitle, setAlertTitle] = useState(``)
  const [alertMsg, setAlertMsg] = useState(``)
  const [id, setID] = useState(``)
  const [occupation, setOccupation] = useState(``)

  const show = () => {
    setAlertState(!alertState)
  }
  const setError = () => {
    setAlertTitle('Error')
    setAlertMsg('Something went wrong')
    show()
  }

  const updateAdmin = () => {
      const body = {
        userName: employeeName,
        password: password,
      }
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      
      axios.put(`${uri}/api/auth/edit-admin/${id}`, body, config)
      .then( res => {
        props.getEmployees()
        setAlertTitle('Success');
        setAlertMsg('Admin data updated successfully!');
        show();})
      .catch(err => {
        console.log(err.response)
        setError()})
      .finally(() => {
        props.handleClose()
        props.initialModalClose()})
  }
  const updateEmployee = () => {
    const body = {
      userName: employeeName,
      password: password,
    }
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    axios.put(`${uri}/api/auth/edit-employee/${id}`, body, config)
    .then( res => {
      props.getEmployees()
      setAlertTitle('Success');
      setAlertMsg('Employee data updated successfully!');
      show();})
    .catch(err => {
      console.log(err.response)
      setError()})
    .finally(() => {
      props.handleClose()
      props.initialModalClose()})
}
  
  useEffect(() => {
    setEmployeeName(props.object.userName)
    setPassword(props.object.password)
    setID(props.object._id)
    setOccupation(props.occupation)
  }, [props.object])
  
  useEffect(() => {
    setModalVisible(props.state);
  }, [props.state]);

  function handleClose() {
    setModalVisible(false);
  }
  const onChangeEmployeeName = (name) => {
    setEmployeeName(name)
  }
  const onChangePassword = (password) => {
    setPassword(password)
  }

  return (
    
    <View style={styles.centeredView}>
      <ShowAlert state={alertState} handleClose={show} alertTitle={alertTitle} alertMsg={alertMsg} style={styles.buttonModalContainer} />
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
                <Text style={styles.modalTitle}>{props.title}</Text>
                <View style={styles.modalBody}>
                    <Text style={styles.bodyText}>Username:</Text>
                    <TextInput placeholder="Username" onChangeText= {onChangeEmployeeName} style={styles.input} value = {employeeName}/>
                    <Text style={styles.bodyText}>Password:</Text>
                    <TextInput placeholder="New Password" onChangeText= {onChangePassword}  style={styles.input} secureTextEntry={true}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems : 'center'}}>
                    <TouchableOpacity onPress={() => props.handleClose()}>
                        <View style={styles.buttonModalContainer}>
                            <Text style={styles.buttonModalText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => occupation === 'Admin' ? updateAdmin() : updateEmployee()}>
                        <View style={styles.backButtonModalContainer}>
                            <Text style={styles.buttonModalText}>Done</Text>
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
    fontSize: Dimensions.get('window').height > 900 ? 18 : 14,
    paddingTop: Dimensions.get('window').height > 900 ? 25 : 16
  },  
  modalTitle : {
    color: '#006270',
    //fontSize: Dimensions.get('window').height > 900 ? 30 : 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 28 : 24): 24,
    top: 15,
  },
  buttonModalContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#00E0C7',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 35 : null): null,
    margin: 10,
    display: 'flex',

  },
  backButtonModalContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#008394',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 35 : null): null,
    margin: 10,
    display: 'flex',
    
  },
  buttonModalContainer2 : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#00E0C7',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 60 : 35): 35,
    margin: 20,
    display: 'flex',

  },
  backButtonModalContainer2 : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#008394',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 60 : 35): 35,
    margin: 20,
    display: 'flex',
    
  },
  deleteButtonModalContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? 35 : 15,
    margin: 20,
    display: 'flex',
    
  },
  buttonModalText :{
    color: '#ffffff',
    fontSize: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 24 : 16): 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalBody:{
    paddingVertical:'25%',
    paddingHorizontal:10
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    borderColor: "#008394",
    borderWidth: 2,
    width: Dimensions.get('window').height > 900 ? Dimensions.get('window').width * 0.7 : Dimensions.get('window').width * 0.80,
    height: Dimensions.get('window').height > 900 ? Dimensions.get('window').height* 0.5 : Dimensions.get('window').height * 0.60
    // width: '80%',
    // height: Dimensions.get('window').height > 900 ? '65%' : Dimensions.get('window').height * 0.60
  },

  input: {
    height: 40,
    width: Dimensions.get('window').width * 0.65,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: Dimensions.get('window').height > 900 ? 5 : 5,
    fontSize: 12,
    borderColor: "#008394",
    padding: 13
    
},
  
});

export default EmployeeChangePasswordModal;