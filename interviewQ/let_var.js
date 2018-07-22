/*
Let is a recent addition to js
Let has block scope vs var function scope
Var gets hoisted, Let doesnt
*/
let x = function () {
  if (true) {
    var v = 2;
    let l = 1;
  }
  console.log(v);
  console.log(l);
};
x();
