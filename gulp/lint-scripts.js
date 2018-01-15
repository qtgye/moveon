let { isDevelopment, isLocal, isStaging, isProduction,
      projectRoot, onStreamError } = require('gulp-tasks-preset');

let gulp = require('gulp');
let jshint = require('gulp-jshint');
let notifier = require('node-notifier');

let src = projectRoot('source/scripts/**/*.js');


module.exports = {

  fn: function () {

    return gulp.src(src)
            .pipe(onStreamError('Lint Scripts Task Failed!'))
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));


  }

};