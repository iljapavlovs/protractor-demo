'use strict';
var helpers = require('protractor-helpers');
var SC1_FrontPage = require(E2E_BASE_PATH + 'pages/SC1_FrontPage.js');
var SC2_QuickStartPage = require(E2E_BASE_PATH + 'pages/SC2_QuickStartPage.js');
var SC3_NonAngularPage = require(E2E_BASE_PATH + 'pages/SC3_NonAngularPage.js');
require(E2E_BASE_PATH + 'helper/elementFinderPrototype.js');
describe('TC7 - Non-angular app', function () {
    var sc1_frontPage;
    var sc2_quickStartPage;
    var sc3_nonAngularPage;
    var EC;

    beforeAll(function () {
        sc1_frontPage = new SC1_FrontPage();
        sc2_quickStartPage = new SC2_QuickStartPage();
        sc3_nonAngularPage = new SC3_NonAngularPage();
        EC = protractor.ExpectedConditions;
    });

    beforeEach(function () {
        browser.get('https://angular.io/');
        sc1_frontPage.goToMainPage();

    });
    afterAll(function () {
        browser.ignoreSynchronization = false;
    });
    it('should switch to non-angular app', function () {

        //turning off synchronazation with angular - it will not send addition async call before each action
        browser.ignoreSynchronization = true;
        var condition = EC.and( EC.presenceOf(sc3_nonAngularPage.logo()),EC.titleIs('Facebook - Log In or Sign Up'));


        browser.driver.get('https://facebook.com/');
        browser.driver.wait(condition, 5000);

        expect(browser.driver.getTitle()).toEqual('Facebook - Log In or Sign Up');

    });
});