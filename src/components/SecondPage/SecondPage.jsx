import React from 'react';
import styles from "./SecondPage.module.css";
import downloadIcon from "./downloadIcon.png";

const SecondPage = ({setPage, special, name, age, gender, selectedSkills, selectedTraits}) => {

    const final_data = `Name: ${name},
Age: ${age},
Gender: ${gender},

S.P.E.C.I.A.L:
    Strength: ${special.st.value},
    Perception: ${special.pe.value},
    Endurance: ${special.en.value},
    Charisma: ${special.ch.value},
    Intelligence: ${special.int.value},
    Agility: ${special.ag.value},
    Luck: ${special.lk.value}.
    
Selected Skills:
    ${selectedSkills[0]?.name},
    ${selectedSkills[1]?.name},
    ${selectedSkills[2]?.name}.

Selected Traits:
    ${selectedTraits[0]?.name},
    ${selectedTraits[1]?.name}.`

    const download = (filename, text) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const downloadClick = () => {
        download("character.txt", final_data)
        window.location.reload()
    };
    const cancelClick = () => setPage('first');

    return (
        <div className={styles.secondPage}>
            <div className={styles.secondPageMainWrapper}>
                Get You're Character!
                <button className={styles.btn} onClick={downloadClick}>
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