const log = require("next/dist/build/output/log");

const devLog = {};

for (const [name, fn] of Object.entries(log)) {
    devLog[name] = (...args) => {
        if (process.env.NODE_ENV === "development") {
            fn(...args);
        }
    };
}

module.exports = devLog;
