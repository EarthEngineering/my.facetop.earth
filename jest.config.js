module.exports = {
  "clearMocks": true,
  "logHeapUsage": true,
  "globals": {
    "ts-jest": {
      "diagnostics": {
        "ignoreCodes": [
          151001
        ]
      }
    },
    "globalConfig": {
      "NODE_ENV": "development",
      "TOS_URL": "http://www.facetop.earth/tos/",
      "PRIV_URL": "http://www.facetop.earth/privacy/",
      "LONG_REVISION": "------------",
      "SHORT_REVISION": "--------"
    }
  },
  "setupFiles": [
    "./frontend/__test_support__/setup_enzyme.js",
    "./frontend/__test_support__/localstorage.js",
    "./frontend/__test_support__/mock_fbtoaster.ts",
    "./frontend/__test_support__/mock_i18next.ts",
    "./frontend/__test_support__/additional_mocks.tsx"
  ],
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "frontend/**/*.{ts,tsx}"
  ],
  "reporters": [
    "default",
    "jest-skipped-reporter"
  ],
  "coverageReporters": [
    "html",
    "json",
    "lcov"
  ],
  "coverageDirectory": "<rootDir>/coverage_fe",
  "setupFilesAfterEnv": [
    "<rootDir>/frontend/__test_support__/customMatchers.js"
  ]
}
