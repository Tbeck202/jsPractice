const body = document.querySelector('body');
const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const makeCanvas = () => {
	if (canvas.getContext) {
		const ctx = canvas.getContext('2d');
		let bounceCount = 0;
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
				let alpha = Math.random();
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				// ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
				// ctx.stroke();
				ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
				ctx.fill();
			};

			this.update = function() {
				if (this.x + this.radius > innerWidth || this.x - this.radius < 1) {
					this.dx *= -1;
					bounceCount++;
					console.log(bounceCount);
				}
				if (this.y + this.radius > innerHeight || this.y - this.radius < 1) {
					this.dy *= -1;
					bounceCount++;
					console.log(bounceCount);
				}
				this.x += this.dx;
				this.y += this.dy;

				this.draw();
			};
		}

		let circleArr = [];

		for (let i = 0; i < 100; i++) {
			let radius = Math.floor(Math.random() * 50);
			let x = Math.floor(Math.random() * (innerWidth - radius * 2) + radius);
			let y = Math.floor(Math.random() * (innerHeight - radius * 2) + radius);
			let dx = Math.floor((Math.random() - 0.5) * 20);
			let dy = Math.floor((Math.random() - 0.5) * 20);

			circleArr.push(new Circle(x, y, dx, dy, radius));
		}
		console.log(circleArr);
		function animate() {
			requestAnimationFrame(animate);
			ctx.clearRect(0, 0, innerWidth, innerHeight);

			for (let i = 0; i < circleArr.length; i++) {
				circleArr[i].update();
			}
		}
		// animate();

		// let bounceCount = 0;
		// function animate() {
		// 	requestAnimationFrame(animate);
		// 	console.log('lkdsjbvdlb');
		// 	ctx.clearRect(0, 0, innerWidth, innerHeight);
		// 	ctx.beginPath();
		// 	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		// 	ctx.strokeStyle = 'red';
		// 	ctx.stroke();
		// 	if (x + radius > innerWidth || x - radius < 1) {
		// 		dx *= -1;
		// 		bounceCount++;
		// 		console.log(bounceCount);
		// 	}
		// 	if (y + radius > innerHeight || y - radius < 1) {
		// 		dy *= -1;
		// 		bounceCount++;
		// 		console.log(bounceCount);
		// 	}
		// 	x += dx;
		// 	y += dy;
		// }
	}
};

body.addEventListener('load', makeCanvas());

// ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
// ctx.fillRect(700, 400, 100, 50);
// ctx.fillStyle = 'rgba(0,0,200,.5';
// ctx.fillRect(750, 425, 100, 50);

// //LINES
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = '#fa34a3';
// ctx.stroke();

//CIRCLES / ARCS
// let x = Math.floor(Math.random() * window.innerWidth);
// let y = Math.floor(Math.random() * window.innerHeight);
// let radius = Math.floor(Math.random() * 200);
// ctx.beginPath();
// ctx.arc(200, 200, 50, 0, Math.PI * 2, false);
// ctx.strokeStyle = 'red';
// ctx.stroke();

// animate();
// while (bounceCount < 6) {
// 	// animate();
// }

// for (let i = 1; i <= 3; i++) {
// 	let x = Math.floor(Math.random() * window.innerWidth);
// 	let y = Math.floor(Math.random() * window.innerHeight);
// 	let radius = Math.floor(Math.random() * 200);

// 	let red = Math.floor(Math.random() * 255);
// 	let green = Math.floor(Math.random() * 255);
// 	let blue = Math.floor(Math.random() * 255);
// 	let alpha = Math.random();
// 	ctx.beginPath();
// 	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
// 	ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
// 	ctx.stroke();
// }
