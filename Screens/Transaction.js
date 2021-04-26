import React from "react";
import { StyleSheet, Text, View, TouchableOpacity , KeyboardAvoidingView , ToastAndroid} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome5";

import * as firebase from 'firebase';
import db from "../config";

export default class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      hasPermission: null,
      scanned: false,
      scannedStudentId: false,
      scannedBookId: false,
      scannedData: " ",
      btnState: "normal",
      transactionMsg: "",
    };
  }

  getCamPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({
      hasPermission: status === "granted",
      btnState: id,
      scanned: false,
    });
  };

  handleScan = async ({ type, data }) => {
    const { btnState } = this.state;

    if (btnState === "bookId") {
      this.setState({
        scanned: true,
        scannedBookId: data,
        btnState: "normal",
      });
    } else if (btnState === "studentId") {
      this.setState({
        scanned: true,
        scannedStudentId: data,
        btnState: "normal",
      });
    }
  };

  handleTransaction = async () => {
    var transactionMsg;
    db.collection("Book")
      .doc(this.state.scannedBookId)
      .get()
      .then((doc) => {
        console.log(doc);
        var book = doc.data();

        if (book.bookAvailablity) {
          this.InitializeBookIssue();
          transactionMsg = "Book issued";
          ToastAndroid.show(transactionMsg , ToastAndroid.SHORT)
        } else {
          this.InitializeBookReturn();
          transactionMsg = "Book returned";
        }

        this.setState({
          transactionMsg: transactionMsg,
        });
      });
  };

  InitializeBookIssue = async () => {
    db.collection("Transactions").add({
      studentId: this.state.scannedStudentId,
      bookId: this.state.scannedBookId,
      date: firebase.firestore.Timestamp.now().toDate(),
      transactionType: "issued",
    });
    db.collection("Books").doc(this.state.scannedBookId).update({
      bookAvailablity: false,
    });
    db.collection("Students")
      .doc(this.state.scannedStudentId)
      .update({
        noOfBooksIssued: firebase.firestore.FieldValue.increment(1),
      });
    alert("Book Issued");

    this.setState({
      scannedStudentId: " ",
      scannedBookId: " ",
    });
  };

  InitializeBookReturn = async () => {
    db.collection("Transactions").add({
      studentId: this.state.scannedStudentId,
      bookId: this.state.scannedBookId,
      date: firebase.firestore.Timestamp.now().toDate(),
      transactionType: "return",
    });
    db.collection("Books").doc(this.state.scannedBookId).update({
      bookAvailablity: true,
    });
    db.collection("Students")
      .doc(this.state.scannedStudentId)
      .update({
        noOfBooksIssued: firebase.firestore.FieldValue.increment(-1),
      });
    alert("Book Returned");

    this.setState({
      scannedStudentId: " ",
      scannedBookId: " ",
    });
  };

  render() {
    if (this.state.hasPermission && this.state.btnState === true) {
      return (
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : this.handleScan}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else {
      return (
        <View style={styles.container}>
               <KeyboardAvoidingView behavior="padding" enabled>
          <View style={styles.row}>
            <Icon
              style={styles.icon}
              name="money-check"
              color="#7f5af0"
              size={27}
            />
            <Text style={styles.title}>Transactions</Text>
          </View>
     
            <TextInput
              placeholder="Student Id"
              keyboardAppearance="dark"
              style={styles.input}
              onChangeText={ txt => {
                this.setState({
                  scannedStudentId:txt
                })
              }}
              value={this.state.scannedStudentId}
            ></TextInput>


          <TouchableOpacity
            style={styles.scan}
            onPress={this.getCamPermissions(studentId)}
          >
            <Text>Scan Student Id </Text>
          </TouchableOpacity>

  
            <TextInput
              placeholder="Book Id"
              keyboardAppearance="dark"
              style={styles.input}
              onChangeText={ txt => {
                this.setState({
                  scannedBookId:txt
                })
              }}
              value={this.state.scannedBookId}
            ></TextInput>
          

          <TouchableOpacity
            style={styles.scan}
            onPress={this.getCamPermissions(bookId)}
          >
            <Text>Scan Book Id </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.scan}
            onPress={this.handleTransaction()}
          >
            <Text>Submit </Text>
          </TouchableOpacity>
          
          </KeyboardAvoidingView>

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
  row: {
    flexDirection: "row",
  },
  icon: {
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fffffe",
  },
  scan: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
