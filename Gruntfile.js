/**
 * Created by ipavlov on 2/18/2016.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON('package.json'),

        protractor: {
            options: {
                keepAlive: true, //If false, grunt process stops when test fails
                configFile: "node_modules/protactor/docs/referenceConf.js",
                noColor: false,//If true, protractor will not use colors in output
                webdriverManagerUpdate: true//Runs webdriver-manager update in project dir for updating Selenium sources.
            },

            simpleProtTarget: {
                options: {
                    configFile: "simple.conf.js"
                }
            },

            mainProtTarget: {
                options: {
                    configFile: "conf.js" //Target-specific config file
                }
            },
            perfProtTarget: {
                options: {
                    configFile: "perf.conf.js"
                }
            },
            pluginsProtTarget: {
                options: {
                    configFile: "conf-pluginsDemo.js"
                }
            },
            parallelProtTarget: {
                options: {
                    configFile: "parallel.conf.js"
                }
            }
        }

    });

    //load grunt plugins
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-shell');

    //registering tasks
    grunt.registerTask('e2e', ['protractor:mainProtTarget']);

    grunt.registerTask('e2ePerf', ['protractor:perfProtTarget']);
    grunt.registerTask('e2ePlugins', ['protractor:pluginsProtTarget']);
    grunt.registerTask('e2eSimple', ['protractor:simpleProtTarget']);
    grunt.registerTask('e2eParallel', ['protractor:parallelProtTarget']);
};