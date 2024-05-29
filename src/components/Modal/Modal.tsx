import React from 'react';
import styles from './Modal.module.css';

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {children}
                <button className={styles.closeButton} onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default Modal;
