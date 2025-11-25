// src/components/Toast.jsx
import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast toast-${type} fade-in`}>
            {type === 'success' && <span className="toast-icon">✓</span>}
            {message}
        </div>
    );
};

export default Toast;
