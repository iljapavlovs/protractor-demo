var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');
var currentdate = new Date();

var screenpath = 'Reports/'+ currentdate.getDate() + "-" + (currentdate.getMonth()+1) + "-" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/*.spec.js'],
  baseUrl: 'https://..../',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  onPrepare: function() {
// Add a screenshot reporter:
    jasmine.getEnv().addReporter(new HtmlReporter({
      /*baseDirectory: function crDir(){
       var currentdate = new Date();
       var datetime = currentdate.getDate() + "-"
       + (currentdate.getMonth()+1) + "-"
       + currentdate.getFullYear() + " @ "
       + currentdate.getHours() + currentdate.getMinutes() +
       currentdate.getSeconds();
       var screenpath = 'screenshots'+ "_" + datetime ;

       return screenpath;
       },*/
      baseDirectory: screenpath,
      takeScreenShotsOnlyForFailedSpecs: true,
      pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {

        var monthMap = {
          "1": "Jan",
          "2": "Feb",
          "3": "Mar",
          "4": "Apr",
          "5": "May",
          "6": "Jun",
          "7": "Jul",
          "8": "Aug",
          "9": "Sep",
          "10": "Oct",
          "11": "Nov",
          "12": "Dec"
        };

        var currentDate = new Date(),
            currentHoursIn24Hour = currentDate.getHours(),
            currentTimeInHours = currentHoursIn24Hour>12? currentHoursIn24Hour-12: currentHoursIn24Hour,
            totalDateString = currentDate.getDate()+'-'+ monthMap[currentDate.getMonth()+1]+ '-'+(currentDate.getYear()+1900) +
                '-'+ currentTimeInHours+'h-' + currentDate.getMinutes()+'m';

        return path.join(totalDateString,capabilities.caps_.browserName, descriptions.join('-'));
      }
    }));
  }
};