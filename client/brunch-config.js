module.exports = {
  config: {
    paths: {
      public: '../public/'
    },

    npm: {
      enabled: true,
      whitelist: [
        'jquery',
        'lodash',
        'humanize-duration',
        'moment'
     ]
    },

    files: {
      javascripts: {
        joinTo: {
          'scripts/app.js': /^app\//,
          'scripts/libs.js': /^node_modules/
        }
      },

      stylesheets: {
        joinTo: {
          'styles/app.css': /^app\//,
          'styles/libs.css': /^vendor\/styles\//
        }
      }
    },

    server: {
      run: 'yes'
    }
  }
};
