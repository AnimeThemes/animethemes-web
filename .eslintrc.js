module.exports = {
    globals: {
        __PATH_PREFIX__: true,
    },
    extends: "react-app",
    rules: {
        "quotes": ["error", "double"],
        "curly": ["error", "all"],
        "linebreak-style": ["error", "unix"],
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        "react/react-in-jsx-scope": "off",
        "react/self-closing-comp": "error"
    }
};
