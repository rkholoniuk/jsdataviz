module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '',
        banner: '\n(function(){\n',
        footer: '\n})();'
      },
      dist: {
        src: [
          'src/begin.js',
          'src/core.js',
          'src/charts/linechart.js',
          'src/charts/simplebarchart.js',
          'src/charts/groupedbarchart.js',
          'src/charts/groupedcolumnchart.js',
          'src/charts/multiplebarchart.js',
          'src/charts/piechartchart.js',
          'src/charts/donutchart.js',
          'src/charts/butterflychart.js',
          'src/charts/geochart.js',
          'src/charts/scatterchart.js',
          'src/charts/heatmapchart.js',
          'src/charts/dendrogramchart.js',
          'src/charts/areachart.js',
          'src/charts/bulletchart.js',
          'src/charts/sunburstpartitionchart.js',
          'src/charts/treemapchart.js',
          'src/charts/forceloyout.js',
          'src/controls/directedgraph.js',
          'src/end.js'
        ],
        dest: 'jsdataviz.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      js: {
        files: {
          'jsdataviz.min.js': ['jsdataviz.js']
        }
      }
    },
    less: {
      options: {},
      dist: {
        files: {
          'src/jsdataviz.css': ['src/jsdataviz.less']
        }
      }

    },
    jshint: {
      foo: {
        src: "src/**/*.js"
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      js: {
        files: ["src/**/*.js"],
        tasks: ['concat']
      }
    },
    copy: {
      css: {
        files: [
          {src: 'src/jsdataviz.css', dest: 'jsdataviz.css'}
        ]
      }
    },
    cssmin: {
      dist: {
        files: {
          'jsdataviz.min.css': ['jsdataviz.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');


  grunt.registerTask('default', ['concat', 'less', 'copy']);
  grunt.registerTask('production', ['concat', 'uglify', 'copy', 'cssmin']);
  grunt.registerTask('release', ['production']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('lesscss', ['less']);
};
