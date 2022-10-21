import React, {useState} from 'react';
import styles from "./HeaderControls.module.css";
import cx from "classnames";
import Count from "../Count/Count";
import Arrow from "./headerImages/arrowPng.png";
import FemaleIcon from "./headerImages/femaleIcon.png";
import MaleIcon from "./headerImages/maleIcon.png";

const Modal = ({setModal, setName, currentForm, currentAge, setCurrentAge, currentGender, setCurrentGender}) => {
    return (
        <div className={styles.modal}>
            {currentForm === 'Name' && <NameForm setModal={setModal} setName={setName} />}
            {currentForm === 'Age' && <AgeForm setModal={setModal} currentAge={currentAge} setCurrentAge={setCurrentAge} />}
            {currentForm === 'Gender' && <GenderForm setModal={setModal} currentGender={currentGender} setCurrentGender={setCurrentGender} />}
        </div>
    )
}

const FormControls = ({setModal}) => {
    return (
        <div className={styles.btns}>
            <button className={styles.modalControlBtn} onClick={() => {setModal(prev => !prev)}}>Cancel</button>
            <button className={styles.modalControlBtn}>Confirm</button>
        </div>
    )
}

const NameForm = ({setModal, setName}) => {
    const onNameSubmit = e => {
        e.preventDefault();
        let characterName = e.target.characterName.value;
        setName(characterName)
        setModal(prev => !prev)
        if (!characterName) return setName('None')
    }

    return (
        <form className={styles.nameForm} onSubmit={onNameSubmit}>
            <input className={styles.nameInput} autoComplete={'off'} name={"characterName"} maxLength={10} pattern={"[a-zA-Z]+$"} />
            <FormControls setModal={setModal}/>
        </form>
    )
}

const AgeForm = ({setModal, currentAge, setCurrentAge}) => {
    const [age, setAge] = useState(currentAge)

    const onAgeSubmit = e => {
        e.preventDefault();
        setCurrentAge(age)
        setModal(prev => !prev)
    }

    const increaseAge = e => {
        e.preventDefault();
        if (age >= 50) return
        setAge(prevState => prevState + 1)
    }

    const decreaseAge = e => {
        e.preventDefault();
        if (age <= 16) return
        setAge(prevState => prevState - 1)
    }

    return (
        <form className={styles.ageForm} onSubmit={onAgeSubmit}>
            <div className={styles.flexWrap}>
                <button onClick={decreaseAge} className={styles.changeAgeBtn}><img src={Arrow} className={cx(styles.arrowImg, styles.rotatedImg)} alt={'increase'}/></button>
                <Count value={age}/>
                <button onClick={increaseAge} className={styles.changeAgeBtn}><img src={Arrow} className={styles.arrowImg} alt={'increase'}/></button>
            </div>
            <FormControls setModal={setModal}/>
        </form>
    )
}

const GenderForm = ({setModal, setCurrentGender, currentGender}) => {
    const onGenderSubmit = e => {
        e.preventDefault();
        setModal(prev => !prev);
    }

    const onMaleGenderClick = e => {
        e.preventDefault()
        setCurrentGender('Male')
    }

    const onFemaleGenderClick = e => {
        e.preventDefault()
        setCurrentGender('Female')
    }

    return (
        <form className={styles.genderForm} onSubmit={onGenderSubmit}>
            <div className={styles.flexWrap}>
                <button onClick={onMaleGenderClick} className={cx(styles.switchGenderBtn, currentGender === 'Male' && styles.currentGender)}><img src={MaleIcon} className={styles.genderImg} alt={'genderImage'}/></button>
                <button onClick={onFemaleGenderClick} className={cx(styles.switchGenderBtn, currentGender === 'Female'&& styles.currentGender)}><img src={FemaleIcon} className={styles.genderImg} alt={'genderImage'}/></button>
            </div>
            <button className={styles.modalControlBtn}>Confirm</button>
        </form>
    )
}


const HeaderControls = ({name, setName}) => {
    const [modal, setModal] = useState(false);
    const [currentAge, setCurrentAge] = useState(25);
    const [currentGender, setCurrentGender] = useState('Male')


    const [currentForm, setCurrentFrom] = useState('')


    const onNameBtnClick = () => {
        setCurrentFrom('Name')
        setModal(prev => !prev)
    }

    const onAgeBtnClick = () => {
        setCurrentFrom('Age')
        setModal(prev => !prev)
    }

    const onGenderBtnClick = () => {
        setCurrentFrom('Gender')
        setModal(prev => !prev)
    }

    return (
        <div className={styles.wrapper}>
            <button onClick={onNameBtnClick} className={styles.nameBtn}>{name}</button>
            <button onClick={onAgeBtnClick} className={styles.btn}>Age {currentAge}</button>
            <button onClick={onGenderBtnClick} className={styles.btn}>{currentGender}</button>
            {modal && <Modal setModal={setModal} setName={setName} currentForm={currentForm} currentAge={currentAge} setCurrentAge={setCurrentAge} currentGender={currentGender} setCurrentGender={setCurrentGender}/>}
        </div>
    );
};

export default HeaderControls;