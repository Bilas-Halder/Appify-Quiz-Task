import React, { useEffect, useState } from "react";
import Counter from "../../Components/Counter/Counter";
import Quizzes from "../../Components/Quizzes/Quizzes";
import useAuth from "../../StateManager/useAuth";
import axios from "axios";
import "./QuizPage.css";
import ResultModal from "../../Components/ResultModal/ResultModal";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const QuizPage = (props) => {
  let { id } = useParams();
  const {
    dbURL,
    user,
    setQuizzes,
    loading,
    setLoading,
    setCurrentQuiz,
    setTimer,
  } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      console.log(user?.email);
      navigateTo("/login");
      return;
    }
    setLoading(true);
    const uri = `${dbURL}/quizzes/${id}`;

    axios
      .get(uri)
      .then((response) => {
        const data = response.data;
        console.log("from data -- ", data);
        setQuizzes(data);
        setCurrentQuiz(0);
        if (!data?.isTimePerQues) {
          const t = {
            duration: data?.totalTimeInMinute * 60,
            function: "submit",
            shouldRepeat: false,
            delay: 1,
          };
          setTimer(t);
        } else {
          const t = {
            duration: (data?.totalTimeInMinute * 60) / data?.numOfQues,
            function: "next",
            shouldRepeat: true,
            delay: 0,
            count: data?.numOfQues,
          };
          setTimer(t);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="quiz-page">
        {!loading ? (
          <>
            <div className="quiz-header">
              <div className="logo">QuiZzo</div>
              <div className="timer">
                <Counter />
              </div>
            </div>
            <div className="quiz">
              <Quizzes />
            </div>
          </>
        ) : (
          <div
            style={{ height: "50vh" }}
            className="d-flex w-100 justify-content-center align-items-center"
          >
            <Spinner animation="border" variant="light" />
          </div>
        )}
      </div>

      <ResultModal />
    </>
  );
};

export default QuizPage;
