import React from 'react';
import cx from "classnames";
import styles from "./CharacterInfoBlock.module.css";


const Characteristic = ({name, description, src, value, title,  currentItem, selectItem}) => {
    return (
        <div className={cx(styles.stat, currentItem.name === title && styles.altColor)} onClick={selectItem(title, description, src)}>
            <p>{name}</p>
            <p>{value}</p>
        </div>
    )
}

const CharacterCharacteristicsBlock = ({info, currentItem, selectItem}) => {
    return (
        <div className={cx(styles.characterInfo, styles.characterWrapper)}>
            {info.map(item => (
                    <Characteristic {...item} currentItem={currentItem} selectItem={selectItem}/>
            ))}
        </div>
    )
}

export default CharacterCharacteristicsBlock;