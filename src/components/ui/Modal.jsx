import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../services/icon";
import "./Modal.css";

export default function Modal({ open, onClose, title, children, maxWidth = 480}) {
    useEffect(() => {
        if (!open) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div className="sc-modal-backdrop" onMouseDown={onClose}>
            <div
                className="sc-modal"
                style={{ maxWidth }}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="sc-modal__header">
                    {title && <h3 className="sc-modal__title">{title}</h3>}
                    <button className="sc-modal__close" onClick={onClose} aria-label="Tutup">
                        <CloseIcon />
                    </button>
                </div>
                <div className="sc-modal__body">{children}</div>
            </div>
        </div>,
        document.body
    );
}