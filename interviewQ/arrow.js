/*

*/

// Example 1
let squareB = b => b * b;
console.log(squareB(4));

// Example 2
let squareC = (c) => { return c * c; };
console.log(squareC(5));

// Example 3
var j = 10;
let squareJ = () => { return j * j; };
console.log(squareJ());

// fat arrow gives access to first functions "this"
var x = function () {
  this.val = 1;
  setTimeout(() => {
    this.val++;
    console.log(this.val);
  }, 10);
};

var xx = new x();

// use with '...n' spread operator and 'n' args
var f = (...n) => {
  console.log(n[0]);
};

f(1, 2, 3);
