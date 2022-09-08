import React, { useEffect, useState } from "react";
import Counter from "../../Components/Counter/Counter";
import Quizzes from "../../Components/Quizzes/Quizzes";
import useAuth from "../../StateManager/useAuth";
import axios from "axios";
import "./QuizPage.css";
import ResultModal from "../../Components/ResultModal/ResultModal";

const QuizPage = (props) => {
  const { quizzes, setQuizzes, loading, setLoading, setCurrentQuiz, setTimer } =
    useAuth();

  useEffect(() => {
    setLoading(true);

    axios
      .get("https://mocki.io/v1/03e96925-c186-4edc-8b79-1d26324ac1e4")
      .then((response) => {
        const data = response.data;
        console.log("from data -- ", data);
        setQuizzes(data);
        setCurrentQuiz(0);
        console.log("from quizzes -- ", quizzes);
        if (data?.isTimePerQues) {
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
      {!loading ? (
        <div className="quiz-page">
          <div className="quiz-header">
            <div className="logo">QuiZzo</div>
            <div className="timer">
              <Counter />
            </div>
          </div>
          <div className="quiz">
            <Quizzes />
          </div>
        </div>
      ) : (
        "Loading ... "
      )}

      <ResultModal />
    </>
  );
};

export default QuizPage;
