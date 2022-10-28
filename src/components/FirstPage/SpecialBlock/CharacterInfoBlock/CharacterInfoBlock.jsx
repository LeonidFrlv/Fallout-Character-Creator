import React from 'react';
import styles from './CharacterInfoBlock.module.css';
import CharacterStateBlock from "./CharacterStateBlock";
import CharacterCharacteristicsBlock from './CharacterCharacteristicsBlock';


const CharacterInfoBlock = ({info, playCurrentItemSound, setCurrentItem, characterState, currentItem}) => {
    return (
        <div className={styles.characterInfoWrapper}>
            <CharacterStateBlock characterState={characterState} setCurrentItem={setCurrentItem} playCurrentItemSound={playCurrentItemSound} currentItem={currentItem}/>
            <CharacterCharacteristicsBlock info={info} setCurrentItem={setCurrentItem} playCurrentItemSound={playCurrentItemSound} currentItem={currentItem}/>
        </div>
    );
};

export default CharacterInfoBlock;