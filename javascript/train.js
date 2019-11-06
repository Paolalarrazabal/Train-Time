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



function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
    }




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



document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC";


document.cookie = "name=" + tName;
document.cookie = "destination=" + tDestination;
document.cookie = "frequency=" + tFrequency;
document.cookie = "arrivalTime=" + tArrivalTime;
document.cookie = "minutesAway=" + tMinutesAway;


console.log(document.cookie);

let cookieName = readCookie("name");
let cookieDestination = readCookie("destination");
let cookieFrequency = readCookie("frequency");
let cookieArrivalTime = readCookie("arrivalTime");
let cookieMinutesAway = readCookie("minutesAway"); 

console.log(cookieName);
console.log(cookieDestination);
console.log(cookieFrequency);
console.log(cookieArrivalTime);
console.log(cookieMinutesAway);


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
    let tDestination = childSnapShot.val().destination; 
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



















