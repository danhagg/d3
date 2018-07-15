/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json('data/buildings.json').then(function (data) {
  data.forEach(function (d) {
    d.height = +d.height;
  });

  var svg = d3.select('#chart-area').append('svg')
    .attr('width', 400)
    .attr('height', 400);

  var rects = svg.selectAll('rect')
    .data(data);

  rects.enter()
    .append('rect')
    .attr('x', function (d, i) {
      return (i * 50) + 25;
    })
    .attr('height', function (d) {
      return d.height;
    })
    .attr('width', 50)
    .attr('fill', 'gray');
});
