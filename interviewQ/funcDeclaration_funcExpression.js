console.log(funcD());
console.log(funcE());

// Declaration, no variable
// As not var cannot be passed as a function arg
function funcD () {
  console.log('function declaration');
};

// Expression, anon function saved into a var
// Only has variable scope
let funcE = function () {
  console.log('function expression');
};
