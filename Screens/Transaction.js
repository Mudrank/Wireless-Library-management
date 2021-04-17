import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

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
        <Text style={styles.text}>IN Transaction</Text>
        <TouchableOpacity onPress={this.getCamPermissions}>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#58355E",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF689",
  },
});
