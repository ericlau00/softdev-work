// Eric Lau and Pratham Rawat
// SoftDev2 pd1
// K13 -- Ask Circles [Change || Die]
// 2020-03-31

let pic = document.getElementById("vimage");
let clearButton = document.getElementById("clearButton");
let onCircle = false;

pic.addEventListener("mouseup", (e) => {
    if (!onCircle) {
        addCircle(e.offsetX, e.offsetY);
    }
    onCircle = false;
});

let addCircle = (x, y) => {
    c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", "15");
    c.setAttribute("fill", "blue");
    c.setAttribute("stroke", "blue");
    pic.appendChild(c);
    c.addEventListener("mousedown", () => { onCircleClick(c) });
}

let onCircleClick = (c) => {
    onCircle = true;
    if (c.getAttribute("fill") == "blue") {
        c.setAttribute("fill", "cyan");
        c.setAttribute("stroke", "cyan");
    } else if (c.getAttribute("fill") == "cyan") {
        //remove this cirlce

        // add a new one at a random point
        addCircle(Math.random() * 500, Math.random() * 500);
    }
}

clearButton.addEventListener("click", function (e) {
    let fc = pic.firstChild;
    while (fc) {
        pic.removeChild(fc);
        fc = pic.firstChild;
    }
});