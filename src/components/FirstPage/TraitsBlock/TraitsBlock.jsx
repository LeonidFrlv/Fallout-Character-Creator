import React from 'react';
import styles from './TraitsBlock.module.css';
import cx from 'classnames';
import BtnClickSound from '../../../sounds/btnSound.mp3'


const Trait = ({name, description, src, currentItem, traitsPoints, setTraitsPoints, selectedTraits, setSelectedTraits, messages, showMessage, selectItem, playSound}) => {
    const onTraitSelect = () => {
        if (selectedTraits.some(item => item.name === name)) {
            setSelectedTraits(prevState => prevState.filter(item => item.name !== name && item))
            setTraitsPoints(prevItem => prevItem + 1)
            playSound(BtnClickSound)
            return
        }
        if (!traitsPoints) return showMessage(messages.traitsMessage)
        setSelectedTraits(prevState => [...prevState, {name}])
        selectItem(name, description, src)
        setTraitsPoints(prevItem => prevItem - 1)
        playSound(BtnClickSound)
    }

    return (
        <div className={styles.trait}>
            <button onClick={onTraitSelect} className={styles.traitBtn} >-</button>
            <div className={cx(styles.char, currentItem.name === name && styles.altColor, selectedTraits.some(item => item.name === name) && styles.selectedItem)} onClick={selectItem(name, description, src)}>{name}</div>
        </div>
    )
}

const TraitsBlock = ({traits, currentItem, setCurrentItem, messages, traitsPoints, setTraitsPoints, selectedTraits, setSelectedTraits, showMessage, selectItem, playSound}) => {
    const onTraitsHeaderClick = () => setCurrentItem(messages.optionalTraitsHeader);

    return (
        <div className={styles.traitsBlock}>
            <div className={styles.traitsHeader} onClick={onTraitsHeaderClick}>OPTIONAL TRAITS</div>
            <div className={styles.traits}>
                {traits.map(item =>
                <Trait
                        {...item}
                        currentItem={currentItem}
                        traitsPoints={traitsPoints}
                        setTraitsPoints={setTraitsPoints}
                        selectedTraits={selectedTraits}
                        setSelectedTraits={setSelectedTraits}
                        messages={messages}
                        showMessage={showMessage}
                        selectItem={selectItem}
                        playSound={playSound}
                />)}
            </div>
        </div>
    );
};

export default TraitsBlock;