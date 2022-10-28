import React from 'react';
import cx from "classnames";
import styles from "./CharacterInfoBlock.module.css";

const CharacterState = ({name, description, src, value, setCurrentItem, currentItem, playCurrentItemSound}) => {

    const onCharacterStateClick = () => {
        playCurrentItemSound();
        setCurrentItem({name, description, src})
    }

    return (
        <div className={cx(styles.stat, currentItem.name === name && styles.altColor)} onClick={onCharacterStateClick}>
            {name} {value && <span>{value}/{value}</span>}
        </div>
    )
}

const CharacterStateBlock = ({characterState, playCurrentItemSound, setCurrentItem, currentItem}) => {



    return (
        <div className={cx(styles.characterState, styles.characterWrapper)}>
            {characterState.map(item => (
                <CharacterState
                    {...item}
                    playCurrentItemSound={playCurrentItemSound}
                    setCurrentItem={setCurrentItem}
                    currentItem={currentItem}
                />
            ))}
        </div>
    )

}

export default CharacterStateBlock;