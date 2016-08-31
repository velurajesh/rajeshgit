In terminal run this :

Run > gulp 

To automate the following Tasks : 
==================================

gulp.task('monitor', function() {

  gulp.watch('scss/*.scss', ['scsscompile']); // running scss compiler on changes to scss 
  gulp.watch('css/*.css', ['minifycss']); // changes to css will then minify into this file
  gulp.watch('js/*.js', ['uglify']); // changes  to JS files will also get compressed 

 
});