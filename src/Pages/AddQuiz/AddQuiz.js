import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../StateManager/useAuth";
import "./AddQuiz.css";
import QuestionFields from "./QuestionFields";

const AddQuiz = (props) => {
  const { user } = useAuth();
  const navigateTo = useNavigate();
  const [numOfQues, setNumOfQues] = useState(0);
  useEffect(() => {
    if (!user?.email) {
      navigateTo("/login");
      return;
    }
  }, []);

  const handleNumOfQuesChange = (e) => {
    e.preventDefault();
    const n = +e.target.value;
    if (isNaN(n)) {
      alert(`
          Please Enter A Valid Number.
          `);
      e.target.value = "";
    } else if (n > 100) {
      alert(`
        Too many Questions..
        System Can't Handle.
        Please Lower Number of Questions.
        `);
    } else {
      setNumOfQues(n);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center all-page-bg">
        <div className="add-form-container">
          <div className="log-in-header left-right">Add New Quiz</div>
          <form className="add-quiz-form">
            <div className="input-field">
              <input type="text" required name="q_title" id="q_title" />
              <label>Quiz Title</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                required
                name="q_description"
                id="q_description"
              />
              <label>Quiz Short Description</label>
            </div>
            <div className="input-field">
              <select
                required
                className="form-select"
                aria-label=".form-select-sm example"
                name="q_timing"
                id="q_timing"
              >
                <option defaultValue={1}>Timing</option>
                <option value="1">Quiz Wise</option>
                <option value="2">Question Wise</option>
              </select>
            </div>
            <div className="input-field">
              <input type="text" required name="q_time" id="q_time" />
              <label>Quiz Time In Minute</label>
            </div>
            <div className="input-field">
              <input type="text" required name="q_url" id="q_url" />
              <label>Quiz Photo URL</label>
            </div>
            <div className="input-field">
              <input type="text" required name="q_price" id="q_price" />
              <label>{"Enter Price ( If Quiz is Free Enter 0 )"}</label>
            </div>
            <div className="input-field">
              <input
                onChange={handleNumOfQuesChange}
                type="text"
                required
                name="q_numOfQues"
                id="q_numOfQues"
              />
              <label>Number of Questions</label>
            </div>

            {[...Array(numOfQues).keys()].map((x) => {
              return <QuestionFields key={x} />;
            })}

            <button className="login-btn">ADD This Quiz</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddQuiz;
