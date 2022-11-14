import React from 'react';
import styles from './LoaderPage.module.css';
import VaultBoyImg from '../../Images/vaultBoy.png';

const LoaderPage = () => {
    return (
        <div className={styles.loader}>
            <img src={VaultBoyImg} alt={'Vault Boy Img'}/>
            <p className={styles.standByText}>PLEASE STAND BY</p>
            <div className={styles.animatedSquares}>
                <div className={styles.square}></div>
                <div className={styles.square}></div>
                <div className={styles.square}></div>
                <div className={styles.square}></div>
                <div className={styles.square}></div>
            </div>
        </div>
    );
};

export default LoaderPage;