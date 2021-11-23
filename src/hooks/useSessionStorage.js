import { useEffect, useState } from "react";

const createKey = (key, field) => `${key}.${field}`;

export default function useSessionStorage(key, initialData) {
    const [ sessionStorage, setSessionStorage ] = useState(null);
    const [ data, setData ] = useState(initialData);

    useEffect(() => {
        const sessionStorage = window.sessionStorage;

        const loadedData = {};
        for (const field of Object.keys(initialData)) {
            const fieldData = sessionStorage.getItem(createKey(key, field));
            if (fieldData !== null) {
                loadedData[field] = fieldData;
            }
        }

        setSessionStorage(sessionStorage);
        setData((oldData) => ({ ...oldData, ...loadedData }));
    }, [ key, initialData ]);

    const updateDataField = (field) => (newValue) => {
        if (newValue === initialData[field]) {
            sessionStorage?.removeItem(createKey(key, field));
        } else {
            sessionStorage?.setItem(createKey(key, field), newValue);
        }

        setData((oldData) => ({
            ...oldData,
            [field]: newValue
        }));
    };

    return {
        data,
        updateDataField
    };
}
