import React, {useState, useEffect} from 'react';
import styles from './SkillsBlock.module.css';
import Count from "../../Count/Count";
import cx from 'classnames';

const Skill = ({name, description, src, value, currentItem, setCurrentItem, playCurrentItemSound, skillsPoints, setSkillsPoints, playBtnSound, selectedSkills, setSelectedSkills, setMessage, messages}) => {
    const [skillValue, setSkillValue] = useState(value)

    const onSkillClick = () => {
        playCurrentItemSound()
        setCurrentItem({name, description, src})
    }

    useEffect(() => {
        if (selectedSkills.length === 0) {
            setSkillValue(value)
        }
    })

    const onSkillSelect = () => {
        if (selectedSkills.some(item => item.name === name)) {
            setSelectedSkills(prevState => prevState.filter(item => item.name !== name && item))
            setSkillsPoints(prevItem => prevItem + 1)
            setSkillValue(prevState => prevState - 20)
            playBtnSound()
            return
        }
        if (!skillsPoints) return setMessage(messages.tagSkillsMessage)
        setCurrentItem({name, description, src})
        setSelectedSkills(prevState => [...prevState, {name, value: value + 20}])
        setSkillsPoints(prevItem => prevItem - 1)
        setSkillValue(prevState => prevState + 20)
        playBtnSound()
    }

    return (
        <div className={styles.skill}>
            <button onClick={onSkillSelect} className={styles.skillBtn}>-</button>
            <div className={cx(styles.skillData, currentItem.name === name && styles.altColor, selectedSkills.some(item => item.name === name) && styles.selectedItem)} onClick={onSkillClick}>
                <div>{name}</div>
                <div>{skillValue + '%'}</div>
            </div>
        </div>
    )
}

const SkillsBlock = ({skillsPoints, setSkillsPoints, skills, currentItem, setCurrentItem, playCurrentItemSound, playBtnSound, setMessage, messages, selectedSkills, setSelectedSkills, additionalMessages}) => {
    const onHeaderClick = () => setCurrentItem({...additionalMessages.skillsHeader});
    const onFooterClick = () => setCurrentItem({...additionalMessages.tagSkills})

    return (
        <div className={styles.skillsBlockWrapper}>
            <div className={styles.header} onClick={onHeaderClick}>SKILLS</div>
            <div className={styles.skills}>
                {skills.map(item => (
                    <Skill
                        {...item}
                        playBtnSound={playBtnSound}
                        currentItem={currentItem}
                        setCurrentItem={setCurrentItem}
                        playCurrentItemSound={playCurrentItemSound}
                        skillsPoints={skillsPoints}
                        setSkillsPoints={setSkillsPoints}
                        selectedSkills={selectedSkills}
                        setSelectedSkills={setSelectedSkills}
                        setMessage={setMessage}
                        messages={messages}
                    />
                ))}
            </div>
            <div className={styles.footer} onClick={onFooterClick}>
                TAG SKILLS
                <Count value={skillsPoints}/>
            </div>
        </div>
    );
};

export default SkillsBlock;