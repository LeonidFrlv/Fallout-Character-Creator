import React from 'react';
import styles from './FunctionalBtns.module.css';

const FunctionalBtns = ({special, traits, skills, messages, setMessage, setPage, name, setName, setGender, setAge, points, setPoints, skillsPoints, setSkillsPoints, setSpecial, setTraitsPoints, setSelectedTraits, setSelectedSkills}) => {

    const reset = () => {
        setName('None')
        setGender('Male')
        setAge('25')
        setPoints(5)
        // setSpecial(prevArr => prevArr.map(item => item.value !== 5 ? item.value = 5 : item))
        setTraitsPoints(2)
        setSelectedTraits([])
        setSkillsPoints(3)
        setSelectedSkills([])
    }

    const resetClick = () => {
        reset()
        setMessage(messages.resetMessage)
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const auto = () => {
        reset()
        let j;
        setSkillsPoints(0)
        setPoints(0)

        for (let i = 0; i < 3; i++) {
            let int = getRandomInt(0, skills.length - 1);
            setSelectedSkills(prevArr => [...prevArr, skills[int]])
        }
        for (let i = 0; i < getRandomInt(0, 2); i++) {
            setSelectedTraits(prevArr => [...prevArr, traits[getRandomInt(0, traits.length - 1)]])
        }
        setMessage(messages.autoMessage)
    }

    const done = () => {
        if (points) return setMessage(messages.charPointsError)
        if (skillsPoints) return setMessage(messages.tagSkillsError)
        if (name === 'None') return setMessage(messages.nameError)
        setPage('second')
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.btn} onClick={resetClick}>Reset</button>
            <button className={styles.btn} onClick={auto}>Auto</button>
            <button className={styles.btn} onClick={done}>Done</button>
        </div>
    );
};

export default FunctionalBtns;