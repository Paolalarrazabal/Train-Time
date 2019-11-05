// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDWZnfEORSUqUZXcKLU2FOzyxOaDhoIqnA",
    authDomain: "train-time-d33cf.firebaseapp.com",
    databaseURL: "https://train-time-d33cf.firebaseio.com",
    projectId: "train-time-d33cf",
    storageBucket: "train-time-d33cf.appspot.com",
    messagingSenderId: "63375863302",
    appId: "1:63375863302:web:7edb147fbe0cdbf8745d87"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let name = $("#name-input").val.trim; 
let destination = $("#destination-input").val.trim;
let firstTrainTime = $("#time-input").val.trim;
let frequency = $("#frequency-input").val.trim;