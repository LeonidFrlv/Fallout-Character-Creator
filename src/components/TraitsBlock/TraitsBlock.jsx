import React from 'react';
import styles from './TraitsBlock.module.css';
import cx from 'classnames';


const Trait = ({name, description, src, currentItem, setCurrentItem, playCurrentItemSound}) => {

    const onTraitClick = () => {
        playCurrentItemSound();
        setCurrentItem({name: name, description: description, src: src})
    }

    return (
        <div className={styles.trait} onClick={onTraitClick}>
            <button className={styles.traitBtn}>-</button>
            <div className={cx(styles.char, currentItem.name === name && styles.altColor)}>{name}</div>
        </div>
    )
}

const TraitsBlock = ({traits, currentItem, setCurrentItem, playCurrentItemSound}) => {
    return (
        <div className={styles.traitsBlock}>
            <div className={styles.traitsHeader}>OPTIONAL TRAITS</div>
            <div className={styles.traits}>
                {traits.map(item => <Trait {...item} setCurrentItem={setCurrentItem} currentItem={currentItem} playCurrentItemSound={playCurrentItemSound}/>)}
            </div>
        </div>
    );
};

export default TraitsBlock;