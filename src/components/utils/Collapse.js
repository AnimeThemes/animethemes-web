import { m } from "framer-motion";

export function Collapse({ collapse, children }) {
    if (collapse) {
        return null;
    }

    return (
        <m.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "tween", duration: 0.35, ease: [ 0, 0.66, 0.46, 0.98 ] }}
        >
            {children}
        </m.div>
    );
}
