import useInput from "../../hooks/use-input";
import classes from "./Login.module.css";
import setAuthToken from "../../utils/setAuthToken";
import { loginUser } from "../../apis/auth";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isNotEmpty = (value) => value.trim() != "";
const isEmail = (value) => value.includes("@");

const Login = (props) => {
  let history = useHistory();
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);
  
  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = {
      email: emailValue,
      password: passwordValue,
    };
    loginUser(formData)
      .then((res) => {
  
        if(res.token && res.doctor==2)
        {
          toast.info("Success Therapist  Register")
          setAuthToken(res.token);
          localStorage.setItem("token", res.token);
          localStorage.setItem("isDoctor", res.doctor);
          history.push("/");
        }
        if(res.token && res.doctor==1)
        {
          toast.info("Success Patient Register")
          setAuthToken(res.token);
          localStorage.setItem("token", res.token);
          localStorage.setItem("isDoctor", res.doctor);
          if(res.isFirst == 1) {
            history.push("/resetPassword");
          }
          else history.push("/patientHome");
          
        }
        else { toast.error(res.errors.msg) }
      })
      .catch((error) => console.log(error));
      resetEmail();
      resetPassword();
  };

  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <div className={classes.wrapper_login}>
      <div className={classes.form_wrapper_login}>
        <h1 className={classes.title}>Login</h1>
        <form onSubmit={submitHandler}>
          <div className={emailClasses}>
            <input
              className={classes.input}
              type="text"
              id="name"
              placeholder="Email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <p className={classes.error_text}>Please enter a valid email address.</p>
            )}
          </div>
          <div className={passwordClasses}>
            <input
              className={classes.input}
              type="password"
              id="password"
              placeholder="Password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <p className={classes.error_text}>Please enter password.</p>
            )}
          </div>
          <div className={classes.forgot_password}>
            <div className={classes.remember_field}>
              <input type="checkbox" />
              <div className={classes.remember_text}>Remember Me</div>
            </div>
            <a className={classes.forgot_btn}>Forgot Password?</a>
          </div>
          <div className={classes.form_actions}>
            <button className={classes.button} disabled={!formIsValid}>
              Submit
            </button>
          </div>
        </form>
        <ToastContainer /> 
        <div className={classes.go_register}>
          <div className={classes.footer_text}>Don't have a account?</div>
          <a className={classes.footer_go_text} href="/register" >Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
