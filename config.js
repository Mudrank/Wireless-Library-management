import * as firebase from "firebase"
require("@firebase/firestore")

var firebaseConfig = {
  apiKey: "AIzaSyBuRVhS76vTlFOoReds7fQkZLPrdt97zFc",
  authDomain: "lms-b74c3.firebaseapp.com",
  projectId: "lms-b74c3",
  storageBucket: "lms-b74c3.appspot.com",
  messagingSenderId: "56740694912",
  appId: "1:56740694912:web:5e8e3aa45485cd5821cf65",
  measurementId: "G-D5W3NMBXX6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();