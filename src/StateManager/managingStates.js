import React, { useState } from "react";

const useManagingStates = (props) => {
  const [quizzes, setQuizzes] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState({});
  return {
    quizzes,
    setQuizzes,
    loading,
    setLoading,
    currentQuiz,
    setCurrentQuiz,
    answers,
    setAnswers,
    timer,
    setTimer,
  };
};

export default useManagingStates;
