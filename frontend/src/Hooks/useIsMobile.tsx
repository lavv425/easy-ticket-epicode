import { useEffect, useState } from "react";

// const MOBILE_BREAKPOINT = 575;
const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile
 * @description Hook to check if the screen is mobile
 * @returns {boolean}
 * @example const isMobile = useIsMobile();
 */
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT);

    useEffect(() => {
        const ctrl = new AbortController();
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };

        window.addEventListener("resize", handleResize, ctrl);
        return () => ctrl.abort();
    }, []);

    return isMobile;
};