import React, {useState} from 'react';
import styles from './TraitsBlock.module.css';
import cx from 'classnames';


const Trait = ({name, description, src, currentItem, setCurrentItem, playCurrentItemSound, playBtnSound, traitsPoints, setTraitsPoints}) => {
    const [currentTrait, setCurrentTrait] = useState({})

    const onTraitSelect = () => {
        if (currentTrait.name === name) {
            setCurrentTrait({})
            setTraitsPoints(prevItem => prevItem + 1)
            playBtnSound()
            return
        }
        if (!traitsPoints) return alert('Ti dolbaeb?')
        setCurrentItem({name, description, src})
        setCurrentTrait({name})
        setTraitsPoints(prevItem => prevItem - 1)
        playBtnSound()
    }

    const onTraitClick = () => {
        playCurrentItemSound();
        setCurrentItem({name, description, src})
    }

    return (
        <div className={styles.trait}>
            <button onClick={onTraitSelect} className={styles.traitBtn} >-</button>
            <div className={cx(styles.char, currentItem.name === name && styles.altColor, currentTrait.name === name && styles.selectedItem)} onClick={onTraitClick}>{name}</div>
        </div>
    )
}

const TraitsBlock = ({traits, currentItem, setCurrentItem, playCurrentItemSound, playBtnSound}) => {
    let [traitsPoints, setTraitsPoints] = useState(2);

    return (
        <div className={styles.traitsBlock}>
            <div className={styles.traitsHeader}>OPTIONAL TRAITS</div>
            <div className={styles.traits}>
                {traits.map(item => <Trait {...item} setCurrentItem={setCurrentItem} currentItem={currentItem} playCurrentItemSound={playCurrentItemSound} playBtnSound={playBtnSound} traitsPoints={traitsPoints} setTraitsPoints={setTraitsPoints}/>)}
            </div>
        </div>
    );
};

export default TraitsBlock;