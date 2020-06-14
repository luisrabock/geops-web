module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    extends: ["airbnb"],
    plugins: ["react"],
    rules: {
        "no-console": "off",
        "linebreak-style": 0,
        "no-confusing-arrow": "off",
        "consistent-return": "off",
        "class-methods-use-this": "off",
        "eslint no-useless-escape": "off",
    },
};
