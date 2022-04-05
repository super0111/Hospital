import { useState, useEffect } from 'react';
import useInput from "../../hooks/use-input";
import classes from "./ResetPassword.module.css"
import { changePassword } from "../../apis/auth";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";
const isNotEmpty = (value) => value.trim() != "";

const ResetPassword = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        setInterval(() => {
            const userString = localStorage.getItem('token');
            const current_user = jwt_decode(userString);
            const current_id = current_user.patient_user.id
            setCurrentUser(current_id);
        }, 1000);
    }, [])
    console.log(currentUser)



    let history = useHistory();
    const {
      value: password,
      isValid: passwordIsValid,
      hasError: passwordHasError,
      valueChangeHandler: passwordChangeHandler,
      inputBlurHandler: passwordBlurHandler,
      reset: resetPassword,
    } = useInput(isNotEmpty);
    const {
      value: confirmPassword,
      isValid: confirmPasswordIsValid,
      hasError: confirmPasswordHasError,
      valueChangeHandler: confirmPasswordChangeHandler,
      inputBlurHandler: confirmPasswordBlurHandler,
      reset: resetConfirmPassword,
    } = useInput(isNotEmpty);
    
    let formIsValid = false;
  
    if (passwordIsValid && confirmPasswordIsValid) {
      formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Password is not match")
        }
        const formData = {
          password: password,
          id: currentUser,
        };
        changePassword(formData)
          .then((res) => {
              console.log(res.status)
              if(res.status == "success") {
                history.push("/patientHome");
              }
              else toast.error(res.err.message)
          })
          .catch((error) => console.log(error));
          resetPassword();
          resetConfirmPassword();
    };

    const passwordClasses = passwordHasError ? "form-control invalid" : "form-control";
    const confirmPasswordClasses = confirmPasswordHasError ? "form-control invalid" : "form-control";

    return (
        <div className={classes.resetPassword}>
            <div className={classes.form_wrapper_login}>
                <h1 className={classes.title}>Change Initial Password</h1>
                <form onSubmit={submitHandler}>
                    <div className={passwordClasses}>
                        <input
                            className={classes.input}
                            type="password"
                            id="name"
                            placeholder="Your Change Password"
                            value={password}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                        />
                        {passwordHasError && (
                        <p className={classes.error_text}>Please enter a password.</p>
                        )}
                    </div>
                    <div className={confirmPasswordClasses}>
                        <input
                            className={classes.input}
                            type="password"
                            id="password"
                            placeholder="Your Confirm Password"
                            value={confirmPassword}
                            onChange={confirmPasswordChangeHandler}
                            onBlur={confirmPasswordBlurHandler}
                        />
                        {confirmPasswordHasError && (
                        <p className={classes.error_text}>Please enter confirm password.</p>
                        )}
                    </div>
                    <div className={classes.form_actions}>
                        <button className={classes.button} disabled={!formIsValid}>
                        Submit
                        </button>
                    </div>
                </form>
                <ToastContainer /> 
                <div className={classes.go_register}>
                    <div className={classes.footer_text}>Don't want to change intial password?</div>
                    <a className={classes.footer_go_text} href="/patientHome" >Patient Home Page</a>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword;