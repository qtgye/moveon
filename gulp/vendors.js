/**
 * --------------------------------------------------------------------------------------------
 * VENDORS TASK
 *
 * Compiles vendors scripts and styles
 * --------------------------------------------------------------------------------------------
 */

let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync, onStreamError } = require('gulp-tasks-preset');

let fs = require('fs-extra');
let gulp = require('gulp');
let concat = require('gulp-concat');
let notifier = require('node-notifier');

let configFile = projectRoot('vendors.config.js');
let dest = {
  styles: projectRoot('public/styles'),
  scripts: projectRoot('public/scripts')
};

let isDev = isDevelopment || isLocal ? true : false;
let isProd = isStaging || isProduction ? true : false;
let done = 0;



module.exports = {


  fn: function () {

    try {

      // Get vendors list
      let vendors = require(configFile);
      done = 0;

      // Compile Vendor Scripts
      gulp.src(vendors.scripts)
          .pipe(onFailedVendors())
          .pipe(concat('vendors.js'))
          .pipe(gulp.dest(dest.scripts).on('end', doneVendors));

      // Compile Vendor Styles
      gulp.src(vendors.styles)
          .pipe(onFailedVendors())
          .pipe(concat('vendors.css'))
          .pipe(gulp.dest(dest.styles).on('end', doneVendors));

    } catch(err) {
      console.log(err);
    }


  },


  watchFiles: isDev ? [configFile] : [],


}




/**
 * --------------------------------------------------------------------------------------------
 * HELPER FUNCTIONS
 * --------------------------------------------------------------------------------------------
 */

function doneVendors () {
  // Manually reload browser
  if ( isWatching && ++done === 2 ) browserSync.reload();
  notifier.notify({
    title: 'Gulp',
    message: 'Compiled Vendor Assets!'
  });
}


function onFailedVendors() {
  return onStreamError('Vendor Task Failed!');
}