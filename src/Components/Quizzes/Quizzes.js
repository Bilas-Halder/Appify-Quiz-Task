import React, { useEffect, useState } from "react";
import "./Quizzes.css";
import "./ResponsiveQuizzes.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsStarFill,
} from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";

const Quizzes = ({ quiz }) => {
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    const s = new Array(quiz.numOfOptions).fill(false);
    setSelected(s);
  }, []);

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 150) + 30;
    const g = Math.floor(Math.random() * 150) + 30;
    const b = Math.floor(Math.random() * 150) + 30;

    const color = `rgb(${r}, ${g}, ${b})`;

    return color;
  };

  const contentStyle = {
    background: "white",
    borderRadius: "200px",
    width: "650px",
    height: "fit-content",
    fontSize: "1.1rem",
    fontWeight: "500",
    padding: "1rem 3rem 1rem 2rem ",
    cursor: "pointer",
    position: "relative",
  };

  const handleOptionClick = (index) => {
    const s = [...selected];

    if (quiz.isMultiple) {
      s[index] = !s[index];
    } else {
      const x = s[index];
      s.fill(false);
      s[index] = !x;
    }
    setSelected(s);
  };

  return (
    <>
      <div className="question">
        {quiz?.question}
        {quiz.isMultiple && (
          <span className="multi-choice">Multiple Choice</span>
        )}
      </div>
      <div className="options">
        <VerticalTimeline lineColor={"white"} layout="1-column-left">
          {quiz?.options?.map((option, i) => {
            return (
              <VerticalTimelineElement
                key={i}
                style={{
                  margin: "2rem 0px",
                }}
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
                {option}
                {selected[i] && (
                  <div className="option-selected">
                    <GiCheckMark />
                  </div>
                )}
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
          <div className="animation-btn back-btn ">
            <div className="cus-btn">
              <span className="arrow">
                <BsArrowLeftShort />
              </span>
              Back
            </div>
          </div>
          <div className="animation-btn next-btn ">
            <div className="cus-btn">
              Next
              <span className="arrow">
                <BsArrowRightShort />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quizzes;
