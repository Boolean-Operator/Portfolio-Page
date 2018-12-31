$(document).ready(function(){
	//defaults to player x
	var player = "X";
	//default computer
	var computersTurn = "O";

	// array stores values to check for winner
	var moves = ["#","#","#","#","#","#","#","#","#"];

	var gameOver = true;
	var count = 0;
	var compMove;

	// add scoreboard function
	var gamesPlayed = 1;
	var winsX = 0;
	var winsO = 0;
	var ties = 0;
	
	var winGame = [
		[0,1,2],
		[0,3,6],
		[0,4,8],
		[3,4,5],
		[6,7,8],
		[1,4,7],
		[2,5,8],
		[2,4,6]
	];

// Game Board Id's
// 0, 1, 2
// 3, 4, 5
// 6, 7, 8

	
	// reset board, moves array, move count
	// remove highlights on winning cells and messages
	// restart game with alternating first player 
	function reset() {
		moves = ["#","#","#","#","#","#","#","#","#"];
		count = 0;
		gamesPlayed++;
		$(".square").removeClass("winCombo");
		$(".square").removeClass("moveColor");
		$("#message").removeClass("winColor");
		$(".square").text("#");
		$("#message").text("");
		gameOver = false;

		if (gamesPlayed%2 === 0) {
			$("#message").text("You went first last game, so I shall start this game.");
			compTurn();
		}else {
			$("#message").text("Your turn to go first");
			
		}
	}

	// Flash text message for warning
	function warning() {
		$("#message").fadeOut(225).fadeIn(150)
							 .fadeOut(225).fadeIn(150)
							 .fadeOut(225).fadeIn(150);
	}

	// Flash text message for winner
	function winMessage() {
		$("#message").addClass("winColor")
		$("#message").fadeOut(200).fadeIn(100)
								.fadeOut(200).fadeIn(100)
								.fadeOut(200).fadeIn(100)
								.fadeOut(200).fadeIn(100)
								.fadeOut(200).fadeIn(100)
								.fadeOut(200).fadeIn(100);
	}

	// Flash winning cells 
	function winningCombo() {
		$(".winCombo").fadeOut(200).fadeIn(200)
									.fadeOut(200).fadeIn(200)
									.fadeOut(200).fadeIn(200)
									.fadeOut(200).fadeIn(200)
									.fadeOut(200).fadeIn(200);
	}

	//celebrate winner for 3 secs 
	//notify winning moves by highlighting winning squares
	function celebrate(grid, winner) {
		if (winner ==="X") {
			winsX++;
			}else {
				winsO++;
			};
		$("#playerDisplay").text(winsX);
		$("#compDisplay").text(winsO);

		$("#" + grid[0]).addClass("winCombo");	
		$("#" + grid[1]).addClass("winCombo");	
		$("#" + grid[2]).addClass("winCombo");
		$("#message").text("Player " + winner + " wins!!!")
		$("winner").animate(winningCombo());
		winMessage();
		setTimeout(function() {
			reset();
			}, 3000);
	}

	function draw() {
		ties++;
		$("#tiesDisplay").text(ties);
		$("#message").text("Draw.");
		setTimeout(function() {
			reset();
			}, 1500);
	}

	function winnaWinna(turnArr, currentTurn) {
		//count++;
		for ( var i = 0; i < winGame.length; i++) {
			if ( turnArr[winGame[i][0]] === currentTurn &&
					 turnArr[winGame[i][1]] === currentTurn &&
					 turnArr[winGame[i][2]] === currentTurn) {
						gameOver = true;
						celebrate(winGame[i], currentTurn);
						return gameOver;
			}else  {
				gameOver = false;
			}
		}
		
	}

	function compTurn() {
		var taken = false;
		//convert this logic to MiniMax Algorithm
		while(taken === false && count < 9) {
			if  ( moves[4] ==="#") {
				compMove = 4;
			}else {
				compMove = (Math.random()*10).toFixed();
			}

			var  place = $("#" + compMove).text();
			if (place === "#") {
				moves[compMove] = computersTurn;
				$("#" + compMove).addClass("moveColor");
				$("#" + compMove).text(computersTurn);
				count++;
				taken = true;
				
			}
		}
	}

	function humanTurn(humTurn, iden) {
			moves[iden] = humTurn;
			$("#message").text("");
			$("#message").removeClass("warningColor");
			$("#" + iden).addClass("moveColor");
			$("#" + iden).text(humTurn);
			count++;
	}

	function playerTurn(turn, id) {
		var spotTaken = $("#" + id).text();
		if(spotTaken !=="#" ) {
			$("#message").addClass("warningColor");
			$("#message").text("That space is taken, you must choose another.")
		}else {
			humanTurn(turn,id);
			winnaWinna(moves, turn);
			if ( gameOver === false) {
				compTurn();
				winnaWinna(moves,computersTurn);
			}
		} 
		if ( gameOver === false && count > 8) {
			draw();
		}      
	}

	$(".player").click(function(){
		gameOver = false;
		player = $(this).attr("id");
		if (player === "X") {
			computersTurn = "O"
		} else {
			computersTurn = "X";
		}
		$("#message").removeClass("warningColor");
		$("#message").text(" Ok, you are "+ player + " 's. You go first. Good Luck.");
		$('.player').prop('disabled', true);
		$(".player").hide(1000);
	});

	$(".square").click(function(){
		if (gameOver === false) {
			var spot = $(this).attr("id");
			playerTurn(player, spot);
		} else {
			$("#message").addClass("warningColor");
			warning();
			$("#message").text("Please choose X's or O's to start game.")
		}
			
			
		});


});