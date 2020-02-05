// Team Eric² - Eric "Rick" Lam & Eric "Morty" Lau
// SoftDev2 pd1
// K04 -- I See a Red Door...
// 2020-02-06

const canvas = document.getElementById('slate');
const context = canvas.getContext('2d');

const toggleButton = document.getElementById('toggle');
const clearButton = document.getElementById('clear');

const color = document.getElementById('colorSelector');
const state = document.getElementById('state');

const toggle = () => {
    state.innerHTML = (state.innerHTML == 'box')
        ? 'circle'
        : 'box';
}

const clear = () => {
    context.clearRect(0, 0, 400, 400);
}

const draw = (e) => {
    x = e.clientX;
    y = e.clientY;
    context.fillStyle = color.value;
    if (state.innerHTML == 'box') {
        context.fillRect(x - 50, y - 50, 100, 100);
    } else {
        context.beginPath();
        context.arc(x, y, 50, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }
}

canvas.addEventListener('click', draw);
toggleButton.addEventListener('click', toggle);
clearButton.addEventListener('click', clear);
