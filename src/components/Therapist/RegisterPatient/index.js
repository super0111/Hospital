import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import useInput from "../../../hooks/use-input";
import PictureUpload from "./PictureUpload";
import classes from "./RegisterPatient.module.css"
import { registerPatient } from "../../../apis/registerPatient";
import { fileUpload } from '../../../apis/file'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Switch from "react-switch";

const isNotEmpty = (value) => value.trim() !== "";

const RegisterPatient = () => {
    let history = useHistory();
    const [ currentUserId, setCurrnetUserId ] = useState("")

    useEffect(() => {
        const userString = localStorage.getItem('token');
        if(userString) {
            const current_user = jwt_decode(userString);
            console.log("current_user", current_user)
            if(current_user.user) {
              setCurrnetUserId(current_user.user.id)
            }
          }
      }, []);

    const [image, setImage] = useState({ preview: '', data: '' })

    const [genderValue, setGender] = useState("man")
    function handleGenderChange(e) {
      setGender(e.target.value);
    }

    const [ADHDValue, setADD] = useState({checked:false})
    const handleADHDChange = (checked) => {
        setADD({ checked });
    }

    const [Allergies, setAllergies] = useState({checked:false})
    const handleAllergiesChange = (checked) => {
        setAllergies({ checked });
    }
    const [allergiesValue, setAllergiesValue] = useState("")
    const handleAllergiesValueChange = (e) => {
        setAllergiesValue(e.target.value)
    }

    const {
      value: fullNameValue,
      hasError: fullNameHasError,
      valueChangeHandler: fullNameChangeHandler,
      inputBlurHandler: fullNameBlurHandler,
      reset: resetFullName,
    } = useInput(isNotEmpty);
    const {
      value: idValue,
      hasError: idHasError,
      valueChangeHandler: idChangeHandler,
      inputBlurHandler: idBlurHandler,
      reset: resetId,
    } = useInput(isNotEmpty);
    const {
      value: emailValue,
      hasError: emailHasError,
      valueChangeHandler: emailChangeHandler,
      inputBlurHandler: emailBlurHandler,
      reset: resetEmail,
    } = useInput(isNotEmpty);
    const {
        value: phoneNumberValue,
        hasError: phoneNumberHasError,
        valueChangeHandler: phoneNumberChangeHandler,
        inputBlurHandler: phoneNumberBlurHandler,
        reset: resetPhoneNumber,
    } = useInput(isNotEmpty);
    const {
      value: birthdayValue,
      hasError: birthdayHasError,
      valueChangeHandler: birthdayChangeHandler,
      inputBlurHandler: birthdayBlurHandler,
      reset: resetBirthday,
    } = useInput(isNotEmpty);
    const {
      value: heightValue,
      hasError: heightHasError,
      valueChangeHandler: heightChangeHandler,
      inputBlurHandler: heightBlurHandler,
      reset: resetHeight,
    } = useInput(isNotEmpty);
    const {
      value: weightValue,
      hasError: weightHasError,
      valueChangeHandler: weightChangeHandler,
      inputBlurHandler: weightBlurHandler,
      reset: resetWeight,
    } = useInput(isNotEmpty);
    const {
        value: informationValue,
        hasError: informationHasError,
        valueChangeHandler: informationChangeHandler,
        inputBlurHandler: informationBlurHandler,
        reset: resetInformation,
      } = useInput(isNotEmpty);
      const {
        value: summaryValue,
        hasError: summaryHasError,
        valueChangeHandler: summaryChangeHandler,
        inputBlurHandler: summaryBlurHandler,
        reset: resetSummary,
      } = useInput(isNotEmpty);

    const submitHandler = (event) => {
        event.preventDefault();
        let formData = {
            currentUserId: currentUserId,
            fullname: fullNameValue,
            id: idValue,
            email: emailValue,
            isDoctor: 2,
            phoneNumber: phoneNumberValue,
            gender: genderValue,
            birthday: birthdayValue,
            isAllergies: Allergies.checked,
            allergiesValue: allergiesValue,
            isADHD: ADHDValue.checked,
            height: heightValue,
            weight: weightValue,
            information: informationValue,
            summary: summaryValue,
            treatmentStatus: "new",
        };
        fileUpload(image.data)
        .then((resFile) => {
            formData.picture = resFile.data.file
            registerPatient(formData)
            .then((res) => {
                if(res.message === "success") {
                    resetFullName();
                    resetId();
                    resetEmail();
                    resetPhoneNumber();
                    resetBirthday();
                    resetHeight();
                    resetWeight();
                    resetInformation();
                    resetSummary();
                    image.preview = ""
                    toast.info("Register Patient Successfull!")
                    history.push("/")
                }
                else 
                    toast.error(res.RegisterPatient)   
            })
        })
        .catch((error) => console.log(error));
    };

    const fullNameClasses = fullNameHasError ? "form-control invalid" : "form-control";
    const idClasses = idHasError ? "form-control invalid": "form-control";
    const emailClasses = emailHasError ? "form-control invalid" : "form-control";
    const phoneNumberClasses = phoneNumberHasError ? "form-control invalid" : "form-control";
    const birthdayClasses = birthdayHasError ? "form-control invalid" : "form-control";
    const heightclasses = heightHasError ? "form-control invalid" : "form-control"; 
    const weightClasses = weightHasError ? "form-control invalid" : "form-control"; 
    const informationClasses = informationHasError ? "form-control invalid" : "form-control"; 
    const summaryClasses = summaryHasError ? "form-control invalid" : "form-control"; 
    
    return (
        <div className={classes.registerPatient}>
            <div className={classes.form_wrapper}>
                <h1 className={classes.title}>Register Patient</h1>
                <form onSubmit={submitHandler}>
                    <div className={fullNameClasses}>
                        <input
                            className={classes.input}
                            type="text"
                            id="fullName"
                            placeholder="Full Name"
                            value={fullNameValue}
                            onChange={fullNameChangeHandler}
                            onBlur={fullNameBlurHandler}
                        />
                        {fullNameHasError && (
                            <div className={classes.error_text}>Please enter a Full name.</div>
                        )}
                    </div>

                    <div className={idClasses}>
                        <input
                            className={classes.input}
                            type="text"
                            id="id"
                            placeholder="Id"
                            value={idValue}
                            onChange={idChangeHandler}
                            onBlur={idBlurHandler}
                        />
                        {idHasError && (
                            <div className={classes.error_text}>Please enter a Id.</div>
                        )}
                    </div>
                    
                    <div className={emailClasses}>
                        <input
                            className={classes.input}
                            type="text"
                            id="email"
                            placeholder="Email"
                            value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                        />
                        {emailHasError && (
                        <div className={classes.error_text}>Please enter a valid email address.</div>
                        )}
                    </div>

                    <div className={phoneNumberClasses}>
                        <input
                            className={classes.input}
                            type="text"
                            id="phoneNumber"
                            placeholder="Phone Number"
                            value={phoneNumberValue}
                            onChange={phoneNumberChangeHandler}
                            onBlur={phoneNumberBlurHandler}
                        />
                        {phoneNumberHasError && (
                        <div className={classes.error_text}>Please enter a valid Phone Number.</div>
                        )}
                    </div>

                    <div className={classes.form_control}>
                        <select name="gender" 
                            className={classes.input}
                            value={genderValue}
                            onChange={handleGenderChange}
                        >
                            <option selected disabled>Gender</option>
                            <option value="man">Man</option>
                            <option value="women">Women</option>
                        </select>
                    </div>

                    <div className={birthdayClasses}>
                        <input
                            className={classes.input}
                            type="text"
                            id="birthday"
                            placeholder="Birthday"
                            value={birthdayValue}
                            onChange={birthdayChangeHandler}
                            onBlur={birthdayBlurHandler}
                        />
                        {birthdayHasError && (
                        <div className={classes.error_text}>Please select Birthday</div>
                        )}
                    </div>

                    <div className={classes.allergiesClasses}>
                        <div className={classes.allergiesText}>
                            If you have allergies, Please check yes.
                        </div>
                        <div className={classes.checkbox} value={Allergies}>
                            <Switch onChange={handleAllergiesChange} checked={Allergies.checked} />
                        </div>
                        { Allergies.checked === true ? 
                            <input 
                                className={classes.input}
                                type="text" 
                                placeholder='Enter your Allergies' 
                                onChange={handleAllergiesValueChange}
                            /> : ""
                        }
                    </div>

                    <div className={classes.allergiesClasses}>
                        <div className={classes.allergiesText}>
                            If patient have a diagnosis of ADHD, Please check yes.
                        </div>
                        <div className={classes.checkbox} value={ADHDValue}>
                            <Switch onChange={handleADHDChange} checked={ADHDValue.checked} />
                        </div>
                    </div>

                    <div className={heightclasses}>
                        <input
                            className={classes.input}
                            type="text"
                            id="height"
                            placeholder="Height"
                            value={heightValue}
                            onChange={heightChangeHandler}
                            onBlur={heightBlurHandler}
                        />
                        {heightHasError && (
                        <div className={classes.error_text}>Please enter a valid patient height.</div>
                        )}
                    </div>

                    <div className={weightClasses}>
                        <input
                            className={classes.input}
                            type="text"
                            id="weight"
                            placeholder="weight"
                            value={weightValue}
                            onChange={weightChangeHandler}
                            onBlur={weightBlurHandler}
                        />
                        {weightHasError && (
                        <div className={classes.error_text}>Please enter a weight.</div>
                        )}
                    </div>

                    <div className={informationClasses}>
                        <textarea
                            className={classes.input}
                            type="text"
                            id="information"
                            placeholder="Confirm information"
                            value={informationValue}
                            onChange={informationChangeHandler}
                            onBlur={informationBlurHandler}
                        />
                        {informationHasError && (
                        <div className={classes.error_text}>Please enter a information(Background diseases, medications and more).</div>
                        )}
                    </div>

                    <div className={summaryClasses}>
                        <textarea
                            className={classes.input}
                            type="text"
                            id="summary"
                            placeholder="summary"
                            value={summaryValue}
                            onChange={summaryChangeHandler}
                            onBlur={summaryBlurHandler}
                        />
                        {summaryHasError && (
                        <div className={classes.error_text}>Please enter a summary.</div>
                        )}
                    </div>
                    <div className={classes.flexCol} style={{ margintop: 20 }}>
                        <div className={classes.pictureUpload_title}>Upload Picture : </div>
                        <PictureUpload image = {image} setImage = {setImage} />
                    </div>
                    <div className={classes.form_actions}>
                        <button className={classes.button}>
                            Submit
                        </button>
                    </div>
                </form>
                <ToastContainer /> 
            </div>
        </div>
    )
}
export default RegisterPatient