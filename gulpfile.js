'use strict';

var esformatter = require('gulp-esformatter');
var gulp = require('gulp');
var jshint = require('gulp-jshint');

require('metaljs')({
  bundleFileName: 'jquery-plugin.js'
});

var codeFileGlobs = ['src/**/*.js', 'test/**/*.js', 'gulpfile.js'];
gulp.task('format', function() {
  var gulpOpts = {
    base: process.cwd()
  };
  return gulp.src(codeFileGlobs, gulpOpts)
    .pipe(esformatter())
    .pipe(gulp.dest(process.cwd()));
});

gulp.task('lint', function() {
  return gulp.src(codeFileGlobs)
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});
