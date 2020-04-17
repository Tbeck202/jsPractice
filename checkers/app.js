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
let allPieces = [ ...redPieces, ...blackPieces ];
//GAME LOGIC

let pieceSelected = false;
//CURRENT POSITION OF SELECTED PIECE
let selectedPiece;
let selectedPieceIdx;
//POSITION YOU'D LIKE TO MOVE TO
let selectedSq;
let selectedSqIdx;
let selectedSqChildren;
document.body.addEventListener('click', () => {
	if (pieceSelected === true) {
		board.addEventListener('click', (bEvt) => {
			console.log('clicked');
			let piece = bEvt;
			// console.log(bEvt);
			// BLACK PIECES MOVE LOGIC==========================
			// let clickedRow = bEvt.target.parentElement;
			// let validRow = selectedPiece.parentElement.parentElement.previousSibling;
			// let moveSquareClasslist = bEvt.target.classList;
			// if (pieceSelected && moveSquareClasslist.contains('blackSquare') && validRow === clickedRow) {
			// 	bEvt.target.append(selectedPiece);
			// 	console.log('valid row');
			// }
			//============================

			blkMove(piece);
		});
	} else {
		console.log('Pick a piece');
	}
});

squares.forEach((sq, idx) => {
	sq.addEventListener('click', (e) => {
		selectedSq = sq;
		selectedSqIdx = idx;
		selectedSqChildren = e.target.children.length;
		console.log(e);
		// getRow(sq);
		let eClassList = e.target.classList;
		// console.log(idx);
		//SELECT PIECE LOGIC=========================
		if (eClassList.value.includes('piece') && !eClassList.value.includes('selected') && selectedSqChildren === 0) {
			allPieces.forEach((pce) => {
				pce.classList.remove('selected');
			});
			// console.log('Piece selected', e);
			eClassList.toggle('selected');
			pieceSelected = true;
			selectedPiece = e.target;
			selectedPieceIdx = idx;
			// console.log(selectedPiece.parentElement);
			//DE-SELECT PIECE LOGIC=====================================
		} else if (eClassList.value.includes('selected')) {
			eClassList.remove('selected');
			pieceSelected = false;
			selectedPieceIdx = undefined;
		} //else if (pieceSelected && eClassList.value.includes('blackSquare')) {
		// 	e.target.append(selectedPiece);
		// }
		// console.log('Piece selected', pieceSelected);
	});
});

const blkMove = (piece) => {
	let clickedRow = piece.target.parentElement;
	let validRow = selectedPiece.parentElement.parentElement.previousSibling;
	let moveSquareClasslist = piece.target.classList;
	if (
		pieceSelected &&
		moveSquareClasslist.contains('blackSquare') &&
		validRow === clickedRow &&
		validSq() &&
		selectedSqChildren === 0
	) {
		piece.target.append(selectedPiece);
		selectedPiece.classList.remove('selected');
		selectedPiece = undefined;
		selectedPieceIdx = undefined;
		selectedSq = undefined;
		selectedSqIdx = undefined;
		pieceSelected = false;
		console.log('valid row');
	}
};

const validSq = () => {
	if (selectedPieceIdx - selectedSqIdx === 9 || selectedPieceIdx - selectedSqIdx === 7) {
		return true;
	} else {
		return false;
	}
};

// const getRow = (sq) => {
// 	rows.forEach((row) => {});
// };
