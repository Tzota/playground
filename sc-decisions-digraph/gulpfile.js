'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

// https://github.com/BrowserSync/recipes/blob/master/recipes/gulp.browserify/gulpfile.js

gulp.task('clean', function() {
  require('rimraf').sync('build');
});

gulp.task('test', function(){
  return gulp.src('src/**/*.js', { base: '.' })
  .pipe(sourcemaps.init())
  // .pipe(concat('app.js')) А вот это будет работать только без экспортов в исходных файлах, т.е. es6 код должен быть под браузер
  .pipe(babel({ presets: [['env', { 'targets': { 'ie': 9} }]] }))
  .pipe(uglify())
  .pipe(sourcemaps.write('maps'))
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('build'));
});


gulp.task('default', ['clean', 'test']);