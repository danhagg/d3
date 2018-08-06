/*
Every object has a property called prototype
Can add: methos and properties
Creating new objects rom these objects have the same methods/properties inherited.
Thus the new objects are light in that they dont have to carry around all those inherited methods.
*/

let Car = function (model) {
  //model property is assigned from func arg
  this.model = model;
};

Car.prototype.getModel = function () {
  return this.model;
};

let toyota = new Car('toyota');
console.log(toyota.getModel());

let nissan = new Car('nissan');
console.log(nissan.getModel());
