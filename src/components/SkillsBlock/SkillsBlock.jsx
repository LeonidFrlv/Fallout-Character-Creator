import React from 'react';
import styles from './SkillsBlock.module.css';
import Count from '../Count/Count';
import cx from 'classnames';



const Skill = ({name, description, src, value, currentItem, setCurrentItem, playCurrentItemSound}) => {

    const onSkillClick = () => {
        playCurrentItemSound()
        setCurrentItem({name: name, description: description, src: src})
    }

    return (
        <div className={styles.skill}>
            <button className={styles.skillBtn}>-</button>
            <div className={cx(styles.skillData, currentItem.name === name && styles.altColor)} onClick={onSkillClick}>
                <div>{name}</div>
                <div>{value + '%'}</div>
            </div>
        </div>
    )
}

const SkillsBlock = ({skills, currentItem, setCurrentItem, playCurrentItemSound}) => {



    return (
        <div className={styles.skillsBlockWrapper}>
            <div className={styles.header}>SKILLS</div>
            <div className={styles.skills}>
                {skills.map(item => (
                    <Skill {...item} currentItem={currentItem} setCurrentItem={setCurrentItem} playCurrentItemSound={playCurrentItemSound}/>
                ))}
            </div>
            <div className={styles.footer}>
                TAG SKILLS
                <Count value={'03'}/>
            </div>
        </div>
    );
};

export default SkillsBlock;