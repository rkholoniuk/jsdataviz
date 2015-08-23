/**
 * DonutChart constructor.
 * @param {!Array.<Array>} options.
 * @constructor
 */
charts.DonutChart = function (options) {

  var __ = options || {};
  __.CHART_NAME = __.CHART_NAME || 'donut-chart';
  __.CONTAINER = __.CONTAINER || 'canvas-svg';

  __.WIDTH = __.WIDTH || 800;
  __.HEIGHT = __.HEIGHT || 800;
  __.MERGIN = __.MERGIN || {top: 20, right: 20, bottom: 30, left: 50}

  var margin = __.MERGIN,
      width = __.WIDTH - margin.left - margin.right,
      height = __.HEIGHT - margin.top - margin.bottom;
  __.X_AXIS_COLUMN = __.X_AXIS_COLUMN || "x";
  __.Y_AXIS_COLUMN = __.Y_AXIS_COLUMN || "y";
  var radius = Math.min(width, height) / 3
  var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  var size = {width: 15, height: 15};

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - (radius * 0.5));

  var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
      return d[__.X_AXIS_COLUMN];
    });


  var svg = d3.select('#' + __.CONTAINER).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('class', __.CHART_NAME)
    .append("g")
    .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");


  /**
   * Render the chart
   * @param {!Array.<Array>} data chart data.
   */
  this.render = function (data) {
    data.forEach(function (d) {
      d[__.X_AXIS_COLUMN] = +d[__.X_AXIS_COLUMN];
    });

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    var count = 0;

    g.append("path")
      .attr("d", arc)
      .attr("id", function (d) {
        return "arc-" + (count++);
      })
      .style("fill", function (d) {
        return color(d.data[__.Y_AXIS_COLUMN]);
      });

    g.append("text")
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data[__.Y_AXIS_COLUMN];
      });

    var legend = svg.selectAll(".legend")
      .data(data).enter()
      .append("g").attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(-50," + (-70 + i * 20) + ")";
      })


    legend.append("rect")

      .attr("x", width * 0.8)
      .attr("width", size.width).attr("height", size.height)
      .style("fill", function(d) {
        return color(d[__.Y_AXIS_COLUMN]);
      });
    legend.append("text").attr("x", width * 0.8)
      .attr("y", size.width / 2).attr("dy", ".35em")
      .style("text-anchor", "end").text(function(d) {
        return d[__.Y_AXIS_COLUMN];
      });
  };
};