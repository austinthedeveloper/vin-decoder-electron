module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {                  // Task 
      dist: {                   // Target 
        options: {              // Target options 
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production'
        }
      }
    },
    watch: {
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['compass', 'copy'],
        options: {
          spawn: false,
        },
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint', 'browserify', 'copy'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['**/*.html'],
        tasks: ['copy'],
        options: {
          spawn: false,
        },
      },
    },
    jshint: {
      all: ['js/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          module: true,
          angular: true,
          require: true,
          strict: true
        }
      },
    },
    browserify: {
      files: {
        files: {
          'app.js' : ['./js/app.js']
        }
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          src: ['index.html', 'app.js', './css/**/*.css'],
          dest: 'build'
        }]
      }
    }
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['compass', 'browserify', 'copy', 'watch']);

};