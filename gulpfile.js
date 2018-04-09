var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var cssmin = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sequence = require('run-sequence');
var flatten = require('gulp-flatten');

const HTML_FILES = 'src/html/*.html';
const JS_FILES = 'src/js/*.js';
const CSS_FILES = 'src/css/*.css';
const IMG_FILES = 'src/img/**';

const BUILD_DIR = 'build/';

// Stage src to server
gulp.task('default', function () {
  sequence('reduce', 'combine', 'copy');
});

// HTML
gulp.task('reduce', function () {

  gulp.src([HTML_FILES])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(BUILD_DIR));

  return;
});

// JS & CSS
gulp.task('combine', function () {
  gulp.src(JS_FILES)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(BUILD_DIR));


  gulp.src(CSS_FILES)
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(BUILD_DIR));

  return;
});

// Resources
gulp.task('copy', function () {
  gulp.src(IMG_FILES)
    .pipe(flatten())
    .pipe(gulp.dest(BUILD_DIR + 'img/'));

  return;
});