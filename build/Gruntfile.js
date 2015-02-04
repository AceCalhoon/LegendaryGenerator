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
                    VERSION: '<%= pkg.version %>',
                    ANALYTICS: grunt.file.exists('../src/google-analytics.inc') ? true : null
                }
            },
            files : [
                {
                    expand: true,
                    cwd: '../src',
                    src: ['*.html', 'offline-manifest.appcache'],
                    dest: '../output/'
                }
            ]
        }
    },
    copy: {
        dist: {
            files: [
                {
                    expand: true,
                    cwd: '../src/Images',
                    src: ['**', '!Source/**'],
                    dest: '../output/Images/'
                },
                {
                    expand: true,
                    cwd: '../src',
                    src: ['*', '!*.html', '!offline-manifest.appcache'],
                    dest: '../output/'
                }
            ]
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', [
    'clean:init',
    'concat',
    'uglify',
    'less',
    'preprocess',
    'copy',
    'clean:finalize'
  ]);
};