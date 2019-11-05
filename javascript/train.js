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

let database = firebase.database(); 

let name = "";
let destination = ""; 
let firstTrainTime = "";
let frequency = "";
let minutesAway = "";
let arrivalTime = ""; 


$("#add-train").on("click", function(event) {
event.preventDefault(); 

name = $("#name-input").val().trim(); 
destination = $("#destination-input").val().trim();
firstTrainTime = $("#time-input").val().trim();
frequency = $("#frequency-input").val().trim();

let firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
console.log(firstTrainTimeConverted);

let currentTime = moment(); 
console.log("current time:" + moment(currentTime).format("hh:mm"));

let difference = moment().diff(moment(firstTrainTimeConverted), "minutes");
console.log("difference in time: " + difference);

let remainder = difference % frequency;
console.log(remainder);

let minutesAway = frequency - remainder;
console.log("minutes away: "+ minutesAway);

let nextArrival = moment().add(minutesAway, "minutes");
let arrivalTime =(moment(nextArrival).format("hh;mm"));
console.log("arrival time: " + arrivalTime);



database.ref().push( {
  name: name, 
  destination: destination,
  firstTrainTime: firstTrainTime, 
  minutesAway: minutesAway,
  arrivalTime: arrivalTime

});

console.log(name);
console.log(destination);
console.log(frequency); 
console.log(firstTrainTime);

});

function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    };




