import React from "react";
import Quizzes from "../../Components/Quizzes/Quizzes";
import "./QuizPage.css";

const QuizPage = (props) => {
  const quiz = {
    question: "What is The Question ?",
    numOfOptions: 7,
    isMultiple: false,
    isTimeBound: true,
    time: 60,
    options: [
      "ans 1",
      "Lorem ipsum dolor sit amet consectetur.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, dolor? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, dolor? ",
      "answer 4",
      "answer 4",
      "answer 4",
      "answer 4",
    ],
    correctAns: [3],
    givenAns: undefined,
  };
  return (
    <>
      <div className="quiz-page">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">QUIZZER</div>
          <div className="timer">Timer</div>
        </div>
        <div className="quiz">
          <Quizzes quiz={quiz} />
        </div>
        <div className="progress-bar">Progress Bar</div>
      </div>
    </>
  );
};

export default QuizPage;
