import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import cx from 'classnames';
import PrevIcon from './Images/prev.png';
import CurrentItemSound from "./sounds/currentItemSound.mp3";
import BtnClickSound from './sounds/btnSound.mp3';
import AlertForm from "./components/AlertForm/AlertFrom";
import FirstPage from "./components/FirstPage/FirstPage";
import axios from "axios";
import {cloneDeep} from "lodash";


function App() {
    const [page, setPage] = useState('second');
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
        pe: {name: "Perception", value: 5, src: "Perception", description: "Prc"},
        en: {name: "Endurance", value: 5, src: "Endurance", description: "Edr"},
        ch: {name: "Charisma", value: 5, src: "Charisma", description: "Chr"},
        int: {name: "Intelligence", value: 5, src: "Intelligence", description: "Ing"},
        ag: {name: "Agility", value: 5, src: "Agility", description: "Agl"},
        lu: {name: "Luck", value: 5, src: "Luck", description: "Lk"}
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

    const [data, setData] = useState(null)

    const [currentItem, setCurrentItem] = useState({});


    const calc = (data, formula) => eval(`({ st, pe, en, ch, int, ag, lu }) => (${formula})`)(data);

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
        <div className={styles.btnWrapper}>
            {page === 'second' &&
                <div className={styles.pageSwitcher}>
                    <button onClick={() => setPage('first')} className={styles.pageSwitchBtn}><img src={PrevIcon} alt={'Next Page Img'}/></button>
                    <div>Cancel</div>
                </div>
            }
        </div>
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
                    />
                <div className={styles.wrapper}>
                    Final Form
                </div>
            </div>
        </div>
        <div className={styles.btnWrapper}></div>
    </div>
  );
}

export default App;


