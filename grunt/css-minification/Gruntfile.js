module.exports = function(grunt) {

  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
                 combine: {
                           files: {
                                  'css/combined.min.css': ['css/custom.css', 'css/menu.css']
                                  }
                          }
        }

  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');

}
