exports.config = {
    specs: ['t_spec.js'],
  directConnect: true,
    capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 500000,
        includeStackTrace: true
    },
    beforeLaunch: function () {
         // browser.ignoreSynchronization = false;
  },
        onPrepare: function() {
        var reporterOptions = {
            displayStacktrace: true, // display stacktrace for each failed assertion
            displayFailuresSummary: true, // display summary of all failures after execution
            displaySuccessfulSpec: true, // display each successful spec
            displayFailedSpec: true, // display each failed spec
            displayPendingSpec: false, // display each pending spec
            displaySpecDuration: false, // display each spec duration
            displaySuiteNumber: false, // display each suite number (hierarchical)
            colors: {
                success: "green",
                failure: "red",
                pending: "cyan"
            },
            prefixes: {
                success: "✓ ",
                failure: "✗ ",
                pending: "- "
            },
            customProcessors: []
        };
  }
};
