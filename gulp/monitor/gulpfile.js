var gulp=require('gulp');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var cssnano=require('gulp-cssnano');
var gulpsass = require('gulp-sass');


gulp.task('scsscompile', function() {
        return gulp.src('scss/*.scss') // all scss files
        .pipe(concat('combined-style.css')) // combines multiple scss files
        .pipe(gulpsass()) // compile task running now
        .pipe(gulp.dest('css')); // store compiled css file here..
});

gulp.task('minifycss', function() {
    return gulp.src('css/*.css')
        .pipe(concat('combined.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
        return gulp.src('js/*.js')
        .pipe(concat('combined.min.js'))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest('dist'));
});

gulp.task('monitor', function() {
  gulp.watch('scss/*.scss', ['scsscompile']); // running scss compiler on changes to scss 
  gulp.watch('css/*.css', ['minifycss']); // changes to css will then minify into this file
  gulp.watch('js/*.js', ['uglify']); // changes to JS files will also get compressed 

 
});

gulp.task('default', ['monitor']);
