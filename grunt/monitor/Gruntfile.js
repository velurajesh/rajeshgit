module.exports = function(grunt) {

  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
          dist: {
            files: {
              'css/style.css' : 'sass/style.scss'  // compiles .scss to styles.css
            }
          }
        },

        cssmin: {
                 combine: {
                           files: {
                                  'css/combined.min.css': ['css/*.css'] // combines menu.css & custom.css into one file : combined.css file
                                  }
                          }
                },

        uglify: {
                options: {
                          mangle: false  // don't replace JS variables to short form like eg., a, b, c, etc.
                         },
                target: {
                          files: {
                         'js/combined.min.js': ['js/dropdown.js','js/util.js'] // combines the 2 .js files to combined.min.js with variables untouched.
                                 }
                           }
                },
        watch: {target: {

            files: ["sass/*.scss", "css/*.css"], // Run SASS compiler then minify CSS
            tasks: ['sass', 'cssmin'] // running tasks by order
            }

        }
  });
    

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // runs this as default when you type "grunt" in the following order Terminal
     grunt.registerTask('default',['watch', 'sass', 'cssmin', 'uglify']); 
    
    //** COMMAND LINE STATEMENTS **
    //=============================
    // grunt sass - runs sass compiler
    // grunt cssmin - runs css minifying task
    // grunt uglify - runs javascript uglify 







}
