'use strict';

var SC1_FrontPage = require(E2E_BASE_PATH + 'pages/SC1_FrontPage.js');
var SC2_QuickStartPage = require(E2E_BASE_PATH + 'pages/SC2_QuickStartPage.js');
describe('TC4 - Timeouts', function () {


    var sc1_frontPage;
    var sc2_quickStartPage;

    beforeAll(function () {
        sc1_frontPage = new SC1_FrontPage();
        sc2_quickStartPage = new SC2_QuickStartPage();
    });

    beforeEach(function () {
        browser.get('https://angular.io/');
    });

    /*
    Timeouts
    */
    it('should timeout',function(){
        sc1_frontPage.goToMainPage();
        browser.sleep(20000);
        //will timeout due to defaultTimeoutInterval: 15000 in conf.js
    });


    it('should not timeout',function(){
        sc1_frontPage.goToMainPage();
        browser.sleep(10000);
        //since we have overided timeout explicitly as 2nd parameter to the function
    }, 12000);
});