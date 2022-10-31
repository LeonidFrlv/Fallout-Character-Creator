import React from 'react';
import SpecialBlock from "./SpecialBlock/SpecialBlock";
import TraitsBlock from "./TraitsBlock/TraitsBlock";
import HeaderControls from "./HeaderControls/HeaderControls";
import ItemDescription from "./ItemDescription/ItemDescription";
import SkillsBlock from "./SkillsBlock/SkillsBlock";
import FunctionalBtns from "./FunctionalBtns/FunctionalBtns";
import styles from "./FirstPage.module.css"

const FirstPage = ({name, setName, age, setAge, gender, setGender, points, setPoints, info, special, setCurrentItem, currentItem, playCurrentItemSound, setPage, characterState, setSpecial, setTraitsPoints, selectedTraits, setSelectedTraits, setSelectedSkills, setSkillsPoints, playBtnSound, traitsPoints, skillsPoints, selectedSkills, skills, traits, messages, setMessage, additionalMessages}) => {
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
                    playCurrentItemSound={playCurrentItemSound}
                    playBtnSound={playBtnSound}
                    characterState={characterState}
                    setSpecial={setSpecial}
                    setMessage={setMessage}
                    messages={messages}
                    additionalMessages={additionalMessages}
                />
                <TraitsBlock
                    currentItem={currentItem}
                    setCurrentItem={setCurrentItem}
                    traits={traits}
                    playCurrentItemSound={playCurrentItemSound}
                    playBtnSound={playBtnSound}
                    messages={messages}
                    setMessage={setMessage}
                    traitsPoints={traitsPoints}
                    setTraitsPoints={setTraitsPoints}
                    selectedTraits={selectedTraits}
                    setSelectedTraits={setSelectedTraits}
                    additionalMessages={additionalMessages}
                />
            </div>
            <div className={styles.block}>
                <SkillsBlock
                    skillsPoints={skillsPoints}
                    setSkillsPoints={setSkillsPoints}
                    skills={skills}
                    currentItem={currentItem}
                    setCurrentItem={setCurrentItem}
                    playCurrentItemSound={playCurrentItemSound}
                    playBtnSound={playBtnSound}
                    setMessage={setMessage}
                    messages={messages}
                    selectedSkills={selectedSkills}
                    setSelectedSkills={setSelectedSkills}
                    additionalMessages={additionalMessages}
                />
                <ItemDescription currentItem={currentItem}/>
                <FunctionalBtns
                    special={special}
                    skills={skills}
                    traits={traits}
                    messages={messages}
                    setMessage={setMessage}
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
                />
            </div>
        </div>
    )
};

export default FirstPage;