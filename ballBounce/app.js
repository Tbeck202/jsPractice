const body = document.querySelector('body');
const canvas = document.querySelector('canvas');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
canvas.height = window.innerHeight - 200;
canvas.width = window.innerWidth;
let circleContainer = [];

const makeCanvas = () => {
	if (canvas.getContext) {
		const ctx = canvas.getContext('2d');
		function Circle(x, y, dx, dy, radius) {
			this.x = x;
			this.y = y;
			this.dx = dx;
			this.dy = dy;
			this.radius = radius;

			this.draw = function() {
				let red = Math.floor(Math.random() * 255);
				let green = Math.floor(Math.random() * 255);
				let blue = Math.floor(Math.random() * 255);
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
				ctx.fill();
			};

			this.update = function() {
				if (this.x + this.radius > innerWidth || this.x - this.radius < 1) {
					this.dx *= -1;
				}
				if (this.y + this.radius > canvas.height || this.y - this.radius < 1) {
					this.dy *= -1;
				}
				this.x += this.dx;
				this.y += this.dy;

				this.draw();
			};
		}
		function animate() {
			requestAnimationFrame(animate);
			ctx.clearRect(0, 0, innerWidth, innerHeight);

			for (let i = 0; i < circleContainer.length; i++) {
				circleContainer[i].update();
			}
			console.log('Animate!');
		}
	}

	btn1.addEventListener('click', () => {
		let x = Math.floor(Math.random() * canvas.width);
		let y = Math.floor(Math.random() * innerHeight);
		let dx = 10;
		let dy = 10;
		let circle = new Circle(x, y, dx, dy, 30);
		circle.draw();
		circleContainer.push(circle);
	});
	btn2.addEventListener('click', () => {
		animate();
	});
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
