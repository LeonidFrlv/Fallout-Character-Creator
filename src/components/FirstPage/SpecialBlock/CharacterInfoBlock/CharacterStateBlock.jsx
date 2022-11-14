import React from 'react';
import cx from "classnames";
import styles from "./CharacterInfoBlock.module.css";


const CharacterState = ({name, description, src, value, currentItem, selectItem}) => {
    return (
        <div className={cx(styles.stat, currentItem.name === name && styles.altColor)} onClick={selectItem(name, description, src)}>
            {name} {value && <span>{value}/{value}</span>}
        </div>
    )
}

const CharacterStateBlock = ({characterState, currentItem, selectItem, playSound}) => {
    return (
        <div className={cx(styles.characterState, styles.characterWrapper)}>
            {characterState.map(item => (
                <CharacterState
                    {...item}
                    currentItem={currentItem}
                    selectItem={selectItem}
                />
            ))}
        </div>
    )

}

export default CharacterStateBlock;