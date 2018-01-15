let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('gulp-tasks-preset');

let fs = require('fs-extra');
let klawSync = require('klaw-sync');
let twig = require('twig').twig;
let notifier = require('node-notifier');

let klawSyncConfig = {nodir: true};

let templateRoot = projectRoot('src/templates');

module.exports = {

  fn: async function () {
    let twigTemplates = {};
    let files = klawSync(templateRoot, klawSyncConfig);

    files = files.map( file => {
      file.templateId = file.path.replace( templateRoot+'/', '' ).replace(/\.twig$/i, '');
      let templateData = {
        id: file.templateId,
        data: fs.readFileSync(file.path, 'utf-8'),
        allowInlineIncludes: true
      };
      twigTemplates[templateData.id] = twig(templateData);
      return file;
    });

    let pages = files.filter( file => /^pages\/[^\/]+/i.test(file.templateId) );

    pages.forEach( page => {
      let templateId = page.templateId;
      let outputBaseName = templateId.replace(/^pages\//i, '');
      let html = twigTemplates[templateId].render({});
      fs.outputFileSync(projectRoot(`public/${outputBaseName}.html`), html);
    });
  },


  watchFiles: `${templateRoot}/**/*.*`,


}