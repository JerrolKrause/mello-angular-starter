/**
 * @author: @AngularClass
 */

require('ts-node/register');
var helpers = require('./helpers');

exports.config = {
  baseUrl: 'http://localhost:4200/',

  /**
   * Use `npm run e2e`
   */
  specs: [
    helpers.root('src/**/**.e2e.ts'),
    helpers.root('src/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
 
  capabilities: {
      'browserName': 'chrome'
  },
    /*
  multiCapabilities: [
     // { 'browserName': 'chrome' },
      //{ 'browserName': 'firefox' },
      { 'browserName': 'internet explorer' },
     // { 'browserName': 'edge' }
  ],
 */
  onPrepare: function() {
      browser.ignoreSynchronization = true;

      browser.get('/#/login');
      element(by.css('form .login')).clear();
      element(by.css('form .login')).sendKeys('TuNguyen@loandepot.com');
      element(by.css('form .password')).clear();
      element(by.css('form .password')).sendKeys('123456');
      element(by.css('form button[type="submit"]')).click();

      return browser.wait(() => {
          return browser.getCurrentUrl().then((url) => {
              if (url.indexOf('login') == -1) {
                  return true;
              } else {
                  return false;
              }
          });
      }, 5000);

  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
   useAllAngular2AppRoots: true
};
