import React from 'react';
import styles from './FunctionalBtns.module.css';
import {cloneDeep} from "lodash";


const FunctionalBtns = ({special, traits, skills, messages, setPage, name, setName, setGender, setAge, points, setPoints, skillsPoints, setSkillsPoints, setSpecial, setTraitsPoints, setSelectedTraits, setSelectedSkills, showMessage}) => {

    const reset = () => {
        setName('None')
        setGender('Male')
        setAge('25')
        setPoints(5)
        setSpecial(prevState => {
            const obj = cloneDeep(special)
            for (let key in obj) {
                obj[key].value = 5
            }
            return obj
        })
        setTraitsPoints(2)
        setSelectedTraits([])
        setSkillsPoints(3)
        setSelectedSkills([])
    }

    const resetClick = () => {
        reset()
        showMessage(messages.resetMessage)
    }

    // function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1) + min);
    // }

    // const auto = () => {
    //     reset()
    //     let j;
    //     setSkillsPoints(0)
    //     setPoints(0)
    //
    //     for (let i = 0; i < 3; i++) {
    //         let int = getRandomInt(0, skills.length - 1);
    //         setSelectedSkills(prevArr => [...prevArr, skills[int]])
    //     }
    //     for (let i = 0; i < getRandomInt(0, 2); i++) {
    //         setSelectedTraits(prevArr => [...prevArr, traits[getRandomInt(0, traits.length - 1)]])
    //     }
    //     showMessage(messages.autoMessage)
    // }

    const done = () => {
        if (points) return showMessage(messages.charPointsError)
        if (skillsPoints) return showMessage(messages.tagSkillsError)
        if (name === 'None') return showMessage(messages.nameError)
        setPage('second')
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.btn} onClick={resetClick}>Reset</button>
            <button className={styles.btn}>Auto</button>
            <button className={styles.btn} onClick={done}>Done</button>
        </div>
    );
};

export default FunctionalBtns;