var parameters = require('./config/params.js');
//var testSuite = require('./config/suites.js');
var jasmineReporters = require('jasmine-reporters');
exports.config = {

    seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar',
    chromeDriver     : '../node_modules/protractor/selenium/chromedriver.exe',
    directConnect    : true,
    firefoxPath      : null,

    exclude     : [],

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName'  : 'chrome',
        'chromeOptions': {
            args: [
                'show-fps-counter=true',
                '--disable-cache',
                '--disable-application-cache',
                '--disable-offline-load-stale-cache',
                '--disk-cache-size=0',
                '--v8-cache-options=off',
                '--ignore-certificate-errors'
            ]
        }
    },

    params: parameters,

    suites           : testSuite,

    // A base URL for your application under test.
    //baseUrl will be set up by grunt-protractor-runner module and is defined in test.e2e.js
    baseUrl          : null,
    //https://github.com/angular/protractor/issues/978

    //TIMEOUTS
    // The timeout in milliseconds for each script run on the browser. This should
    // be longer than the maximum time your application needs to stabilize between
    // tasks.
    //TODO - fix performance issues in FE since for some Koodisto values it takes more than 30 sec to load
    allScriptsTimeout: 30000,

    // Test framework to use. This may be one of:
    //  jasmine, jasmine2, cucumber, mocha or custom.
    framework        : 'jasmine2',

    //    Options to be passed to jasmine2
    jasmineNodeOpts  : {
        // If true, print colors to the terminal.
        showColors            : true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 50000,
        // Function called to print jasmine results.
        print                 : function () {
        }
    },

    onPrepare: function () {
        browser.manage().deleteAllCookies();
        browser.manage().window().maximize();
        global.EDITOR_POPUP_TIMEOUT = 20000;
        global.SEARCH_SLEEP_TIME = 3000;
        global.CASE_LISTING_SCROLL_COUNT = 10;
        global.ELECTRONIC_SIGN_TIMEOUT = 2000;
        global.E2E_BASE_PATH = __dirname + '/';

        var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace     : 'all',    // display stacktrace for each failed assertion, values: (all|specs|summary|none)
            displayFailuresSummary: true, // display summary of all failures after execution
            displaySuccessfulSpec : true,  // display each successful spec
            displayFailedSpec     : true,      // display each failed spec
            displayPendingSpec    : false,    // display each pending spec
            displaySpecDuration   : false,   // display each spec duration
            displaySuiteNumber    : false,    // display each suite number (hierarchical)
            colors                : {
                success: 'green',
                failure: 'red',
                pending: 'cyan'
            },
            prefixes              : {
                success: '✓ ',
                failure: '✗ ',
                pending: '- '
            },
            customProcessors      : []
        }));

        var capsPromise = browser.getCapabilities();
        capsPromise.then(function (caps) {
            var browserName = caps.caps_.browserName.toUpperCase();
            var browserVersion = caps.caps_.version;
            var prePendStr = browserName + "-" + browserVersion + "-";
            //jasmine-reporter 2 for JunitXml report
            jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                filePrefix    : prePendStr,
                savePath      : 'e2e/reports/xml'
            }));
        });

        // jasmine2 html reporter:
        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath                     : 'e2e/reports/html/',
            takeScreenshots              : true,
            takeScreenshotsOnlyOnFailures: true
        }));

        console.log("Setting to use self-signed certificate");
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }
};