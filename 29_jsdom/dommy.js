function fibRecur(i) {
    if (i < 2) {
        return i;
    }
    fibRecur(i - 1) + fibRecur(i - 2);
}

function fibonacci(i) {
    return Math.floor(
        (1 / Math.sqrt(5)) *
        (Math.pow((1 + Math.sqrt(5)) / 2, i) - Math.pow((1 - Math.sqrt(5)) / 2, i))
    );
}

var changeHeading = function (e) {
    var h = document.getElementById("h");
    const res = e["target"]["innerText"];
    h.innerHTML = res;
};

var removeItem = function (e) {
    e["target"].remove();
};

var lis = document.getElementsByTagName("li");

for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener("mouseover", e => {
        changeHeading(e);
    });
    lis[i].addEventListener("mouseout", () => {
        document.getElementById("h").innerHTML = "Hello World!";
    });
    lis[i].addEventListener("click", e => {
        removeItem(e);
    });
}

var addItem = function (e) {
    var list = document.getElementById("thelist");
    var item = document.createElement("li");
    item.innerText = "WORD";
    // item.onmouseover = () => {
    //     document.getElementById("h").innerText = "WORD";
    // };
    list.appendChild(item);
};

var button = document.getElementById("b");
button.addEventListener("click", addItem);

var addFib = function (e) {
    var list = document.getElementById("fiblist");
    var item = document.createElement("li");
    var numLi = list.getElementsByTagName('li').length;
    item.innerText = fibonacci(numLi);
    list.appendChild(item);
};

var addFib2 = function (e) {
};

var fb = document.getElementById("fb");
fb.addEventListener("click", addFib);