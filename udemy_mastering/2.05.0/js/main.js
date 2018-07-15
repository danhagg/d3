/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/
var data = [25, 20, 10, 12, 15]

var svg = d3.select('#chart-area').append('svg')
  .attr('width', 400)
  .attr('height', 400);

var circles = svg.selectAll('circle')
  .data(data);

// For each new circle use anon function or arrow function to set attr
// for example use value of each item of array
// Here, d is item, i is index
circles.enter()
  .append('circle')
  // anon function
  .attr('cx', function (d, i) {
    return (i * 50) + 25;
  })
  .attr('cy', 25)
  // arrow function
  .attr('r', (d) => {
    return d;
  })
  .attr('fill', 'red');
