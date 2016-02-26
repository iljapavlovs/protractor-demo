'use strict';
//var log4js = require('log4js');
var _ = require('lodash');
var SC1_FrontPage = require(E2E_BASE_PATH + 'pages/SC1_FrontPage.js');
var SC2_QuickStartPage = require(E2E_BASE_PATH + 'pages/SC2_QuickStartPage.js');
describe('TC3 - Async Execution ', function () {

    var logger;
    var sc1_frontPage;
    var sc2_quickStartPage;

    beforeAll(function () {
        //logger = log4js.getLogger();
        //log4js.configure('my_log4js_configuration.json', {});
        sc1_frontPage = new SC1_FrontPage();
        sc2_quickStartPage = new SC2_QuickStartPage();
    });

    beforeEach(function () {
        browser.get('https://angular.io/');
        browser.waitForAngular();
    });

    /*
     In order to work with promises, they should bе resolved
     */
    it('should output strange promise object', function () {
        sc1_frontPage.goToMainPage();
        var elementText = sc2_quickStartPage.languagesDropdown.getText();
        console.log('Promise will look like this: ' + elementText);
    });

    it('should output text', function () {
        sc1_frontPage.goToMainPage();
        sc2_quickStartPage.languagesDropdown.getText().then(function (text) {
            expect(text).toEqual('Angular 2 for TypeScript');
        });

        //BUT expect() effectively unwraps promises, waiting on their resolution to run any associated assertion
        expect(sc2_quickStartPage.languagesDropdown.getText()).toEqual('Angular 2 for TypeScript');
    });

    //example when dealing with js promises
    it('should verify all values in dropdown', function () {
        sc1_frontPage.goToMainPage();
        sc2_quickStartPage.languagesDropdown.click();

        var testDataArray = browser.params.TEST_DATA.LANGUAGE_DROPDOWN;
        console.log(JSON.stringify(browser.params.TEST_DATA.LANGUAGE_DROPDOWN));

        var itemsPromise = sc2_quickStartPage.languagesDropdownAllValues.map(function (elm) {
            var counter1 = 0;
            elm.getText().then(function (text) {
                console.log(++counter1 + ". UIELEMENTS after map : " + text)
            });
            return elm.getText();
        });

        var expectedValues = _.map(testDataArray, function (elm) {
            var counter2 = 0;
            console.log(++counter2 + ". EXPECTEDVALUES after map : " + elm.VALUE);
            return elm.VALUE.toUpperCase();
        });

        itemsPromise.then(function (items) {
            _.each(items, function (value) {
                expect(_.contains(expectedValues, value)).toBeTruthy();
            });
            expect(items.length).toEqual(expectedValues.length);
        });
    });
});