/**
 * Watch task will only be registered when gulp is ran in watch mode, i.e., `gulp watch`
 * No need to register this task in gulpfile.
 */

let { tasks, browserSync } = require('gulp-tasks-preset');
let gulp = require('gulp');
let watch = require('gulp-watch');
let watchableTasks = tasks.filter( task => task.watchFiles ? true : false );
let watchDeps = tasks.map( task => task.name );




gulp.task('watch', watchDeps, function () {

  // Start browserSync
  browserSync.init({
    server: {
      basedir: './public',
    },
  }, () => { browserSync.initialized = true; });

  // Watch files
  for ( let task of watchableTasks ) {
    task.fn.call();
    watch(task.watchFiles, () => gulp.start(task.name));
  }

});