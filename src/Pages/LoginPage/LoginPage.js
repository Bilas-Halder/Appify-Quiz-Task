import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import useAuth from "../../StateManager/useAuth";

export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const validPassword = new RegExp("(?=^.{6,}$)");
// regular expression for validate email and password

const LoginPage = (props) => {
  const {
    user,
    setUser,
    setLogged,
    logInUsingEmail,
    setLoading,
    dbURL,
    setRole,
  } = useAuth();

  const navigateTo = useNavigate();
  const location = useLocation();
  const path = location.state?.from?.pathname;

  useEffect(() => {
    if (!path && user?.email) {
      navigateTo("/");
    }
  }, [user]);

  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [wrongEmailOrPass, setWrongEmailOrPass] = useState(false);

  const [showing, setShowing] = useState(false);
  const isShow = (e) => {
    e.preventDefault();
    setShowing(!showing);
  };

  // log in handler for email pass
  const logInUsingEmailHandler = (e) => {
    e.preventDefault();
    const formElement = e.target.parentElement;
    const email = formElement.children[0].children[0].value;
    const password = formElement.children[1].children[0].value;

    // some conditions for showing red notice in the input field
    if (!validEmail.test(email) && !validPassword.test(password)) {
      setEmailErr(true);
      setPassErr(false);
      return;
    } else if (!validEmail.test(email)) {
      setEmailErr(true);
      setPassErr(false);
      return;
    } else if (!validPassword.test(password)) {
      setEmailErr(false);
      setPassErr(true);
      return;
    } else {
      setEmailErr(false);
      setPassErr(false);
    }

    // if everything is ok then we are gonna call firebase to check the user
    logInUsingEmail(email, password)
      .then((userCredential) => {
        const nUser = userCredential.user;
        setUser(nUser);
        fetch(`${dbURL}/users/email/${nUser.email}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("usr -> ", data);
            setRole(data.role);
            setLogged(true);
            setWrongEmailOrPass(false);
            formElement.reset();
            if (user?.email) {
              navigateTo("/");
            }
          });
        console.log(user);
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/wrong-password).") {
          setWrongEmailOrPass(true);
        } else if (err.message === "Firebase: Error (auth/user-not-found).") {
          setWrongEmailOrPass(true);
        } else {
          console.log(err);
        }
      })
      .finally(setLoading(false));
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center all-page-bg">
        <div className="form-container">
          {path ? (
            <div
              className="log-in-header"
              style={{
                fontSize: "25px",
                color: "red",
              }}
            >
              Please LogIn First
            </div>
          ) : (
            <div className="log-in-header">LogIn Form</div>
          )}
          <form>
            <div className="input-field">
              <input type="text" required />
              <label>Email or Username</label>
            </div>
            {emailErr && (
              <Alert variant="danger">
                <MdErrorOutline /> Please enter a valid email address
              </Alert>
            )}
            <div className="input-field">
              <input
                className="password"
                type={showing ? "text" : "password"}
                required
              />
              <span className="show">
                <button onClick={isShow}>
                  {showing ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </span>
              <label>Password</label>
            </div>
            {passErr && (
              <Alert variant="danger">
                <MdErrorOutline /> Password character must be more then 6.
              </Alert>
            )}
            {wrongEmailOrPass && (
              <Alert variant="danger">
                <MdErrorOutline /> Wrong Email or Password | please try again.
              </Alert>
            )}
            <button className="login-btn" onClick={logInUsingEmailHandler}>
              Log In
            </button>
          </form>
          <div className="auth">Or log in with</div>
          <div className="signup">
            Not a member?
            <NavLink
              to={{
                pathname: "/signup",
                state: { from: path },
              }}
            >
              {" "}
              Signup now
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
