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
          'src/core.js',
          'src/charts/LineChart.js',
          'src/charts/BarChart.js',
          'src/charts/PieChart.js'
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
