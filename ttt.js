	height = window.innerHeight-50;
	width = height;

	mouseX = 0;
	mouseY = 0;

	player = 0;

	playerZeroColor = "rgba(255, 100, 100"
	playerOneColor = "rgba(100, 100, 255"

	numberofcells = 9;

function init() {
	background = document.createElement('canvas');
	background.setAttribute("id", "background");
	background.setAttribute("style", "position:relative; z-index:0; margin: auto;");
	background.height = height;
	background.width = width;
	document.querySelector('body').appendChild(background);
	bg_ctx = background.getContext("2d");

	linebreak = document.createElement('div');
	linebreak.innerHML = "<br>";
	document.querySelector('body').appendChild(linebreak);

	foreground = document.createElement('canvas');
	foreground.setAttribute("id", "foreground");
	foreground.setAttribute("style", "position:relative; z-index:1; margin: auto; top:-"+background.height);
	foreground.height = height;
	foreground.width = width;
	document.querySelector('body').appendChild(foreground);
	fg_ctx = foreground.getContext("2d");

	fg_ctx.fillStyle = 'rgba(100,100,100,0.5)';
	fg_ctx.fillRect(0,0,foreground.width, foreground.height);


	drawGrid(bg_ctx, numberofcells, 1, "#444");
	drawGrid(bg_ctx, 3, 4, "#444");

	addEventListener('mousemove', mouseMoved, false);
	addEventListener('click', mouseClicked, false);

}

function drawGrid(ctx, numberofcells, strokeWeight, strokeStyle) {
	ctx.beginPath();
	for(var i = 0; i<numberofcells; i++) {
		ctx.moveTo(0, i*(height/numberofcells));
		ctx.lineTo(width, i*(height/numberofcells));
	}
	ctx.moveTo(0, height);
	ctx.lineTo(width, height);
	for(var j = 0; j<numberofcells; j++) {
		ctx.moveTo(j*(width/numberofcells), 0);
		ctx.lineTo(j*(width/numberofcells), height);
	}
	ctx.moveTo(width, 0);
	ctx.lineTo(width, height);

	ctx.lineWidth = strokeWeight;
	ctx.strokeStyle = strokeStyle;
	ctx.stroke();
}

function  mouseMoved(e) {     //e is the event handed to us
	mouseX = e.pageX - background.offsetLeft;
	mouseY = e.pageY - background.offsetTop;
	if (mouseY >= 0 && mouseY <= height && mouseX >= 0 && mouseX <= width) {
		showMove(calcSquare(mouseX, mouseY));
	}
	
}

function  mouseClicked(e) {     //e is the event handed to us
	if (mouseY >= 0 && mouseY <= height && mouseX >= 0 && mouseX <= width) {
		playSquare(calcSquare(mouseX, mouseY));
	}
}


// --Functions for displaying moves------------------
function calcSquare(x, y) {
	var scaledX = Math.floor(x/(width/numberofcells));
	var scaledY = Math.floor(y/(height/numberofcells));
	return [scaledX, scaledY];
}

function showMove(location) {
	fg_ctx.clearRect(0, 0, width, height);
	if (board[location[0]][location[1]].playable &&
		board[location[0]][location[1]].occupiedBy == null) {
		console.log("square is playable");
		drawRect(location, 9, player, 0.5, fg_ctx);
		
	}
	else {
		//drawRect(location, 9, 'rgba(100,100,100,0.4)');
		
	}	
}

function playSquare(playedSquare) {
	if (board[playedSquare[0]][playedSquare[1]].playable &&
		board[playedSquare[0]][playedSquare[1]].occupiedBy == null) 
		{
			board[playedSquare[0]][playedSquare[1]].occupiedBy = player;
			drawRect(playedSquare, 9, player, 0.9, bg_ctx);
			player = (player+1)%2;	
			updateBoard(playedSquare);	
	}
	else {
		console.log("NO.");
	}	
}

function drawRect(playedSquare, numberofcells, player, opacity, ctx) {
	var color;
	if (player == 0) {
		color = playerZeroColor+","+opacity+")"
	}
	else {
		color = playerOneColor+","+opacity+")"
	}
	ctx.fillStyle = color;	
	squareSize = width/numberofcells;
	ctx.fillRect(playedSquare[0]*squareSize, playedSquare[1]*squareSize, squareSize, squareSize);
}

function wonBoard(playedSquare) {
	//game logic here
	var won = 0;
	return won;
}

function updateBoard(playedSquare) {
	console.log(board);
	if (wonBoard(playedSquare)) {
		drawRect(playedSquare, 3, player, 1.0, bg_ctx);
	}
	for (var i=0; i<numberofcells; i++) {
		for (var j=0; j<numberofcells; j++) {
			board[i][j].playable = false;
		}
	}
	for (var i=0; i<numberofcells; i++) {
		start = (playedSquare[0]%3)*3;
		end = start+2;
		if (i>=start && i<=end){
			for (var j=0; j<numberofcells; j++) {
				board[i][j].playable = true;
			}
		}
	}
	for (var i=0; i<numberofcells; i++) {
		start = (playedSquare[1]%3)*3;
		end = start+2;
		for (var j=0; j<numberofcells; j++) {
				if (j>=start && j<=end){
					if(board[i][j].playable == true) {
						board[i][j].playable = true;
					}
					else {
						board[i][j].playable = false;
					}
				}
				else {
					board[i][j].playable = false;
				}
				
			}
		
	}

}


// ----Data structure-------------

var Square = function() {
	this.occupiedBy = null;
	this.playable = true;
}

var board = [];
for (var i=0; i<9; i++) {
	board.push([]);
	for (var j=0; j<9; j++) {
		board[i].push(new Square());
	}
}

var metaboard = [];
for (var i=0; i<3; i++) {
	board.push([]);
	for (var j=0; j<3; j++) {
		board[i].push(new Square());
	}
}


function main() {
	init();
}

