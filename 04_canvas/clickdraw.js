const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var state = 'box';

const s = document.getElementById('state');
s.innerHTML = state;

const draw = (e) => {
    if (state == 'box') {
        ctx.fillRect(e.clientX, e.clientY, 50, 50);
    } else {
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 25, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

canvas.addEventListener('click', draw);

const toggle = document.getElementById('toggle');
toggle.addEventListener('click', () => {
    state = (state == 'box')
        ? 'circle'
        : 'box';
    s.innerHTML = state;
});

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, 300, 300);
});
