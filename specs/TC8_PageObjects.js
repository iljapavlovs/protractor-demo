'use strict';

var SC1_FrontPage = require(E2E_BASE_PATH + 'pages/SC1_FrontPage.js');
var SC2_QuickStartPage = require(E2E_BASE_PATH + 'pages/SC2_QuickStartPage.js');
describe('TC5 - Helpers', function () {
    var sc1_frontPage;
    var sc2_quickStartPage;

    beforeAll(function () {
        sc1_frontPage = new SC1_FrontPage();
        sc2_quickStartPage = new SC2_QuickStartPage();
    });

    beforeEach(function () {
        browser.get('https://angular.io/');
    });


    //Fluent API
    it('should choose different values from dropdown', function () {
        sc2_quickStartPage = sc1_frontPage.goToMainPage();
        sc2_quickStartPage
            .selectProgrammingLanguage('JavaScript')
            .selectProgrammingLanguage('Dart');
        expect(sc2_quickStartPage.languagesDropdown.getText()).toContain('Dart');
    });




});