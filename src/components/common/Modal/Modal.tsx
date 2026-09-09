import {ReactNode, useEffect} from "react";
import styled from "styled-components";

export interface ModalProps {
    open: boolean;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    onClose: () => void;
    closeLabel?: string;
}

const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: ${({theme}) => theme.zIndices.modal};
    display: grid;
    place-items: center;
    padding: ${({theme}) => theme.spacing.lg};
    background: rgb(15 23 42 / 0.5);
`;

const Panel = styled.section`
    width: min(100%, 32rem);
    max-height: calc(100vh - 2rem);
    overflow: auto;
    display: grid;
    gap: ${({theme}) => theme.spacing.lg};
    padding: ${({theme}) => theme.spacing.xl};
    border-radius: ${({theme}) => theme.radii.lg};
    background: ${({theme}) => theme.colors.surface};
    color: ${({theme}) => theme.colors.text};
    box-shadow: ${({theme}) => theme.shadows.lg};
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({theme}) => theme.spacing.lg};
`;

const Title = styled.h2`
    margin: 0;
    font-size: ${({theme}) => theme.typography.fontSize.xl};
`;

const CloseButton = styled.button`
    border: 0;
    background: transparent;
    color: ${({theme}) => theme.colors.textMuted};
    font-size: 1.5rem;
    cursor: pointer;
`;

const Footer = styled.footer`
    display: flex;
    justify-content: flex-end;
    gap: ${({theme}) => theme.spacing.sm};
`;

export function Modal({
    open,
    title,
    children,
    footer,
    onClose,
    closeLabel = "Fermer",
}: ModalProps) {
    useEffect(() => {
        if (!open) return undefined;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose, open]);

    if (!open) return null;

    return (
        <Backdrop onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
        }}>
            <Panel role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <Header>
                    <Title id="modal-title">{title}</Title>
                    <CloseButton type="button" onClick={onClose} aria-label={closeLabel}>×</CloseButton>
                </Header>
                <div>{children}</div>
                {footer && <Footer>{footer}</Footer>}
            </Panel>
        </Backdrop>
    );
}
