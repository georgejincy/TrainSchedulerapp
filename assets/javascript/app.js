// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDlXUA2xhh3ayMc3EkNs3hVeYMN4jBxXDM",
    authDomain: "allaboard-394eb.firebaseapp.com",
    databaseURL: "https://allaboard-394eb.firebaseio.com",
    storageBucket: "allaboard-394eb.appspot.com",
    messagingSenderId: "488452612936"
  };

  firebase.initializeApp(config);

 // Create a variable to reference the database
var databaseRef = firebase.database();

//create a reference to root of the database and also create a child called 'trainSchedTable' to store the train time details
var trainSchedRef = firebase.database().ref().child('trainSchedTable');

moment().format();
//--------------------------------------------------------------
//--------------------FUNCTIONS---------------------------------

function trainHtmlFromDtb(trainRowSnapshot){

	var html = '';

	html += "<tr><td>" + trainRowSnapshot.trainName + "</td>";
	html += "<td>" + trainRowSnapshot.destination + "</td>";
	html += "<td>" + trainRowSnapshot.firstTrainTime + "</td>";
	html += "<td>" + trainRowSnapshot.frequency + "</td></tr>";

	return html;

}
//--------------------------------------------------------------

// Load all the old as well as new rows on the train Schedule table and display on HTML
trainSchedRef.on("child_added", function(snapshot) {

	//Log current time
	var now = moment();
	console.log(now);

	//Log snapshot
	console.log("| Added: " + snapshot.val());

	// Add a new row to the Current train schedule table
	 $("#train-table > tbody:last-child").append(trainHtmlFromDtb(snapshot.val()));
 });


// --------------------------------------------------------------

// Whenever a user clicks the submit-traininfo button
$("#submit-traininfo").on("click", function(event) {

  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var trainName = $("#trainname").val().trim();
  var destination = $("#dest").val().trim();
  var firstTrainTime = $("#traintime").val().trim();
  var frequency = $("#freq").val().trim();

  //log
  console.log("Train Name: " + trainName + " | Destination: " + destination + " | FirstTrain : " + traintime + " | Frequency: " + frequency);

   // Save the new price in Firebase
    trainSchedRef.push({
        "trainName": trainName,
        "destination": destination,
        "firstTrain": firstTrainTime,
        "frequency": frequency
    });

    //Reset the Add train form
    $("#addtrain")[0].reset();
  
});