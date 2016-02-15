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
      },
      dev: {                    // Another target 
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    },
    watch: {
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false,
        },
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
        },
      },
    },
    jshint: {
      all: ['js/**/*.js']
    },
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['compass', 'watch']);

};