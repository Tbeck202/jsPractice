const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
const input = document.querySelector('input');
const errorMsg = document.querySelector('#err');
// const spanBtns = document.querySelectorAll('.mark-done');

btn.addEventListener('click', () => {
	if (input.value === '') {
		errorMsg.innerText = 'Please enter a todo!';
		errorMsg.classList.toggle('hidden');
		return;
	}
	errorMsg.classList.add('hidden');
	//===============li================
	let li = document.createElement('li');
	li.classList.add('item');
	//===============p================
	let p = document.createElement('p');
	p.classList.add('text', 'item-text');
	p.innerHTML = input.value;
	//===============check mark span================
	let checkSpan = document.createElement('span');
	checkSpan.classList.add('mark-done', 'check-mark');
	let checkMark = document.createElement('i');
	checkMark.classList.add('fas', 'fa-check');
	checkSpan.append(checkMark);
	//===============x mark span================
	let xSpan = document.createElement('span');
	xSpan.classList.add('mark-done', 'delete', 'hidden');
	//==============add item to list===========
	list.append(li);
	li.append(p);
	li.append(checkSpan);
	li.append(xSpan);
	xSpan.innerText = 'x';
	input.value = '';
});

list.addEventListener('click', (e) => {
	if (e.target.classList.contains('fa-check')) {
		e.target.parentElement.classList.toggle('hidden');
		e.target.parentElement.nextElementSibling.classList.toggle('hidden');
		e.target.parentElement.previousElementSibling.classList.toggle('line-thru');
	} else if (e.target.classList.contains('delete')) {
		e.target.parentElement.remove();
	} else if (e.target.classList.contains('line-thru')) {
		e.target.classList.toggle('line-thru');
		e.target.nextElementSibling.classList.toggle('hidden');
		e.target.nextElementSibling.nextElementSibling.classList.toggle('hidden');
	}
});
