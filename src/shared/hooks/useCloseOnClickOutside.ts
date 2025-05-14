import React, { useEffect } from "react";

function useCloseOnClickOutside(
    ref: React.RefObject<HTMLElement>,
    open: boolean,
    setOpen: (open: boolean) => void,
    eventType: keyof HTMLElementEventMap = "click",
) {
    useEffect(() => {
        const clickHandler = (event: Event) => {
            if (!open || ref.current?.contains(event.target as Node)) return;
            setOpen(false);
        };

        document.addEventListener(eventType, clickHandler as EventListener);
        return () =>
            document.removeEventListener(
                eventType,
                clickHandler as EventListener,
            );
    }, [open, setOpen, ref, eventType]);
}

export default useCloseOnClickOutside;
