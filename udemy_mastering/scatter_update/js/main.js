// Make margins for axes
var margin = {left: 100, right: 10, top: 10, bottom: 150}
var width = 600 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom

// the toggle for data
var flag = true

// transition variable, must be lower than loop time
var t = d3.transition().duration(750)

// canvas
var g = d3.select('#chart-area')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

// Define axes x
var xAxisGroup = g.append('g')
  .attr('class', 'x-axis')
  .attr('transform', 'translate(0, ' + height + ')')
  // .selectAll('text')
  // .attr('y', '10')
  // .attr('x', '-5')
  // .attr('text-anchor', 'end')
  // .attr('transform', 'rotate(-40)');

// Define axis y
var yAxisGroup = g.append('g')
  .attr('class', 'y-axis')

  // Scales
var x = d3.scaleBand()
  .range([0, width])
  .paddingInner(0.3)
  .paddingOuter(0.3)

var y = d3.scaleLinear()
  // reversed y below so zero maps to bottom of svg
  .range([height, 0])

// X label
g.append('text')
  .attr('class', 'x axis-label')
  .attr('x', width / 2)
  .attr('y', height + 60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .text('Month')

// Y label
var yLabel = g.append('text')
  .attr('class', 'y axis-label')
  .attr('x', -(height / 2))
  .attr('y', -60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Revenue')

d3.json('data/revenues.json').then(function (data) {
  data.forEach(function (d) {
    d.revenue = +d.revenue
    d.profit = +d.profit
  })

  // interval function
  d3.interval(function () {
    var newData = flag ? data : data.slice(1)

    update(newData)
    // toggle of flag
    flag = !flag
  }, 1000)

  // Run vis for first time (prior to interval function)
  update(data)
})

// update function will use callback function from inside interval loop
// The following will update... 1. scales (just domain), 2. axes, 3. bars
function update (data) {
  // ternary operator flag evaluates to either true: false
  var value = flag ? 'revenue' : 'profit'
  // Scales
  x.domain(data.map(function (d) { return d.month }))
  y.domain([0, d3.max(data, function (d) { return d[value] })])

  // Update x axis generator
  var xAxisCall = d3.axisBottom(x)
  xAxisGroup.transition(t).call(xAxisCall)

  // Update y axis generator
  var yAxisCall = d3.axisLeft(y)
    .tickFormat(function (d) { return '$' + d })
  yAxisGroup.call(yAxisCall)

  // DATA JOIN
  var rects = g.selectAll('circle')
    .data(data, function (d) {
      return d.month
    })

  // EXIT old elements not present in new data
  rects.exit()
    .attr('fill', 'red')
    .transition(t)
    .attr('cy', y(0))
    .remove()

  // ENTER new elements present in new data
  rects.enter().append('circle')
    // shift bars to bottom by setting y attr as  value from y scale
    .attr('cx', function (d) { return x(d.month) + x.bandwidth() / 2 })
    .attr('fill', 'gray')
    .attr('cy', y(0))
    .attr('r', 5)
    // UPDATE old elements not present in new data
    .attr('cy', function (d) { return y(d[value]) })
    // height of viz - height from y scale
    .merge(rects)
    .transition(t)
    .attr('cx', function (d) { return x(d.month) + x.bandwidth() / 2 })
    .attr('cy', function (d) { return y(d[value]) })

  // ternary operator for switching y axis label
  var label = flag ? 'Revenue' : 'Profit'
  yLabel.text(label)
}
