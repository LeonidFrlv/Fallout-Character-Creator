import React from 'react';
import styles from './AlertForm.module.css';

const AlertFrom = ({setError, error}) => {
    const onCloseAlertClick = () => {
        setError([])
    }

    return (
        <div className={styles.modal}>
            <div className={styles.errorMessageBorder}>
                <div className={styles.errorMessage}>
                    <div className={styles.errorText}>
                        {/*You must use all Character Points before starting the game!*/}
                        {error.map(item => <div>{item.value}</div>)}
                    </div>
                </div>
                <button onClick={onCloseAlertClick} className={styles.closeAlertBtn}>Done</button>
            </div>
        </div>
    );
};

export default AlertFrom;