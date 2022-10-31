import React from 'react';
import styles from "./SecondPage.module.css";
import downloadIcon from "./downloadIcon.png";

const SecondPage = ({setPage}) => {
    const cancelClick = () => setPage('first');

    return (
        <div className={styles.secondPage}>
            <div className={styles.secondPageMainWrapper}>
                Get You're Character!
                <button className={styles.btn}>
                    <img src={downloadIcon} alt={"downloadIcon"} className={styles.downloadImg}/>
                    Download TXT
                </button>
                <button className={styles.cancelBtn} onClick={cancelClick}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SecondPage;