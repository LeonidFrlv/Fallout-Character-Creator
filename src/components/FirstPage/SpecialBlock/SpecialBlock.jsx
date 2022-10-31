import React from 'react';
import styles from './SpecialBlock.module.css';
import CharacterInfoBlock from "./CharacterInfoBlock/CharacterInfoBlock";
import Count from "../../Count/Count";
import cx from 'classnames';

const Descriptions = [
    'Very bad', 'Bad', 'Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Great', 'Excellent', 'Heroic'
]

const SpecialStat = ({name, description, src, value, points, setPoints, setCurrentItem, currentItem, playCurrentItemSound, playBtnSound, setSpecial, messages, setMessage, specialKey}) => {
    const onSpecialStatClick = () => {
        playCurrentItemSound();
        setCurrentItem({name, description, src})
    }

    const increase = (key) => () => {
        if (!points) return;
        if (value >= 10) return setMessage(messages.specialError)
        playBtnSound()
        setSpecial((prevItem) => ({
            ...prevItem,
            [key]: { ...prevItem[key], value: prevItem[key].value + 1 }
        }));
        setPoints(prevState => prevState - 1)
    };

    const decrease = (key) => () => {
        if (value <= 1) return setMessage(messages.specialError)
        playBtnSound()
        setSpecial((prevItem) => ({
            ...prevItem,
            [key]: { ...prevItem[key], value: prevItem[key].value - 1 }
        }));
        setPoints(prevState => prevState + 1)
    };

    return (
        <div className={styles.specialStat}>
            <div className={styles.statName} onClick={onSpecialStatClick}>
                {specialKey.slice(0, 2).toUpperCase()}
            </div>
            -
            <Count value={value}/>
            <div className={cx(styles.specialStatDesc, currentItem.name === name && styles.altColor)} onClick={onSpecialStatClick}>
                {Descriptions[value - 1]}
            </div>
            <div className={styles.controls}>
                <button onClick={increase(specialKey)} className={styles.countBtn}>+</button>
                <button onClick={decrease(specialKey)} className={styles.countBtn}>-</button>
            </div>
        </div>
    )
}

const SpecialBlock = ({points, setPoints, info, special, setCurrentItem, currentItem, playCurrentItemSound, playBtnSound, characterState, setSpecial, messages, setMessage, additionalMessages}) => {
    const keys = Object.keys(special);
    const charPointsClick = () => setCurrentItem({...additionalMessages.charPoints});

    return (
        <div className={styles.characterSpecialBlock}>
            <div className={styles.special}>
                <div className={styles.specialSelection}>
                    {keys.map(key => <SpecialStat
                        {...special[key]}
                        setPoints={setPoints}
                        points={points}
                        setCurrentItem={setCurrentItem}
                        currentItem={currentItem}
                        playCurrentItemSound={playCurrentItemSound}
                        playBtnSound={playBtnSound}
                        setSpecial={setSpecial}
                        setMessage={setMessage}
                        messages={messages}
                        specialKey={key}
                    />)}
                </div>
                <div className={styles.charPoints} onClick={charPointsClick}>
                    CHAR POINTS
                    <Count value={points}/>
                </div>
            </div>
            <CharacterInfoBlock
                info={info}
                setCurrentItem={setCurrentItem}
                playCurrentItemSound={playCurrentItemSound}
                characterState={characterState}
                currentItem={currentItem}
            />
        </div>
    );
};

export default SpecialBlock;
