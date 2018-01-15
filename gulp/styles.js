let { isLocal, isDevelopment, isProduction, isWatching,
      browserSync, gulpif, onStreamError, projectRoot } = require('gulp-tasks-preset');
let gulp = require('gulp');
let sass = require('gulp-sass');
let sasslint = require('gulp-sass-lint');
let sourcemaps = require('gulp-sourcemaps');
let combineMq = require('gulp-combine-mq');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let notifier = require('node-notifier');

let isDev = isLocal || isDevelopment ? true : false;
let src = projectRoot('src/styles/main.scss');
let dest = projectRoot('public/styles');

module.exports = {

  fn: async function () {
    return gulp.src(src)
            .pipe(onStreamError('Styles Task Failed!'))
            .pipe(gulpif( isDev, sourcemaps.init() ))
            .pipe(sass().on('error', sass.logError))
              .pipe( gulpif( isProduction, combineMq()) )
              .pipe( gulpif( isProduction, autoprefixer()) )
              .pipe( gulpif( isProduction, cleanCSS()) )
            .pipe(gulpif( isDev, sourcemaps.write('.') ))
            .pipe(gulp.dest(dest).on('end', onStylesDone));
  },

  watchFiles: projectRoot('src/styles/**/*.scss'),

  deps: isDev ? ['lint-styles'] : [],

};



// HELPERS
// ------------------------------------------------

function onStylesDone() {
  notifier.notify({ title: 'Gulp', message: 'Styles Task Finished!' });
  // Manually inject css to ensure compiled css will reflect
  if ( isWatching && browserSync.initialized ) {
    gulp.src(`${dest}/main.css`)
      .pipe(browserSync.stream());
  }
}