import styles from '../styles/Popup.module.css';

interface PopupProps {
    message: string | null;
    onClose: () => void;
}

export default function Popup({ message, onClose }: PopupProps) {
    if (!message) return null;

    const handleClose = () => {
        onClose();
        window.location.reload();
    };

    return (
        <div className={styles.popupOverlay} onClick={handleClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <p>{message}</p>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}
