module.exports = function(grunt){  
   grunt.loadNpmTasks('grunt-contrib-concat'); 
    grunt.loadNpmTasks('grunt-contrib-uglify'); 
    grunt.loadNpmTasks('grunt-contrib-jshint'); 
    grunt.loadNpmTasks('grunt-contrib-copy'); 
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); 
    grunt.loadNpmTasks('grunt-html'); 
    grunt.loadNpmTasks('grunt-pagespeed'); 
    grunt.loadNpmTasks('grunt-sftp-deploy'); 
    grunt.loadNpmTasks('grunt-string-replace'); 
    grunt.loadNpmTasks('grunt-contrib-cssmin'); 
    grunt.loadNpmTasks('grunt-contrib-watch'); 
    grunt.loadNpmTasks('grunt-contrib-less');
     
    // TODO: Less support
    // TODO: change xampp passw to server passw
    // TODO: Use bower
    // TODO: Use html5 tags
    // TODO: Change PHP date format  
  
    grunt.initConfig(   {  
      // ============== DEVELOPMENT ============== 
        // Update files 
        watch:{  
         files:[  
            'src/**'
         ],
         tasks:[  
            'build'
         ]
      },
      // ============== VALIDATION ============== 
        // Check for syntax 
        jshint:{  
         options:{  
            reporter:require('jshint-stylish'),
            force:true
         },
         target:[  
            'Gruntfile.js',
            'src/js/*.js'
         ]
      },
      htmllint:{  
         options:{  
            reporter:'junit',
            reporterOutput:'lintresults.txt',
            force:true
         },
         target:"src/*.html"
      },
      // Test speed 
        pagespeed:{  
         options:{  
            nokey:true,
            url:"https://resamvi.de"
         },
         prod:{  
            options:{  
               url:"https://resamvi.de/index.php",
               locale:"en_GB",
               strategy:"desktop",
               threshold:80
            }
         }
      },
      // ============== PREPARE BUILD ============== 
        // Add scripts and css together 
        concat:{  
         target1:{  
            src:'src/js/*.js',
            dest:'build/js/script.js'
         },
         target2:{  
            src:'src/css/*.css',
            dest:'build/css/style.css'
         }
      },
      // Compress scripts 
        uglify:{  
         options:{  
            report:'gzip'
         },
         target:{  
            files:{  
               'build/js/script.js':'build/js/script.js'
            }
         }
      },
      // Compress css 
        cssmin:{  
         options:{  
            report:'gzip',

         },
         target:{  
            files:{  
               'build/css/style.css':'build/css/style.css'
            }
         }
      },
      // Compress HTML 
        htmlmin:{  
         target1:{  
            options:{  
               removeComments:true,
               collapseWhitespace:true
            },
            files:[  
               {  
                  expand:true,
                  cwd:'src/',
                  src:'*.html',
                  dest:'build/',
                  ext:'.html'
               }
            ]
         },
         target2:{  
            options:{  
               removeComments:true,
               collapseWhitespace:true
            },
            files:[  
               {  
                  expand:true,
                  cwd:'src/',
                  src:'*.php',
                  dest:'build/',
                  ext:'.php'
               }
            ]
         }
      },
      // Compile LESS 
        less:{  
         target:{  
            options:{  
               paths:'src/css',
               plugins:[  
                  new (require('less-plugin-autoprefix'))(                  {  
                     browsers:[  
                        "last 2 versions"
                     ]
                  }                  ),
                  new (require('less-plugin-clean-css'))
               ],

            },
            files:{  
               'build/css/styless.css':'src/css/main.less'
            }
         }
      },
      // Change paths to compressed js and css files TODO:local souce should be root password, build should be resatult 
        'string-replace':{
         build:{  
            files:{  
               'build/':'build/**.php',

            },
            options:{  
               replacements:[  
                  {  
                     pattern:'<link rel="stylesheet"  type="text/css" href="css/gaestebuchStyle.css">',
                     replacement:''
                  },
                  {  
                     pattern:'<link rel="stylesheet" type="text/css" href="css/animate.css">',
                     replacement:''
                  },
                  {  
                     pattern:'<script src="js/scroll-blog.js"></script><script src="js/appear-surface.js"></script><script src="js/show-search.js"></script><script src="js/filter-blog.js"></script><script src="js/search-entry.js">',
                     replacement:'<script src="js/script.js"></script>'
                  },
                  {  
                     pattern:'"root", "password"',
                     replacement:'"resatult", "Z2DYTa7-YnVHN"'
                  },

               ]
            }
         }
      },
      // Copy images and misc 
        copy:{  
         target1:{  
            files:[  
               {  
                  expand:true,
                  cwd:'src/img',
                  src:'**',
                  dest:'build/img'
               }
            ]
         },
         target2:{  
            files:[  
               {  
                  'build/.htaccess':'src/.htaccess'
               }
            ]
         },
         target3:{  
            files:[  
               {  
                  expand:true,
                  cwd:'src/php',
                  src:'**',
                  dest:'build/php'
               }
            ]
         },
         source:{  
            files:[  
               {  
                  expand:true,
                  cwd:'src',
                  src:'**',
                  dest:'C:\\xampp\\htdocs'
               }
            ]
         },
         build:{  
            files:[  
               {  
                  expand:true,
                  cwd:'build',
                  src:'**',
                  dest:'C:\\xampp\\htdocs'
               }
            ]
         }
      },
      // ============== DEPLOY ============== 
        'sftp-deploy':{  
         target:{  
            auth:{  
               host:'server102.web-hosting.com',
               port:21098,
               authKey:'key1'
            },
            src:'build/',
            dest:'/home/resatult/public_html',
            serverSep:'/',
            localSep:'\\',
            concurrency:4,
            progress:true
         }
      }
   }   ); 
    
    grunt.registerTask('compile', 'less');
    
    grunt.registerTask('debug',
   [  
      'copy:target1',
      'copy:target2',
      'copy:target3',
      'htmlmin',
      'concat',
      'uglify',
      'cssmin',
      'copy:build',
      'build'
   ]   ); 
    grunt.registerTask('check',
   [  
      'htmllint',
      'jshint',
      'pagespeed'
   ]   ); 
    grunt.registerTask('build',
   [  
      'copy:target1',
      'copy:target2',
      'copy:target3',
      'htmlmin',
      'jshint',
      'concat',
      'uglify',
      'cssmin',
      'string-replace:build'
   ]   ); 
    grunt.registerTask('deploy',
   'sftp-deploy'   ); 
};