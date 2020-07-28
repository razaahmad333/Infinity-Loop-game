class Player{
	constructor(rings, board){
		this.rings = rings.slice();
		this.board = board;
		this.currentCell = this.rings[0][0];
		this.rai = 0; // rings array index
		this.cri = 0; // cell in ring index
		this.CanAutoComplete = false;
		this.CanCheckRingFormed = false;
		this.setWalls();
		this.createButtons();
		this.complete = false;
		this.completeRings = [];
		this.inCompleteRings = [];
		this.canTry = false;

	}

	checkRingFormed(){
		this.canTry = false;
		for(let ring of this.rings){
			for(let cell of ring){
				if(!cell.checked){
				let tempRing = this.getRing(cell);
				if(tempRing.length>0){
					if(this.complete) this.completeRings.push(tempRing);
					if(!this.complete) this.inCompleteRings.push(tempRing);
				}
			}
		}
		}
		this.CanCheckRingFormed  = false;

		for(let r of this.completeRings) {
			for(let c of r){
				c.show([210,210,210]);
			}
		}
		for(let r of this.inCompleteRings) {
			for(let c of r){
				c.show([210,10,10]);
			}
		}
	}

	getRing(cell){
		this.complete = false;
		let tring = [];
		let si = cell.i;
		let ctts = 0;
		let sj = cell.j;
		let current = cell;
		tring.push(current);
		while(ctts<110){
		current.checked = true;

		current = current.getConnectedCell();
		if(current === undefined){
			this.complete = false;
			return tring;
		}

				tring.push(current);
				current.checked = true;
				console.log(ctts);
		//if(current.i === si&& current.j === sj&&ctts>2){
		if(current.neighbours.indexOf(board[si][sj])>-1&&current.getFinal(si,sj)&&ctts>1){
			console.log('true');
			this.complete = true;
			return tring;
		 }
		// 		tring.push(current);
		// 		current.checked = true;
		ctts++;
		if(ctts>110) break;
	}

	return [];
	}
	createButtons(){
		this.submit = createButton('submit');
		this.submit.position(10,40);
		this.submit.size(70,40);
		this.submit.mousePressed(()=>this.CanCheckRingFormed = true);

		this.solution = createButton('solution');
		this.solution.position(10,170);
		this.solution.size(70,40);
		this.solution.mousePressed(()=>this.CanAutoComplete = true);

		this.tryAgain = createButton('tryAgain');
		this.tryAgain.position(10,100);
		this.tryAgain.size(70,40);//|||||
		this.tryAgain.mousePressed(()=>this.canTry = true);
		
	}

	tryIt(){
		if(this.canTry){
			for(let i = 0; i<cols; i++){
				for(let j = 0; j<rows; j++){
					board[i][j].checked = false;
					this.CanCheckRingFormed = false;
				}
			}
			this.inCompleteRings = [];
			this.completeRings = [];
		}
	}
	autoComplete(){
  		if(this.CanAutoComplete){
		console.log('solving...');
		this.currentCell = this.rings[this.rai][this.cri];
		if(this.currentCell.autoComplete()){
			this.cri++;
			if(this.cri === this.rings[this.rai].length-1){
				this.cri = 0;
				this.rai++;
				if(this.rai === this.rings.length){
					this.CanAutoComplete = false;
					this.rai = 0;
				}
			}
		}
  	}
	}

	setWalls(){
		for(let ring of this.rings){
			for(let cell of ring){
				cell.setAllWalls();
			}
		}
	}

	show(){
		if(this.CanCheckRingFormed) this.checkRingFormed();
		this.tryIt();
		for(let i =0; i<cols; i++){
			for(let j = 0; j<rows; j++){
				this.board[i][j].show();
			}
		}
		for(let r of this.completeRings) {
			for(let c of r){
				c.show([210,210,210]);
			}
		}
		for(let r of this.inCompleteRings) {
			for(let c of r){
				c.show([210,10,10]);
			}
			}
	}

	rotate(i, j){
		this.board[i][j].rotate();
	}
}
