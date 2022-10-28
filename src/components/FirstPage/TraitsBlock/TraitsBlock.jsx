import React from 'react';
import styles from './TraitsBlock.module.css';
import cx from 'classnames';


const Trait = ({name, description, src, currentItem, setCurrentItem, playCurrentItemSound, playBtnSound, traitsPoints, setTraitsPoints, selectedTraits, setSelectedTraits, messages, setMessage }) => {

    const onTraitSelect = () => {
        if (selectedTraits.some(item => item.name === name)) {
            setSelectedTraits(prevState => prevState.filter(item => item.name !== name && item))
            setTraitsPoints(prevItem => prevItem + 1)
            playBtnSound()
            return
        }
        if (!traitsPoints) return setMessage(messages.traitsMessage)
        setSelectedTraits(prevState => [...prevState, {name}])
        setCurrentItem({name, description, src})
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
            <div className={cx(styles.char, currentItem.name === name && styles.altColor, selectedTraits.some(item => item.name === name) && styles.selectedItem)} onClick={onTraitClick}>{name}</div>
        </div>
    )
}

const TraitsBlock = ({traits, currentItem, setCurrentItem, playCurrentItemSound, playBtnSound, messages, setMessage, traitsPoints, setTraitsPoints, selectedTraits, setSelectedTraits}) => {
    return (
        <div className={styles.traitsBlock}>
            <div className={styles.traitsHeader}>OPTIONAL TRAITS</div>
            <div className={styles.traits}>
                {traits.map(item =>
                <Trait
                        {...item}
                        setCurrentItem={setCurrentItem}
                        currentItem={currentItem}
                        playCurrentItemSound={playCurrentItemSound}
                        playBtnSound={playBtnSound}
                        traitsPoints={traitsPoints}
                        setTraitsPoints={setTraitsPoints}
                        selectedTraits={selectedTraits}
                        setSelectedTraits={setSelectedTraits}
                        messages={messages}
                        setMessage={setMessage}
                />)}
            </div>
        </div>
    );
};

export default TraitsBlock;