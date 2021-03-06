import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Button } from "react-native";
import { Slider } from 'react-native-elements';
import { FontAwesome } from "@expo/vector-icons";

const SelectFilter = props => {

    const [modalVisible, setModalVisible] = useState(false);
    const [amountVal, setAmountVal] = useState(0);

    useEffect(() => {
        setModalVisible(props.state);
    }, [props.state]);

    function handleClose() {
        setModalVisible(false);
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
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modalStyle}>
                            
                        <View style={styles.topTextBox}>
                            <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>
                                <TouchableOpacity onPress = {() => props.handleClose()} style = {{marginTop: Dimensions.get('window').height > 900 ? '7%':'7%', paddingLeft: '5%'}}>
                                    <FontAwesome
                                    name = {"arrow-left"}
                                    size = {Dimensions.get('window').height > 900 ? 40:25}
                                    color = {"#008394"}
                                    />
                                </TouchableOpacity>
                                
                                <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: '6.25%',}}>
                                
                                    <Text style={styles.topText}>
                                        Amount
                                    </Text>
                                </View>
                                <View style = {{justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                    <TouchableOpacity>
                                        <View style = {styles.clearButton}>
                                            <Text style = {styles.clearButtonText}>
                                                Clear 
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                        
                                </View>
                            </View>
                            
                        </View>

                            
                        <TouchableOpacity style = {styles.TextBox}>
                                <View style={{ marginTop: '9.5%', paddingLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-start' }}>
                                            <Text style={styles.normalText}>
                                                Color
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                            <Text style={styles.sideText}>
                                                All
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                        </TouchableOpacity>
                        

                        

                        <TouchableOpacity style = {styles.TextBox}>
                                <View style={{ marginTop: '9.5%', paddingLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-start' }}>
                                            <Text style={styles.normalText}>
                                                Brand
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                            <Text style={styles.sideText}>
                                                All
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                        </TouchableOpacity>


                        <TouchableOpacity style = {styles.TextBox}>
                                <View style={{ marginTop: '9.5%', paddingLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-start' }}>
                                            <Text style={styles.normalText}>
                                                Warehouse
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                            <Text style={styles.sideText}>
                                                All
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles.TextBox}>
                                <View style={{ marginTop: '9.5%', paddingLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-start' }}>
                                            <Text style={styles.normalText}>
                                                Time
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                            <Text style={styles.sideText}>
                                                All
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style = {styles.TextBox}>
                                <View style={{ marginTop: '9.5%', paddingLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-start' }}>
                                            <Text style={styles.normalText}>
                                                Time
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                            <Text style={styles.sideText}>
                                                All
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                        </TouchableOpacity>

                        
                        <TouchableOpacity style = {styles.TextBox}>
                                <View style={{ marginTop: '9.5%', paddingLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-start' }}>
                                            <Text style={styles.normalText}>
                                                Time
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                            <Text style={styles.sideText}>
                                                All
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                        </TouchableOpacity>

                        
                        <TouchableOpacity style = {styles.TextBox}>
                                <View style={{ marginTop: '9.5%', paddingLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-start' }}>
                                            <Text style={styles.normalText}>
                                                Time
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                            <Text style={styles.sideText}>
                                                All
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                        </TouchableOpacity>


                        
                        <TouchableOpacity style = {styles.TextBox}>
                                <View style={{ marginTop: '9.5%', paddingLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-start' }}>
                                            <Text style={styles.normalText}>
                                                Time
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                            <Text style={styles.sideText}>
                                                All
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                        </TouchableOpacity>

                        
                        <TouchableOpacity style = {styles.TextBox}>
                                <View style={{ marginTop: '9.5%', paddingLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-start' }}>
                                            <Text style={styles.normalText}>
                                                Time
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'flex-end', paddingRight: '8%' }}>
                                            <Text style={styles.sideText}>
                                                All
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                        </TouchableOpacity>

                        
                        
                        {/* <View style = {styles.TextBox}>
                            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                            <View style={{borderRadius: 50, overflow: 'hidden'}}>       
                                <View style={{flexDirection: 'row', position: 'absolute'}}>
                                    <View style={styles.sliderDummy}></View>
                                    <View style={styles.sliderReal}></View>
                                </View>
                                <Slider 
                                    style={{width: 300, height: 30, borderRadius: 50}}
                                    minimumValue={0}
                                    maximumValue={50}
                                    value ={amountVal}
                                    onValueChange= {(value) => setAmountVal(value)}
                                    maximumTrackTintColor='transparent'  
                                    minimumTrackTintColor='transparent'
                                    />  

                                </View>
                            </View>
                                  
                        </View> */}
                        

                        <View style={styles.bottomBox}>

                        </View>

                        {/* <View style={styles.bottomBox}>
                            <TouchableOpacity onPress = {() => props.handleClose()} style = {{width: '90%', position: "absolute",top: '20%'}}>
                                <View style={styles.bottomButton}>
                                    <View>
                                        <Text style={styles.footerText}>
                                            View Items
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View> */}
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
        fontSize: Dimensions.get('window').height > 900 ? 26:18,
        fontWeight: '600',
        color: "#008394",
        textAlign: 'right',
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
        height: '12%',
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
        marginTop: Dimensions.get('window').height > 900 ? 30: 0,
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
    }

});

export default SelectFilter;