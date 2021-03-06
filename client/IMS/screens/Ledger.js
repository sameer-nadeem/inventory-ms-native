import React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { uri } from '../api.json'
import axios from "axios"
import { DataTable } from 'react-native-paper';
import ExportButton from '../components/ExportAsExcel'
import moment from 'moment';

const Ledger = props => {
    const [ledgerData, setLedgerData] = useState([])
    let exportData = []

    let prevBalance = 0
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

    const purchaseRender = (l) => {
      if(l.payment === 'Partial'){
        prevBalance = prevBalance - l.received + l.total

        const body1 = {
          date: moment(l.date).local().format('YYYY-MM-DD'),
          description: `${l.quantity} x ${l.product.title}`,
          debit: '',
          credit: l.total,
          balance: ''
        }
        exportData.push(body1)
        
        const body2 = {
          date: '',
          description: '',
          debit: l.received,
          credit: '',
          balance: prevBalance > 0 ? `${prevBalance} Cr` : `${Math.abs(prevBalance)} Dr`
        }
        exportData.push(body2)
        

        return (
          <View>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{moment(l.date).local().format('YYYY-MM-DD')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{`${l.quantity} x ${l.product.title}`}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.received.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{prevBalance > 0 ? `${prevBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Cr` : `${Math.abs(prevBalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Dr`}</Text></DataTable.Cell>
            </DataTable.Row>
          </View> 
        )
      }
      else if(l.payment === 'Credit'){
        prevBalance = prevBalance + l.total

        const body1 = {
          date:  moment(l.date).local().format('YYYY-MM-DD'),
          description: `${l.quantity} x ${l.product.title}`,
          debit: '',
          credit: l.total,
          balance: ''
        }
        exportData.push(body1)
        
        const body2 = {
          date: '',
          description: '',
          debit: 0,
          credit: '',
          balance: prevBalance > 0 ? `${prevBalance} Cr` : `${Math.abs(prevBalance)} Dr`
        }
        exportData.push(body2)

        return (
          <View>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{moment(l.date).local().format('YYYY-MM-DD')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{`${l.quantity} x ${l.product.title}`}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>0</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{prevBalance > 0 ? `${prevBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Cr` : `${Math.abs(prevBalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Dr`}</Text></DataTable.Cell>
            </DataTable.Row>
          </View> 
        )
      }
      else if(l.payment === 'Full'){
        const body1 = {
          date: moment(l.date).local().format('YYYY-MM-DD'),
          description: `${l.quantity} x ${l.product.title}`,
          debit: '',
          credit: l.total,
          balance: ''
        }
        exportData.push(body1)
        
        const body2 = {
          date: '',
          description: '',
          debit: l.total,
          credit: '',
          balance: prevBalance > 0 ? `${prevBalance} Cr` : `${Math.abs(prevBalance)} Dr`
        }
        exportData.push(body2)
        return (
          <View>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{moment(l.date).local().format('YYYY-MM-DD')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{`${l.quantity} x ${l.product.title}`}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{prevBalance > 0 ? `${prevBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Cr` : `${Math.abs(prevBalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Dr`}</Text></DataTable.Cell>
            </DataTable.Row>
          </View> 
        )
      }
      
    }


    const saleRender = (l) => {
      
      if(l.payment === 'Partial'){
        prevBalance = prevBalance - l.total + l.received

        const body1 = {
          date: moment(l.date).local().format('YYYY-MM-DD'),
          description: l.note,
          debit: l.total,
          credit: '',
          balance: ''
        }
        exportData.push(body1)
        
        const body2 = {
          date: '',
          description: '',
          debit: '',
          credit: l.received,
          balance: prevBalance > 0 ? `${prevBalance} Cr` : `${Math.abs(prevBalance)} Dr`
        }
        exportData.push(body2)

        return (
          <View>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{moment(l.date).local().format('YYYY-MM-DD')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l?.products.map((v1) => (`${v1.quantity} x ${v1.product.title}`))}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.received.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{prevBalance > 0 ? `${prevBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Cr` : `${Math.abs(prevBalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Dr`}</Text></DataTable.Cell>
            </DataTable.Row>
        </View>
        )
        

      }
      else if(l.payment === 'Full'){
        const body1 = {
          date: moment(l.date).local().format('YYYY-MM-DD'),
          description: l.note,
          debit: l.total,
          credit: '',
          balance: ''
        }
        exportData.push(body1)
        
        const body2 = {
          date: '',
          description: '',
          debit: '',
          credit: l.total,
          balance: prevBalance > 0 ? `${prevBalance} Cr` : `${Math.abs(prevBalance)} Dr`
        }
        exportData.push(body2)
        return(
          <View>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{moment(l.date).local().format('YYYY-MM-DD')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.note}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{prevBalance > 0 ? `${prevBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Cr` : `${Math.abs(prevBalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Dr`}</Text></DataTable.Cell>
            </DataTable.Row>
          </View>
        )
        


      }
      else if(l.payment === 'Credit'){
        prevBalance = prevBalance - l.total

        const body1 = {
          date: moment(l.date).local().format('YYYY-MM-DD'),
          description: l.note,
          debit: l.total,
          credit: '',
          balance: ''
        }
        exportData.push(body1)
        
        const body2 = {
          date: '',
          description: '',
          debit: '',
          credit: 0,
          balance: prevBalance > 0 ? `${prevBalance} Cr` : `${Math.abs(prevBalance)} Dr`
        }
        exportData.push(body2)

        return (
          <View>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{moment(l.date).local().format('YYYY-MM-DD')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.note}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>0</Text></DataTable.Cell>
              <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{prevBalance > 0 ? `${prevBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Cr` : `${Math.abs(prevBalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Dr`}</Text></DataTable.Cell>
            </DataTable.Row>
        </View>
        )

      }
    }

    const renderPaid = (l) => {
      prevBalance = prevBalance - l.cash

      const body1 = {
        date: moment(l.date).local().format('YYYY-MM-DD'),
        description: 'Payment Sent',
        debit: l.cash,
        credit: '',
        balance: prevBalance > 0 ? `${prevBalance} Cr` : `${Math.abs(prevBalance)} Dr`
      }
      exportData.push(body1)
      
      return (
        <View>
          <DataTable.Row>
            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{moment(l.date).local().format('YYYY-MM-DD')}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>Payment Sent</Text></DataTable.Cell>
            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{prevBalance > 0 ? `${prevBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Cr` : `${Math.abs(prevBalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Dr`}</Text></DataTable.Cell>
          </DataTable.Row>
          
        </View>
      )
    }

    const renderReceived = (l) => {
      prevBalance = prevBalance + l.cash
      const body1 = {
        date: moment(l.date).local().format('YYYY-MM-DD'),
        description: 'Payment Received',
        debit: '',
        credit: l.cash,
        balance: prevBalance > 0 ? `${prevBalance} Cr` : `${Math.abs(prevBalance)} Dr`
      }
      exportData.push(body1)

      return (
        <View>
          <DataTable.Row>
            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{moment(l.date).local().format('YYYY-MM-DD')}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>Payment Received</Text></DataTable.Cell>
            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}></Text></DataTable.Cell>
            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{l.cash}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.cells}><Text style={styles.tableText}>{prevBalance > 0 ? `${prevBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Cr` : `${Math.abs(prevBalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Dr`}</Text></DataTable.Cell>
          </DataTable.Row>
        </View>
      )
    }

    useEffect(()=> {
        getClientDetail()
    }, [])



    return(
        <ScrollView>
        <View style={styles.screen}>
            <View>
            <Text style = {styles.title}>{props.navigation.getParam('clientName')}</Text>
            </View>
            <View>
              <ExportButton data={exportData} title={props.navigation.getParam('clientName')+'ledger.xlsx'} screenName='ledger'/>
            </View>  
            <DataTable style={{ marginTop: 10 }}>
        <DataTable.Header>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Date</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Products</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Debit</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Credit</Text></DataTable.Title>
          <DataTable.Title style={styles.cells}><Text style={styles.tableTitleText}>Balance</Text></DataTable.Title>
        </DataTable.Header>


        <ScrollView >
          <View>
            {
              
              
              ledgerData.map((l,i) => (
                      <View key={i}>

                        {
                          l.type === 'Purchase' && 
                            purchaseRender(l)
                        }
                       
                        {
                          l.type === 'Sale' && 
                            saleRender(l)
                        
                        }
                       
                        {
                          l.type === 'Payed' &&
                          renderPaid(l)
                        } 
                      
                        {
                          l.type === 'Received' &&
                          renderReceived(l)
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