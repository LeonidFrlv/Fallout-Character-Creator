import React from 'react';
import styles from './SpecialBlock.module.css';
import CharacterInfoBlock from "./CharacterInfoBlock/CharacterInfoBlock";
import Count from "../../Count/Count";
import cx from 'classnames';
import BtnClickSound from '../../../sounds/btnSound.mp3'

const Descriptions = [
    'Very bad', 'Bad', 'Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Great', 'Excellent', 'Heroic'
]

const SpecialStat = ({name, description, src, value, points, setPoints, currentItem, setSpecial, messages, specialKey, showMessage, playSound, selectItem}) => {
    const increase = (key) => (e) => {
        e.stopPropagation()
        if (!points) return;
        if (value >= 10) return showMessage(messages.specialError)
        playSound(BtnClickSound)
        setSpecial((prevItem) => ({
            ...prevItem,
            [key]: { ...prevItem[key], value: prevItem[key].value + 1 }
        }));
        setPoints(prevState => prevState - 1)
    };

    const decrease = (key) => (e) => {
        e.stopPropagation()
        if (value <= 1) return showMessage(messages.specialError)
        playSound(BtnClickSound)
        setSpecial((prevItem) => ({
            ...prevItem,
            [key]: { ...prevItem[key], value: prevItem[key].value - 1 }
        }));
        setPoints(prevState => prevState + 1)
    };

    return (
        <div className={styles.specialStat} onClick={selectItem(name, description, src)}>
            <div className={styles.statName}>
                {specialKey.slice(0, 2).toUpperCase()}
            </div>
            -
            <Count value={value}/>
            <div className={cx(styles.specialStatDesc, currentItem.name === name && styles.altColor)}>
                {Descriptions[value - 1]}
            </div>
            <div className={styles.controls}>
                <button onClick={increase(specialKey)} className={styles.countBtn}>+</button>
                <button onClick={decrease(specialKey)} className={styles.countBtn}>-</button>
            </div>
        </div>
    )
}

const SpecialBlock = ({points, setPoints, info, special, currentItem, characterState, setSpecial, messages, showMessage, playSound, selectItem}) => {
    const keys = Object.keys(special);
    return (
        <div className={styles.characterSpecialBlock}>
            <div className={styles.special}>
                <div className={styles.specialSelection}>
                    {keys.map(key => <SpecialStat
                        {...special[key]}
                        setPoints={setPoints}
                        points={points}
                        currentItem={currentItem}
                        setSpecial={setSpecial}
                        messages={messages}
                        specialKey={key}
                        showMessage={showMessage}
                        playSound={playSound}
                        selectItem={selectItem}
                    />)}
                </div>
                <div className={styles.charPoints} onClick={selectItem(messages.charPoints.name, messages.charPoints.description, messages.charPoints.src)}>
                    CHAR POINTS
                    <Count value={points}/>
                </div>
            </div>
            <CharacterInfoBlock
                info={info}
                characterState={characterState}
                currentItem={currentItem}
                selectItem={selectItem}
            />
        </div>
    );
};

export default SpecialBlock;
