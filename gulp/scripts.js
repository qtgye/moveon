let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('gulp-tasks-preset');

let rollup = require('rollup');
let uglify = require('rollup-plugin-uglify');
let notifier = require('node-notifier');

let output = projectRoot('public/scripts/app.js');
let isDev = isDevelopment || isLocal ? true : false;
let isProd = isStaging || isProduction ? true : false;

// An options object has to be passed to rollup when using gulp,
// but we'll stick to a separate config file for consitency
let rollupConfig = require(projectRoot('rollup.config.js'));

module.exports = {

  fn: async function () {

    try {

      const bundle = await rollup.rollup(rollupConfig);

      await bundle.write({
        file: output,
        format: 'iife',
        name: 'app_scripts',
        sourcemap: isDev ? true : false,
      });

      if ( isWatching && browserSync.initialized ) browserSync.reload();
      notifier.notify({ 'title': 'Gulp', 'message': 'Scripts Task Finished!'});

    } catch (error) {
      let title = 'Bundle Error!';
      notifier.notify({ 'title': title, 'message': error.message });
      console.log(title.red);
      console.log(error.message);
      console.log(error.stack.gray);
    }

  },


  deps: isDev ? [ 'lint-scripts' ] : [],


  watchFiles: projectRoot('src/scripts/**/*.js'),


}