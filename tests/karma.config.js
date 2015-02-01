module.exports = function(config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        files:[
            // libraries
            'libraries/angular/angular.js',
            'libraries/angular-mocks/angular-mocks.js',
            // src
            'src/**/*.js',
            // tests
            'tests/specs/**/*.js',
        ],
        exclude: [
            "App/test/**/*.js"
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['dots', 'junit', 'html', 'coverage'],
        preprocessors: {
            '!(|*coverage|*tests|*libraries)/**/*.js': ['coverage']
        },

        // the default configuration
        junitReporter: {
            outputFile: 'tests/results/test-results.xml',
            suite: ''
        },
        htmlReporter: {
            outputFile: 'tests/results/unitTestingResults.html'
        },
        coverageReporter: {
            type : 'html',
            dir : 'tests/results/coverage/unitTestingResults/'
        },

        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Start these browsers, currently available:
        // - Chrome - ChromeCanary - Firefox - Opera - Safari (only Mac) - PhantomJS - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        // Continuous Integration mode
        // if true, it capture browsers, run test and exit
        singleRun: true,

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-html-reporter',
            'karma-coverage'
        ]
    });
};