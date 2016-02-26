(function () {

    'use strict';

    var ElementFinder = require('protractor').ElementFinder;

    ElementFinder.prototype.getWidth = function () {
        return this.getSize().then(function (size) {
            return size.width;
        });
    };

    ElementFinder.prototype.getHeight = function () {
        return this.getSize().then(function (size) {
            return size.height;
        });
    };


    /**
     * Indicates if the given style class is present on the current element.
     * @param classToMatch The class that need to be present.
     * @return <code>true</code> if present, else <code>false</code>.
     */
    ElementFinder.prototype.hasClass = function (classToMatch) {
        return this.getAttribute('class').then(function (classes) {
            return classes.indexOf(classToMatch) > -1;
        });
    };

    var HelperSize = function () {

        this.getElementHeight = function (elm) {
            return elm.getHeight().then(function (height) {
                return height;
            })
        };

    };

    module.exports = HelperSize;
})();
