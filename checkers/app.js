//CREATE ROWS
//CREATE SQUARES
//ADD CLASS TO SQUARES
const board = document.querySelector('.board');
let squares = [];
let rows = [];
let redPieces = [];
let blackPieces = [];

//CREATE ROWS
for (let i = 0; i < 8; i++) {
	const row = document.createElement('div');
	for (let j = 0; j < 8; j++) {
		const square = document.createElement('div');
		square.classList.add('square');
		row.append(square);
		squares.push(square);
	}
	row.classList.add('row');
	rows.push(row);
	board.append(row);
}

//CREATE SQUARES
squareCounter = 0;
rows.forEach((row, rowIdx) => {
	//SET COLOR OF SQUARES
	if (rowIdx % 2 === 0) {
		for (let i = 0; i < row.children.length; i++) {
			if (i % 2 === 0) {
				squares[squareCounter].classList.add('redSquare');
			} else {
				squares[squareCounter].classList.add('blackSquare');
			}
			squareCounter++;
		}
	} else {
		for (let i = 0; i < row.children.length; i++) {
			if (i % 2 !== 0) {
				squares[squareCounter].classList.add('redSquare');
			} else {
				squares[squareCounter].classList.add('blackSquare');
			}
			squareCounter++;
		}
	}
});

//CREATE PIECES
rows.forEach((row, idx) => {
	if (idx < 2) {
		const piece = document.createElement('div');
		piece.classList.add('piece');
	}
});

squares.forEach((square, idx) => {
	if (square.classList.contains('blackSquare') && idx < 16) {
		const piece = document.createElement('div');
		piece.classList.add('piece', 'redPiece');
		square.append(piece);
		redPieces.push(piece);
	} else if (square.classList.contains('blackSquare') && idx > 47) {
		const piece = document.createElement('div');
		piece.classList.add('piece', 'blackPiece');
		square.append(piece);
		blackPieces.push(piece);
	}
});

//GAME LOGIC

blackPieces.forEach((p) => {
	p.addEventListener('click', (e) => {
		blackPieces.forEach((p) => {
			p.classList.remove('selected');
		});
		p.classList.toggle('selected');
		pieceSelected = true;
		console.log(e);
	});
});

redPieces.forEach((p) => {
	p.addEventListener('click', (e) => {
		redPieces.forEach((p) => {
			p.classList.remove('selected');
		});
		p.classList.toggle('selected');
		board.addEventListener('click', (e) => {
			console.log(e);
		});
		// console.log(e);
	});
});
