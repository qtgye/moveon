let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('gulp-tasks-preset');

let imagemin = require('gulp-imagemin');
let gulp = require('gulp');

let src = projectRoot('src/images/**/*.*');
let dest = 'public/images';

module.exports = {

  fn: async function () {
    return gulp.src(src)
              .pipe(imagemin())
              .pipe(gulp.dest(dest));
  },

  watchFiles: projectRoot('src/images/**/*.*'),

}