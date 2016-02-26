'use strict';
var PerfRunner = require('protractor-perf');

var SC1_FrontPage = require(E2E_BASE_PATH + 'pages/SC1_FrontPage.js');
var SC2_QuickStartPage = require(E2E_BASE_PATH + 'pages/SC2_QuickStartPage.js');
describe('TC5 - Helpers', function () {
    var perfRunner;
    var sc1_frontPage;
    var sc2_quickStartPage;

    beforeAll(function () {
        sc1_frontPage = new SC1_FrontPage();
        sc2_quickStartPage = new SC2_QuickStartPage();
        perfRunner = new PerfRunner(protractor, browser);
    });

    beforeEach(function () {
        browser.get('https://angular.io/');
    });


    it('should measure performance',function(){
        perfRunner.start();
        sc1_frontPage.goToMainPage();
        perfRunner.stop();

        if (perfRunner.isEnabled) {
            perfRunner.getStats('meanFrameTime').then(function(data){
                console.log('Mean frame time is: ' + data);
            });
            expect(perfRunner.getStats('meanFrameTime')).toBeLessThan(60);
        }

    });
});