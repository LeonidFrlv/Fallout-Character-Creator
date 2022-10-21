import React, {useState} from 'react';
import styles from './SkillsBlock.module.css';
import Count from '../Count/Count';
import cx from 'classnames';



const Skill = ({name, description, src, value, currentItem, setCurrentItem, playCurrentItemSound, skillsPoints, setSkillsPoints, playBtnSound}) => {
    const [currentSkill, setCurrentSkill] = useState({})

    const onSkillClick = () => {
        playCurrentItemSound()
        setCurrentItem({name, description, src})
    }

    const onSkillSelect = () => {
        if (currentSkill.name === name) {
            setCurrentSkill({})
            setSkillsPoints(prevItem => prevItem + 1)
            playBtnSound()
            return
        }
        if (!skillsPoints) return alert('Ti dolbaeb?')
        setCurrentItem({name, description, src})
        setCurrentSkill({name})
        setSkillsPoints(prevItem => prevItem - 1)
        playBtnSound()
    }

    return (
        <div className={styles.skill}>
            <button onClick={onSkillSelect} className={styles.skillBtn}>-</button>
            <div className={cx(styles.skillData, currentItem.name === name && styles.altColor, currentSkill.name === name && styles.selectedItem)} onClick={onSkillClick}>
                <div>{name}</div>
                <div>{value + '%'}</div>
            </div>
        </div>
    )
}

const SkillsBlock = ({skillsPoints, setSkillsPoints, skills, currentItem, setCurrentItem, playCurrentItemSound, playBtnSound}) => {



    return (
        <div className={styles.skillsBlockWrapper}>
            <div className={styles.header}>SKILLS</div>
            <div className={styles.skills}>
                {skills.map(item => (
                    <Skill {...item} playBtnSound={playBtnSound} currentItem={currentItem} setCurrentItem={setCurrentItem} playCurrentItemSound={playCurrentItemSound} skillsPoints={skillsPoints} setSkillsPoints={setSkillsPoints}/>
                ))}
            </div>
            <div className={styles.footer}>
                TAG SKILLS
                <Count value={skillsPoints}/>
            </div>
        </div>
    );
};

export default SkillsBlock;