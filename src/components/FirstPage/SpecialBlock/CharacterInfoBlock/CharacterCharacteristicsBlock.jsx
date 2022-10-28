import React from 'react';
import cx from "classnames";
import styles from "./CharacterInfoBlock.module.css";


const Characteristic = ({name, description, src, value, currentItem, setCurrentItem, playCurrentItemSound}) => {


    const onCharacteristicClick = () => {
        playCurrentItemSound();
        setCurrentItem({name, description, src})
    }

    return (
        <div className={cx(styles.stat, currentItem.name === name && styles.altColor)} onClick={onCharacteristicClick}>
            <p>{name}</p>
            <p>{value}</p>
        </div>
    )
}

const CharacterCharacteristicsBlock = ({info, setCurrentItem, playCurrentItemSound, currentItem}) => {
    return (
        <div className={cx(styles.characterInfo, styles.characterWrapper)}>
            {info.map(item => (
                    <Characteristic {...item} currentItem={currentItem} setCurrentItem={setCurrentItem} playCurrentItemSound={playCurrentItemSound}/>
            ))}
        </div>
    )
}

export default CharacterCharacteristicsBlock;