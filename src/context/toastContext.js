import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children, initialToasts = [] }) {
    const [activeToasts, setActiveToasts] = useState(initialToasts);

    function dispatchToast(id, toast, duration = 5000) {
        let timeoutId = null;

        if (duration > 0) {
            timeoutId = setTimeout(() => closeToast(id), duration);
        }

        setActiveToasts((prev) => {
            const duplicates = prev.filter((other) => id === other.id);

            duplicates.forEach((duplicate) => clearTimeout(duplicate.timeoutId));

            const next = prev.filter((other) => id !== other.id);

            next.push({ id, content: toast, timeoutId });

            return next;
        });
    }

    function closeToast(id) {
        setActiveToasts((prev) => prev.filter((toast) => toast.id !== id));
    }

    const value = {
        activeToasts,
        dispatchToast,
        closeToast
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToasts() {
    return useContext(ToastContext);
}
