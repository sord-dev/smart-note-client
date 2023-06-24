module.exports = {
    testEnvironment: "jsdom",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx|js)$",
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    }
};
