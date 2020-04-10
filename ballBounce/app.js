const body = document.querySelector('body');
const canvas = document.querySelector('canvas');
const btnMakeCir = document.querySelector('#btn1');
const btnAnimate = document.querySelector('#btn2');
canvas.height = window.innerHeight - 200;
canvas.width = window.innerWidth;
let circleContainer = [];

const makeCanvas = () => {
	//======BEGIN CANVAS=========================================================
	//=========================================================================
	if (canvas.getContext) {
		const ctx = canvas.getContext('2d');

		function Circle(x, y, dx, dy, rad) {
			this.xpos = x;
			this.ypos = y;
			this.rad = rad;
			this.dx = dx;
			this.dy = dy;

			this.makeCircle = () => {
				ctx.beginPath();
				ctx.arc(this.xpos, this.ypos, this.rad, 0, Math.PI * 2, false);
				ctx.fill();
			};

			this.update = (dx, dy) => {
				this.ypos += dy;
				this.xpos += dx;
				this.makeCircle();
			};
		}
		function animateCircle() {
			requestAnimationFrame(animateCircle);
			ctx.clearRect(0, 0, innerWidth, innerHeight);

			if (circleContainer.length === 0) {
				return;
			}
			for (let i = 0; i < circleContainer.length; i++) {
				let dx = Math.random * 10;
				let dy = Math.random * 10;
				circleContainer[i].update(dx, dy);
			}
			console.log('Animate circle');
		}
	}

	//======BEGIN BUTTONS=========================================================
	btnMakeCir.addEventListener('click', () => {
		let x = Math.floor(Math.random() * innerWidth - 30);
		let y = Math.random() * 30;
		let dx = Math.random * 10;
		let dy = Math.random * 10;
		let circle = new Circle(x, y, dx, dy, 30);
		circle.makeCircle();
		circleContainer.push(circle);
	});
	btnAnimate.addEventListener('click', () => {
		animateCircle();
	});
	//======END BUTTONS========================================================

	//======END CANVAS=========================================================
	//=========================================================================
};

body.addEventListener('load', makeCanvas());

// let bounceCount = 0;
// 		function Circle(x, y, dx, dy, radius) {
// 			this.x = x;
// 			this.y = y;
// 			this.dx = dx;
// 			this.dy = dy;
// 			this.radius = radius;

// 			this.draw = function() {
// 				let red = Math.floor(Math.random() * 255);
// 				let green = Math.floor(Math.random() * 255);
// 				let blue = Math.floor(Math.random() * 255);
// 				let alpha = Math.random();
// 				ctx.beginPath();
// 				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
// 				// ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
// 				// ctx.stroke();
// 				ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
// 				ctx.fill();
// 			};

// 			this.update = function() {
// 				if (this.x + this.radius > innerWidth || this.x - this.radius < 1) {
// 					this.dx *= -1;
// 					bounceCount++;
// 					console.log(bounceCount);
// 				}
// 				if (this.y + this.radius > innerHeight || this.y - this.radius < 1) {
// 					this.dy *= -1;
// 					bounceCount++;
// 					console.log(bounceCount);
// 				}
// 				this.x += this.dx;
// 				this.y += this.dy;

// 				this.draw();
// 			};
// 		}

// 		let circleArr = [];

// 		for (let i = 0; i < 100; i++) {
// 			let radius = Math.floor(Math.random() * 50);
// 			let x = Math.floor(Math.random() * (innerWidth - radius * 2) + radius);
// 			let y = Math.floor(Math.random() * (innerHeight - radius * 2) + radius);
// 			let dx = Math.floor((Math.random() - 0.5) * 20);
// 			let dy = Math.floor((Math.random() - 0.5) * 20);

// 			circleArr.push(new Circle(x, y, dx, dy, radius));
// 		}
// 		console.log(circleArr);
// 		function animate() {
// 			requestAnimationFrame(animate);
// 			ctx.clearRect(0, 0, innerWidth, innerHeight);

