let player;
function creatingRings(board){
	let rings = [];
	for(let i = 0; i<100; i++){
		let ring = createRing(board);
		if(ring.length>0){
			rings.push(ring);
		}
	}

	for(let i = 0; i<rings.length; i++){
		for(let j = 0; j<rings[i].length-1; j++){
			let c1 = rings[i][j];
			let c2 = rings[i][j+1];
			c1.setWalls([c2.j - c1.j >=0, c2.i - c1.i <=0, c2.j - c1.j <=0, c2.i - c1.i >=0 ]);
			c2.setWalls([c1.j - c2.j >=0, c1.i - c2.i <=0, c1.j - c2.j <=0, c1.i - c2.i >=0 ]);
		}
	}
	
	player = new Player(rings, board);


}

















function erases(arr){
	for(let a of arr){
		a.visited = false;
	}
}
function createRing(board){
	 // lboard = makeCopy(createBoard(rows, cols, size));
	 lboard = board;
	let ring1 = [];
	let len = random([3,4,5,6]);
	let current  = random(random(lboard));
	if(current.visited){
		return [];
		}
	let start = current;
	let i = start.i;
	let j = start.j;
	ring1.push(start);
	start.visited = true;
	for(let zz = 0; zz<len; zz++){

		current = current.getNextCell();
		if(current===undefined){
			erases(ring1);
			return [];
		}
		else{
				ring1.push(current);
				current.visited = true;
		}
	}
      for(let zz = 0; zz<101; zz++){
      	current = current.geniusGuess(i,j);
      	if(current === undefined){
			erases(ring1);

      		return [];
      	}

      

      	if(current.i === i&& current.j === j){
			ring1.push(current);
      		current.visited =true;
      		break;
      	}

      	if(zz === 100){
			erases(ring1);

      		return [];
      	}


      	ring1.push(current);
      	current.visited =true;


      }

	return ring1;
}

																													
function createBoard(rows, cols, size){
	board = [];
	for(let i = 0; i<cols; i++){
		board[i] = [];
		for(let j = 0; j<rows; j++){
			board[i][j] = new Cell(i, j, size, rows, cols, false, false, []);
		}
	}

	for(let i = 0; i<cols; i++){
		for(let j = 0; j<rows; j++){
			board[i][j].addNeighbours(board);
		}
	}
	return board;
}

function makeCopy(board){
	lboard = [];
	for(let i = 0; i<cols; i++){
		lboard[i] = [];
		for(let j = 0; j<rows; j++){
			let b = board[i][j];
			lboard[i][j] = new Cell(b.i, b.j, b.size, b.rows, b.cols, b.visited, b.block, []);
		}
	}

	for(let i = 0; i<cols; i++){
		for(let j = 0; j<rows; j++){
			lboard[i][j].addNeighbours(lboard);
		}
	}

	return lboard;
}
