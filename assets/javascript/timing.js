// two main ways we handle timing events:
// setInterval: run every N milliseconds
// clearInterval:
// setTimeout: runs once after N milliseconds.
// clearTimeout: stops timeout from executing

var firstWarning = setTimeout(function(){
	alert("OY!");
},2000);
// setTimeout(code,milliseconds to wait)

//Always capture timers to a variable
// Why?
// - It's awesome
// - you can clear it
//
// What would happen if we couldn't clear it?
// - It would go on forever
// If your timer was "You are about logged off...

var n=0;
var firstWarning = setInterval(function(){
		console.log(n);
		n++;
		if (n > 20) {
			clearInterval(firstWarning);
			console.log("All done")
		}
	},200);


// Be careful using the amunt of time in your function and vriable names
// ex: avoid var timerTenMinutes = setTimeout(someFunc, 10 * 1000 * 60);
// Why?
// - If you change the amount of time, you might forget to change the variable name
// Why is that bad: confusing! "Dude, why do you have a timer that runs in 60 seconds but is called ten minutes?!?"

// Can cause confusion when trying to figure out elapsed time, too...
var tenSecondTimer = setTimeout(function(){
		console.log("We will log you off in another 10 seconds");
		var twentySecondTimer = setTimeout(function(){
			console.log("And you are outta here!");
		},10000); 
	},10000);

// Better... (note droppping off var to avoid scope issues)
firstLogOffWarning = setTimeout(function(){
		console.log("We will log you off in another 10 seconds");
		var finalLogOffWarning = setTimeout(function(){
			console.log("And you are outta here!");
		},10000); 
	},10000);

// Have user clear timeout Use global scope (unless you are doing something special)

// Section of appliation, declare placeholder for timers
var firstLogOffWarning; // timer
var finalLogOffWarning; // timer
// OR
firstLogOffWarning = {}; // timer
finalLogOffWarning = {}; // timer

// Later, at the bat cave...
$("#stopThePresses").on("click",function(){
	clearTimeout(firstLogOffWarning);
	clearTimeout(finalLogOffWarning);
});

// Good idea to use function sto set your timers. Because if you needed it once, you might need it again.