import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import cx from 'classnames';
import SpecialBlock from "./components/SpecialBlock/SpecialBlock";
import TraitsBlock from "./components/TraitsBlock/TraitsBlock";
import SkillsBlock from "./components/SkillsBlock/SkillsBlock";
import ItemDescription from "./components/ItemDescription/ItemDescription";
import HeaderControls from "./components/HeaderControls/HeaderControls"
import PrevIcon from './Images/prev.png';
import CurrentItemSound from "./sounds/currentItemSound.mp3";
import BtnClickSound from './sounds/btnSound.mp3';
import AlertForm from "./components/AlertForm/AlertFrom";
import FunctionalBtns from "./components/FunctionalBtns/FunctionalBtns";
import axios from "axios";


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
    const [message, setMessage] = useState([]);

    const messages = [
        {value: 'You must use all character points\nbefore starting the game!'},
        {value: 'You must select all tag skills\nbefore starting the game!'},
        {value: "You must enter your character's name\nbefore starting the game!"},
        {value: "All your character data\nhas been set to initial!"},
        {value: "Auto distribution complete!"},
        {value: "You already have the maximum of\ntwo traits!"},
        {value: "You already have the maximum of\nthree tag skills!"},
        {value: "All stats must be between 1 and 10\nbefore starting the game!"},
        {value: "Complete successfully!"}
    ];

    const traits = [
        {name: "Fast Metabolism", value: false, src: "FastMetabolism", description: "Str"},
        {name: "Bruiser", value: false, src: "Bruiser", description: "Str"},
        {name: "Small Frame", value: false, src: "SmallFrame", description: "Str"},
        {name: "One Hander", value: false, src: "OneHander", description: "Str"},
        {name: "Finesse", value: false, src: "Finesse", description: "Str"},
        {name: "Kamikaze", value: false, src: "Kamikaze", description: "Str"},
        {name: "Heavy Handed", value: false, src: "HeavyHanded", description: "Str"},
        {name: "Fast Shot", value: false, src: "FastShot", description: "Str"},
        {name: "Bloody Mess", value: false, src: "BloodyMess", description: "Str"},
        {name: "Jinxed", value: false, src: "Jinxed", description: "Str"},
        {name: "Good Natured", value: false, src: "GoodNatured", description: "Str"},
        {name: "Chem Reliant", value: false, src: "ChemReliant", description: "Str"},
        {name: "Chem Resistant", value: false, src: "ChemResistant", description: "Str"},
        {name: "Sex Apperal", value: false, src: "SexApperal", description: "Str"},
        {name: "Skilled", value: false, src: "Skilled", description: "Since you spent more time improving your skills than a normal person, you gain 5 additional skill points per experience level.\nThe tradeoff is that you do not gain as many extra abilities.\nYou gain a perk every four levels."},
        {name: "Gifted", value: false, src: "Gifted", description: "Str"}
    ];

    const [special, setSpecial] = useState([
        {name: "Strength", value: 5, src: "Strength", description: "Row physical strength. A high Strength if good for physical characters.\nModifies: Hit Points, Melee Damage, and Carry Weight"},
        {name: "Perception", value: 5, src: "Perception", description: "Prc"},
        {name: "Endurance", value: 5, src: "Endurance", description: "Edr"},
        {name: "Charisma", value: 5, src: "Charisma", description: "Chr"},
        {name: "Intelligence", value: 5, src: "Intelligence", description: "Ing"},
        {name: "Agility", value: 5, src: "Agility", description: "Agl"},
        {name: "Luck", value: 5, src: "Luck", description: "Lk"}
    ]);

    const skills = [
        {name: "Small Guns", value: 5 + (special[5].value * 4), src: "SmallGuns", description: "Str"},
        {name: "Big Guns", value: special[5].value * 2, src: "BigGuns", description: "Str"},
        {name: "Energy Weapons", value: special[5].value * 2, src: "EnergyWeapons", description: "Str"},
        {name: "Unarmed", value: 30 + 2 * (special[5].value + special[0].value), src: "Unarmed", description: "Str"},
        {name: "Melee Weapons", value: 20 + 2 * (special[5].value + special[0].value), src: "MeleeWeapons", description: "Str"},
        {name: "Throwing", value: 4 * special[5].value, src: "Throwing", description: "Str"},
        {name: "First Aid", value: 2 * (special[1].value + special[4].value), src: "FirstAid", description: "Str"},
        {name: "Doctor", value: 5 + (special[1].value + special[4].value), src: "Doctor", description: "Str"},
        {name: "Sneak", value: 5 + special[5].value * 3, src: "Sneak", description: "Str"},
        {name: "Lockpick", value: 10 + (special[1].value + special[5].value), src: "Lockpick", description: "Str"},
        {name: "Steal", value: special[5].value * 3, src: "Steal", description: "Str"},
        {name: "Traps", value: 10 + (special[1].value + special[5].value), src: "Traps", description: "Str"},
        {name: "Science", value: special[4].value * 4, src: "Science", description: "Str"},
        {name: "Repair", value: special[4].value * 3, src: "Repair", description: "Str"},
        {name: "Speech", value: special[3].value * 5, src: "Speech", description: "Str"},
        {name: "Barter", value: special[3].value * 4, src: "Barter", description: "Str"},
        {name: "Gambling", value: 5 * special[6].value, src: "Gambling", description: "Str"},
        {name: "Outdoorsman", value: 2 * (special[2].value + special[4].value), src: "Outdoorsman", description: "Str"}
    ];

    const info = [
        {name: "Armor Class", value: special[5].value, src: "ArmorClass", description: "Str"},
        {name: "Action Points", value: 5 + Math.floor(special[5].value / 2), src: "ActionPoints", description: "Str"},
        {name: "Carry Weight", value: 25 + special[0].value * 25, src: "CarryWeight", description: "Str"},
        {name: "Melee Damage", value: special[0].value >= 6 ? (special[0].value - 5) : 1, src: "MeleeDamage", description: "Str"},
        {name: "Damage Res.", value: 0 + "%", src: "DamageRes", description: "Str"},
        {name: "Poison Res.", value: special[2].value * 5 + "%", src: "PoisonRes", description: "Str"},
        {name: "Radiation Res.", value: special[2].value * 2 + "%", src: "RadiationRes", description: "Str"},
        {name: "Sequence", value: special[1].value * 2, src: "Sequence", description: "Str"},
        {name: "Healing Rat.", value: Math.floor(special[2].value / 3) || 1, src: "HealingRat", description: "Str"},
        {name: "Critical Chance", value: special[6].value, src: "CriticalChance", description: "Str"}
    ];

    const characterState = [
        {name: "Hit Points", value: 15 + special[2].value * 2 + special[0].value, src: "HitPoints", description: "Str"},
        {name: "Poisoned", src: "Poisoned", description: "Str"},
        {name: "Radiated", src: "Radiated", description: "Str"},
        {name: "Eye Damage", src: "EyeDamage", description: "Str"},
        {name: "Crippled Right Arm", src: "CrippledRightArm", description: "Str"},
        {name: "Crippled Left Arm", src: "CrippledLeftArm", description: "Str"},
        {name: "Crippled Right Leg", src: "CrippledRightLeg", description: "Str"},
        {name: "Crippled Left Leg", src: "CrippledLeftLeg", description: "Str"}
    ];

    // const valuesMap = {
    //     "SmallGunsValue": 5 + (special[5].value * 4),
    //     "BigGunsValue": special[5].value * 2,
    //     "EnergyWeaponsValue": special[5].value * 2,
    //     "UnarmedValue": 30 + 2 * (special[5].value + special[0].value),
    //     "MeleeWeaponsValue": 20 + 2 * (special[5].value + special[0].value),
    //     "ThrowingValue": 4 * special[5].value,
    //     "FirstAidValue": 2 * (special[1].value + special[4].value),
    //     "DoctorValue": 5 + (special[1].value + special[4].value),
    //     "SneakValue": 5 + special[5].value * 3,
    //     "LockpickValue": 10 + (special[1].value + special[5].value),
    //     "StealValue": special[5].value * 3,
    //     "TrapsValue": 10 + (special[1].value + special[5].value),
    //     "ScienceValue": special[4].value * 4,
    //     "RepairValue": special[4].value * 3,
    //     "SpeechValue": special[3].value * 5,
    //     "BarterValue": special[3].value * 4,
    //     "GamblingValue": 5 * special[6].value,
    //     "OutdoorsmanValue": 2 * (special[2].value + special[4].value),
    //     "ArmorClassValue": special[5].value,
    //     "ActionPointsValue": 5 + Math.floor(special[5].value / 2),
    //     "CarryWeightValue": 25 + special[0].value * 25,
    //     "MeleeDamageValue": special[0].value >= 6 ? (special[0].value - 5) : 1,
    //     "DamageResValue": 0 + "%",
    //     "PoisonResValue": special[2].value * 5 + "%",
    //     "RadiationResValue": special[2].value * 2 + "%",
    //     "SequenceValue": special[1].value * 2,
    //     "HealingRatValue": Math.floor(special[2].value / 3) || 1,
    //     "CriticalChanceValue": special[6].value,
    //     "HitPointsValue": 15 + special[2].value * 2 + special[0].value,
    // }
    // const valuesMap = {
    //     "SmallGunsValue": 1,
    //     "BigGunsValue": 1,
    //     "EnergyWeaponsValue": 1,
    //     "UnarmedValue": 1,
    //     "MeleeWeaponsValue": 1,
    //     "ThrowingValue": 1,
    //     "FirstAidValue": 1,
    //     "DoctorValue": 1,
    //     "SneakValue": 1,
    //     "LockpickValue": 1,
    //     "StealValue": 1,
    //     "TrapsValue": 1,
    //     "ScienceValue": 1,
    //     "RepairValue": 1,
    //     "SpeechValue": 1,
    //     "BarterValue": 1,
    //     "GamblingValue": 1,
    //     "OutdoorsmanValue": 1,
    //     "ArmorClassValue": 1,
    //     "ActionPointsValue": 1,
    //     "CarryWeightValue": 1,
    //     "MeleeDamageValue": 1,
    //     "DamageResValue": 1,
    //     "PoisonResValue": 1,
    //     "RadiationResValue": 1,
    //     "SequenceValue": 1,
    //     "HealingRatValue": 1,
    //     "CriticalChanceValue": 1,
    //     "HitPointsValue": 1,
    // }

    const [currentItem, setCurrentItem] = useState({});

    const playCurrentItemSound = () => {
        let audio = new Audio();
        audio.src = CurrentItemSound;
        audio.autoplay = true;
    }

    const playBtnSound = () => {
        let audio = new Audio();
        audio.src = BtnClickSound;
        audio.autoplay = true;
    }

    const onLeftClick = () => {
        setPage('first')
    }

  return (
    <div className={styles.mainContent}>
        {message.length !== 0 && <AlertForm setMessage={setMessage} message={message}/>}
        <div className={styles.btnWrapper}>
            {page === 'second' &&
                <div className={styles.pageSwitcher}>
                    <button onClick={onLeftClick} className={styles.pageSwitchBtn}><img src={PrevIcon} alt={'Next Page Img'}/></button>
                    <div>Cancel</div>
                </div>
            }
        </div>
        <div className={styles.mainWrapper}>
            <div className={cx(styles.overflow, page === 'second' && styles.right)}>
                <div className={cx(styles.wrapper)}>
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
                <div className={styles.wrapper}>Final Form</div>
            </div>
        </div>
        <div className={styles.btnWrapper}></div>
    </div>
  );
}

export default App;


