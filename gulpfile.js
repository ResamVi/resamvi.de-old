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
var psi = require('psi');
var watchLess = require('gulp-watch-less');
var less = require('gulp-less');
var uncss = require('gulp-uncss');

var LessAutoprefix = require('less-plugin-autoprefix'),
  autoprefix = new LessAutoprefix({
    browsers: ['last 2 versions']
  });


const HTML_FILES = 'src/*.html';
const HTML_PHP_FILES = ['src/index.html', 'src/tutorium.html', 'src/gaestebuch.html'];
const JS_FILES = 'src/js/*.js';
const CSS_FILES = 'src/css/*.css';
const IMG_FILES = 'src/img/**';
const PHP_FILES = 'src/php/**';

const BUILD_DIR = 'build/';
const SRC_DIR = 'src/';
const XAMP_DIR = 'C:\\xampp\\htdocs\\';

const SCRIPT_DECLARATION = '<script src="js/appear-surface.js"></script><script src="js/show-search.js"></script><script src="js/filter-blog.js"></script><script src="js/search-entry.js"></script><script src="js/infinite-scroll.pkgd.min.js"></script><script src="js/scroll-blog.js"></script>';
const DEFAULT_SCRIPT = '<script src="js/script.js"></script>';

// Stage src to server
gulp.task('default', function () {
  sequence('update', 'reduce', 'combine', 'copy', 'deploy');
});

// Replace all keys/imports used as dev and minify
gulp.task('reduce', function () {

  // Minify HTML
  gulp.src([HTML_FILES, '!src/index.html', '!src/tutorium.html', '!src/gaestebuch.html'])
    .pipe(replace('index.html', 'index.php'))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(BUILD_DIR));

  // Uncomment PHP Blocks, minify HTML
  gulp.src(HTML_PHP_FILES)
    .pipe(extension('.php'))
    .pipe(replace('<!--<?php', '<?php'))
    .pipe(replace('?>-->', '?>'))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))

    // Remove unnecessary links to scripts/css
    .pipe(replace(SCRIPT_DECLARATION, DEFAULT_SCRIPT))
    .pipe(replace('<script src="js/validate-form.js"></script>', DEFAULT_SCRIPT))
    .pipe(replace('<link rel="stylesheet" type="text/css" href="css/animate.css">', ''))
    .pipe(replace('<link rel="stylesheet" type="text/css" href="css/gaestebuch.css">', ''))
    .pipe(gulp.dest(BUILD_DIR));

  return;
});

// Compile less files
gulp.task('update', function () {
  return gulp.src('src/css/*.less')
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('src/css/'))
});

// Update style css while developing
gulp.task('less', function () {
  gulp.watch('src/css/*.less', ['update']);
});

// Concatenate scripts and styles
gulp.task('combine', function () {
  gulp.src(JS_FILES)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(BUILD_DIR + 'js/'));


  // Process CSS  
  gulp.src(CSS_FILES)
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(BUILD_DIR + 'css/'));

  return;
});

// Copy images htaccess and php libs
gulp.task('copy', function () {
  gulp.src(IMG_FILES)
    .pipe(gulp.dest(BUILD_DIR + 'img/'));

  gulp.src(PHP_FILES)
    .pipe(gulp.dest(BUILD_DIR + 'php/'));

  gulp.src('src/.htaccess')
    .pipe(gulp.dest(BUILD_DIR));

  return;
});

// Clear htdocs to add new files
gulp.task('clear:xamp', function () {
  return gulp.src([XAMP_DIR + '**\\*.*', '!' + XAMP_DIR])
    .pipe(clean({
      force: true
    }));
});

// Clear src folder to add new files
gulp.task('clear:local', function () {
  return gulp.src([SRC_DIR + '**/*.*'])
    .pipe(clean({
      force: true
    }));
});

// Save the changes from htdocs to src
gulp.task('debug:save', ['clear:local'], function () {
  gulp.src([XAMP_DIR + 'index.php', XAMP_DIR + 'tutorium.php', XAMP_DIR + 'gaestebuch.php'])
    .pipe(extension('.html'))
    .pipe(replace('<?php', '<!--<?php'))
    .pipe(replace('?>', '?>-->'))
    .pipe(gulp.dest(SRC_DIR));

  gulp.src([XAMP_DIR + '**', '!' + XAMP_DIR + 'index.php', '!' + XAMP_DIR + 'tutorium.php', '!' + XAMP_DIR + 'gaestebuch.php'])
    .pipe(gulp.dest(SRC_DIR));

});

// Copies the build folder to htdocs
gulp.task('debug:build', ['clear:xamp'], function () {
  sequence('update', 'reduce', 'combine', 'copy');

  gulp.src(BUILD_DIR + '**')
    .pipe(gulp.dest(XAMP_DIR));

  return;
});

// Copies the src folder to htdocs (replaces php comments to make it work)
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

// Upload to server
gulp.task('deploy', function () {
  gulp.src([BUILD_DIR + '**', BUILD_DIR + '.htaccess'])
    .pipe(sftp({
      host: 'server102.web-hosting.com',
      port: 21098,
      auth: 'key',
      remotePath: '/home/resatult/public_html'
    }));

  return;
});
