import React from 'react';
import SpecialBlock from "./SpecialBlock/SpecialBlock";
import TraitsBlock from "./TraitsBlock/TraitsBlock";
import HeaderControls from "./HeaderControls/HeaderControls";
import ItemDescription from "./ItemDescription/ItemDescription";
import SkillsBlock from "./SkillsBlock/SkillsBlock";
import FunctionalBtns from "./FunctionalBtns/FunctionalBtns";
import styles from "./FirstPage.module.css"
import messageSound from "../../sounds/messageSound.mp3";
import CurrentItemSound from "../../sounds/currentItemSound.mp3";

const FirstPage = ({name, setName, age, setAge, gender, setGender, points, setPoints, info, special, setCurrentItem, currentItem, setPage, characterState, setSpecial, setTraitsPoints, selectedTraits, setSelectedTraits, setSelectedSkills, setSkillsPoints, traitsPoints, skillsPoints, selectedSkills, skills, traits, messages, setMessage, additionalMessages}) => {
    const selectItem = (name, description, src) => () => {
        playSound(CurrentItemSound);
        setCurrentItem({name, description, src})
    }

    const playSound = (soundName) => {
        const audio = new Audio();
        audio.src = soundName;
        audio.autoplay = true;
    }

    const showMessage = (messageText) => {
        playSound(messageSound)
        return setMessage(messageText)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <HeaderControls
                    name={name}
                    setName={setName}
                    age={age}
                    setAge={setAge}
                    gender={gender}
                    setGender={setGender}
                />
                <SpecialBlock
                    points={points}
                    setPoints={setPoints}
                    info={info}
                    special={special}
                    setCurrentItem={setCurrentItem}
                    currentItem={currentItem}
                    characterState={characterState}
                    setSpecial={setSpecial}
                    messages={messages}
                    showMessage={showMessage}
                    playSound={playSound}
                    selectItem={selectItem}
                />
                <TraitsBlock
                    currentItem={currentItem}
                    setCurrentItem={setCurrentItem}
                    traits={traits}
                    messages={messages}
                    traitsPoints={traitsPoints}
                    setTraitsPoints={setTraitsPoints}
                    selectedTraits={selectedTraits}
                    setSelectedTraits={setSelectedTraits}
                    showMessage={showMessage}
                    playSound={playSound}
                    selectItem={selectItem}
                />
            </div>
            <div className={styles.block}>
                <SkillsBlock
                    skillsPoints={skillsPoints}
                    setSkillsPoints={setSkillsPoints}
                    skills={skills}
                    currentItem={currentItem}
                    setCurrentItem={setCurrentItem}
                    messages={messages}
                    selectedSkills={selectedSkills}
                    setSelectedSkills={setSelectedSkills}
                    showMessage={showMessage}
                    playSound={playSound}
                    selectItem={selectItem}
                />
                <ItemDescription currentItem={currentItem}/>
                <FunctionalBtns
                    special={special}
                    skills={skills}
                    traits={traits}
                    messages={messages}
                    points={points}
                    setPoints={setPoints}
                    skillsPoints={skillsPoints}
                    setSkillsPoints={setSkillsPoints}
                    name={name}
                    setName={setName}
                    setGender={setGender}
                    setAge={setAge}
                    setPage={setPage}
                    setSpecial={setSpecial}
                    setTraitsPoints={setTraitsPoints}
                    setSelectedTraits={setSelectedTraits}
                    setSelectedSkills={setSelectedSkills}
                    showMessage={showMessage}
                />
            </div>
        </div>
    )
};

export default FirstPage;