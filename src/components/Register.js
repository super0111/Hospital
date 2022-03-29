import React, { useState } from 'react';
import useInput from "../hooks/use-input";
import { registerUser } from "../apis/auth";
import "./register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@", ".");

const Register = (props) => {
  const [genderValue, setGender] = useState("man")
  function handleGenderChange(e) {
    setGender(e.target.value);
  }

  const {
    value: fullNameValue,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: resetFullName,
  } = useInput(isNotEmpty);
  const {
    value: idValue,
    isValid: idIsValid,
    hasError: idHasError,
    valueChangeHandler: idChangeHandler,
    inputBlurHandler: idBlurHandler,
    reset: resetId,
  } = useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: degreeValue,
    isValid: degreeIsValid,
    hasError: degreeHasError,
    valueChangeHandler: degreeChangeHandler,
    inputBlurHandler: degreeBlurHandler,
    reset: resetDegree,
  } = useInput(isNotEmpty);
  const {
    value: expertiseValue,
    isValid: expertiseIsValid,
    hasError: expertiseHasError,
    valueChangeHandler: expertiseChangeHandler,
    inputBlurHandler: expertiseBlurHandler,
    reset: resetExpertise,
  } = useInput(isNotEmpty);
  const {
    value: phoneNumberValue,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput(isNotEmpty);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);
  const {
    value: password2Value,
    isValid: password2IsValid,
    hasError: password2HasError,
    valueChangeHandler: password2ChangeHandler,
    inputBlurHandler: password2BlurHandler,
    reset: resetPassword2,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    fullNameIsValid &&
    idIsValid &&
    emailIsValid &&
    degreeIsValid &&
    expertiseIsValid &&
    phoneNumberIsValid &&
    passwordIsValid &&
    password2IsValid
  ) {
    formIsValid = true;
  }

  let passwordMatch='';
  const submitHandler = (event) => {
    event.preventDefault();
    if (passwordValue !== password2Value) {
      passwordMatch = <div className="">Password is not match</div>
      toast.error(passwordMatch)
    } else {
      const formData = {
        fullname: fullNameValue,
        id: idValue,
        email: emailValue,
        gender: genderValue,
        degree: degreeValue,
        expertise: expertiseValue,
        phoneNumber: phoneNumberValue,
        password: passwordValue,
      };
      registerUser(formData)
        .then((res) => {
          console.log("res",res)
          if(res.token) {
            toast.info("Success Register")
            console.log("sdfsdfsdfs")
            // window.location.replace("/login");
          }
          else {
          toast.error(res.errors.msg)
          }
        })
        .catch((error) => console.log(error));
    }
    resetFullName();
    resetId();
    resetEmail();
    resetDegree();
    resetExpertise();
    resetPhoneNumber();
    resetPassword();
    resetPassword2();
  };

  const fullNameClasses = fullNameHasError ? "form-control invalid" : "form-control";
  const idClasses = idHasError ? "form-control invalid": "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const degreeClasses = degreeHasError ? "form-control invalid" : "form-control";
  const expertiseClasses = expertiseHasError ? "form-control invalid" : "form-control";
  const phoneNumberClasses = phoneNumberHasError ? "form-control invalid" : "form-control";
  const passwordClasses = passwordHasError ? "form-control invalid" : "form-control";

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={submitHandler}>
          <div className="control-group">
            <div className={fullNameClasses}>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                value={fullNameValue}
                onChange={fullNameChangeHandler}
                onBlur={fullNameBlurHandler}
              />
              {fullNameHasError && (
                <div className="error-text">Please enter a Full name.</div>
              )}
            </div>
          </div>

          <div className="control-group">
            <div className={idClasses}>
              <input
                type="text"
                id="id"
                placeholder="Id"
                value={idValue}
                onChange={idChangeHandler}
                onBlur={idBlurHandler}
              />
              {idHasError && (
                <div className="error-text">Please enter a Id.</div>
              )}
            </div>
          </div>
          
          <div className={emailClasses}>
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <div className="error-text">Please enter a valid email address.</div>
            )}
          </div>

          <div className="form-control">
            <select name="gender" 
              value={genderValue}
              onChange={handleGenderChange}
            >
              <option selected disabled>Gender</option>
              <option value="man">Man</option>
              <option value="women">Women</option>
            </select>
          </div>

          <div className={degreeClasses}>
            <input
              type="text"
              id="degree"
              placeholder="Official profession  - Degree"
              value={degreeValue}
              onChange={degreeChangeHandler}
              onBlur={degreeBlurHandler}
            />
            {degreeHasError && (
              <div className="error-text">Please enter a valid Official profession  - Degree.</div>
            )}
          </div>

          <div className={expertiseClasses}>
            <input
              type="text"
              id="expertise"
              placeholder="Specific expertise"
              value={expertiseValue}
              onChange={expertiseChangeHandler}
              onBlur={expertiseBlurHandler}
            />
            {expertiseHasError && (
              <div className="error-text">Please enter a valid Specific expertise.</div>
            )}
          </div>

          <div className={phoneNumberClasses}>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumberValue}
              onChange={phoneNumberChangeHandler}
              onBlur={phoneNumberBlurHandler}
            />
            {phoneNumberHasError && (
              <div className="error-text">Please enter a valid Phone Number.</div>
            )}
          </div>

          <div className={passwordClasses}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <div className="error-text">Please enter a password.</div>
            )}
          </div>
          <div className={passwordClasses}>
            <input
              type="password"
              id="password2"
              placeholder="Confirm Password"
              value={password2Value}
              onChange={password2ChangeHandler}
              onBlur={password2BlurHandler}
            />
            {password2HasError && (
              <div className="error-text">Please enter a confirmation password.</div>
            )}
          </div>
          <div className="form-actions">
            <button disabled={!formIsValid}>
              Submit
            </button>
          </div>
        </form>
        <ToastContainer /> 
        <div className="go_register">
          <div className="text">Already have a account?</div>
          <a className="go_text" href="/login" >Login</a>
        </div>
        { passwordMatch }
      </div>
    </div>
  );
};

export default Register;
