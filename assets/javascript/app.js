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

var militaryFormat = 'HH:mm';

//--------------------------------------------------------------
//--------------------FUNCTIONS---------------------------------

//--------------------------------------------------------------

// Load all the old as well as new rows on the train Schedule table and display on HTML
trainSchedRef.on("child_added", function(snapshot) {

	//Testing and debugging. testTime in military time
	var testTime = moment('10:00', militaryFormat);
	console.log("Test time in military format: " + testTime.format('HH:mm'));

	//Log current time
	var currentTime = moment();
	console.log("Current time in military time: " + currentTime.format('HH:mm'));

	//Variable declarations
	var firstTrainDep = moment(snapshot.val().firstTrainTime, militaryFormat);
	console.log("First train departure for "+ snapshot.val().trainName +" in military format: " + firstTrainDep.format('HH:mm'));

	var nextTrainTime;
	var freqRemainder;
	var minToArrival;
	var diffInMinutes;


	//If the First train time is in the future, display next train time as first train time
	//Else Calculate the next train time
	if (firstTrainDep.isAfter(currentTime)){

		console.log("First train time is in future");

		//Next train times is same as first train time
		var nextTrainTime = firstTrainDep;
		console.log("Next train time for " + snapshot.val().trainName + ": " + nextTrainTime.format('HH:mm'));

		//Minutes to next train
		minToArrival = nextTrainTime.diff(currentTime, 'minutes');
		console.log("Minutes to next " + snapshot.val().trainName + ": " + minToArrival);

	}else {
		console.log("Test time is in past");

		//Calculate difference between times in minutes
		diffInMinutes = currentTime.diff(firstTrainDep,'minutes');
		console.log("Difference in minutes for " + snapshot.val().trainName + ": " +diffInMinutes);

		//Calculate the remainder in frequency
		freqRemainder = diffInMinutes % snapshot.val().frequency;
		console.log("Frequency remainder: " + freqRemainder);

		//Calculate Minutes to next train
		minToArrival = snapshot.val().frequency - freqRemainder;
		console.log("Minutes to next " + snapshot.val().trainName + ": " + minToArrival);

		//Next Train time 
		nextTrainTime = currentTime.add(minToArrival, 'minutes');
		console.log("Next train time for " + snapshot.val().trainName + ": " + nextTrainTime.format('HH:mm'));

	}

	//Log snapshot
	console.log("| Added: " + snapshot.val());

	//Calculate the next train time and minutes to next train

	var html = '';

	html += "<tr><td>" + snapshot.val().trainName + "</td>";
	html += "<td>" + snapshot.val().destination + "</td>";
	html += "<td>" + snapshot.val().frequency + "</td>";
	html += "<td>" + nextTrainTime.format('hh:mm A') + "</td>";
	html += "<td>" + minToArrival + "</td></tr>";


	// Add a new row to the Current train schedule table
	 $("#train-table > tbody:last-child").append(html);
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

  //Store inputs in a train object
  var train = {
  			trainName: trainName,
  			destination: destination,
  			firstTrainTime: firstTrainTime,
  			frequency: frequency
  			};


  //log
  console.log("Train Name: " + train.trainName + " | Destination: " + train.destination + " | FirstTrain : " + train.firstTrainTime + " | Frequency: " + train.frequency);

   // Save the train details to Firebase
    trainSchedRef.push(train);

    //Reset the Add train form
    $("#addtrain")[0].reset();
  
    //Don't refresh the page
  	return false;
});