// Access preset helpers and variables
let { isDevelopment, browserSync, projectRoo }  = require('gulp-tasks-preset');

// External modules
let gulp = require('gulp');
let rename = require('gulp-rename');


module.exports = {


  // The task function
  fn: async function () {
    return gulp.src('somefile')
            .pipe(rename('newFile'))
            .pipe(gulp.dest('./'));
  },


  // An array of tasks to be executed and completed before your task will run
  // i.e., gulp.task('sometask', deps, fn);
  // [optional]
  deps = ['task1', 'task2'],


  // The files to watch
  // [optional]
  watchFiles: [ 'file1', 'file2', 'glob/**/*' ],


};