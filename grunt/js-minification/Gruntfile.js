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
                                  'css/css-minified.min.css': ['css/*.css']
                                  }
                          }
                },

        uglify: {
                options: {
                          mangle: true
                         },
                target: {
                          files: {
                         'js/combined.min.js': ['js/dropdown.js','js/util.js']
                                 }
                           }
                }
  });
     grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default',['uglify']);

     grunt.registerTask('default',['uglify']);
}
