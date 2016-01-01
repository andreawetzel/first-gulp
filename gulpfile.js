'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass');


gulp.task("concatScripts", function(){
  gulp.src([
    'js/one.js',
    'js/two.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", function(){
  gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task("compileSass", function(){
  gulp.src("css/main.scss")
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(gulp.dest('css'));
});

//second parameter is an array of dependencies
gulp.task("default", ["hello"], function(){
  console.log("This is the default task");
});
