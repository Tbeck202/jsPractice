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
for (let i = 0; i < 24; i++) {
	const newPiece = document.createElement('div');
	newPiece.classList.add('piece');
	if (i < 12) {
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
		if (idx < 3 || idx > 4) {
			row.row.squares.forEach((sq, sqidx) => {
				if (sq.classList.contains('blackSquare')) {
					sq.append(pieces[pieceCount]);
					pieceCount++;
				}
			});
		}
	});
});

//
//==GAME VARIABLES
let turnCount;
let turn;
let opponent;
//
//==PIECE AND PIECE POSITION VARIABLES
let pieceIsSelected;
let selectedPiece;
let pieceRow;
let pieceIdx;
let jumpablePieces = [];
let jumpablePieceRow;
let jumpablePieceIdx;

//GAME LOGIC=======================================
boardContainer.addEventListener('click', (e) => {
	// console.log('event');
	// console.log(e);
	let target = e.target;
	let eClassList = e.target.classList;
	emptyJumpable();
	//PIECES=====================================
	//==SET COLOR TURN==
	if (turnCount % 2 === 0) {
		turn = 'black';
		opponent = 'red';
	} else {
		turn = 'red';
		opponent = 'black';
	}
	// console.log(turnCount);
	// console.log(turn);
	//==ADD SELECTED CLASS AND SET PIECE POSITION==
	if (eClassList.contains(`${turn}Piece`)) {
		pieces.forEach((p, idx) => {
			//ADD SELECTED CLASS TO PIECES=======
			p.classList.remove('selected');
			target.classList.add('selected');
			selectedPiece = target;
			pieceIsSelected = true;
		});
		getPiecePosition();
		validMove();
	}
	//==MOVE PIECE TO SELECTED VALID SQUARE========
	if (eClassList.contains('blackSquare') && eClassList.contains('validMove') && target.children.length === 0) {
		// console.log('valid move');
		target.append(selectedPiece);
		// console.log(turn);
		checkJump(e);
		selectedPiece.classList.remove('selected');
		removeValidClass();
		pieceIsSelected = false;
		turnCount++;
	}
});

//==PIECE POSITION FUNCTION=============================
function getPiecePosition() {
	board.rows.forEach((row, idx) => {
		row.row.squares.forEach((sq, sqIdx) => {
			if (sq.firstChild !== null) {
				if (sq.firstChild.classList.contains('selected')) {
					pieceIdx = sqIdx;
					pieceRow = idx;
					// console.log(`piece index: ${pieceIdx}`);
					// console.log(`piece row: ${pieceRow}`);
				}
			}
		});
	});
}

//==VALID MOVE FUNCTION=======
function validMove() {
	let sqChildren;
	// console.log('valid move called');
	board.rows.forEach((row, idx) => {
		row.row.squares.forEach((sq, sqidx) => {
			sq.classList.remove('validMove');
		});
		if (turn === 'black') {
			if (idx === pieceRow - 1) {
				row.row.squares.forEach((sq, sqidx) => {
					//sqChildren variable lets you access the class list of the piece that occupies the square
					sqChildren = [ ...sq.children ];
					// console.log(sqChildren);
					if (sqChildren.length === 0 && (sqidx === pieceIdx - 1 || sqidx === pieceIdx + 1)) {
						sq.classList.add('validMove');
					} else if (
						//THIS LOGIC ONLY WORKS ON THE BLACK PIECES
						sq.children.length > 0 &&
						sqChildren[0].classList.contains(`${opponent}Piece`) &&
						(sqidx === pieceIdx + 1 || sqidx === pieceIdx - 1)
					) {
						//JUMPABLE PIECE LOGIC*******************************************
						jumpablePieceRow = idx;
						jumpablePieceIdx = sqidx;
						jumpablePieces.push(sqChildren[0]);
						// console.log(sqChildren[0]);
						setJump(jumpablePieces, jumpablePieceRow, jumpablePieceIdx);
					}
					//STILL NEEDS WORK
					//********************************************************************
				});
			}
		} else {
			if (idx === pieceRow + 1) {
				// console.log(row);
				row.row.squares.forEach((sq, sqidx) => {
					sqChildren = [ ...sq.children ];
					if (sq.children.length === 0 && (sqidx === pieceIdx - 1 || sqidx === pieceIdx + 1)) {
						sq.classList.add('validMove');
					}
				});
			}
		}
	});
}

function removeValidClass() {
	board.rows.forEach((row) => {
		row.row.squares.forEach((sq) => {
			sq.classList.remove('validMove');
		});
	});
}

function setJump(jumpablePieces, jumpablePieceRow, jumpablePieceIdx) {
	board.rows.forEach((row, idx) => {
		row.row.squares.forEach((sq, sqidx) => {
			if (
				idx === jumpablePieceRow - 1 &&
				(sqidx === jumpablePieceIdx + 1 || sqidx === jumpablePieceIdx - 1) &&
				sq.children.length < 1
			) {
				sq.classList.add('validMove');
			}
		});
	});
}

function emptyJumpable() {
	for (let p of jumpablePieces) {
		jumpablePieces.pop(p);
	}
}

let jumpToRow;
let jumpToSq;
function checkJump(e) {
	// console.log(e);
	board.rows.forEach((row, idx) => {
		if (turn === 'black') {
			if (idx === pieceRow - 2) {
				row.row.squares.forEach((sq, sqidx) => {
					let sqChildren = [ ...sq.children ];
					// console.log(sqChildren);
					if (sqChildren.length > 0) {
						jumpToRow = idx;
						jumpToSq = sqidx;
						removePiece();
					}
					// console.log(sqChildren[0]);
				});
			}
		}
	});
}

function removePiece(piece) {
	board.rows.forEach((row, idx) => {
		row.row.squares.forEach((sq, sqidx) => {
			let sqChildren = [ ...sq.children ];
			if (sqChildren.length > 0 && idx === jumpToRow + 1 && sqidx === jumpToSq + 1) {
				sqChildren[0].classList.add('jumped');
				// console.log(sq);
			}
		});
	});
	console.log(pieces);
	pieces.forEach((p) => {
		// console.log(p);
		if (p.classList.contains('jumped')) {
			pieces.pop(p);
		}
	});
}

//JUMPABLE PIECE LOGIC================
// function jumpablePiece(sq, sqidx, sqChildren, rowidx){
//check if adjacent squares are occupied by opposing color piece
// if(sqidx === pieceIdx + 1){

// }
//check if next adjacent square in same direction is occupied by any piece
//check if there are any opposing pieces in either adjacent square
//check if the square behind opposing piece in same direction is open
// }

//VALID MOVE LOGIC=========================================
// board.rows.forEach((row, idx) => {
// 	row.row.squares.forEach((sq, sqidx) => {
// 		sq.addEventListener('mouseover', (e) => {
// 			if (
// 				pieceIsSelected === true &&
// 				e.target.children.length === 0 &&
// 				e.target.classList.contains('blackSquare')
// 			) {
// 				// console.log('mouseover');
// 			}
// 		});
// 	});
// });
