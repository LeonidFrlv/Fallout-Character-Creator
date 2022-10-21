import React, {useState, useEffect} from 'react';
import styles from './SpecialBlock.module.css';
import CharacterInfoBlock from "./CharacterInfoBlock/CharacterInfoBlock";
import Count from '../Count/Count';
import cx from 'classnames';


const Descriptions = [
    'Very bad', 'Bad', 'Poor', 'Fair', 'Average', 'Good', 'Very Good', 'Great', 'Excellent', 'Heroic'
]


const SpecialStat = ({name, description, src, value, points, setPoints, setCurrentItem, currentItem, playCurrentItemSound, playBtnSound, special, setSpecial}) => {
    const [statValue, setStatValue] = useState(value);

    const onSpecialStatClick = () => {
        playCurrentItemSound();
        setCurrentItem({name, description, src})
    }

    useEffect(() => {
        const currentStat = special.find(item => item.name === name)
        currentStat.value = statValue
        setSpecial(prevState => prevState.map(item => item.name === name ? currentStat : item))
    }, [statValue])

    const increase = () => {
        if (!points) return;
        if (statValue < 10) {
            playBtnSound()
            setStatValue(prevState => prevState + 1)
            setPoints(prevState => prevState - 1)
        }
    }

    const decrease = () => {
        if (statValue > 1) {
            playBtnSound()
            setStatValue(prevState => prevState - 1)
            setPoints(prevState => prevState + 1)
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
                <button onClick={increase} className={styles.countBtn}>+</button>
                <button onClick={decrease} className={styles.countBtn}>-</button>
            </div>
        </div>
    )
}

const SpecialBlock = ({points, setPoints, info, special, setCurrentItem, currentItem, playCurrentItemSound, playBtnSound, characterState, setSpecial}) => {

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
                        special={special}
                        info={info}
                        setSpecial={setSpecial}
                    />)}
                </div>
                <div className={styles.charPoints}>
                    CHAR POINTS
                    <Count value={points}/>
                </div>
            </div>
            <CharacterInfoBlock info={info} setCurrentItem={setCurrentItem} playCurrentItemSound={playCurrentItemSound} characterState={characterState} currentItem={currentItem}/>
        </div>
    );
};

export default SpecialBlock;
