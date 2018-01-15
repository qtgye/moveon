let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('gulp-tasks-preset');

let gulp = require('gulp');

module.exports = {

  fn: async function () {
    return gulp.src('src/fonts/**/*.*',)
        .pipe(gulp.dest('public/fonts'));
  },

  watchFiles: projectRoot('src/images/**/*.*'),

}