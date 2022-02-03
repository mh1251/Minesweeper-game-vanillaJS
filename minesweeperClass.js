export default class mineSweeper {
	constructor(grid, width, flagsLeft) {
		this.grid = grid;
		this.width = width;
		this.bombAmount = this.width;
		this.squares = [];
		this.flags = 0;
		this.isGameOver = false;
		this.flagsLeft = flagsLeft;
	}

	createBoard() {
		let bombsArray = Array(this.bombAmount).fill("bomb");
		let emptyArray = Array(this.width * this.width - this.bombAmount).fill("valid");
		let gameArray = emptyArray.concat(bombsArray);
		let shuffledArray = gameArray.sort(() => Math.random() - 0.5);

		for (let i = 0; i < this.width * this.width; i++) {
			let square = document.createElement("div");
			let widthChosen = false;
			square.setAttribute("id", i);
			square.classList.add(shuffledArray[i]);
			if (this.width === 10 && widthChosen === false) {
				square.classList.add("width-ten");
				widthChosen = true;
			}

			if (this.width === 5 && widthChosen === false) {
				square.classList.add("width-five");
				widthChosen = true;
			}

			this.grid.appendChild(square);
			this.squares.push(square);
			//normal click
			square.addEventListener("click", (e) => {
				this.click(square);
			});

			square.oncontextmenu = (e) => {
				e.preventDefault();
				console.log(this)
				this.addFlag(square);
			}
		}
		//add numbers

		for (let i = 0; i < this.squares.length; i++) {
			let total = 0;
			let rightEdge = (i%this.width === 0);
			let leftEdge = (i%this.width === this.width-1);

			if (this.squares[i].classList.contains("valid")) {
				console.log(this.squares[i-1])
				if (!leftEdge && i!==0 && this.squares[i - 1].classList.contains("bomb")) { //check left
					total++;
				}
				if (!rightEdge && this.squares[i + 1].classList.contains("bomb")) { //check right
					total++;
				}
				if (this.squares[i - this.width] && this.squares[i - this.width].classList.contains("bomb")) { //check top
					total++;
				}
				if (this.squares[i + this.width]   && this.squares[i + this.width].classList.contains("bomb")) { //check bottom
					total++;
				}

				//check diagonally: 

				if (this.squares[i + 1 - this.width] && !rightEdge && this.squares[i + 1 - this.width].classList.contains("bomb")) {
					total++;
				}
				if (this.squares[i - 1 - this.width] && !leftEdge && this.squares[i - 1 - this.width].classList.contains("bomb")) {
					total++;
				}
				if (this.squares[i - 1 + this.width] && !leftEdge && this.squares[i - 1 + this.width].classList.contains("bomb")) {
					total++;
				}
				if (this.squares[i + 1 + this.width] && !rightEdge && this.squares[i + 1 + this.width].classList.contains("bomb")) {
					total++;
				}

				this.squares[i].setAttribute("data", total);
			}
		}
	}

	addFlag(square) {
		if (this.isGameOver) return;
		if (!square.classList.contains('checked') && (this.flags < this.bombAmount)) {
			if (!square.classList.contains('flag')) {
				square.classList.add('flag');
				square.innerHTML = '🚩';
				this.flags++;
				this.flagsLeft.innerHTML = 'Flags left: ' + `${this.bombAmount-this.flags}`
				this.checkForWin()
			} else {
				square.classList.remove('flag');
				square.innerHTML = '';
				this.flags--;
				this.flagsLeft.innerHTML = 'Flags left: ' + `${this.bombAmount-this.flags}`
			}
		}
	}

	click(square) {
		debugger
		let currentId = square.id;
		if (this.isGameOver) return;
		if (square.classList.contains("checked") || square.classList.contains("flag"))
			return;
		if (square.classList.contains("bomb")) {
			this.gameOver(square)
		} else {
			let total = square.getAttribute("data");
			if (total != 0) {
				square.classList.add("checked");
				square.innerHTML = total;
				return;
			}
			this.checkSquare(square, currentId);
		}
		square.classList.add("checked");
	}

	checkSquare(square, currentId) {
		setTimeout(() => {
			debugger

			//check left
			if (this.squares[currentId - 1]) {
				let newId = this.squares[parseInt(currentId) - 1].id;
				let newSquare = document.getElementById(newId);
				this.click(newSquare);
			}

			//check right 
			if (this.squares[currentId + 1]) {
				let newId = this.squares[parseInt(currentId) + 1].id;
				let newSquare = document.getElementById(newId);
				this.click(newSquare);
			}

			//check top
			if (this.squares[currentId - this.width]) {
				let newId = this.squares[parseInt(currentId - this.width)].id;
				let newSquare = document.getElementById(newId);
				this.click(newSquare);
			}

			//check bottom
			if (this.squares[currentId + this.width]) {
				let newId = this.squares[parseInt(currentId) + this.width].id;
				let newSquare = document.getElementById(newId);
				this.click(newSquare);
			}

			//check diagonally: 
			if (this.squares[currentId + 1 - this.width]) {
				let newId = this.squares[parseInt(currentId) + 1 - this.width].id;
				let newSquare = document.getElementById(newId);
				this.click(newSquare);
			}

			if (this.squares[currentId - 1 - this.width]) {
				let newId = this.squares[parseInt(currentId) - 1 - this.width].id;
				let newSquare = document.getElementById(newId);
				this.click(newSquare);
			}

			if (this.squares[currentId - 1 + this.width]) {
				let newId = this.squares[parseInt(currentId) - 1 + this.width].id;
				let newSquare = document.getElementById(newId);
				this.click(newSquare);
			}

			if (this.squares[currentId + 1 + this.width]) {
				let newId = this.squares[parseInt(currentId) + 1 + this.width].id;
				let newSquare = document.getElementById(newId);
				this.click(newSquare);
			}
		}, 10);
	}

	gameOver(square) {
		alert('BOOM! GAME OVER!');
		this.isGameOver = true;

		this.squares.forEach(square => {
			if (square.classList.contains('bomb')) {
				square.innerHTML = '💣'
			}
		})
	}

	checkForWin() {
		let correctBombs = 0;
		for (let i = 0; i < squares.length; i++) {
			if (this.squares[i].classList.contains('flag') && this.squares[i].classList.contains('bomb')) {
				correctBombs++;
			}
			if (correctBombs === this.bombAmount) {
				console.log('WIN');
				this.isGameOver = true;
			}
		}
	}
}

















