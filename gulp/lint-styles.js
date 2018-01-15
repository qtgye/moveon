let { projectRoot } = require('gulp-tasks-preset');
let gulp = require('gulp');
let src = projectRoot('src/styles/**/*.scss');
let sassLint = require('gulp-sass-lint');

module.exports = {

  fn: async function () {
    return gulp.src(src)
            .pipe(sassLint())
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError());
  }

};