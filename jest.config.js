module.exports = {
    testEnvironment: "jsdom",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx|js)$",
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
        'next/router': '<rootDir>/__mocks__/next/router.js',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/file-mock.js',
        'react-markdown': '<rootDir>/node_modules/react-markdown/react-markdown.min.js',
    },

};
