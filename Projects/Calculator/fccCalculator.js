// FCC Calculator
var display = document.querySelector("#display");
var clearAll = document.querySelector("#CE");
var clearLast = document.querySelector("#C");
var negNum = document.querySelector("#negNum");
var decimal = document.querySelector("#decimal");
var calculate = document.querySelector("#equals");

var memory  = "";      // initialise memory variable
var current = "";      // initialize current variable
var maxLength = 10;     // maximum number of digits before decimal!

function displayDigit(digit)  {
  if (current.length > maxLength) {
		current = "Number too large";
	}else{
		if ((eval(current) === 0)
				&& (current.indexOf(".") == -1))  {
					current = digit;
		}else{
			current = current + digit;
		};
	};
	console.log(current);
	displayText(current);
};

function operator(oper) {
	if ( memory === "") {
		memory = current + oper;
		displayText(current);
		console.log(memory);
	} else {
		memory = memory + current + oper;
		displayText(current);
		console.log(memory);
	}
  current = "";
};

function calculon() {
	memory = memory + current;
	var result = eval(memory);
  memory = "";
	displayText(result);
  current = result;
  console.log(memory, result, current);
}

function resetAll(){
	current = "0";
	memory = "";
	displayText(current);
	console.log("resetAll");
}

function displayClear(){
	current = "0";
	displayText(current);
	console.log("displayClear")
}

function plusMinus() {
	if( current.indexOf("-") === 0) {
		current = current.substring(1);
		displayText(current);
		console.log("NegNum");
	}else{
		current = "-" + current;
		displayText(current);
		console.log("NegNum");
	}
}

function displayText(input) {
	display.textContent = input;
}

clearAll.addEventListener("click", function(){
	resetAll();
});

clearLast.addEventListener("click", function(){
	displayClear();
});

negNum.addEventListener("click", function(){
	plusMinus();
});

calculate.addEventListener("click", function(){
	calculon();
});








