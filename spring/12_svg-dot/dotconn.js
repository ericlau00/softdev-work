// Eric Lau
// SoftDev2 pd1
// K12 -- Connect the Dots
// 2020-03-30

var pic = document.getElementById("vimage");
var clearButton = document.getElementById("clearButton");
var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
var firstClick = true;
var oldX = null;
var oldY = null;

pic.addEventListener("click", function (e) {
    c = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    c.setAttribute("cx", e.offsetX);
    c.setAttribute("cy", e.offsetY);
    c.setAttribute("r", "5");
    c.setAttribute("fill", "black");
    c.setAttribute("stroke", "black");

    pic.appendChild(c);

    if (firstClick) {
        firstClick = false;
    } else {
        var l = document.createElementNS("http://www.w3.org/2000/svg", "line");

        l.setAttribute("x1", oldX);
        l.setAttribute("y1", oldY);
        l.setAttribute("x2", e.offsetX);
        l.setAttribute("y2", e.offsetY);
        l.setAttribute("style", "stroke:black; stroke-width:1");

        pic.appendChild(l);
    }

    oldX = e.offsetX;
    oldY = e.offsetY;
});

clearButton.addEventListener("click", function (e) {
    pic.innerHTML = "";
    oldX = null;
    oldY = null;
    firstClick = true;
});