'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

require('metaljs')({
  bundleFileName: 'jquery-plugin.js'
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js', 'test/**/*.js', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});
