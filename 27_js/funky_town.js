// Eric "Morty" Lau
// SoftDev1 pd1
// K27 -- Sequential Progression
// 2019-12-11

var fact = function (n) {
    if (n < 2) {
        return 1;
    }
    else {
        return n * fact(n - 1);
    }

};

console.log(fact(1));
console.log(fact(4));

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


console.log(fib(5));
console.log(fib(6));

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

console.log(gcd(10, 12));
console.log(gcd(10, 20));


list = ["a", "b", "c", "d"]

var randStudent = function () {
    var len = list.length;
    var rand = Math.floor(Math.random() * len);
    return (list[rand]);
}

console.log(randStudent())
console.log(randStudent())
console.log(randStudent())