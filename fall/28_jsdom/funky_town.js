/*
  Eric "Morty" Lau
  SoftDev1 pd1
  K28 --  Sequential Progression II: Electric Boogaloo...
  2019-12-11
*/

var students = ["alnasserA", "caoT", "chenA", "chenH", "chenJ", "dossE", "elahiT", "galakhovI",
    "gorbachevY", "hallJ", "lamE", "lauE", "leeJ", "leeJo", "leeR", "liK", "linJ",
    "linM", "luoY", "ngK", "rawatP", "shawJ", "sofatV", "vuksanajK", "walshE",
    "xiedengD", "zhangE", "zhangM", "zhengA"]

// factorial
var fact = function (num) {
    if (num < 2) {
        return 1;
    } else {
        return num * fact(num - 1);
    }
};

// fibonacci
var fib = function (num) {
    if (num > 2)
        return fib(num - 2) + fib(num - 1);
    else
        return 1;
};

// greatest common denominator
var gcd = function (a, b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
};

// random student
var randomStudent = function () {
    return students[Math.floor(Math.random() * students.length)];
};

// factorial button
var factButton = document.getElementById('fact');
var displayFact = function () {
    console.log('fact( 9)');
    console.log(fact(9));
    document.getElementById('factAnswer').innerHTML = fact(9);
};
factButton.addEventListener('click', displayFact)

// fibonacci button
var fibButton = document.getElementById('fib');
var displayFib = function () {
    console.log('fib( 9)');
    console.log(fib(9));
    document.getElementById('fibAnswer').innerHTML = fib(9);
};
fibButton.addEventListener('click', displayFib)

// gcd button
var gcdButton = document.getElementById('gcd');
var displayGCD = function () {
    console.log('gcd( 24, 36)');
    console.log(gcd(24, 36));
    document.getElementById('gcdAnswer').innerHTML = gcd(24, 36);
};
gcdButton.addEventListener('click', displayGCD)

// random student button
var randomButton = document.getElementById('random');
var displayRand = function () {
    console.log('randomStudent()');
    console.log(randomStudent());
    document.getElementById('randAnswer').innerHTML = randomStudent();
};
randomButton.addEventListener('click', displayRand)