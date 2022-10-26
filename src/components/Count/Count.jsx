import React from 'react';
import styles from './Count.module.css';



const Count = ({value}) => {

    return (
        <div className={styles.count}>
            {('0' + value).slice(-2)}
        </div>
    );
};

export default Count;