// 			for (let i = 0; i < circleArr.length; i++) {
// 				circleArr[i].update();
// 			}
// 		}

// const body = document.querySelector('body');
// const canvas = document.querySelector('canvas');
// const btn1 = document.querySelector('#btn1');
// const btn2 = document.querySelector('#btn2');
// canvas.height = window.innerHeight - 200;
// canvas.width = window.innerWidth;
// let circleContainer = [];

// const makeCanvas = () => {
// 	if (canvas.getContext) {
// 		const ctx = canvas.getContext('2d');

// 		//CIRCLE LOGIC======================================================
// 		//==================================================================
// 		function Circle(x, y, dx, dy, radius) {
// 			//CIRCLE BUILDER=======================
// 			this.x = x;
// 			this.y = y;
// 			this.dx = dx;
// 			this.dy = dy;
// 			this.radius = radius;

// 			this.draw = function() {
// 				let red = Math.floor(Math.random() * 255);
// 				let green = Math.floor(Math.random() * 255);
// 				let blue = Math.floor(Math.random() * 255);
// 				ctx.beginPath();
// 				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
// 				ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
// 				ctx.fill();
// 			};
// 			//CIRCLE ANIMATION LOGIC=======================
// 			this.update = function() {
// 				if (this.x + this.radius > innerWidth || this.x - this.radius < 1) {
// 					this.dx *= -1;
// 				} else if (this.y + this.radius > canvas.height) {
// 					circleContainer.pop(this);
// 				} else if (this.y - this.radius < 1) {
// 					this.dy *= -1;
// 				}
// 				this.x += this.dx;
// 				this.y += this.dy;

// 				this.draw();
// 			};
// 		}
// 		function animate() {
// 			requestAnimationFrame(animate);
// 			ctx.clearRect(0, 0, innerWidth, innerHeight);

// 			if (circleContainer.length === 0) {
// 				return;
// 			}
// 			for (let i = 0; i < circleContainer.length; i++) {
// 				circleContainer[i].update();
// 			}
// 			console.log('Animate!');
// 		}
// 		//PADDLE LOGIC======================================================
// 		//==================================================================
// 		function Paddle() {
// 			this.makePaddle = function() {
// 				let padx = canvas.width / 2;
// 				let pady = canvas.height - 100;
// 				ctx.beginPath();
// 				ctx.fillStyle = '#000';
// 				ctx.fillRect(padx, pady, 100, 20);
// 			};
// 			this.movePaddle = function(dir) {
// 				if ((dir = left)) {
// 					this.padx -= 10;
// 				} else if ((dir = right)) {
// 					this.padx += 10;
// 				}
// 				this.makePaddle();
// 			};
// 		}
// 		function animatePaddle(key) {
// 			let dir = key;
// 			requestAnimationFrame(animate);
// 			ctx.clearRect(0, 0, innerWidth, innerHeight);
// 			movePaddle(dir);

// 			console.log('Paddle');
// 		}
// 	}
// 	//MAKE CIRCLE ON CLICK=======================
// 	btn1.addEventListener('click', () => {
// 		let x = Math.floor(Math.random() * canvas.width);
// 		let y = Math.floor(Math.random() * canvas.height);
// 		let dx = 10;
// 		let dy = 10;
// 		let circle = new Circle(x, y, dx, dy, 30);
// 		circle.draw();
// 		circleContainer.push(circle);
// 		let paddle = new Paddle();
// 		paddle.makePaddle();
// 		console.log(circleContainer.length);
// 	});
// 	//BEGIN ANIMATION ON CLICK====================
// 	btn2.addEventListener('click', () => {
// 		animate();
// 	});
// 	window.addEventListener('keydown', (e) => {
// 		console.log('keyoress');
// 		if (e.keyCode == '37') {
// 			// let key = left;
// 			console.log('left');
// 			animatePaddle();
// 		}
// 	});
// };

// body.addEventListener('load', makeCanvas());
