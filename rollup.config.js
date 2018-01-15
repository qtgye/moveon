let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('gulp-tasks-preset');

let fs = require('fs-extra');
let babel = require('rollup-plugin-babel');
let node = require('rollup-plugin-node-resolve');
let uglify = require('rollup-plugin-uglify');

let isDev = isDevelopment || isLocal ? true : false;
let isProd = isStaging || isProduction ? true : false;
let entry = projectRoot('src/scripts/app.js');
let rollupPlugins = isProd ? [ uglify() ] : [];
rollupPlugins = rollupPlugins.concat([
  babel(),
  node(),
]);

module.exports = {
  input: entry,
  plugins: rollupPlugins,
}