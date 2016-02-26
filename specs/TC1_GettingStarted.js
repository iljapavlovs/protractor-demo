'use strict';

var SC1_FrontPage = require(E2E_BASE_PATH + 'pages/SC1_FrontPage.js');
var SC2_QuickStartPage = require(E2E_BASE_PATH + 'pages/SC2_QuickStartPage.js');

describe('TC1 - Quickstart page', function () {
    var sc1_frontPage;
    var sc2_quickStartPage;

    /* beforeAll function is called only once before all the specs in describe are run
     here all global initializations should be done
    */
    beforeAll(function () {
        sc1_frontPage = new SC1_FrontPage();
        //sc2_quickStartPage = new SC2_QuickStartPage();
    });

    //beforeEach function is called once before each spec in the describe in which it is called
    beforeEach(function () {
        browser.get('https://angular.io/');
    });


    // simple example
    it('should navigate to Quickstart page', function () {
        expect(browser.getTitle()).toEqual('One framework. - Angular 2');
        sc1_frontPage.goToMainPage();
        expect(browser.getTitle()).toEqual('5 Min Quickstart - ts');
    });

});