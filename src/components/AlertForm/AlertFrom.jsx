import React from 'react';
import styles from './AlertForm.module.css';

const AlertFrom = ({setMessage, message}) => {
    console.log(message)
    const onCloseAlertClick = () => {
        setMessage([])
    }

    return (
        <div className={styles.modal}>
            <div className={styles.messageBorder}>
                <div className={styles.message}>
                    <div className={styles.messageText}>
                        {message && <div>{message}</div>}
                    </div>
                </div>
                <button onClick={onCloseAlertClick} className={styles.closeAlertBtn}>Done</button>
            </div>
        </div>
    );
};

export default AlertFrom;