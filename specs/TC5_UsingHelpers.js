'use strict';

var SC1_FrontPage = require(E2E_BASE_PATH + 'pages/SC1_FrontPage.js');
var SC2_QuickStartPage = require(E2E_BASE_PATH + 'pages/SC2_QuickStartPage.js');
require(E2E_BASE_PATH + 'helper/elementFinderPrototype.js');
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


    it('should use prototype helper',function(){
        sc1_frontPage.goToMainPage();
        //used prototype
        expect(sc2_quickStartPage.languagesDropdown.hasClass('dropdown-button')).toBeTruthy();
    });
});