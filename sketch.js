let rows = 7;
let cols = 7;
let size = 70;
let xmargin, ymargin;
let newGame;
let board, lboard;
function setup(){
	createCanvas(windowWidth, windowHeight);
	xmargin = (windowWidth - cols*size)/2;
	ymargin = (windowHeight - rows*size)/2 + 50;
	 board = createBoard(rows, cols, size);
	 creatingRings(board);
	 newGame = createButton('NEWGAME');
	 newGame.position(20,1200);
	 newGame.size(150,80);
	 newGame.mousePressed(newGameStart);
///ring = createRing(board);
}
function newGameStart(){
	 board = createBoard(rows, cols, size);
	 creatingRings(board);
	
}
function printDot(){
	for(let i = 0; i<cols; i++){
		for(let j = 0; j<rows; j++){
			if(board[i][j].visited){
				ellipse(board[i][j].i*size +size/2,board[i][j].j*size +size/2, 10,10);
			}
		}
	}
}

function mousePressed(){
	let ii = floor((mouseX - xmargin)/size);
	let jj = floor((mouseY - ymargin)/size);
	if(ii>-1&&jj>-1&&ii<cols&&jj<rows){
		player.rotate(ii, jj);
	}
}


function draw(){
	background(61,222,100);
	player.show();
	if(frameCount%1===0)	player.autoComplete();


		textSize(51);
		strokeWeight(2);
	 text('INFINITY-LOOP ', 1000,100);
	 text('Created by', 1000,200);
	 text('Ahmad Raza ', 1000,300);

}

function drawRing(ring){
    strokeWeight(1);

	for(let i = 0; i<rows; i++){
		line(i*size, 0, i*size, size*rows);
		line(0, i*size, size*rows, i*size);
	}

    strokeWeight(2);
	noFill();
	beginShape();
	for(let p of ring){
		vertex(p.i*size + size/2, p.j*size +size/2);
		textSize(10);

	}
	endShape();
	if(ring.length>0){
    let pp =ring[0];
	}
}

