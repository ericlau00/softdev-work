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

const start = () => {
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
    console.log("here")
    console.log(myRequest)
    window.cancelAnimationFrame(myRequest);
}

stopButton.addEventListener('click', stop);
animateButton.addEventListener('click', start);