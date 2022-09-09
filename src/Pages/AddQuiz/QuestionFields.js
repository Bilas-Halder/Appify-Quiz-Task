import React, { useState } from "react";

const QuestionFields = (props) => {
  const [numOfOptions, setNumOfOptions] = useState(0);

  const handleNumOfOptionsChange = (e) => {
    e.preventDefault();
    const n = +e.target.value;
    if (isNaN(n)) {
      alert(`
        Please Enter A Valid Number.
        `);
      e.target.value = "";
    } else if (n > 25) {
      alert(`
        Too many Options..
        Upto 25 Options Allowed.
        Please Lower Number of Options.
        `);
    } else {
      setNumOfOptions(n);
    }
  };

  return (
    <>
      <hr style={{ color: "green", borderTop: "3px solid" }} />
      <div className="input-field">
        <input type="text" required className="questions_title" />
        <label>Question Title</label>
      </div>

      <div className="input-field">
        <select
          required
          className="form-select ques_type"
          aria-label=".form-select-sm example"
        >
          <option defaultValue={1}>Question Type</option>
          <option value="1">Single Choice</option>
          <option value="2">Multiple Choice</option>
        </select>
      </div>
      <div className="input-field">
        <input
          onChange={handleNumOfOptionsChange}
          type="text"
          required
          className="options_num"
        />
        <label>Number of Options</label>
      </div>
      <div className="input-field">
        <input type="text" required className="correct_options" />
        <label>Right Answers ( Enter like - ACD or acd )</label>
      </div>

      {[...Array(numOfOptions).keys()].map((x) => {
        return (
          <div key={x}>
            <div className="input-field">
              <input type="text" required className="options" />
              <label>Option {String.fromCharCode("A".charCodeAt(0) + x)}</label>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default QuestionFields;
