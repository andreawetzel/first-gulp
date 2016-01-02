'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  del = require('del');


gulp.task("concatScripts", function(){
  return gulp.src([
    'js/one.js',
    'js/two.js'])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ['concatScripts'], function(){
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task("compileSass", function(){
  return gulp.src("css/main.scss")
  .pipe(maps.init())
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function(){
  gulp.watch('css/**/*.scss', ['compileSass']);
  gulp.watch('js/two.js', ['concatScripts']);
});

gulp.task('clean', function(){
  del(['dist', 'css/main.css', 'css/main.css.map','js/app.js', 'js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'compileSass'], function(){
  return gulp.src(['css/main.css', 'js/app.js', 'index.html', "img/**"], { base: './'})
  .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function(){
  gulp.start('build'); //this will change in gulp 4
});
