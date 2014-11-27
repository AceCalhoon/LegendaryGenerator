module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '../output/tmp/<%= pkg.name %>-concat.js',
        dest: '../output/Scripts/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    concat: {
        options: {
            separator: ';\n'
        },
        dist: {
            src: [
                '../src/Scripts/jquery-1.11.1.min.js',
                '../src/Scripts/handlebars-v2.0.0.js',
                '../src/Scripts/**/*.js',
                '!../src/Scripts/Debug/**/*.js'],
            dest: '../output/tmp/<%= pkg.name %>-concat.js'
        }
    },
    clean: {
        options: {
            force: true
        },
        "init": ["../output/**/*"],
        "finalize": ["../output/tmp"]
    },
    less: {
        dist: {
            options: {
                cleancss: true,
            },
            files: {
                '../output/Stylesheets/site-<%= pkg.version %>.min.css' : '../src/Stylesheets/**/*.less'
            }

        }
    },
    preprocess: {
        dist: {
            options: {
                context: {
                    VERSION: '<%= pkg.version %>'
                }
            },
            files : {
                '../output/EncountersGenerator.html' : '../src/EncountersGenerator.html'
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-preprocess');

  // Default task(s).
  grunt.registerTask('default', ['clean:init', 'concat', 'uglify', 'less', 'preprocess', 'clean:finalize']);

};