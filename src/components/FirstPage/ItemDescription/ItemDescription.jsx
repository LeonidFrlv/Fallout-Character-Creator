import React from 'react';
import styles from './ItemDescription.module.css';
import VaultBoy from '../../../Images/vaultBoy.png';
import Strength from '../../../Images/specialIcons/FoT_Strength.png';
import Perception from '../../../Images/specialIcons/Perception.png';
import Endurance from '../../../Images/specialIcons/FoT_Endurance.png';
import Charisma from '../../../Images/specialIcons/FoT_Charisma.png';
import Intelligence from '../../../Images/specialIcons/FoT_Intelligence.png';
import Agility from '../../../Images/specialIcons/FoT_Agility.png';
import Luck from '../../../Images/specialIcons/FoT_Luck.png';

import BigGuns from '../../../Images/skillsIcons/Big_Guns.png';
import Doctor from '../../../Images/skillsIcons/Doctor.png';
import EnergyWeapons from '../../../Images/skillsIcons/EnergyWeapons.png';
import FirstAid from '../../../Images/skillsIcons/FirstAid.png';
import Speech from '../../../Images/skillsIcons/Fo1_Speech.png';
import Barter from '../../../Images/skillsIcons/FoT_Barter.png';
import Gambling from '../../../Images/skillsIcons/Gambling_skill.png';
import Lockpick from '../../../Images/skillsIcons/Lockpick_FO.png';
import MeleeWeapons from '../../../Images/skillsIcons/Melee_Weapons.png';
import Outdoorsman from '../../../Images/skillsIcons/Outdoorsman.png';
import Repair from '../../../Images/skillsIcons/Repair.png';
import Science from '../../../Images/skillsIcons/Science.png';
import SmallGuns from '../../../Images/skillsIcons/Small_Guns.png';
import Steal from '../../../Images/skillsIcons/Thief.png';
import Throwing from '../../../Images/skillsIcons/Throwing.png';
import Traps from '../../../Images/skillsIcons/Traps.png';
import Unarmed from '../../../Images/skillsIcons/Unarmed_FO.png';
import Sneak from '../../../Images/skillsIcons/Sneak.png';


import BloodyMess from '../../../Images/traitsIcons/Bloody_Mess_trait.png';
import ChemReliant from '../../../Images/traitsIcons/ChemReliant.png';
import ChemResistant from '../../../Images/traitsIcons/ChemResistant.png';
import SexApperal from '../../../Images/traitsIcons/Empathy.png';
import FastMetabolism from '../../../Images/traitsIcons/FastMetabolism.png';
import Finesse from '../../../Images/traitsIcons/Finesse.png';
import Bruiser from '../../../Images/traitsIcons/FoT_Bruiser.png';
import FastShot from '../../../Images/traitsIcons/FoT_FastShot.png';
import Gifted from '../../../Images/traitsIcons/FoT_Gifted.png';
import HeavyHanded from '../../../Images/traitsIcons/FoT_HeavyHanded.png';
import GoodNatured from '../../../Images/traitsIcons/GoodNatured.png';
import Jinxed from '../../../Images/traitsIcons/Jinxed.png';
import Kamikaze from '../../../Images/traitsIcons/Kamikaze.png';
import OneHander from '../../../Images/traitsIcons/One_Hander.png';
import Skilled from '../../../Images/traitsIcons/Skilled.png';
import SmallFrame from '../../../Images/traitsIcons/Small_Frame.png';


const imagesMap = {
    'Strength': Strength,
    'Perception': Perception,
    'Endurance': Endurance,
    'Charisma': Charisma,
    'Intelligence': Intelligence,
    'Agility': Agility,
    'Luck': Luck,
    'BigGuns': BigGuns,
    'Doctor': Doctor,
    'Sneak': Sneak,
    'EnergyWeapons': EnergyWeapons,
    'FirstAid': FirstAid,
    'Speech': Speech,
    'Barter': Barter,
    'Gambling': Gambling,
    'Lockpick': Lockpick,
    'MeleeWeapons': MeleeWeapons,
    'Outdoorsman': Outdoorsman,
    'Repair': Repair,
    'Science': Science,
    'SmallGuns': SmallGuns,
    'Steal': Steal,
    'Throwing': Throwing,
    'Traps': Traps,
    'Unarmed': Unarmed,
    'BloodyMess': BloodyMess,
    'ChemReliant': ChemReliant,
    'ChemResistant': ChemResistant,
    'SexApperal': SexApperal,
    'FastMetabolism': FastMetabolism,
    'Finesse': Finesse,
    'Bruiser': Bruiser,
    'FastShot': FastShot,
    'Gifted': Gifted,
    'HeavyHanded': HeavyHanded,
    'GoodNatured': GoodNatured,
    'Jinxed': Jinxed,
    'Kamikaze': Kamikaze,
    'OneHander': OneHander,
    'Skilled': Skilled,
    'SmallFrame': SmallFrame,
}

const ItemDescription = ({currentItem}) => {
    return (
        <div className={styles.mainWrapper}>
            <div className={styles.title}>{currentItem.name}</div>
            <div className={styles.itemDescriptionWrapper}>
                <div className={styles.itemDescription}>{currentItem.description}</div>
                <div className={styles.imageWrapper}>
                    <img src={imagesMap[currentItem.src] || VaultBoy} className={styles.itemImg} alt={'Item Image'}/>
                </div>

            </div>
        </div>
    );
};

export default ItemDescription;