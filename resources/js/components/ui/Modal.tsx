import React from 'react';

interface ModalProps {
    isOpen: boolean;
    title?: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, onConfirm, confirmLabel = 'OK', cancelLabel = 'Cancel', children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden osintra-modal">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-center text-2xl font-semibold text-[#3B4D3A]">{title}</h3>
                </div>

                <div className="p-6">
                    {children}
                </div>

                <div className="p-4 bg-gray-50 flex items-center justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-350 transition">{cancelLabel}</button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-[#3B4D3A] text-white hover:opacity-90 transition">{confirmLabel}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
