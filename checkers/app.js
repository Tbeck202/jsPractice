const board = document.querySelector('.board'),
	startGame = document.querySelector('#start');
(rows = []), (squares = []), (pieces = []);

//INITIATE TURN COUNTER AND TRACK TURNS
let turnCounter;
let turn;

//CREATE ROWS
for (let i = 0; i < 8; i++) {
	const row = document.createElement('div');
	rows.push(row);
	row.classList.add('row');
	board.append(row);
}
//CREATE SQUARES
rows.forEach((row, idx) => {
	for (let i = 0; i < 8; i++) {
		const square = document.createElement('div');
		squares.push(square);
		row.append(square);
		square.classList.add('square');
		formatSquares(square, idx, i);
	}
});

//==FORMAT AND COLOR SQUARES
function formatSquares(square, rowidx, squareidx) {
	if (rowidx % 2 === 0) {
		if (squareidx % 2 === 0) {
			square.classList.add('redSquare');
		} else {
			square.classList.add('blackSquare');
		}
	} else {
		if (squareidx % 2 === 0) {
			square.classList.add('blackSquare');
		} else {
			square.classList.add('redSquare');
		}
	}
}

//CREATE PEICES
for (let i = 0; i < 16; i++) {
	const piece = document.createElement('div');
	piece.classList.add('piece');
	if (i < 8) {
		piece.classList.add('redPiece');
	} else {
		piece.classList.add('blackPiece');
	}
	pieces.push(piece);
}

//==FORMAT AND COLOR PIECES
startGame.addEventListener('click', () => {
	let squareCount = 0;
	squares.forEach((sq, idx) => {
		if (sq.classList.contains('blackSquare') && idx < 16) {
			sq.append(pieces[squareCount]);
			squareCount++;
		} else if (sq.classList.contains('blackSquare') && idx >= 48) {
			sq.append(pieces[squareCount]);
			squareCount++;
		}
	});
	turnCounter = 2;
});

//	SELECT PIECE TO MOVE
pieces.forEach((p, idx) => {
	p.addEventListener('click', (e) => {
		if (turnCounter % 2 === 0) {
			turn = 'black';
		} else if (turnCounter % 2 !== 0) {
			turn = 'red';
		}
		let piece = e.target;
		pieces.forEach((pp, idx) => {
			if (piece.classList.contains(`${turn}Piece`)) {
				pp.classList.remove('selected');
				piece.classList.add('selected');
			}
		});
	});
});

// SELECT SQUARE TO MOVE TO
board.addEventListener('click', (e) => {
	// console.log(e);
	let desiredMove = e.target;
	pieces.forEach((p, idx) => {
		if (p.classList.contains('selected') && !desiredMove.classList.contains('piece')) {
			desiredMove.append(p);
			p.classList.remove('selected');
		}
	});
});

//SET PLAYER TURN

//CREATE MOVE LOGIC
//CREATE PIECE CAPTURE LOGIC
//CREATE WIN LOGIC
