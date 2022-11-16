import React, {useState, useEffect} from 'react';
import styles from './SkillsBlock.module.css';
import Count from "../../Count/Count";
import cx from 'classnames';
import BtnClickSound from '../../../sounds/btnSound.mp3'
const Skill = ({name, description, src, value, currentItem, skillsPoints, setSkillsPoints, selectedSkills, setSelectedSkills, messages, showMessage, playSound, selectItem}) => {
    const [skillValue, setSkillValue] = useState(value)

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
            playSound(BtnClickSound)
            return
        }
        if (!skillsPoints) return showMessage(messages.tagSkillsMessage)
        selectItem({name, description, src})
        setSelectedSkills(prevState => [...prevState, {name, value: value + 20}])
        setSkillsPoints(prevItem => prevItem - 1)
        setSkillValue(prevState => prevState + 20)
        playSound(BtnClickSound)
    }

    return (
        <div className={styles.skill}>
            <button onClick={onSkillSelect} className={styles.skillBtn}>-</button>
            <div className={cx(styles.skillData, currentItem.name === name && styles.altColor, selectedSkills.some(item => item.name === name) && styles.selectedItem)} onClick={selectItem(name, description, src)}>
                <div>{name}</div>
                <div>{skillValue + '%'}</div>
            </div>
        </div>
    )
}

const SkillsBlock = ({skillsPoints, setSkillsPoints, skills, currentItem, messages, selectedSkills, setSelectedSkills, showMessage, playSound, selectItem}) => {
    return (
        <div className={styles.skillsBlockWrapper}>
            <div className={styles.header} onClick={selectItem(messages.skillsHeader.name, messages.skillsHeader.description, messages.skillsHeader.src)}>SKILLS</div>
            <div className={styles.skills}>
                {skills.map(item => (
                    <Skill
                        {...item}
                        currentItem={currentItem}
                        skillsPoints={skillsPoints}
                        setSkillsPoints={setSkillsPoints}
                        selectedSkills={selectedSkills}
                        setSelectedSkills={setSelectedSkills}
                        messages={messages}
                        showMessage={showMessage}
                        playSound={playSound}
                        selectItem={selectItem}
                    />
                ))}
            </div>
            <div className={styles.footer} onClick={selectItem(messages.tagSkills.name, messages.tagSkills.description, messages.tagSkills.src)}>
                TAG SKILLS
                <Count value={skillsPoints}/>
            </div>
        </div>
    );
};

export default SkillsBlock;