var fibRecur = function (i) {
    return (i < 2) ? i : fibRecur(i - 1) + fibRecur(i - 2);
}

var fibBinet = function (i) {
    return Math.floor(
        (1 / Math.sqrt(5)) *
        (Math.pow((1 + Math.sqrt(5)) / 2, i) - Math.pow((1 - Math.sqrt(5)) / 2, i))
    );
}

var fibList = [];
var fibDP = function (i) {
    fibList[i] = (i - 2) ? i: fibList[i - 1] + fibList[i - 2];
    return fibList[i];
}

var addListeners = function (element) {
    element.addEventListener("mouseover", function (e) {
        changeHeading(e);
    });
    element.addEventListener("mouseout", function () {
        document.getElementById("h").innerHTML = "Hello World!";
    });
    element.addEventListener("click", function (e) {
        removeItem(e);
    });
}

var lis = document.getElementsByTagName("li");

for (var i = 0; i < lis.length; i++) {
    addListeners(lis[i]);
}

var addItem = function (e) {
    var list = document.getElementById("thelist");
    var item = document.createElement("li");
    item.innerText = "WORD";
    addListeners(item);
    list.appendChild(item);
};

var changeHeading = function (e) {
    var h = document.getElementById("h");
    h.innerHTML = e["target"]["innerText"];
};

var removeItem = function (e) {
    e["target"].remove();
};

var addFib = function (e) {
    console.log(e);
    var list = document.getElementById("fiblist");
    var item = document.createElement("li");
    var numLi = list.getElementsByTagName('li').length;
    item.innerText = fibRecur(numLi);
    list.appendChild(item);
};

var addFib2 = function (e) {
    console.log(e);
    var list = document.getElementById("fiblist");
    var item = document.createElement("li");
    var numLi = list.getElementsByTagName('li').length;
    item.innerText = fibBinet(numLi);
    list.appendChild(item);
}

var addFib3 = function (e) {
    console.log(e);
    var list = document.getElementById("fiblist");
    var item = document.createElement("li");
    var numLi = list.getElementsByTagName('li').length;
    item.innerText = fibDP(numLi);
    list.appendChild(item);

}
var button = document.getElementById("b");
button.addEventListener("click", addItem);

var fb = document.getElementById("fb");
fb.addEventListener("click", addFib3);