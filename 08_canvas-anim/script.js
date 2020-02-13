// "Eric and Justin Eat Cows" Eric Lau William Cao Justin Shaw
// SoftDev1 pd1
// K #08: What is it saving the screen from?
// 2020-02-13

// WHen you click the stop, the dvd will start again randomly somewhere

const canvas = document.getElementById('playground');
const context = canvas.getContext('2d');
const stopButton = document.getElementById('stop');
const animateCircleButton = document.getElementById('animateCircle');
const animateMovieButton = document.getElementById('animateMovie');
const movieLogo = new Image();
movieLogo.src = "logo_dvd.jpg";
const movieWidth = 125;
const movieHeight = 100;

/**
 * The current frame the animation is at
 * @type {number}
 */
let animationTime = 0;
let animationMode = ""; // "c" or "m"

/**
 * Used for canceling the animation.
 */
let animationID;

const drawCircle = (radius) => {
    context.fillStyle = "#D8E4FF";
    context.beginPath();
    context.arc(200, 200, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
};

const drawMovie = (x, y) => {
    context.clearRect(0, 0, 400, 400);
    context.drawImage(movieLogo, x, y, movieWidth, movieHeight);
};

const animateCircle = () => {
    animationTime++;

    let radius = (animationTime) % 400;
    context.clearRect(0, 0, 400, 400);
    if (radius <= 200) {
        drawCircle(radius);
    } else {
        drawCircle(Math.abs(200 - radius + 200));
    }
    animationID = window.requestAnimationFrame(animateCircle);
};

const animateMovie = () => {
    drawMovie(150, 150);
    animationID = window.requestAnimationFrame(animateMovie);
};

const stop = () => {
    window.cancelAnimationFrame(animationID);
    animationMode = "";
};

stopButton.addEventListener('click', stop);
animateCircleButton.addEventListener('click', () => {
    if (animationMode !== "c") {
        animationID = window.requestAnimationFrame(animateCircle);
        animationMode = "c";
    }
});
animateMovieButton.addEventListener('click', () => {
    stop();
    animationID = window.requestAnimationFrame(animateMovie);
});