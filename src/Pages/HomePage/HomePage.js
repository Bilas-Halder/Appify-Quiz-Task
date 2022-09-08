import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../StateManager/useAuth";
import QuizPage from "../QuizPage/QuizPage";

const HomePage = (props) => {
  const { logOut } = useAuth();
  const navigateTo = useNavigate();
  return (
    <>
      <button onClick={() => logOut("/login", navigateTo)}>LogOut</button>
      <QuizPage />
    </>
  );
};

export default HomePage;
