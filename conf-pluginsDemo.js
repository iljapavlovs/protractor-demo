var parameters = require('./config/params.js');
var SpecReporter = require('jasmine-spec-reporter');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var jasmineReporters = require('jasmine-reporters');
var AllureReporter = require('jasmine-allure-reporter');
exports.config = {
    firefoxPath: 'C:/tools/Firefox/firefox.exe',

    directConnect: true,

    framework: 'jasmine2',


    specs: [
        'specs/spec.js'
    ],

    capabilities: {
        'browserName': 'firefox'
        //'browserName': 'chrome'
    },

    //TIMEOUTS
    // The timeout in milliseconds for each script run on the browser. This should
    // be longer than the maximum time your application needs to stabilize between
    // tasks.

    allScriptsTimeout: 30000,


    //    Options to be passed to jasmine2
    jasmineNodeOpts: {
        // If true, print colors to the terminal.
        showColors: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 15000,
        // Function called to print jasmine results.
        print: function () {
        }
    },

    //we can also separate configution into smaller and logical chunks
    params: parameters,

    /*
     onPrepare -  A callback function called once protractor is ready and available, and
     before the specs are executed.

     in onPrepare you can
     - you can add a reporter
     - use a variable called global to create global variables for your tests.
     - prepare browser for test execution - maximize window, delete cookies
     - in other words, this will be called before test will start executing, but there`s no guarantee that it will by synchinous
     */
    onPrepare: function () {
        browser.manage().deleteAllCookies();
        browser.manage().window().maximize();

        //in order to avoid, check http://stackoverflow.com/questions/31491952/using-require-with-relative-paths
        global.E2E_BASE_PATH = __dirname + '/';


        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'all',    // display stacktrace for each failed assertion, values: (all|specs|summary|none)
            displayFailuresSummary: true, // display summary of all failures after execution
            displaySuccessfulSpec: true,  // display each successful spec
            displayFailedSpec: true,      // display each failed spec
            displayPendingSpec: false,    // display each pending spec
            displaySpecDuration: false,   // display each spec duration
            displaySuiteNumber: false,    // display each suite number (hierarchical)
            colors: {
                success: 'green',
                failure: 'red',
                pending: 'cyan'
            },
            prefixes: {
                success: '✓ ',
                failure: '✗ ',
                pending: '- '
            },
            customProcessors: []
        }));

        jasmine.getEnv().addReporter(new AllureReporter({
            allureReport: {
                resultsDir: './reports/allure-results'
            }
        }));




        jasmine.getEnv().afterEach(function(done){
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });

        return browser.getProcessedConfig().then(function (config) {

            var browserName = config.capabilities.browserName.toUpperCase();
            //var browserVersion = config.capabilities.version;
            var prePendStr = browserName;
            //jasmine-reporter 2 for JunitXml report
            jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                filePrefix: prePendStr,
                savePath: 'reports/xml'
            }));

            jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
                savePath: 'reports/html/',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                filePrefix: prePendStr
            }));
        });
    },

    plugins: [
        {
            package: 'protractor-console',
            logLevels: ['debug']
        },
        {
            chromeA11YDevTools: {
                treatWarningsAsFailures: false
            },
            package: 'protractor-accessibility-plugin'
        },
        {
            package: 'protractor-timeline-plugin',

            // Output json and html will go in this folder.
            outdir: 'reports/timelines'
        }
    ]

};