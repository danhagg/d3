/*
Lexical Scoping. In js variables defined outside a function are automatically available inside the function. Variables defined inside are not.
*/

var addTo = function (passed) {
  var inner = 2;
  return passed + inner;
};

console.log(addTo(3));

// But in js u can get away without passing variables
var passed1 = 3;
var addTo2 = function () {
  var inner1 = 2;
  return passed1 + inner1;
};

console.log(addTo2());

// check scope in chromw console
console.dir(addTo2);

// Closures are functions with preserved data
