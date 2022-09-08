import React, { useEffect, useState } from "react";
import "./Quizzes.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsBoxArrowRight,
  BsStarFill,
} from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import useAuth from "../../StateManager/useAuth";

const Quizzes = (props) => {
  const [selected, setSelected] = useState([]);
  const [quiz, setQuiz] = useState();
  const {
    quizzes,
    currentQuiz,
    setCurrentQuiz,
    answers,
    setAnswers,
    setShowResultModal,
    setIsPlaying,
    setIsSubmitted,
  } = useAuth();

  useEffect(() => {
    const q = quizzes.questions;
    if (q) {
      console.log("from q -- ", q[currentQuiz]);
      setQuiz(q[currentQuiz]);
      if (quiz) {
        if (answers[currentQuiz]) {
          setSelected(answers[currentQuiz]);
        } else {
          const s = new Array(quiz?.numOfOptions).fill(false);
          setSelected(s);
        }
      }
    }
  }, [currentQuiz, quizzes]);

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 150) + 30;
    const g = Math.floor(Math.random() * 150) + 30;
    const b = Math.floor(Math.random() * 150) + 30;
    const color = `rgb(${r}, ${g}, ${b})`;
    return color;
  };

  const contentStyle = {
    background: "#00000000",
    boxShadow: "none",
    width: "80%",
    padding: "0 ",
  };

  const handleOptionClick = (index) => {
    const s = [...selected];

    if (quiz?.isMultiple) {
      s[index] = !s[index];
    } else {
      const x = s[index];
      s.fill(false);
      s[index] = !x;
    }
    setSelected(s);
    const x = [...answers];
    x[currentQuiz] = s;
    setAnswers(x);
  };

  const handleNextBackBtn = (s) => {
    if (s === "back") {
      setCurrentQuiz(currentQuiz - 1);
      console.log("handling back");
    } else if (s === "next") {
      setCurrentQuiz(currentQuiz + 1);
      console.log("handling next");
    } else if (s === "submit") {
      console.log("submit");
      console.log(answers);
      setShowResultModal(true);
      setIsPlaying(false);
      setIsSubmitted(true);
    }
  };

  return (
    <>
      <div className="question">
        {quiz?.question}
        {quiz?.isMultiple && (
          <span className="multi-choice">Multiple Choice</span>
        )}
      </div>
      <div className="options">
        <VerticalTimeline lineColor={"white"} layout="1-column-left">
          {quiz?.options?.map((option, i) => {
            return (
              <VerticalTimelineElement
                key={i}
                // cvtl -> custom-ver-timeline
                className="cvtl-element"
                contentStyle={contentStyle}
                contentArrowStyle={{ display: "none" }}
                iconStyle={{
                  background: generateRandomColor(),
                  textAlign: "center",
                  top: "10px",
                  transition: "all 0.3s ease-in",
                }}
                icon={
                  <div className="option-icon">
                    {String.fromCharCode("A".charCodeAt(0) + (i % 26))}
                  </div>
                }
                onTimelineElementClick={() => handleOptionClick(i)}
              >
                <div className="cvtl-element-content">
                  {option}
                  {selected[i] && (
                    <div className="option-selected">
                      <GiCheckMark />
                    </div>
                  )}
                </div>
              </VerticalTimelineElement>
            );
          })}

          <VerticalTimelineElement
            iconStyle={{
              background: generateRandomColor(),
              // background: "#b93b70",
              color: "#e6ce21",
              textAlign: "center",
            }}
            icon={<BsStarFill />}
          />
        </VerticalTimeline>
      </div>

      <div className="next-back-buttons-wrapper">
        <div className="next-back-buttons">
          <button
            disabled={currentQuiz === 0 ? true : false}
            onClick={() => handleNextBackBtn("back")}
            className="animation-btn back-btn "
          >
            <div className="cus-btn">
              <span className="arrow">
                <BsArrowLeftShort />
              </span>
              Back
            </div>
          </button>
          {quizzes.numOfQues - 1 === currentQuiz ? (
            <button
              onClick={() => handleNextBackBtn("submit")}
              className="animation-btn submit-btn "
            >
              <div className="cus-btn">
                Submit
                <div className="upload-arrow">
                  <BsBoxArrowRight />
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => handleNextBackBtn("next")}
              className="animation-btn next-btn "
            >
              <div className="cus-btn">
                Next
                <span className="arrow">
                  <BsArrowRightShort />
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Quizzes;
