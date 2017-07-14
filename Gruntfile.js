module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    
    grunt.initConfig({
        
        // Check for syntax
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                force: true
            },
            target: ['Gruntfile.js', 'src/js/*.js']
        },
        
        // Add scripts together
        concat: {
            target: {
                src: 'src/js/*.js',
                dest: 'build/js/script.js'
            }
        },
        
        // Compress scripts
        uglify: {
            options: {
                report: 'gzip'
            },
            target: {
              files: {
                'build/js/script.js': 'build/js/script.js'
              }
            }
        },
        
        // Compress HTML
        htmlmin: {
            target1: {
              options: {
                removeComments: true,
                collapseWhitespace: true
              },
              files: [{
                  expand: true,
                  cwd: 'src/',
                  src: '*.html',
                  dest: 'build/',
                  ext: '.html'
              }]
            },
            
            target2: {
              options: {
                removeComments: true,
                collapseWhitespace: true
              },
              files: [{
                  expand: true,
                  cwd: 'src/',
                  src: '*.php',
                  dest: 'build/',
                  ext: '.php'
              }]
            }
        },
        
        // Copy images
        copy: {
            target: {
                files: [{
                    expand: true, 
                    cwd: 'src/img',
                    src: '**', 
                    dest: 'build/img'
                }]
            }
        }
    });
    
    grunt.registerTask('test', ['copy']);
    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('build', ['copy', 'htmlmin', 'jshint', 'concat', 'uglify']);
};