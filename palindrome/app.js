const input = document.querySelector('#user-input');
const result = document.querySelector('.result');
const btn = document.querySelector('button');
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let letters = [ ...alphabet ];

btn.addEventListener('click', () => {
	if (input.value === '') {
		result.innerHTML = 'Please enter something for me to check!';
		return;
	}
	let inputToArr = [ ...input.value ];
	let formattedArr = formatArr(inputToArr);
	let inputReversed = reverseString(formattedArr);
	let check = isPalindrome(formattedArr, inputReversed);
	if (check) {
		result.innerHTML = `${input.value} is a palindrome!`;
		document.body.style.background = 'seagreen';
	} else {
		result.innerHTML = `${input.value} is not a palindrome!`;
		document.body.style.background = 'tomato';
	}
});

const formatArr = (arr) => {
	let tempArr = [];
	arr.forEach((item) => {
		if (letters.includes(item.toLowerCase())) {
			tempArr.push(item.toLowerCase());
		}
	});
	//console.log('temparr', tempArr);
	return tempArr;
};

const reverseString = (str) => {
	let reversed = [];

	for (i = str.length - 1; i >= 0; i--) {
		reversed.push(str[i].toLowerCase());
	}
	//console.log('reversedArr: ', reversed);
	return reversed;
};

const isPalindrome = (arr, arrReversed) => {
	let check = true;
	arr.forEach((letter, idx) => {
		if (letter !== arrReversed[idx]) {
			check = false;
		}
	});
	return check;
};

// const isLetter = (ltr) => {
// 	let letterCheck = letters;
// 	let check = true;
// 	if (letterCheck.includes(ltr) === false) {
// 		check = false;
// 	}
// 	return check;
// };
