'use strict';
var SC1_FrontPage = require(E2E_BASE_PATH + 'pages/SC1_FrontPage.js');
var SC2_QuickStartPage = require(E2E_BASE_PATH + 'pages/SC2_QuickStartPage.js');

var using = require('jasmine-data-provider');
describe('TC2 - DDT - test parametrixation', function () {

    var sc1_frontPage;
    var sc2_quickStartPage;

    beforeAll(function () {
        sc1_frontPage = new SC1_FrontPage();
        sc2_quickStartPage = new SC2_QuickStartPage();
    });

    beforeEach(function () {
        browser.get('https://angular.io/');
    });

    /*we can parametrize our test data just by accessing it as JS objects from external files.
     We can do that in 2 ways:
     1. In each file do nodejs 'require' for each test data file. e.g.
     2. declare all test data in params property of configuration file and access it by prefixing 'browser.params.'
     It will be visible in all files, so you don`t need to do 'require' in each file.
     */
    it('should choose a value (' + browser.params.TEST_DATA.Languages[2] + ') from dropdown', function () {
        sc1_frontPage.goToMainPage();
        sc2_quickStartPage.selectProgrammingLanguage(browser.params.TEST_DATA.Languages[2]);
        expect(sc2_quickStartPage.languagesDropdown.getText()).toContain(browser.params.TEST_DATA.Languages[2]);
    });

    /*
     Using is jasmine-data-provider node module declared at the top.
     With this you can reuse the same test with different test data parameters.
     */
    using(['TypeScript', 'JavaScript', 'Dart'], function (data) {
        it('should choose a value (' + data + ') from dropdown', function () {
            sc1_frontPage.goToMainPage();
            sc2_quickStartPage.selectProgrammingLanguage(data);
            expect(sc2_quickStartPage.languagesDropdown.getText()).toContain(data);
        });
    });

});