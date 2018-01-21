let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('gulp-tasks-preset');

let fs = require('fs-extra');
let gulp = require('gulp');
let klawSync = require('klaw-sync');
let Twig = require('twig');
let twig = Twig.twig;
let notifier = require('node-notifier');

let klawSyncConfig = {nodir: true};
let templateRoot = projectRoot('src/templates');
let twigTemplates = {};

Twig.extendFilter('wrap-words', string => {
  // console.log('wrap words',string.match(/[\S]+/ig).map( word => `<span>${word}</span>`).join(''));
  return string.match(/[\S]+/ig).map( word => `<span>${word}</span>`).join('');
});

module.exports = {

  fn: async function () {
    let files = klawSync(templateRoot, klawSyncConfig);

    Twig.cache();
    files = files.map( file => {
      file.templateId = file.path.replace( templateRoot+'/', '' ).replace(/\.twig$/i, '');
      file.templateContent = fs.readFileSync(file.path, 'utf-8');
      let templateData = {
        id: file.templateId,
        data: file.templateContent,
        allowInlineIncludes: true,
      };
      twigTemplates[templateData.id] = twig(templateData);
      return file;
    });

    let pages = files.filter( file => /^pages\/[^\/]+/i.test(file.templateId) );

    pages.forEach( page => {
      let templateId = page.templateId;
      let outputBaseName = templateId.replace(/^pages\//i, '');
      let outputFile = projectRoot(`public/${outputBaseName}.html`);
      let html = twigTemplates[templateId].render({});
      // let html = twig.renderFile(page.path, {}, (err, html) => {
      //   console.log(`Compiling page: ${outputFile}`);
      //   fs.outputFileSync(outputFile, html);
      // });

      console.log(`Compiling page: ${outputFile}`);
      fs.outputFileSync(outputFile, html);

    });

    if ( isWatching ) {
      browserSync.reload();
    }
  },

  // fn: async function () {
  //   let twig = require('gulp-twig');
  //   return gulp.src(projectRoot('templates/pages/*.twig'))
  //       .pipe(twig())
  //       .on('end', function () {
  //         if ( isWatching ) {
  //             browserSync.reload();
  //           }
  //       })
  //       .pipe(gulp.dest(projectRoot('public')));
  // },


  watchFiles: `${templateRoot}/**/*.*`,


}
