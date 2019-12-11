// Eric "Morty" Lau
// SoftDev1 pd1
// K28 -- Sequential Progression II: Electric Boogaloo
// 2019-12-11

var fact = function (n) {
    if (n < 2) {
        return 1;
    }
    else {
        return n * fact(n - 1);
    }

};

var fib = function (n) {
    if (n == 0) {
        return 0;
    }
    else if (n == 1) {
        return 1;
    }
    else {
        return fib(n - 1) + fib(n - 2);
    }
}

var gcd = function (a, b) {
    var min, max;
    if (a > b) {
        min = b;
        max = a;
    }
    else {
        min = a;
        max = b;
    }
    var counter = min;
    while (min > 0) {
        if (min % counter == 0 && max % counter == 0) {
            return counter;
        }
        counter--;
    }
}

list = ["a", "b", "c", "d"]

var randStudent = function () {
    var len = list.length;
    var rand = Math.floor(Math.random() * len);
    return (list[rand]);
}