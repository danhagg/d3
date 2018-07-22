/*
Both comparison operators
== compares value, converts value 2 to 1
=== compares value AND type
*/

// Here The 1 is converted to the same type as the string '1'
if ('1' == 1) {
  console.log('true');
} else {
  console.log('not true');
}

if ('1' === 1) {
  console.log('true');
} else {
  console.log('not true');
}
