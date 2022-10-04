import React, {useState} from 'react';
import styles from './SpecialBlock.module.css';
import CharacterInfoBlock from "./CharacterInfoBlock/CharacterInfoBlock";
import Count from '../Count/Count';
import cx from 'classnames';


const Descriptions = [
    'Very bad', 'Bad', 'Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Great', 'Excellent', 'Heroic'
]

const SpecialStat = ({name, description, src, value, points, setPoints, setCurrentItem, currentItem, playCurrentItemSound, playBtnSound}) => {
    const [statValue, setStatValue] = useState(value);

    const onSpecialStatClick = () => {
        playCurrentItemSound();
        setCurrentItem({name: name, description: description, src: src})
    }

    const Increase = () => {
        if (points) {
            if (statValue < 10) {
                setStatValue(prevState => prevState + 1)
                setPoints(prevState => prevState - 1)
                playBtnSound()
            }
        }
    }

    const Decrease = () => {
        if (statValue > 1) {
            setStatValue(prevState => prevState - 1)
            setPoints(prevState => prevState + 1)
            playBtnSound()
        }
    }

    return (
        <div className={styles.specialStat}>
            <div className={styles.statName} onClick={onSpecialStatClick}>
                {name.slice(0, 2).toUpperCase()}
            </div>
            -
            <Count value={statValue}/>
            <div className={cx(styles.specialStatDesc, currentItem.name === name && styles.altColor)} onClick={onSpecialStatClick}>
                {Descriptions[statValue - 1]}
            </div>
            <div className={styles.controls}>
                <button onClick={Increase} className={styles.countBtn}>+</button>
                <button onClick={Decrease} className={styles.countBtn}>-</button>
            </div>
        </div>
    )
}

const SpecialBlock = ({info, special, setCurrentItem, currentItem, playCurrentItemSound, playBtnSound}) => {
    const [points, setPoints] = useState(5);

    return (
        <div className={styles.characterSpecialBlock}>
            <div className={styles.special}>
                <div className={styles.specialSelection}>
                    {special.map(item => <SpecialStat
                        {...item}
                        setPoints={setPoints}
                        points={points}
                        setCurrentItem={setCurrentItem}
                        currentItem={currentItem}
                        playCurrentItemSound={playCurrentItemSound}
                        playBtnSound={playBtnSound}
                    />)}
                </div>
                <div className={styles.charPoints}>
                    CHAR POINTS
                    <Count value={points}/>
                </div>
            </div>
            <CharacterInfoBlock info={info}/>
        </div>
    );
};

export default SpecialBlock;
