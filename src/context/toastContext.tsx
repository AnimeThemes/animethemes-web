import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface IToastContext {
    activeToasts: Array<Toast>
    dispatchToast: (id: string, toast: ReactNode, duration?: number) => void
    closeToast: (id: string) => void
}

const ToastContext = createContext<IToastContext>({
    activeToasts: [],
    dispatchToast: () => { /* Do nothing. */ },
    closeToast: () => { /* Do nothing. */ },
});

interface Toast {
    id: string
    content: ReactNode
    timeoutId?: number
}

interface ToastProviderProps {
    children?: ReactNode
    initialToasts?: Array<Toast>
}

export function ToastProvider({ children, initialToasts = [] }: ToastProviderProps) {
    const [activeToasts, setActiveToasts] = useState(initialToasts);

    function dispatchToast(id: string, toast: ReactNode, duration = 5000) {
        let timeoutId: number;

        if (duration > 0) {
            timeoutId = window.setTimeout(() => closeToast(id), duration);
        }

        setActiveToasts((prev) => {
            const duplicates = prev.filter((other) => id === other.id);

            duplicates.forEach((duplicate) => clearTimeout(duplicate.timeoutId));

            const next = prev.filter((other) => id !== other.id);

            next.push({ id, content: toast, timeoutId });

            return next;
        });
    }

    function closeToast(id: string) {
        setActiveToasts((prev) => prev.filter((toast) => toast.id !== id));
    }

    const value: IToastContext = {
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
