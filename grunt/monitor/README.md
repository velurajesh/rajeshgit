
This is a Grunt task runner. 

To run : 

> grunt


This will then look for the Gruntfile.js to run the following set of commands  : 


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default',['watch']); // runs this as default when you type GRUNT in command line 

    //** COMMAND LINE STATEMENTS **
    //=============================
    // grunt sass - runs sass compiler
    // grunt cssmin - runs css minifying task
    // grunt uglify - runs javascript uglify 

    