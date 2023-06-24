module.exports = {
    presets: [
        "@babel/preset-react",
        [
            "@babel/preset-env",
            {
                targets: {
                    browsers: "last 2 versions", // Specify the browsers you want to support
                },
            },
        ],
    ],
};
