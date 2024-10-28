//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBjkxNdHLB8ZR7YewaUQZv-zO0ADGEvWP4",
    authDomain: "dtc15-363ff.firebaseapp.com",
    projectId: "dtc15-363ff",
    storageBucket: "dtc15-363ff.appspot.com",
    messagingSenderId: "653423353996",
    appId: "1:653423353996:web:ef87b923b28488f9fd1ba9"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();