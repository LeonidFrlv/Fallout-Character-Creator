import React, {useState} from 'react';
import styles from './App.module.css';
import cx from 'classnames';
import SpecialBlock from "./components/SpecialBlock/SpecialBlock";
import TraitsBlock from "./components/TraitsBlock/TraitsBlock";
import SkillsBlock from "./components/SkillsBlock/SkillsBlock";
import ItemDescription from "./components/ItemDescription/ItemDescription";

import NextIcon from './Images/next.png';
import PrevIcon from './Images/prev.png';
import CurrentItemSound from "./sounds/currentItemSound.mp3";
import BtnClickSound from './sounds/btnSound.mp3';


function App() {
    const [page, setPage] = useState('first');
    const special = [
        {name: "Strength", value: 5, src: "Strength", description: "Str"},
        {name: "Perception", value: 5, src: "Perception", description: "Prc"},
        {name: "Endurance", value: 5, src: "Endurance", description: "Edr"},
        {name: "Charisma", value: 5, src: "Charisma", description: "Chr"},
        {name: "Intelligence", value: 5, src: "Intelligence", description: "Ing"},
        {name: "Agility", value: 5, src: "Agility", description: "Agl"},
        {name: "Luck", value: 5, src: "Luck", description: "Lk"},
    ]

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
        {name: "Skilled", value: false, src: "Skilled", description: "Str"},
        {name: "Gifted", value: false, src: "Gifted", description: "Str"},
    ];

    const skills = [
        {name: "Small Guns", value: 10, src: "SmallGuns", description: "Str"},
        {name: "Big Guns", value: 10, src: "BigGuns", description: "Str"},
        {name: "Energy Weapons", value: 10, src: "EnergyWeapons", description: "Str"},
        {name: "Unarmed", value: 10, src: "Unarmed", description: "Str"},
        {name: "Melee Weapons", value: 10, src: "MeleeWeapons", description: "Str"},
        {name: "Throwing", value: 10, src: "Throwing", description: "Str"},
        {name: "First Aid", value: 10, src: "FirstAid", description: "Str"},
        {name: "Doctor", value: 10, src: "Doctor", description: "Str"},
        {name: "Sneak", value: 10, src: "Sneak", description: "Str"},
        {name: "Lockpick", value: 10, src: "Lockpick", description: "Str"},
        {name: "Steal", value: 10, src: "Steal", description: "Str"},
        {name: "Traps", value: 10, src: "Traps", description: "Str"},
        {name: "Science", value: 10, src: "Science", description: "Str"},
        {name: "Repair", value: 10, src: "Repair", description: "Str"},
        {name: "Speech", value: 10, src: "Speech", description: "Str"},
        {name: "Barter", value: 10, src: "Barter", description: "Str"},
        {name: "Gambling", value: 10, src: "Gambling", description: "Str"},
        {name: "Outdoorsman", value: 10, src: "Outdoorsman", description: "Str"},
    ];

    const info = [
        {name: 'Armor Class', value: 5},
        {name: 'Action Points', value: 7},
        {name: 'Carry Weight', value: 150},
        {name: 'Melee Damage', value: 1},
        {name: 'Damage Res.', value: "0%"},
        {name: 'Poison Res.', value: "25%"},
        {name: 'Radiation Res.', value: "10%"},
        {name: 'Sequence', value: 10},
        {name: 'Healing Rate', value: 1},
        {name: 'Critical Chance', value: "5%"}
    ];

    const [currentItem, setCurrentItem] = useState({name: special[0].name, desc: special[0].description, src: special[0].src});


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

    const onRightClick = () => {
        setPage('second')
    }

    const onLeftClick = () => {
        setPage('first')
    }

  return (
    <div className={styles.mainContent}>
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
                        <div className={styles.header}>
                            <button className={styles.nameBtn}>None</button>
                            <button className={styles.headerBtn}>Age 25</button>
                            <button className={styles.headerBtn}>Male</button>
                        </div>
                        <SpecialBlock info={info} special={special} setCurrentItem={setCurrentItem} currentItem={currentItem} playCurrentItemSound={playCurrentItemSound} playBtnSound={playBtnSound}/>
                        <TraitsBlock currentItem={currentItem} setCurrentItem={setCurrentItem} traits={traits} playCurrentItemSound={playCurrentItemSound}/>
                    </div>
                    <div className={styles.block}>
                        <SkillsBlock skills={skills} currentItem={currentItem} setCurrentItem={setCurrentItem} playCurrentItemSound={playCurrentItemSound}/>
                        <ItemDescription currentItem={currentItem}/>
                    </div>
                </div>
                <div className={styles.wrapper}>Final Form</div>
            </div>
        </div>
        <div className={styles.btnWrapper}>
            {page === 'first' &&
                <div className={styles.pageSwitcher}>
                    <button onClick={onRightClick} className={styles.pageSwitchBtn}><img src={NextIcon} alt={'Next Page Img'}/></button>
                    <div>Confirm</div>
                </div>
            }
        </div>
    </div>
  );
}

export default App;


