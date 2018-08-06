/*
perform some kid of sync function that has to wait, then execute a callback function
*/

var p1 = new Promise(function(resolve, reject){
  resolve($.ajax('a.json'))
});

p1.then(function(r){
  return new Promise()
.then(function(result){
  $('#div1').html(result);
});
