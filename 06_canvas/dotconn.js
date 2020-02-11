// Eric Lau
// SoftDev2 pd1
// K06 -- Dot Dot Dot...
// 2020-02-11

const canvas = document.getElementById('playground');
const context = canvas.getContext('2d');
const clearButton = document.getElementById('clear');

var lastX;
var lastY;

const draw = (e) => {
    x = e.offsetX;
    y = e.offsetY;

    // draw a line to the previous point
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(lastX, lastY);
    context.stroke();
    context.closePath();

    // draw a dot at the current point
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI);
    context.closePath();
    context.fill();

    lastX = x;
    lastY = y;
};

const clear = () => {
    context.clearRect(0, 0, 400, 400);
    lastX = undefined;
    lastY = undefined;
};

canvas.addEventListener('click', draw);
clearButton.addEventListener('click', clear);

