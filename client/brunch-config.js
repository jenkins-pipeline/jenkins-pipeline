module.exports = {
  config: {
    paths: {
      public: '../public/'
    },

    files: {
      javascripts: {
        joinTo: {
          'scripts/app.js': /^app\//,
          'scripts/libs.js': /^vendor\/scripts\//
        }
      },

      stylesheets: {
        joinTo: {
          'styles/app.css': /^app\//,
          'styles/libs.css': /^vendor\/styles\//
        }
      }
    }
  }
};
