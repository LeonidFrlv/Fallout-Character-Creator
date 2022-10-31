import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import cx from 'classnames';
import CurrentItemSound from "./sounds/currentItemSound.mp3";
import BtnClickSound from './sounds/btnSound.mp3';
import AlertForm from "./components/AlertForm/AlertFrom";
import FirstPage from "./components/FirstPage/FirstPage";
import SecondPage from "./components/SecondPage/SecondPage";
import axios from "axios";
import {cloneDeep} from "lodash";


function App() {
    const [page, setPage] = useState('first');
    const [name, setName] = useState('None');
    const [traitsPoints, setTraitsPoints] = useState(2);
    const [selectedTraits, setSelectedTraits] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skillsPoints, setSkillsPoints] = useState(3);
    const [points, setPoints] = useState(5);
    const [age, setAge] = useState(25);
    const [gender, setGender] = useState('Male')
    const [message, setMessage] = useState('');

    const [special, setSpecial] = useState({
        st: {name: "Strength", value: 5, src: "Strength", description: "Row physical strength. A high Strength if good for physical characters.\nModifies: Hit Points, Melee Damage, and Carry Weight"},
        pe: {name: "Perception", value: 5, src: "Perception", description: "The ability to see, hear taste and notice unusual things. A high Perception is important for a sharpshooter.\nModifies: Sequence and ranged compat distance modifiers."},
        en: {name: "Endurance", value: 5, src: "Endurance", description: "Stamina and physical toughness. A character with a high Endurance will survive where others may not.\nModifies: Hit Points, Poison & Radiation Resistance, Healing Rate, ad the additional hit points per level."},
        ch: {name: "Charisma", value: 5, src: "Charisma", description: "A combination of appearance and charm. A high Charisma is important for characters that want to influence people with words.\nModifies: NPC reactions, and barter prices."},
        int: {name: "Intelligence", value: 5, src: "Intelligence", description: "Knowledge, wisdom and the ability to think quickly. A high Intelligence as important for any character.\nModifies: the number of new skill points per level, dialogue options, and many skills."},
        ag: {name: "Agility", value: 5, src: "Agility", description: "Coordination and the ability to move well. A high Ability is important for any active character.\nModifies: Action Points, Armor Class, Sequence, and many skills."},
        lk: {name: "Luck", value: 5, src: "Luck", description: "Fate. Karma. An extremely high or low Luck will affect the character somehow. Events and situations will be changed by how lucky (or unlucky) your character is."}
    });

    const messages = {
        charPointsError: "You must use all character points\nbefore starting the game!",
        tagSkillsError: "You must select all tag skills\nbefore starting the game!",
        nameError: "You must enter your character's name\nbefore starting the game!",
        resetMessage: "All your character data\nhas been set to initial!",
        autoMessage: "Auto distribution complete!",
        traitsMessage: "You already have the maximum of\ntwo traits!",
        tagSkillsMessage: "You already have the maximum of\nthree tag skills!",
        specialError: "All stats must be between 1 and 10\nbefore starting the game!",
        completeMessage: "Complete successfully!"
    }

    const additionalMessages = {
        skillsHeader: {name: "Skills", src: "s", description: "Skills are learned knowledge. Skills increase by experience, or during the course of the game by special events. The higher skill level, the better you are at that skill."},
        tagSkills: {name: "Tag Skills",  src: "Charisma", description: "Tag skills are skills your character specializes in. Each tag skill gains +20%, and increases twice as fast. You must pick three tag skills."},
        charPoints: {name: "Character Points", src: "s", description: "Amount of free character points that can be added to one of the basic stats."},
        optionalTraitsHeader: {name: "Optional Traits",  src: "Endurance", description: "Optional traits describe your character in more detail. All traits will have positive and negative effects. You may choose up to two traits during creation."},
        mainCreateMessage: {name: "FoT Character Creator!",  src: "s", description: "privet"},
    };

    const [data, setData] = useState(null)

    const [currentItem, setCurrentItem] = useState({...additionalMessages.mainCreateMessage});


    const calc = (data, formula) => eval(`({ st, pe, en, ch, int, ag, lk }) => (${formula})`)(data);

    const getNewData = (data, special) => {
        let newData = cloneDeep(data)
        for (let key in newData) {
            newData[key] = newData[key].map(item => ({...item, value: item.exp && calc(special, item.exp)}))
        }
        return newData
    }

    useEffect(() => {
        axios.get('http://localhost:3333/data', {})
            .then((res) => {
                const data = getNewData(res.data, special)
                setData(data)
            })
    }, [])

    useEffect(() => {
        if (data) {
            setData(prevData => getNewData(prevData, special))
        }
    }, [special])

    const audio = new Audio();

    const playCurrentItemSound = () => {
        audio.src = CurrentItemSound;
        audio.autoplay = true;
    }

    const playBtnSound = () => {
        audio.src = BtnClickSound;
        audio.autoplay = true;
    }

    if (!data) return 'подождите'

  return (
    <div className={styles.mainContent}>
        {message.length !== 0 && <AlertForm setMessage={setMessage} message={message}/>}
          <div className={styles.mainWrapper}>
            <div className={cx(styles.overflow, page === 'second' && styles.right)}>
                    <FirstPage
                        name={name}
                        setName={setName}
                        age={age}
                        setAge={setAge}
                        gender={gender}
                        setGender={setGender}
                        points={points}
                        setPoints={setPoints}
                        info={data.info}
                        special={special}
                        setCurrentItem={setCurrentItem}
                        currentItem={currentItem}
                        characterState={data.characterState}
                        setSpecial={setSpecial}
                        setMessage={setMessage}
                        messages={messages}
                        traits={data.traits}
                        playCurrentItemSound={playCurrentItemSound}
                        playBtnSound={playBtnSound}
                        traitsPoints={traitsPoints}
                        setTraitsPoints={setTraitsPoints}
                        selectedTraits={selectedTraits}
                        setSelectedTraits={setSelectedTraits}
                        skillsPoints={skillsPoints}
                        setSkillsPoints={setSkillsPoints}
                        skills={data.skills}
                        selectedSkills={selectedSkills}
                        setSelectedSkills={setSelectedSkills}
                        setPage={setPage}
                        additionalMessages={additionalMessages}
                    />
                <SecondPage setPage={setPage}/>
            </div>
        </div>
    </div>
  );
}

export default App;


