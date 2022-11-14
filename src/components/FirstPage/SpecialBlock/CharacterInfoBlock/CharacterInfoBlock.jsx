import React from 'react';
import styles from './CharacterInfoBlock.module.css';
import CharacterStateBlock from "./CharacterStateBlock";
import CharacterCharacteristicsBlock from './CharacterCharacteristicsBlock';

const CharacterInfoBlock = ({info, characterState, currentItem, selectItem}) => {
    return (
        <div className={styles.characterInfoWrapper}>
            <CharacterStateBlock currentItem={currentItem} characterState={characterState} selectItem={selectItem}/>
            <CharacterCharacteristicsBlock info={info} currentItem={currentItem} selectItem={selectItem}/>
        </div>
    );
};

export default CharacterInfoBlock;