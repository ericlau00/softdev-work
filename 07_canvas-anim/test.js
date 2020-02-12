// Eric Lau
// SoftDev2 pd1
// K07 -- They lock us in the tower whenever we get caught...
// 2020-02-13

const canvas = document.getElementById('playground');
const context = canvas.getContext('2d');
const stopButton = document.getElementById('stop');
const animateButton = document.getElementById('animate');

var myRequest;

const draw = (radius) => {
    context.beginPath();
    context.arc(200, 200, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}

const draw = () => {
    myRequest = window.requestAnimationFrame(animate);
}

const animate = (timestamp) => {
    let radius = (timestamp / 10) % 400;
    context.clearRect(0, 0, 400, 400);
    if (radius <= 200) {
        draw(radius);
    } else {
        draw(Math.abs(200 - radius - 200));
        // draw(Math.abs(200 - timestamp % 200))
    }
    myRequest = window.requestAnimationFrame(animate);
}

const stop = () => {
    window.cancelAnimationFrame(myRequest);
}

animateButton.addEventListener('click', draw);
stopButton.addEventListener('click', stop);
