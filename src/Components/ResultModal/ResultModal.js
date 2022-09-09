import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../StateManager/useAuth";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultModal = (props) => {
  const navigateTo = useNavigate();
  const {
    showResultModal,
    setShowResultModal,
    answers,
    quizzes,
    setQuizzes,
    setCurrentQuiz,
    isSubmitted,
    setIsSubmitted,
    setAnswers,
    setIsPlaying,
  } = useAuth();

  const [pieData, setPieData] = useState({
    labels: ["Right Answers", "Wrong Answers"],
    datasets: [
      {
        label: "Quiz Result",
        data: [1, 1],
        backgroundColor: ["rgba(75, 192, 192, 0.3)", "rgba(255, 99, 132, 0.3)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  });

  if (isSubmitted) {
    const rightAns = quizzes?.questions?.map((q) => q.correctAns);
    console.log("right -> ", rightAns);
    const givenAns = answers?.map((ans) => {
      const x = [];
      ans?.map((tf, i) => {
        if (tf) {
          x.push(i);
        }
        return 0;
      });
      return x;
    });
    console.log("given -> ", givenAns);
    const result = [];
    let rightCount = 0;
    let flag = true;
    // compare Answers
    for (let i = 0; i < rightAns?.length && i < givenAns?.length; i++) {
      flag = true;
      for (let j = 0; j < rightAns[i]?.length; j++) {
        if (rightAns[i][j] !== givenAns[i][j]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        rightCount += 1;
        result.push(true);
      } else {
        result.push(false);
      }
    }

    console.log(result);
    console.log(rightCount);
    const data = { ...pieData };
    data.datasets[0].data = [rightCount, rightAns.length - rightCount];
    setPieData(data);
    setIsSubmitted(false);
    setCurrentQuiz(0);
    setAnswers([]);
  }

  return (
    <Modal
      show={showResultModal}
      onHide={() => setShowResultModal(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Your Result
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Pie data={pieData} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setShowResultModal(false);
            navigateTo(`/`);
            navigateTo(`/quizzes/${quizzes._id}`);
            setIsPlaying(true);
          }}
        >
          Retake
        </Button>
        <Button
          onClick={() => {
            setShowResultModal(false);
            navigateTo(`/`);
          }}
        >
          Back to Home
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
