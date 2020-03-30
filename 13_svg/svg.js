// Eric Lau and Pratham Rawat
// SoftDev2 pd1
// K13 -- Ask Circles [Change || Die]
// 2020-03-31

var pic = document.getElementById("vimage");
var clearButton = document.getElementById("clearButton");

pic.addEventListener("mouseup", function (e) {
    c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", e.offsetX);
    c.setAttribute("cy", e.offsetY);
    c.setAttribute("r", "15");
    c.setAttribute("fill", "blue");
    c.setAttribute("stroke", "blue");
    pic.appendChild(c);
    c.addEventListener("mousedown", onCircleClick(e, c));
});

var onCircleClick = function (e, c) {
    console.log("okay");
    if (c.fill = "blue") {
        c.setAttribute("fill", "cyan");
        c.setAttribute("stroke", "cyan");
    } else if (c.fill = "cyan") {
        c.setAttribute("cx", Math.random() * 500);
        c.setAttribute("cy", Math.random() * 500);
        c.setAttribute("fill", "blue");
        c.setAttribute("stroke", "blue");
    }
}

clearButton.addEventListener("click", function (e) {
    let fc = pic.firstChild;
    while (fc) {
        console.log("removing " + fc + "...");
        pic.removeChild(fc);
        fc = pic.firstChild;
    }
});