import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, ScrollView } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import { connect } from 'react-redux'
import { setProdDate,resetProdDate } from '../../actions/productFilters'
import { setPurchaseDate, resetPurchaseDate } from '../../actions/purchaseFilters'
import { setSaleDate, resetSaleDate } from "../../actions/saleFilters";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";

const DateFilterModal = props => {

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(props.state);
    }, [props.state]);

    function handleClose() {
        setModalVisible(false);
    }

    const onDateChange = (date) => {
        if (props.title === "product"){
            props.setProdDate(moment(date).format("MM-DD-YY"))
        }
        else if (props.title === "purchase"){
            props.setPurchaseDate(moment(date).format("MM-DD-YY"))
        }
        else if (props.title === "sale"){
            props.setSaleDate(moment(date).format("MM-DD-YY"))
        }
    }

    const clearFilterColors = () => {
        if (props.title === "product"){
            props.resetProdDate()
        }
        else if (props.title === "purchase"){
            props.resetPurchaseDate()
        }
        else if(props.title === "sale"){
            props.resetSaleDate()
        }
    }
    return (

        <View style={styles.centeredView}>
            <Modal
                // animationType="fade"
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection="left"
                presentationStyle="overFullScreen"
                transparent
                visible={modalVisible}>
                    <TouchableWithoutFeedback onPress={() => props.handleClose()}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modalStyle}>
                            
                        <View style={styles.topTextBox}>
                            <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginTop: Dimensions.get('window').height * 0.03,}}>
                                <TouchableOpacity onPress = {() => props.handleClose()} style = {{paddingLeft: '5%', marginTop: Dimensions.get('window').height>900 ? 10:5}}>
                                    <FontAwesome
                                    name = {"arrow-left"}
                                    size = {Dimensions.get('window').height > 900 ? 40:25}
                                    color = {"#008394"}
                                    />
                                </TouchableOpacity>
                                
                                <View style={{ justifyContent: 'center', alignItems: 'flex-start'}}>
                                
                                    <Text style={styles.topText}>
                                        Date
                                    </Text>
                                </View>
                                <View style = {{justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                    <TouchableOpacity onPress={() => clearFilterColors()}>
                                        <View style = {styles.clearButton}>
                                            <Text style = {styles.clearButtonText}>
                                                Clear 
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                        
                                </View>
                            </View>
                            
                        </View>
                        
                        <View style = {{marginTop: 20}}>
                            <CalendarPicker
                                width = {Dimensions.get('window').width *0.75}
                                height = {Dimensions.get('window').height * 0.6}
                                onDateChange = { (date) => onDateChange(date)}
                            />
                        </View>
                        <View style = {{marginTop: 20, padding: 10,}}>
                            <Text style = {styles.normalText}>
                                Selected Date: 
                            </Text>
                            <Text style = {styles.normalText}>
                                {
                                    props.title === "product" && props.dateFilter
                                }
                                {   
                                    props.title === "purchase" && props.datePurchaseFilter
                                }
                                {
                                    props.title === "sale" && props.dateSaleFilter
                                }
                            </Text>
                        </View>
                        


                       
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: "#fff",
        width: '80%',
        height: '100%',
        alignSelf: 'flex-end',
        borderWidth: 2,
        borderColor: "#008394",
    },
    topText: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height > 900 ? 36:24,
        color: "#008394",
    },
    normalText: {
        fontSize: Dimensions.get('window').height > 900 ? 26:18,
        fontWeight: '600',
        color: "#008394",

    },
    sideText: {
        textAlign: 'right',
        alignItems: 'flex-end',
        flexDirection: 'row',
        ///alignSelf: 'flex-end',
        //alignItems: 'flex-end',
        // marginLeft: '65%',
    },
    topTextBox: {
        width: '100%',
        height: '10%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 22,
        shadowRadius: 10,
        elevation: 10,
    },
    TextBox: {
        width: '100%',
        padding: 20,
        // height: '22%',
        shadowColor: '#000000',
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2,
        marginTop: 1,
    },
    bottomBox: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D3D3D3',
        alignItems: 'center',

    },
    bottomButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00E0C7',
        width: '100%',
        // marginTop: '40%',
        height: Dimensions.get('window').height * 0.08,
        borderWidth: 2,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: "#008394"

    },
    footerText: {
        fontSize: Dimensions.get('window').height > 900 ? 36:22,
        fontWeight: 'bold',
        color: "#008394",

    },
    clearButtonText :{
        fontSize: Dimensions.get('window').height > 900 ? 26:16,
        fontWeight: 'bold',
        color: "#008394",
    },
    clearButton : {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00E0C7',
        width: Dimensions.get('window').height > 900 ? 100:70,
        height: Dimensions.get('window').height > 900 ? 50:30,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#008394",
        marginTop: Dimensions.get('window').height > 900 ? 10: 0,
        // left: Dimensions.get('window').width * 0.4,

    },
    sliderDummy: {
        backgroundColor: '#d3d3d3',
        width: 300,
        height:30,
        borderRadius: 50,
        position: 'absolute',                
    },
    sliderReal: {
        backgroundColor: '#119EC2',
        // width: {(amountVal/50) * 300},
        height:30,
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
    // console.log(state.productFilters)
    // console.log(" purchase filters" ,state.purchaseFilters)
    return {
        dateFilter: state.productFilters.date,
        datePurchaseFilter: state.purchaseFilters.date,
        dateSaleFilter: state.saleFilters.date
    }
}

export default connect(mapStateToProps, { setProdDate,resetProdDate, setPurchaseDate, resetPurchaseDate, setSaleDate, resetSaleDate })(DateFilterModal);