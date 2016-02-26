'use strict';

var BasePage = require(E2E_BASE_PATH + 'pages/BasePage.js');
var SC3_NonAngularPage = function () {

    this.plunkersLink = function (){
        return element(by.linkText('Plunks'));
    };
    this.navBar = function() {
        return element(by.id('blueBarDOMInspector'));
    };

    this.logo = function() {
        return element(by.className('fb_logo'));
    }
};
SC3_NonAngularPage.prototype = new BasePage();
module.exports = SC3_NonAngularPage;
