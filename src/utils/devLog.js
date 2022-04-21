import * as log from "next/dist/build/output/log";

const devLog = {};

for (const [name, fn] of Object.entries(log)) {
    devLog[name] = (...args) => {
        if (process.env.NODE_ENV === "development") {
            fn(...args);
        }
    };
}

export default devLog;
