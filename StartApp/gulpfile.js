var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect')
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    sass = require('gulp-sass');

gulp.task('mytask', function() {
  // do something...
});

gulp.task('index', function() {
  gulp
    .src('./public/index.html')
    .pipe(connect.reload());
});

gulp.task('connect-server', function() {
  connect.server({
    name: 'StartApp by Laboratoria',
    root: 'public',
    port: 8000,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp
    .watch('./public/index.html', ['index']);
});

gulp.task('build', function() {
  gulp
    .start(['mytask', 'index']);
});

gulp.task('default', function() {
  gulp
    .start(['build', 'connect-server', 'watch']);
});