const boardContainer = document.querySelector('.board');
const startBtn = document.querySelector('#start');

//CHECKER BOARD LAYOUT OBJECT
const board = {
	rows: [
		{
			row: {
				name: 'row1',
				num: 1,
				squares: []
			}
		},
		{
			row: {
				name: 'row2',
				num: 2,
				squares: []
			}
		},
		{
			row: {
				name: 'row3',
				num: 3,
				squares: []
			}
		},
		{
			row: {
				name: 'row4',
				num: 4,
				squares: []
			}
		},
		{
			row: {
				name: 'row5',
				num: 5,
				squares: []
			}
		},
		{
			row: {
				name: 'row6',
				num: 6,
				squares: []
			}
		},
		{
			row: {
				name: 'row7',
				num: 7,
				squares: []
			}
		},
		{
			row: {
				name: 'row8',
				num: 8,
				squares: []
			}
		}
	]
};

const pieces = [];
let turnCount;
let turn;
//CREATE ROWS AND SQUARES
board.rows.forEach((row, idx) => {
	const newRow = document.createElement('div');
	newRow.classList.add('row');
	for (let i = 0; i < 8; i++) {
		const newSquare = document.createElement('div');
		newSquare.classList.add('square');
		setSqColor(newSquare, idx, i);
		newRow.append(newSquare);
		row.row.squares.push(newSquare);
	}
	boardContainer.append(newRow);
});

//FORMAT SQUARE COLORS
function setSqColor(square, rowidx, sqidx) {
	if (rowidx % 2 === 0) {
		if (sqidx % 2 === 0) {
			square.classList.add('redSquare');
		} else {
			square.classList.add('blackSquare');
		}
	} else {
		if (sqidx % 2 !== 0) {
			square.classList.add('redSquare');
		} else {
			square.classList.add('blackSquare');
		}
	}
}

//CREATE PIECES
for (let i = 0; i < 16; i++) {
	const newPiece = document.createElement('div');
	newPiece.classList.add('piece');
	if (i < 8) {
		newPiece.classList.add('redPiece');
	} else {
		newPiece.classList.add('blackPiece');
	}
	pieces.push(newPiece);
}
//PLACE PIECES ON BOARD
startBtn.addEventListener('click', () => {
	let pieceCount = 0;
	turnCount = 0;
	board.rows.forEach((row, idx) => {
		if (idx < 2 || idx > 5) {
			row.row.squares.forEach((sq, sqidx) => {
				if (sq.classList.contains('blackSquare')) {
					sq.append(pieces[pieceCount]);
					pieceCount++;
				}
			});
		}
	});
});

//GAME LOGIC
//
//==PIECE POSITION VARIABLES
let pieceRow;
let pieceIdx;
//===========================

boardContainer.addEventListener('click', (e) => {
	// console.log('event');
	// console.log(e);
	let target = e.target;
	let eClassList = e.target.classList;
	//PIECES=====================================
	//==SET COLOR TURN==
	if (turnCount % 2 === 0) {
		turn = 'black';
	} else {
		turn = 'red';
	}
	//==ADD SELECTED CLASS AND SET PIECE POSITION==
	if (eClassList.contains(`${turn}Piece`)) {
		pieces.forEach((p, idx) => {
			//ADD SELECTED CLASS TO PIECES=======
			p.classList.remove('selected');
			target.classList.add('selected');
		});
		getPiecePosition();
	}
	//==
	if (eClassList.contains('blackSquare') && target.children.length === 0) {
		console.log('valid move');
	}
});

//PIECE POSITION FUNCTION=============================
function getPiecePosition() {
	board.rows.forEach((row, idx) => {
		row.row.squares.forEach((sq, sqIdx) => {
			if (sq.firstChild !== null) {
				if (sq.firstChild.classList.contains('selected')) {
					pieceIdx = sqIdx;
					pieceRow = idx;
					console.log(`piece index: ${pieceIdx}`);
					console.log(`piece row: ${pieceRow}`);
				}
			}
		});
	});
}
