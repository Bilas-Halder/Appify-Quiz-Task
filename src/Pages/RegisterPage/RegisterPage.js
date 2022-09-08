import React, { useEffect, useState } from "react";
import "../../App.css";
import "../LoginPage/LoginPage.css";
import "./RegisterPage.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { validEmail, validPassword } from "../LoginPage/LoginPage";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import useAuth from "../../StateManager/useAuth";
import { Alert } from "react-bootstrap";

const RegisterPage = (props) => {
  const {
    user,
    setUser,
    signUpUsingEmail,
    updateName,
    setLogged,
    setLoading,
    setUserDataInDB,
  } = useAuth();

  let navigateTo = useNavigate();
  const location = useLocation();
  const path = location.state?.from;

  useEffect(() => {
    // if someone is not came from other route he will goto home
    if (!path && user?.email) {
      navigateTo("/");
    }
  }, [user]);

  // it is for to hid and show the password
  const [showing, setShowing] = useState(false);
  const isShow = (e) => {
    e.preventDefault();
    setShowing(!showing);
  };

  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState(
    "Please enter a valid email address"
  );
  const [passErr, setPassErr] = useState(0);
  const [nameErr, setNameErr] = useState(false);

  const signUpHandler = (e) => {
    e.preventDefault();
    const formElement = e.target.parentElement;
    const name = formElement.children[0].children[0].value;
    const email = formElement.children[1].children[0].value;
    const password = formElement.children[2].children[0].value;
    const rpassword = formElement.children[3].children[0].value;

    setNameErr(name === "" ? true : false);
    if (nameErr) {
      return;
    }

    // some conditions for validate email and password using regex
    else if (!validEmail.test(email)) {
      setEmailErr(true);
      setPassErr(0);
      return;
    } else {
      if (!validPassword.test(password)) {
        setEmailErr(false);
        setPassErr(1);
        return;
      } else {
        setEmailErr(false);
        if (password === rpassword && password.length >= 6) {
          setPassErr(0);
        } else {
          setPassErr(2);
          return;
        }
      }
    }

    signUpUsingEmail(email, password)
      .then((userCredential) => {
        updateName(name).then(() => {
          setUser(userCredential.user);
          setLogged(true);
          setUserDataInDB(userCredential.user)
            .then((user) => {
              console.log(user);
              navigateTo(path || "/");
              setShowing(false);
              formElement.reset();
            })
            .catch((error) => {
              console.log("Error -> :", error);
            });
        });
      })
      .catch((err) => {
        // const e = JSON.stringify(err);
        // console.log("Error -> :", e);
        console.log(err.code);
        if (err.code === "auth/email-already-in-use") {
          setEmailErr(true);
          setEmailErrMsg("Email Already Exist.");
        }
      })
      .finally(setLoading(false));
  };
  return (
    <div className="d-flex justify-content-center align-items-center all-page-bg">
      <div className="form-container">
        <div className="log-in-header">SignUp Form</div>
        <form>
          <div className="input-field">
            <input type="text" required />
            <label>Full Name</label>
          </div>
          {nameErr && (
            <Alert variant="danger">
              <MdErrorOutline /> Please enter your Full Name
            </Alert>
          )}

          <div className="input-field">
            <input type="text" required />
            <label>Email or Username</label>
          </div>
          {emailErr && (
            <Alert variant="danger">
              <MdErrorOutline /> {emailErrMsg}
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

          {passErr === 1 && (
            <Alert variant="danger">
              <MdErrorOutline /> Password equal or more then 6 character.
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
            <label>Confirm Password</label>
          </div>

          {!(nameErr || emailErr)
            ? passErr === 2 && (
                <Alert variant="danger">
                  <MdErrorOutline /> Passwords are different please check again.
                </Alert>
              )
            : ""}

          <button className="primary-btn login-btn" onClick={signUpHandler}>
            Sign Up
          </button>
        </form>

        <div className="login">
          Already Signed up ? <NavLink to="/login"> LogIn now</NavLink>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
