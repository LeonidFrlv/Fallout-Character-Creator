import React from 'react';
import styles from './LoaderPage.module.css';
import VaultBoyImg from '../../Images/vaultBoy.png';

const LoaderPage = () => {
    return (
        <div className={styles.loader}>
            <img className={styles.loaderImg} src={VaultBoyImg} alt={'Vault Boy Img'}/>
            <p className={styles.loaderText}>PLEASE STAND BY</p>
        </div>
    );
};

export default LoaderPage;