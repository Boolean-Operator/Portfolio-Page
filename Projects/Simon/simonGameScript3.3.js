$(document).ready(function(){
	// Game Board Id's & Colors
	// 1- Green, 2- Red
	// 3- Yellow, 4- Blue

	// random num series 
	var moves;
	var testArr;
	
	// game state
	var gameOver;

	// user input state
	var userTurn;
	//round number
	var round;
	// tracks user in current round
	var turn = 0;
	
	// On / Off button
	var onOff = false;

	// play speed
	var speed;
	
	// default 3rd level 20 number sequence
	var skillLevel;
	
	// default mode off
	var strict = false;

	// lights square and plays note
	function lightSquare(iden) {
		$("#" + iden).fadeTo(80, 1.0, function() { $(this).fadeTo(100, 0.6); });
		document.getElementById("id" + iden).play();
	}

	// plays CETK theme song on start up and shut down 
	// button flash and note sound
	function startButtons() {
		var startArr = [1,2,3,5,4];
  	var index = 0;  // internal index to control lightSquares()

	  function nextBtn() {
	    lightSquare(startArr[index]);
	    index++;
	  }
	  
	  nextBtn();
	  var presser = window.setInterval(function () {
	    if (index >= startArr.length) {
	      clearTimeout(presser);
	      window.setTimeout(function () {
		  	}, 500);
	      return;
	    }
	    nextBtn();
	  }, 300);
	}

	// uses test array to call lightSquare
	function showButtons() {
		console.log("testArr :"  + testArr);
  	var index = 0;  // internal index to control lightSquares()
  	turn = 0;  

	  function nextBtn() {
	    lightSquare(testArr[index]);
	    index++;
	  }
	  
	  nextBtn();
	  var presser = window.setInterval(function () {
	    if (index >= testArr.length) {
	      clearTimeout(presser);
	      userTurn = true; // allows user input
	      return;
	    }
	    nextBtn();
	  }, speed);
	}
	
	// compares player choice to array element
	// add one to clicks
	function playerTurn(spot) {
		if(spot === testArr[turn]){
	    turn++
	  	} else {
	  		//notify wrong button pressed
	  		document.getElementById("id6").play();
	   		$("#countDisplay").text("!!");
	   		// prepend "0" on the front of single digits in rounds display
				var cntDisp = round + 1;
				if (cntDisp <= 9) {
					cntDisp = "0" + cntDisp;
				}
				// disables userTurn to prohibit button press input
	  		userTurn = false;
	   		// checks for strict mode
	   		if (strict) {
	   			window.setTimeout(function () {
						startGame()
				  	}, 800);
	   		}else {
					// after 1 sec delay
					// replays buttons for current round
					// replaces "!!" with round number in count display
		   		window.setTimeout(function () {
		   		showButtons(testArr);
			  	$("#countDisplay").text(cntDisp);
			  	}, 1000);
	   		}
	  	}
	  // end of round success
		if (turn === testArr.length) {
			userTurn = false;
			round++
			window.setTimeout(function () {
	  	nextRound(round);
	  	}, 900);
		}
	}
	
	
	// receives round number
	// test for gameOver 
	// adds one element to test array each round
	function nextRound(rndNum) { 
		console.log(rndNum);
		//speeds up on 5th, 9th & 13th round
		if (rndNum >= 12) { 
			speed = 350;
		} else
		if (rndNum >= 8) {  //9
			speed = 550;
		} else
		if (rndNum >= 4) {  // 5
			speed = 700;
		}
		console.log(speed);

		//win game condition
		if (rndNum === moves.length) {
			//celebrate
			userTurn === false;
			gameOver === true;
			speed === 190;
			startButtons();
			window.setTimeout(function () {
			startGame()
	  	}, 3000);
		}else {
			var rndDisplay = rndNum +1;
			if (rndDisplay <= 9) {
				rndDisplay = "0" + rndDisplay;
			}
			
			$("#countDisplay").text(rndDisplay);
			//reset inner cycle counters	
			turn = 0;

			if ( gameOver === false) {
				//generate series by adding one arr[elem] to series
				function makeTestArray(arr,index) {
					testArr.push(arr[index]);
				}
		
			//add next elem of sequence	to test array
			makeTestArray(moves,rndNum);
			showButtons();
			}
		}
		
	}
	
	//resets game and starts
	function startGame() {
		gameOver = false;
		userTurn = false;
		speed = 800;
		// set round counter to 0;
		round = 0;
		// empty arrays
		moves = [];
		testArr = [];
		// fills array of random moves
		for (var i = 0; i < skillLevel; i++) {
			var compMove = ((Math.random()*3)+1).toFixed();
			moves.push(compMove);
		}
		// calls nextRound() after 600 millisec delay
		console.log(moves);
		window.setTimeout(function () {
	  	nextRound(round);
	  	}, 600);
	}


	// call playerTurn() with button value
	$(".square").click(function(){
		if (userTurn === true) {
			if (gameOver === false) {
				var spot = $(this).attr("id");
				lightSquare(spot);
				playerTurn(spot);
			}
		}
	});

	// sets game to strict play mode
	$("#strict").click(function(){
		$(".LED").toggleClass("offLED onLED");
		strict = (strict === false) ? true : false;
	});


	// turns on and off game
	// resets buttons  and counter
	// fires startButtons display
	$("#onOff").click(function(){
		$("#countDisplay").toggleClass("offColor onColor");
		onOff = (onOff === false) ? true : false;
		gameOver = (onOff === false) ? true : false;
		var prpty = (onOff === false) ? true: false;
		var cDisp = (onOff === false) ? "88" : "--";
		console.log(cDisp);
		console.log(gameOver);
		$("#countDisplay").text(cDisp);
		$("#start").prop('disabled', prpty);
		$("#strict").prop('disabled', prpty);
		if (onOff === false) {
			$(":radio").prop('checked',false);
			$(".LED").removeClass("onLED");
			$(".LED").addClass("offLED");
		} else {
			 $('input:radio[name=skill]').filter('[value=20]').prop('checked', true);
			 skillLevel = 20;
		};
		startButtons();
	});

	//call startGame() when clicked
	$("#start").click(function(){
		startGame();
	});

	// set skill level default of 20 set in onOff.click(function)
	$("input").click(function (){
		skillLevel = $('input[name=skill]:checked').val();
		console.log(skillLevel);
	});

});

