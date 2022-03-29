import useInput from "../hooks/use-input";
import "./register.css";
import setAuthToken from "../utils/setAuthToken";
import { loginUser } from "../apis/auth";
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
    console.log("Login res", res)

        if(res.token)
        {
          toast.info("Success Register")
          setAuthToken(res.token);
          localStorage.setItem("token", res.token);
          history.push("/");
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
    <div className="wrapper-login">
      <div className="form-wrapper-login">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className={emailClasses}>
            <input
              type="text"
              id="name"
              placeholder="Email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <p className="error-text">Please enter a valid email address.</p>
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
              <p className="error-text">Please enter password.</p>
            )}
          </div>
          <div className="forgot_password">
            <div className="remember_field">
              <input type="checkbox" />
              <div className="remember_text">Remember Me</div>
            </div>
            <a className="forgot_btn">Forgot Password?</a>
          </div>
          <div className="form-actions">
            <button disabled={!formIsValid}>
              Login
            </button>
          </div>
        </form>
        <ToastContainer /> 
        <div className="go_register">
          <div className="text">Don't have a account?</div>
          <a className="go_text" href="/register" >Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
