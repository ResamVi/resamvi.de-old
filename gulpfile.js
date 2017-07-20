var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var cssmin = require('gulp-clean-css');
var uglify = require('gulp-uglify'); 
var extension = require('gulp-ext-replace');
var replace = require('gulp-replace');
var sequence = require('run-sequence');
var sftp = require('gulp-sftp');
var clean = require('gulp-clean');
var key = require('key');

const HTML_FILES = 'src/*.html';
const HTML_PHP_FILES = ['src/index.html', 'src/tutorium.html', 'src/gaestebuch.html'];
const JS_FILES = 'src/js/*.js';
const CSS_FILES = 'src/css/*.css';
const IMG_FILES = 'src/img/**';
const PHP_FILES = 'src/php/**';

const BUILD_DIR = 'build/';
const SRC_DIR = 'src/';

const SCRIPT_DECLARATION = '<script src="js/scroll-blog.js"></script><script src="js/appear-surface.js"></script><script src="js/show-search.js"></script><script src="js/filter-blog.js"></script><script src="js/search-entry.js"></script>';

gulp.task('default', function() {
  sequence('minify', 'combine', 'copy', 'deploy');
});

gulp.task('minify', function() {
  gulp.src([HTML_FILES, '!src/index.html', '!src/tutorium.html', '!src/gaestebuch.html'])
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest(BUILD_DIR));
  
  gulp.src(HTML_PHP_FILES)
    .pipe(extension('.php'))
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(replace(SCRIPT_DECLARATION, '<script src="js/script.js"></script>'))
    .pipe(replace('"root", "password"', key()))
    .pipe(replace('<link rel="stylesheet" type="text/css" href="css/animate.css">', ''))
    .pipe(gulp.dest(BUILD_DIR));
  
  return;
});

gulp.task('combine', function() {
  gulp.src(JS_FILES)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(BUILD_DIR + 'js/'));
  
  gulp.src(CSS_FILES)
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(BUILD_DIR + 'css/'));
  
  return;
});

gulp.task('copy', function() {
  gulp.src(IMG_FILES)
    .pipe(gulp.dest(BUILD_DIR + 'img/'));
  
  gulp.src(PHP_FILES)
    .pipe(gulp.dest(BUILD_DIR + 'php/'));
  
  gulp.src('src/.htaccess')
    .pipe(gulp.dest(BUILD_DIR));
  
  return;
});

gulp.task('clear', function() {
  return gulp.src(['C:\\xampp\\htdocs\\**\\*.*', '!C:\\xampp\\htdocs'])
    .pipe(clean({force:true}));
});

gulp.task('debug:build', ['clear'], function() {
  sequence('minify', 'combine', 'copy');
  
  gulp.src(BUILD_DIR + '**')
    .pipe(gulp.dest('C:\\xampp\\htdocs'));
  
  return;
});

gulp.task('debug:src', ['clear'], function() {
  gulp.src(SRC_DIR + '**')
    .pipe(gulp.dest('C:\\xampp\\htdocs'));
});

gulp.task('deploy', function () {
  gulp.src('build/**')
    .pipe(sftp({
        host: 'server102.web-hosting.com',
        port: 21098,
        auth: 'key',
        remotePath: '/home/resatult/public_html'
  }));
  
  return;
});