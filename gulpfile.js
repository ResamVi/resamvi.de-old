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
const XAMP_DIR = 'C:\\xampp\\htdocs\\';

const SCRIPT_DECLARATION = '<script src="js/scroll-blog.js"></script><script src="js/appear-surface.js"></script><script src="js/show-search.js"></script><script src="js/filter-blog.js"></script><script src="js/search-entry.js"></script>';

gulp.task('default', function () {
  sequence('minify', 'combine', 'copy', 'deploy');
});

gulp.task('minify', function () {
  gulp.src([HTML_FILES, '!src/index.html', '!src/tutorium.html', '!src/gaestebuch.html'])
    .pipe(replace('<link rel="stylesheet" type="text/css" href="css/animate.css">', ''))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(BUILD_DIR));

  gulp.src(HTML_PHP_FILES)
    .pipe(extension('.php'))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(replace(SCRIPT_DECLARATION, '<script src="js/script.js"></script>'))
    .pipe(replace('<script src="js/validate-form.js"></script>', '<script src="js/script.js"></script>'))
    .pipe(replace('<link rel="stylesheet" type="text/css" href="css/animate.css">', ''))
    .pipe(replace('"root", "password"', key()))
    .pipe(gulp.dest(BUILD_DIR));

  return;
});

gulp.task('combine', function () {
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

gulp.task('copy', function () {
  gulp.src(IMG_FILES)
    .pipe(gulp.dest(BUILD_DIR + 'img/'));

  gulp.src(PHP_FILES)
    .pipe(gulp.dest(BUILD_DIR + 'php/'));

  gulp.src('src/.htaccess')
    .pipe(gulp.dest(BUILD_DIR));

  return;
});

gulp.task('clear:xamp', function () {
  return gulp.src([XAMP_DIR + '**\\*.*', '!' + XAMP_DIR])
    .pipe(clean({
      force: true
    }));
});

gulp.task('clear:local', function () {
  return gulp.src([SRC_DIR + '**/*.*'])
    .pipe(clean({
      force: true
    }));
});

gulp.task('debug:save', ['clear:local'], function () {
  gulp.src([XAMP_DIR + 'index.php', XAMP_DIR + 'tutorium.php', XAMP_DIR + 'gaestebuch.php'])
    .pipe(extension('.html'))
    .pipe(replace('<?php', '<!--<?php'))
    .pipe(replace('?>', '?>-->'))
    .pipe(gulp.dest(SRC_DIR));

  gulp.src([XAMP_DIR + '**', '!' + XAMP_DIR + 'index.php', '!' + XAMP_DIR + 'tutorium.php', '!' + XAMP_DIR + 'gaestebuch.php'])
    .pipe(gulp.dest(SRC_DIR));

});

gulp.task('debug:build', ['clear:xamp'], function () {
  sequence('minify', 'combine', 'copy');

  gulp.src(BUILD_DIR + '**')
    .pipe(gulp.dest(XAMP_DIR));

  return;
});

gulp.task('debug:src', ['clear:xamp'], function () {
  gulp.src(['src/index.html', 'src/tutorium.html', 'src/gaestebuch.html'])
    .pipe(extension('.php'))
    .pipe(replace('<!--<?php', '<?php'))
    .pipe(replace('?>-->', '?>'))
    .pipe(gulp.dest('C:\\xampp\\htdocs'));

  gulp.src([SRC_DIR + '**', '!src/index.html', '!src/tutorium.html', '!src/gaestebuch.html'])
    .pipe(gulp.dest(XAMP_DIR));

  return;
});

gulp.task('deploy', function () {
  gulp.src(BUILD_DIR + '**')
    .pipe(sftp({
      host: 'server102.web-hosting.com',
      port: 21098,
      auth: 'key',
      remotePath: '/home/resatult/public_html'
    }));

  return;
});
