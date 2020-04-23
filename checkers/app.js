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

//PIECES LOGIC
//--SELECT PIECES
pieces.forEach((p, idx) => {
	p.addEventListener('click', (e) => {
		const piece = e.target;
		toggleSelected(piece);
	});
});

//--ACTIVATE SELECTED CLASS ON PIECE WHEN CLICKED
function toggleSelected(piece) {
	pieces.forEach((p) => {
		p.classList.remove('selected');
	});
	piece.classList.add('selected');
}
