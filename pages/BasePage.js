/**
 * Created by ipavlov on 2/23/2016.
 */
'use strict';


var BasePage = function () {

    /**
     * Sets the current pageURL to given value
     * @param pageURL
     */
    this.setPageURL = function (pageURL) {
        this.pageURL = pageURL;
    };

    /**
     * Returns current set pageURL
     * @returns {*}
     */
    this.getPageURL = function () {
        return this.pageURL;
    };

    this.getPageTitle = function () {
        return browser.getTitle();
    }

};
module.exports = BasePage;