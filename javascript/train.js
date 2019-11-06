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

let tName = "";
let tDestination = ""; 
let tFirstTrainTime = "";
let tFrequency = "";
let tMinutesAway = "";
let tArrivalTime = ""; 


$("#add-train").on("click", function(event) {
event.preventDefault(); 

tName = $("#name-input").val().trim(); 
tDestination = $("#destination-input").val().trim();
tFirstTrainTime = $("#time-input").val().trim();
tFrequency = $("#frequency-input").val().trim();

let firstTrainTimeConverted = moment(tFirstTrainTime, "HH:mm").subtract(1, "years");
console.log(firstTrainTimeConverted);

let currentTime = moment(); 
console.log("current time:" + moment(currentTime).format("hh:mm"));

let difference = moment().diff(moment(firstTrainTimeConverted), "minutes");
console.log("difference in time: " + difference);

let remainder = difference % tFrequency;
console.log(remainder);

let tMinutesAway = tFrequency - remainder;
console.log("minutes away: "+ tMinutesAway);

let nextArrival = moment().add(tMinutesAway, "minutes");
let tArrivalTime =(moment(nextArrival).format("hh:mm"));
console.log("arrival time: " + tArrivalTime);



database.ref().push( { 
  
  name: tName, 
  destination: tDestination,
  frequency: tFrequency,
  firstTrainTime: tFirstTrainTime, 
  arrivalTime: tArrivalTime,
  minutesAway: tMinutesAway
});


sessionStorage.clear(); 

sessionStorage.setItem("name", tName);
sessionStorage.setItem("destination", tDestination);
sessionStorage.setItem("frequency", tFrequency);
sessionStorage.setItem("arrivalTime", tArrivalTime);
sessionStorage.setItem("minutesAway", tMinutesAway);

});


database.ref().on("child_added", function(childSnapShot) {
    console.log(childSnapShot.val());

    let tName = childSnapShot.val().name; 
    let tDestination = childSnapShot.val().name; 
    let tFrequency = childSnapShot.val().frequency; 
    let tArrivalTime = childSnapShot.val().arrivalTime;
    let tMinutesAway = childSnapShot.val().minutesAway; 


    console.log(tName);
    console.log(tDestination);
    console.log(tFrequency);
    console.log(tArrivalTime);
    console.log(tMinutesAway); 

 

    let tRow = $("<tr>"); 

    let nameTd = $("<td>").text(tName); 
    let destinationTd = $("<td>").text(tDestination); 
    let frequencyTd = $("<td>").text(tFrequency);
    let arrivalTimeTd = $("<td>").text(tArrivalTime);
    let minutesAwayTd = $("<td>").text(tMinutesAway);

    tRow.append(nameTd, destinationTd, frequencyTd, arrivalTimeTd, minutesAwayTd);

    $("tbody").append(tRow);  


});








console.log(name);
console.log(destination);
console.log(frequency); 
console.log(firstTrainTime);








