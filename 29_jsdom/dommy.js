
var changeHeading = function (e) {
    console.log(e);
    var h = document.getElementById("h");
    h.innerHTML = this.innerHTML;
};

var removeItem = function (e) {
    console.log(e);
    this.remove();
};

var addListeners = function (element) {
    element.addEventListener("mouseover", changeHeading);
    element.addEventListener("mouseout", () => {
        document.getElementById("h").innerHTML = "Hello World!";
    });
    element.addEventListener("click", removeItem);
}

var lis = document.getElementsByTagName("li");

for (var i = 0; i < lis.length; i++) {
    addListeners(lis[i]);
}

var addItem = function (e) {
    console.log(e);
    var list = document.getElementById("thelist");
    var item = document.createElement("li");
    item.innerHTML = "WORD";
    addListeners(item);
    list.appendChild(item);
};

var button = document.getElementById("b");
button.addEventListener("click", addItem);

var addFib = function (e, fibFunc) {
    console.log(e);
    var list = document.getElementById("fiblist");
    var item = document.createElement("li");
    var numLi = list.getElementsByTagName('li').length;
    item.innerHTML = fibFunc(numLi);
    list.appendChild(item);
}

var addFibRecur = function (e) { addFib(e, fibRecur); };

var addFibBinet = function (e) { addFib(e, fibBinet); }

var addFibDP = function (e) { addFib(e, fibDP); }

var fibRecur = function (i) {
    return (i < 2) ? i : fibRecur(i - 1) + fibRecur(i - 2);
}

var fibBinet = function (i) {
    var root5 = Math.sqrt(5);
    var phi = (1 + root5) / 2;
    var psi = (1 - root5) / 2;
    return Math.floor(
        (Math.pow(phi, i) - Math.pow(psi, i)) / root5
    );
}

var fibList = [];
var fibDP = function (i) {
    fibList[i] = (i < 2) ? i : fibList[i - 1] + fibList[i - 2];
    return fibList[i];
}

var fb = document.getElementById("fb");
fb.addEventListener("click", addFibDP);