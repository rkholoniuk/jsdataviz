(function() {
  var charts = {};
  var controls = {};
  var charts = window.charts = charts.utils || {};
  charts.utils = charts.utils || {};

  /**
   *
   * @param destination
   * @param source
   * @returns {*}
   */
  charts.utils.extend = function(destination, source) {
    for (var property in source) {
      if (source[property] && source[property].constructor &&
        source[property].constructor === Object) {
        destination[property] = destination[property] || {};
        arguments.callee(destination[property], source[property]);
      } else {
        destination[property] = source[property];
    }
    }
    return destination;
  };
  /**
   * LineChart constructor.
   * @param {!Array.<Array>} options.
   * @constructor
   */
  charts.LineChart = function(options) {
    var __ = options || {};
    __.CHART_NAME = __.CHART_NAME || 'line-chart';
    __.CONTAINER = __.CONTAINER || 'canvas-svg';

    __.WIDTH = __.WIDTH || 800;
    __.HEIGHT = __.HEIGHT || 800;
    __.MERGIN = __.MERGIN || {top: 20, right: 20, bottom: 30, left: 50}

    __.Y_AXIS_LABEL = __.Y_AXIS_LABEL || "Price ($)";
    __.X_DATA_PARSE = __.X_DATA_PARSE || d3.time.format("%d-%b-%y").parse;
    __.Y_DATA_PARSE = __.Y_DATA_PARSE || parseInt;
    __.Y_DATA_FORMAT = __.Y_DATA_FORMAT || d3.time.format("%b-%y");
    __.X_AXIS_COLUMN = __.X_AXIS_COLUMN || "date";
    __.Y_AXIS_COLUMN = __.Y_AXIS_COLUMN || "close";

    var margin = __.MERGIN,
        width = __.WIDTH - margin.left - margin.right,
        height = __.HEIGHT - margin.top - margin.bottom;

    var x = d3.time.scale()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(__.Y_DATA_FORMAT);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) {
        return x(d.x_axis);
      })
      .y(function(d) {
        return y(d.y_axis);
      });


  /**
   * Render the chart
   * @param {!Array.<Array>} data chart data.
   */
  this.render = function(data) {
    var svg = d3.select('#' + __.CONTAINER).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class', __.CHART_NAME)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
      d.x_axis = __.X_DATA_PARSE(d[__.X_AXIS_COLUMN]);
      d.y_axis = __.Y_DATA_PARSE(d[__.Y_AXIS_COLUMN]);
    });

    x.domain(d3.extent(data, function(d) {
      return d.x_axis;
    }));
    y.domain(d3.extent(data, function(d) {
      return d.y_axis;
    }));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(__.Y_AXIS_LABEL);

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  }
  };
  /**
   * BarChart constructor.
   * @param {!Array.<Array>} options.
   * @constructor
   */
  charts.BarChart = function(options) {

    var __ = options || {};
    __.CHART_NAME = __.CHART_NAME || 'bar-chart';
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
        .attr("transform", "rotate(-90)")
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
})();