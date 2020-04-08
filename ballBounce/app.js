const body = document.querySelector('body');
const canvas = document.querySelector('canvas');
canvas.height = 400;
canvas.width = 800;

const draw = () => {
	if (canvas.getContext) {
		let circle = () => {
			ctx.beginPath();
			ctx.arc(400, 75, 50, 0, Math.PI * 2, true);
			ctx.stroke();
		};

		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'rgb(200, 0, 0)';
		ctx.fillRect(100, 50, 100, 50);

		ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
		ctx.fillRect(110, 60, 100, 50);

		ctx.beginPath();
		ctx.moveTo(750, 200);
		ctx.lineTo(600, 25);
		ctx.lineTo(300, 95);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(400, 0);
		ctx.lineTo(400, 400);
		ctx.moveTo(0, 200);
		ctx.lineTo(800, 200);
		ctx.stroke();
		circle();
	}
};

body.addEventListener('load', draw());
