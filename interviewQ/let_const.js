/*
Both let and const define var
const defines constant, cannot be reassigned
Primitive types vs objects
*/

let l = 1;
l = 2;
console.log(l);

// Constant object can be modified
const c = [1, 2];
c.push(3);
console.log(c);

// But reassigning fails
c = [1,2,3,4];
