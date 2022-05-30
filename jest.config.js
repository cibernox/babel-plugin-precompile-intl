export default {
  bail: false,
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
        tsConfig: "tsconfig.json",
    },
  },
  testMatch: ["**/?(*.)+(spec|test).(ts|js)?(x)"],
  verbose: true
};
