import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children, initialToasts = [] }) {
    const [activeToasts, setActiveToasts] = useState(initialToasts);

    function dispatchToast(id, toast, duration = 5000) {
        setActiveToasts((prev) => [...prev, { id, content: toast }]);

        if (duration > 0) {
            setTimeout(() => {
                closeToast({ id });
            }, duration);
        }
    }

    function closeToast({ id }) {
        setActiveToasts((prev) => {
            const next = [...prev];
            next.splice(prev.findIndex((t) => t.id === id), 1);
            return next;
        });
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
