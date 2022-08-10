module.exports = {
    "preset": "react-native",
	"collectCoverage": true,
    "moduleFileExtensions": ['ts', 'tsx', 'js', 'jsx', 'json','node'],
    "setupFilesAfterEnv": [
        "<rootDir>setupTests.js",
         "@testing-library/jest-native/extend-expect"
      ],
      "coveragePathIgnorePatterns": [// Files which needs to be ignored during coverage show. Default value is /node_modules/.
		 "<rootDir>setupTests.js",
         "<rootDir>/node_modules/"
	],
	"modulePathIgnorePatterns": [// An array of regexp pattern strings that are matched against all module paths before those paths are to be considered 'visible' to the module loader. If a given module's path matches any of the patterns, it will not be require()-able in the test environment.
		 "<rootDir>setupTests.js"
	],
    "moduleNameMapper":{
        //If you mock any of the library in jest/mock for your project need to add that mocked file path so jest will refer that path while we run the testcase
    },
    "transformIgnorePatterns": [
        + "@react-navigation/native"
        + "@react-navigation/native-stack"
        + "react-native-screens"],
//     "fakeTimers": {
//         "doNotFake": ["nextTick"],
//         "timerLimit": 1000,
//         "enableGlobally": true,
//         "legacyFakeTimers": true
//   }
  };