class Cell{
	constructor(i, j, size, rows, cols, visited, block, neighbours){
		this.i = i;
		this.j = j;
		this.visited = visited;
		this.block = block;
		this.size = size;
		this.cols = cols;
		this.rows = rows;
		this.owi  = 0;// original wall index
		this.neighbours = neighbours.slice();	
		this.originalWall = [true, true, true, true];
		this.cwi = 0; // current wall index
		this.currentWall = [true, true, true, true];
		this.allWall = [];
		this.checked = false;
	 }
	autoComplete(){
		
		if(this.cwi === this.owi){
			return true;
		}

		else{
			this.rotate();
			return false;
		}
	}
		getFinal(i, j){
			this.currentWall = this.allWall[this.cwi];


				if(i-this.i>0&&j-this.j===0){
						if(!this.currentWall[1]&&!board[i][j].currentWall[3]) return true;					
				}
				if(i-this.i<0&&j-this.j===0){
					if(!this.currentWall[3]&&!board[i][j].currentWall[1]) return true;
				}
				if(j-this.j>0&&i-this.i===0){
			if(!this.currentWall[2]&&!board[i][j].currentWall[0]) return true;					
				}

				if(j-this.j<0&&i-this.i===0){
			if(!this.currentWall[0]&&!board[i][j].currentWall[2]) return true;
					
				}
			return false;
		}
	getConnectedCell(){
		this.currentWall = this.allWall[this.cwi];
		// for(let wi = 0; wi<4; wi++){
		// 	this.checked = true;
		// 	if(!this.currentWall[wi]) {

		// 	}
		// }
		//this.checked = true;
		if(!this.currentWall[0]){
			if(this.j-1>-1){
				if(!board[this.i][this.j-1].currentWall[2]&&!board[this.i][this.j-1].checked){
						board[this.i][this.j-1].checked = true;	 
				 return board[this.i][this.j-1];
				} 
			}
		}
		if(!this.currentWall[1]){
			if(this.i+1<this.cols){
				if(!board[this.i+1][this.j].currentWall[3]&&!board[this.i+1][this.j].checked){
				board[this.i+1][this.j].checked = true;
				 return board[this.i+1][this.j]; 
				}
			}
		}
		if(!this.currentWall[2]){
			if(this.j+1<this.rows){
				if(!board[this.i][this.j+1].currentWall[0]&&!board[this.i][this.j+1].checked) {
					board[this.i][this.j+1].checked = true;			
					return board[this.i][this.j+1];
			} 
			}
		}
		if(!this.currentWall[3]){
			if(this.i-1>-1){
				if(!board[this.i-1][this.j].currentWall[1]&&!board[this.i-1][this.j].checked) {
					board[this.i-1][this.j].checked = true;
					return board[this.i-1][this.j];
					} 
			}
		}

		return undefined;
	}

	findOWI(){
		for(let aw = 0; aw<this.allWall.length; aw++){
			if(this.originalWall[0] === this.allWall[aw][0]&&this.originalWall[1] === this.allWall[aw][1]&&this.originalWall[2] === this.allWall[aw][2]&&this.originalWall[3] === this.allWall[aw][3])
				this.owi = aw;
		}

		this.cwi = floor(random(this.allWall.length));	 	
	 }
	 rotate(){
	 	if(this.visited){
	 		this.cwi++;
	 		if(this.cwi===this.allWall.length){
	 			this.cwi = 0;
	 		}
	 	}
	 }
	
	show(c = [0,0,0]){
	 	if(this.visited)  this.currentWall = this.allWall[this.cwi];
	 	if(!this.visited) this.currentWall = this.originalWall;
	 	stroke(c[0], c[1], c[2]);
	 	strokeWeight(size/6);
	 	if(!this.currentWall[0]) line(this.i*this.size + this.size/2 + xmargin,  this.j*this.size + ymargin,              this.i*this.size + this.size/2 + xmargin, this.j*this.size + this.size/2 + ymargin )
	 	if(!this.currentWall[1]) line(this.i*this.size + this.size + xmargin,    this.j*this.size +this.size/2+ ymargin,  this.i*this.size + this.size/2 + xmargin, this.j*this.size + this.size/2 + ymargin )
	 	if(!this.currentWall[2]) line(this.i*this.size + this.size/2 + xmargin,  this.j*this.size + this.size+ ymargin,   this.i*this.size + this.size/2 + xmargin, this.j*this.size + this.size/2 + ymargin )
	 	if(!this.currentWall[3]) line(this.i*this.size + xmargin,                this.j*this.size+ this.size/2 + ymargin, this.i*this.size + this.size/2 + xmargin, this.j*this.size + this.size/2 + ymargin )
	 }
	
	setWalls(wall){
	 	for(let w = 0; w<4; w++){
	 		if(!wall[w]){
	 			this.originalWall[w] = false;
	 		}
	 	}
	 }

	 setAllWalls(){
	 	if(this.visited){
	 		if(this.originalWall[0]&&this.originalWall[2]||this.originalWall[1]&&this.originalWall[3]){
	 			this.allWall = [[true, false, true, false],[false, true, false, true]];
	 		}

	 		let cts= 0;
	 		for(let w of this.originalWall){
	 			if(!w){cts++;}
	 		}
	 		if(cts === 3){
	 			this.allWall =[  [false, false, false, true],
	 							[true, false, false, false],
	 							[false, true, false, false],
	 							[false, false, true, false]
	 							];
	 		}

	 		for(let v = 0; v<3; v++){
	 			if(this.originalWall[v]&&this.originalWall[v+1]||!this.originalWall[v]&&!this.originalWall[v+1]){
	 				this.allWall = [ [false, false, true, true],
	 								 [true, false, false, true],
	 								 [ true, true,false, false],
	 								 [false, true, true, false],
	 								];
	 			}
	 		}
	 		this.findOWI();
	 	}
	 }

	addNeighbours(board){
		if(this.j - 1 >-1) this.neighbours.push(board[this.i][this.j-1]);
		if(this.i - 1 >-1) this.neighbours.push(board[this.i-1][this.j]);
		if(this.j + 1 <this.rows) this.neighbours.push(board[this.i][this.j+1]);
		if(this.i + 1 <this.cols) this.neighbours.push(board[this.i+1][this.j]);
	}

    geniusGuess(i, j){
    			let tempList = [];
    			let temp = undefined;
    			for(let n of this.neighbours){
    			if(!n.visited){
    			tempList.push(n);
    			}

    			if(n.i===i&&n.j===j){
    			tempList.push(n);
    			return n;
    			console.log('this.is.end');
    			}
    			}
    			let dm = 1000;
    			for(let tl of tempList){
    			let d = dist(tl.i, tl.j, i, j);

    			if(dm > d) {
    			dm =d;
    			temp = tl;
    			}
    		}
    	return temp;
	}

	getNextCell(){
		let temp = undefined;
		let x  = floor(random(this.neighbours.length));
		for(let i = 0; i<this.neighbours.length; i++){
			if(!this.neighbours[x].visited&&!this.neighbours[x].block){
				temp = this.neighbours[x];
			}
			x++;
			if(x === this.neighbours.length) x = 0;
		}
		return temp;
	}
}
