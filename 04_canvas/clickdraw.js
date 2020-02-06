// Team Eric² - Eric Lam & Eric Lau
// SoftDev2 pd1
// K04 -- I See a Red Door...
// 2020-02-06

const canvas = document.getElementById('slate');
const context = canvas.getContext('2d');
const toggleButton = document.getElementById('toggle');
const clearButton = document.getElementById('clear');
const color = document.getElementById('colorSelector');
const stateDisplay = document.getElementById('state');
const container = document.getElementById('sliders');
const heightContainer = document.getElementById('heightContainer');
const widthContainer = document.getElementById('widthContainer');
const radiusContainer = document.getElementById('radiusContainer');
const heightSlider = document.getElementById('heightSlider');
const widthSlider = document.getElementById('widthSlider');
const radiusSlider = document.getElementById('radiusSlider');
const heightDisplay = document.getElementById('heightDisplay');
const widthDisplay = document.getElementById('widthDisplay');
const radiusDisplay = document.getElementById('radiusDisplay');

var state = true;
var height = 100;
var width = 100;
var radius = 50;

var toggle = () => {
    state = !state;
    stateDisplay.innerHTML = state ? 'Rectangle' : 'Circle';
    if (state) {
        radiusContainer.remove();
        container.appendChild(heightContainer);
        container.appendChild(widthContainer);
    } else {
        heightContainer.remove();
        widthContainer.remove();
        container.appendChild(radiusContainer);
    }
};

var clear = () => {
    context.clearRect(0, 0, 400, 400);
};

var draw = (event) => {
    var bounds = canvas.getBoundingClientRect();
    x = event.clientX - bounds.left;
    y = event.clientY - bounds.top;
    context.fillStyle = color.value;
    if (state) {
        context.fillRect(x - width / 2, y - height / 2, width, height);
    } else {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }
};

toggleButton.addEventListener('click', toggle);
clearButton.addEventListener('click', clear);
canvas.addEventListener('click', draw );

heightSlider.oninput = () => {
    height = heightSlider.value;
    heightDisplay.innerHTML = height;
};

widthSlider.oninput = () => {
    width = widthSlider.value;
    widthDisplay.innerHTML = width;
};

radiusSlider.oninput = () => {
    radius = radiusSlider.value;
    radiusDisplay.innerHTML = radius;
};

stateDisplay.innerHTML = state ? 'Rectangle' : 'Circle';
heightDisplay.innerHTML = height;
widthDisplay.innerHTML = width;
radiusDisplay.innerHTML = radius;
radiusContainer.remove();