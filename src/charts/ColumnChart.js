/**
 * ColumnChart constructor.
 * @param {!Array.<Array>} options.
 * @constructor
 */
charts.ColumnChart = function(options) {

  var __ = options || {};
  __.CHART_NAME = __.CHART_NAME || 'column-chart';
  __.CONTAINER = __.CONTAINER || 'canvas-svg';
  __.WIDTH = __.WIDTH || 800;
  __.HEIGHT = __.HEIGHT || 800;
  __.MERGIN = __.MERGIN || {top: 20, right: 20, bottom: 30, left: 50}

  __.Y_AXIS_LABEL = __.Y_AXIS_LABEL || "Y_AXIS_LABEL";
  __.X_DATA_PARSE = __.X_DATA_PARSE || function(d) {
    return d;
  };
  __.Y_DATA_PARSE = __.Y_DATA_PARSE || parseFloat;
  __.Y_DATA_FORMAT = __.Y_DATA_FORMAT || d3.format(".0%");
  __.X_AXIS_COLUMN = __.X_AXIS_COLUMN || "name";
  __.Y_AXIS_COLUMN = __.Y_AXIS_COLUMN || "value";


  var margin = __.MERGIN,
      width = __.WIDTH - margin.left - margin.right,
      height = __.HEIGHT - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(__.Y_DATA_FORMAT);


  var svg = d3.select('#' + __.CONTAINER).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('class', __.CHART_NAME)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  /**
   * Render the chart
   * @param {!Array.<Array>} data chart data.
   */
  this.render = function(data) {
    x.domain(data.map(function(d) {
      return __.X_DATA_PARSE(d[__.X_AXIS_COLUMN]);
    }));
    y.domain([0, d3.max(data, function(d) {
      return __.Y_DATA_PARSE(d[__.Y_AXIS_COLUMN]);
    })]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(__.Y_AXIS_LABEL);

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return x(d[__.X_AXIS_COLUMN]);
      })
      .attr("width", x.rangeBand())
      .attr("y", function(d) {
        return y(d[__.Y_AXIS_COLUMN]);
      })
      .attr("height", function(d) {
        return height - y(d[__.Y_AXIS_COLUMN]);
      });
  };
};