/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'lightning',
    environment: environment,
    contentSecurityPolicy: {
      'connect-src': "'self' wss://*.firebaseio.com",
      'font-src': "'self' http://fonts.gstatic.com",
      'img-src': "'self' https://*.githubusercontent.com",
      'script-src': "'self' https://*.firebaseio.com",
      'style-src': "'self' http://fonts.googleapis.com"
    },
    firebase: 'https://dev-ember-lightning.firebaseio.com/',
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.firebase = 'https://embernati-lightning.firebaseio.com/';
  }

  return ENV;
};
