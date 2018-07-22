// Make margins for axes
var margin = {left: 100, right: 10, top: 10, bottom: 150}
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// canvas
var g = d3.select('#chart-area')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// X label
g.append('text')
  .attr('class', 'x axis-label')
  .attr('x', width / 2)
  .attr('y', height + 60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .text('Month');

// Y label
g.append('text')
  .attr('class', 'y axis-label')
  .attr('x', -(height / 2))
  .attr('y', -60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Revenue');

d3.json('data/revenues.json').then(function (data) {
  //console.log(data);

  data.forEach(function (d) {
    d.revenue = +d.revenue;
    console.log(d.revenue);
  });

  var x = d3.scaleBand()
    .domain(data.map(function (d) {
      return d.month;
    }))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
      return d.revenue;
    })])
    // reversed y below so zero maps to bottom of svg
    .range([height, 0]);

  // Axis generators
  var xAxisCall = d3.axisBottom(x);
  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxisCall)
    .selectAll('text')
    .attr('y', '10')
    .attr('x', '-5')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-40)');

  var yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(function (d) {
      return '$' + d;
    });
  g.append('g')
    .attr('class', 'y-axis')
    .call(yAxisCall);

  // add all rects to g
  var rects = g
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    // shift bars to bottom by setting y attr as  value from y scale
    .attr('y', function (d) {
      return y(d.revenue);
    })
    .attr('x', function (d) {
      return x(d.month);
    })
    .attr('width', x.bandwidth)
    // height of viz - height from y scale
    .attr('height', function (d) {
      return height - y(d.revenue);
    })
    .attr('fill', function (d) {
      return 'red';
    });
});
