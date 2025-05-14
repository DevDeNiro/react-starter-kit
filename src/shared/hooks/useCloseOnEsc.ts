import { useEffect } from "react";

function useCloseOnEsc(
    open: boolean,
    setOpen: (open: boolean) => void,
    eventType: keyof HTMLElementEventMap = "click",
) {
    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (!open || e.key !== "Escape") return;
            setOpen(false);
        };

        if (open) {
            document.addEventListener("keydown", keyHandler);
            return () => document.removeEventListener("keydown", keyHandler);
        }
    }, [open, setOpen, eventType]);
}

export default useCloseOnEsc;
