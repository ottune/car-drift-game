
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let car = { x: 400, y: 250, angle: 0, speed: 0, maxSpeed: 5 };
let keys = {};
let startTime = Date.now();
let scoreDisplay = document.getElementById('score');

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function drawCar() {
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(-20, -10, 40, 20);
    ctx.restore();
}

function drawTrack() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(400, 250, 200, 0, Math.PI * 2);
    ctx.stroke();
}

function update() {
    if (keys['ArrowUp']) {
        car.speed = Math.min(car.speed + 0.1, car.maxSpeed);
    } else {
        car.speed = Math.max(car.speed - 0.05, 0);
    }

    if (keys['ArrowLeft']) car.angle -= 0.05 * (car.speed / car.maxSpeed);
    if (keys['ArrowRight']) car.angle += 0.05 * (car.speed / car.maxSpeed);

    car.x += Math.cos(car.angle) * car.speed;
    car.y += Math.sin(car.angle) * car.speed;

    // Wrap around screen edges
    if (car.x > canvas.width) car.x = 0;
    if (car.x < 0) car.x = canvas.width;
    if (car.y > canvas.height) car.y = 0;
    if (car.y < 0) car.y = canvas.height;
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTrack();
    drawCar();
    update();

    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    scoreDisplay.textContent = "Time: " + elapsed + " seconds";

    requestAnimationFrame(loop);
}

loop();
