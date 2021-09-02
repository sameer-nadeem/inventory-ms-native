import React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { uri } from '../api.json'
import axios from "axios"
import { DataTable } from 'react-native-paper';



const Ledger = props => {
    const [ledgerData, setLedgerData] = useState([])
    const [balance, setBalance] = useState(0)
    const getClientDetail = async () => {
        try{
            const res = await axios.get(`${uri}/api/client/ledger/${props.navigation.getParam('clientID')}`)
            console.log('overhere', res.data.ledger)
            setLedgerData(res.data.ledger)
        }
        catch(err){
            console.log(err)
        }

    }

    useEffect(()=> {
        getClientDetail()
    }, [])



    return(
        <ScrollView>
        <View style={styles.screen}>
            <View>
            <Text style={styles.title}>Ledger</Text>
            </View>  
            <DataTable style={{ marginTop: 10 }}>
        <DataTable.Header>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Date</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Description</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Debit</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Credit</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Balance</Text></DataTable.Title>
        </DataTable.Header>


        <ScrollView >
          <View>
            {
              ledgerData.map((l,i) => (
                      <View key={i}>

                        {l.type === 'Purchase' && 
                        <View>
                          <DataTable.Row>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.date.toLocaleString().split('T')[0]}</Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{`${l.type} - ${l.payment}`}</Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total}</Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                            {l.payment === 'Partial' &&
                              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.received}</Text></DataTable.Cell>
                            }
                            {l.payment === 'Full' && 
                              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total}</Text></DataTable.Cell>
                            }
                            {l.payment === 'Credit' && 
                              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>0</Text></DataTable.Cell>
                            }                            
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{balance}</Text></DataTable.Cell>
                          </DataTable.Row>
                      </View>}
                      
                        {l.type === 'Sale' && 
                        <View>
                          <DataTable.Row>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.date.toLocaleString().split('T')[0]}</Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{`${l.type} - ${l.payment}`}</Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total}</Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                            {l.payment === 'Partial' && <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.received}</Text></DataTable.Cell>}
                            {l.payment === 'Full' && <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total}</Text></DataTable.Cell>}
                            {l.payment === 'Credit' && <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>0</Text></DataTable.Cell>}

                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{balance}</Text></DataTable.Cell>
                          </DataTable.Row>
                        </View>
                      }
                       
                      {l.type === 'Payed' && 
                        <View>
                          <DataTable.Row>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.date.toLocaleString().split('T')[0]}</Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>Payment Sent</Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.cash}</Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{balance}</Text></DataTable.Cell>
                          </DataTable.Row>
                          
                        </View>

                    }
                    
                    {l.type === 'Received' &&
                      <View>
                        <DataTable.Row>
                          <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.date.toLocaleString().split('T')[0]}</Text></DataTable.Cell>
                          <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>Payment Received</Text></DataTable.Cell>
                          <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
                          <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.cash}</Text></DataTable.Cell>
                          <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{balance}</Text></DataTable.Cell>
                        </DataTable.Row>
                      </View>

                  }
                  </View>

                     
  
              ))
            }
          </View>
        </ScrollView>
      </DataTable>
            
        </View>
        </ScrollView>
    )
}

Ledger.navigationOptions = navigationData => {
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
  
const styles = StyleSheet.create({
    title: {
        color: '#006270',
        fontSize: 30,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height > 900 ? 36 : 28,
        bottom: 35,
        marginTop: 60,
      },
      screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      tableText: {
        fontSize: Dimensions.get('window').height > 900 ? 18 : 14,
      },
      tableTitleText: {
        fontSize: Dimensions.get('window').height > 900 ? 18 : 14,
        fontWeight: 'bold'
      },
      cells: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
      },
})
  export default Ledger