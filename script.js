var sequence = [];
var colSequence = [];
var colors = [];
var circles = document.querySelectorAll(".circle");
var startBtn = document.querySelector("#start");
var h1 = document.querySelector("h1");
var body = document.querySelector("body");
var modes = document.querySelectorAll(".mode");
var play = document.querySelector("#play");

var numCircles = 6;
var cur = 0;
var curToBeClicked = 0;
var numModes = 3;
var interval = 1000;
var animInterval = 200;
init();
function init(){
	reset();
	addEventListenerToAll();
}

function reset(){
	cur = 0;
	curToBeClicked = 0;
	sequence = [];
	colSequence = [];
	colors = [];
	generateRandomColors();
	AssignColors();
	generateRandomSequence();
}
function generateRandomColors(){
	for(var i =0;i<numCircles;i++){
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		var res = "rgb("+r+", "+g+", "+b+")";
		colors.push(res);
	}
}

function AssignColors(){
	for(var i = 0;i<numCircles;i++){
		circles[i].style.backgroundColor = colors[i];
	}
}

function generateRandomSequence(){
	while(sequence.length!=numCircles){
		var rand = Math.floor(Math.random()*numCircles);
		if(sequence.indexOf(rand)<0)
			sequence.push(rand);
		else{
			for(var i = 0;i<numCircles;i++){
				if(sequence.indexOf(i)<0){
					sequence.push(i);
					break;
				}
			}
		}
	}

	for(var i = 0;i<numCircles;i++)
		colSequence[i] = colors[sequence[i]];
}

function addEventListenerToAll(){
	startBtn.addEventListener("click",reset);
	play.addEventListener("click",startTheEvent);
	addEventListenerToCircles();
	addEventListenerToModes();
}

// function changeColor(){
// 	body.style.backgroundColor = "#F3FAB6";
// 	h1.style.backgroundColor = "#D9853B";
// 	for(var i = 0;i<numCircles;i++)
// 		circles[i].style.backgroundColor = colors[0];
// }

function addEventListenerToCircles(){
	for(var i = 0;i<numCircles;i++){
		circles[i].addEventListener("click",function(){
				if(colSequence[curToBeClicked] == this.style.backgroundColor){
					curToBeClicked++;
					console.log("Awesome!");
					this.style.backgroundColor = "#F3FAB6";
					if(curToBeClicked == numCircles){
						alert("Awesome!!! You Won it!")
					}
				}
				else{
					alert("try again");
				}
		});
	}
}

function addEventListenerToModes(){
	for(var i =0;i<numModes;i++){
		modes[i].addEventListener("click",function(){
			modes[0].classList.remove("selected");
			modes[1].classList.remove("selected");
			modes[2].classList.remove("selected");
			this.classList.add("selected");
			var text = this.textContent;
		if(text == "Easy"){
			interval = 2000;
			animInterval = 400;
		}
		else if(text == "Medium"){
			interval = 1400;
			animInterval = 200;
		}
		else if(text == "Hard"){
			interval = 900;
			animInterval = 40;
		}
		reset();
		});
	}
}


function animateCircles(num){
	var cnt = 0;
	var i = setInterval(function(){
		if(cnt%2 == 0)
			circles[num].style.backgroundColor = "#2B2B2B";
		else
			circles[num].style.backgroundColor = colors[num];
		cnt++;
		if(cnt == 6)
			clearInterval(i);
	},animInterval);
}

function startTheEvent(){
	cur = 0;
	curToBeClicked = 0;
	var i = setInterval(function(){
		console.log(sequence[cur]);
		console.log(circles[sequence[cur]]);
		animateCircles(sequence[cur]);
		//circles[Number(sequence[cur])].classList.add("circleWithBorder");
		cur++;
		if(cur == numCircles)
			clearInterval(i);
	},interval);	
}


