import React from 'react';
import styles from './CharacterInfoBlock.module.css';
import cx from 'classnames';

const CharacterState = () => {
    const CharacterStates = [
        'Poisoned',
        'Radiated',
        'Eye Damage',
        'Crippled Right Arm',
        'Crippled Left Arm',
        'Crippled Right Leg',
        'Crippled Left Leg'
    ]

    return (
        <div className={cx(styles.characterState, styles.characterWrapper)}>
            <div className={styles.stat}>
                Hit Points 00/00
            </div>
            {CharacterStates.map(item => (
                <div className={cx(styles.stat, styles.nonUse)}>
                    {item}
                </div>
            ))}
        </div>
    )
}

const CharacterInfo = ({info}) => {
    return (
        <div className={cx(styles.characterInfo, styles.characterWrapper)}>
            {info.map(item => (
                <div className={styles.statWrapper}>
                    <div className={styles.stat}>
                        {item.name}
                    </div>
                    <div className={styles.stat}>
                        {item.value}
                    </div>
                </div>

            ))}
        </div>
    )
}

const CharacterInfoBlock = ({info}) => {
    return (
        <div className={styles.characterInfoWrapper}>
            <CharacterState />
            <CharacterInfo info={info}/>
        </div>
    );
};

export default CharacterInfoBlock;