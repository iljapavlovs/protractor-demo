'use strict';

require(E2E_BASE_PATH + 'helper/elementFinderPrototype.js');
var BasePage = require(E2E_BASE_PATH + 'pages/BasePage.js');
var SC2_QuickstartPaqe = function () {

    // When using CSS Selectors as a locator, you can use the shortcut $() notation

    //made this element to be property of the QuickSTartPage object by prefixing 'this.' in order to have access to this field in test
    //so that it could be possible to verify value of this field
    this.languagesDropdown = $('button.dropdown-button.md-button');
    this.languagesDropdownAllValues = element.all(by.xpath('//a[.//*[contains(text(), "Angular 2 for ")]]'));
    this.packageJsonLink = element(by.linkText('package.json'));
    this.tourOfHeroesTutorialLink = element(by.linkText('Tour of Heroes Tutorial'));

    this.mainNavigationPanel = $('.main-nav.background-regal.l-pinned-top.l-layer-5');


    this.plunkerLink = element(by.linkText('plunker'));

    this.appendixHeader = element(by.id('appendix-systemjs-configuration'));

    var getLanguageDropdownValue = function (language) {
        return element(by.partialLinkText(('Angular 2 for ' + language).toUpperCase()));
    };

    this.selectProgrammingLanguage = function (language) {
        var self = this;
        self.languagesDropdown.click();
        getLanguageDropdownValue(language).click();
        return this;
    };

    this.goToPackageJsonSite = function () {
        this.packageJsonLink.click();
    };

    this.goToTutorial = function () {



        this.mainNavigationPanel.getHeight().then(function (size){
            console.log(size);
        });

        var scrollIntoView = function () {
            arguments[0].scrollIntoView();
        };
        browser.executeScript(scrollIntoView, this.tourOfHeroesTutorialLink.getWebElement());

        this.tourOfHeroesTutorialLink.click();
    };


    this.goToPlunkerWebsite = function () {
        this.plunkerLink.click();
    };

};
SC2_QuickstartPaqe.prototype = new BasePage();
module.exports = SC2_QuickstartPaqe;