import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      hasPermission: null,
      scanned: false,
      scannedData: " ",
      btnState: "normal",
    };
  }

getCamPermissions = async() =>{
const { status } = await Permissions.askAsync(Permissions.CAMERA)
console.log(status)
this.setState({
  hasPermission: status === "granted",
  btnState: "clicked",
})

}

handleScan = async( {type , data}) =>{
  this.setState({
    scanned: true,
    scannedData: data,
    btnState: "normal",
  })
}

  render() {
if ( this.state.hasPermission && this.state.btnState === 'clicked'){
  return (
   <BarCodeScanner  onBarCodeScanned = { this.state.scanned ? undefined : this.handleScan} /> 
  )
}
else {
  
    return (
      <View style={styles.container}>
          <View style={styles.row}>
      <Icon style={styles.icon} name="money-check" color='#7f5af0' size={27} />
        <Text style={styles.title}>Transactions</Text>
        </View>
        <TouchableOpacity style={styles.scan}onPress={this.getCamPermissions}>
          <Text>Scan Qrcode</Text>
        </TouchableOpacity>
      </View>
    );

}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16161a",
  },
  row:{
    flexDirection:'row' 
   },
   icon:{
     padding:10
   },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fffffe",
  },
  scan: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});
