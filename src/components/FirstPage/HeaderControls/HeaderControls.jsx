import React, {useState} from 'react';
import styles from "./HeaderControls.module.css";
import cx from "classnames";
import Count from "../../Count/Count";
import Arrow from "./headerImages/arrowPng.png";
import FemaleIcon from "./headerImages/femaleIcon.png";
import MaleIcon from "./headerImages/maleIcon.png";

const Modal = ({setModal, setName, currentForm, age, setAge, gender, setGender}) => {
    return (
        <div className={styles.modal}>
            {currentForm === 'Name' && <NameForm setModal={setModal} setName={setName} />}
            {currentForm === 'Age' && <AgeForm setModal={setModal} age={age} setAge={setAge} />}
            {currentForm === 'Gender' && <GenderForm setModal={setModal} gender={gender} setGender={setGender} />}
        </div>
    )
}

const FormControls = ({setModal}) => {
    const closeModal = () => setModal(prev => !prev)

    return (
        <div className={styles.btns}>
            <button className={styles.modalControlBtn} onClick={closeModal}>Cancel</button>
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

    const onKeyDown = e => {
        if (e.keyCode === 13) e.preventDefault()
    }


    return (
        <form className={cx(styles.nameForm, styles.form)} onSubmit={onNameSubmit}>
            <input className={styles.nameInput} autoComplete={'off'} name={"characterName"} maxLength={10} pattern={"[a-zA-Z]+$"} onKeyDown={onKeyDown}/>
            <FormControls setModal={setModal}/>
        </form>
    )
}

const AgeForm = ({setModal, age, setAge}) => {
    const [ageValue, setAgeValue] = useState(age)

    const onAgeSubmit = e => {
        e.preventDefault();
        setAge(ageValue)
        setModal(prev => !prev)
    }

    const increaseAge = e => {
        e.preventDefault();
        if (ageValue >= 40) return
        setAgeValue(prevState => prevState + 1)
    }

    const decreaseAge = e => {
        e.preventDefault();
        if (ageValue <= 16) return
        setAgeValue(prevState => prevState - 1)
    }

    return (
        <form className={cx(styles.ageForm, styles.form)} onSubmit={onAgeSubmit}>
            <div className={styles.flexWrap}>
                <button onClick={decreaseAge} className={styles.changeAgeBtn}><img src={Arrow} className={cx(styles.arrowImg, styles.rotatedImg)} alt={'increase'}/></button>
                <Count value={ageValue  }/>
                <button onClick={increaseAge} className={styles.changeAgeBtn}><img src={Arrow} className={styles.arrowImg} alt={'increase'}/></button>
            </div>
            <FormControls setModal={setModal}/>
        </form>
    )
}

const GenderForm = ({setModal, gender, setGender}) => {
    const onGenderSubmit = e => {
        e.preventDefault();
        setModal(prev => !prev);
    }

    const onMaleGenderClick = e => {
        e.preventDefault()
        setGender('Male')
    }

    const onFemaleGenderClick = e => {
        e.preventDefault()
        setGender('Female')
    }

    return (
        <form className={cx(styles.genderForm, styles.form)} onSubmit={onGenderSubmit}>
            <div className={styles.flexWrap}>
                <button onClick={onMaleGenderClick} className={cx(styles.switchGenderBtn, gender === 'Male' && styles.currentGender)}>
                    <img src={MaleIcon} className={styles.genderImg} alt={'genderImage'} />
                </button>
                <button onClick={onFemaleGenderClick} className={cx(styles.switchGenderBtn, gender === 'Female'&& styles.currentGender)}>
                    <img src={FemaleIcon} className={styles.genderImg} alt={'genderImage'} />
                </button>
            </div>
            <button className={styles.modalControlBtn}>Confirm</button>
        </form>
    )
}


const HeaderControls = ({name, setName, age, setAge, gender, setGender}) => {
    const [modal, setModal] = useState(false);
    const [currentForm, setCurrentForm] = useState('');
    const onNameBtnClick = () => {
        setCurrentForm('Name')
        setModal(prev => !prev)
    }

    const onAgeBtnClick = () => {
        setCurrentForm('Age')
        setModal(prev => !prev)
    }

    const onGenderBtnClick = () => {
        setCurrentForm('Gender')
        setModal(prev => !prev)
    }

    return (
        <div className={styles.wrapper}>
            <button onClick={onNameBtnClick} className={styles.nameBtn}>{name}</button>
            <button onClick={onAgeBtnClick} className={styles.btn}>Age {age}</button>
            <button onClick={onGenderBtnClick} className={styles.btn}>{gender}</button>
            {modal && <Modal setModal={setModal} setName={setName} currentForm={currentForm} age={age} setAge={setAge} gender={gender} setGender={setGender}/>}
        </div>
    );
};

export default HeaderControls;