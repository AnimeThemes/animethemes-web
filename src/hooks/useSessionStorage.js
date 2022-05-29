import { useEffect, useState } from "react";

export default function useSessionStorage(key, initialData) {
    const [ data, setData ] = useState(initialData);

    useEffect(() => {
        setData((oldData) => {
            const storageData = sessionStorage.getItem(key);
            if (storageData !== null) {
                return { ...oldData, ...JSON.parse(storageData) };
            }
            return oldData;
        });
    }, [ key ]);

    const updateDataField = (field) => (newValue) => {
        const storageData = sessionStorage.getItem(key);
        const newData = storageData ? JSON.parse(storageData) : { ...initialData };

        newData[field] = newValue;

        sessionStorage.setItem(key, JSON.stringify(newData));

        setData(newData);
    };

    return {
        data,
        updateDataField
    };
}
