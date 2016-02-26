'use strict';

var SC2_QuickStartPage = require(E2E_BASE_PATH + 'pages/SC2_QuickStartPage.js');
var BasePage = require(E2E_BASE_PATH + 'pages/BasePage.js');
var SC1_FrontPage = function () {

    //if elements written with this. then they are part of the page objects and can be accessed outside of this object (in tests)
    this.getStartedButton = element(by.linkText('GET STARTED'));

    this.goToMainPage = function () {
        this.getStartedButton.click();
        //additionally navigation methods can return other Page Objects
        //return new SC2_QuickStartPage();
    };
};
SC1_FrontPage.prototype = new BasePage();
module.exports = SC1_FrontPage;


