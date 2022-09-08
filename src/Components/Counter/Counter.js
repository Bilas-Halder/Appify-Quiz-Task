import React, { useEffect } from "react";
import "./Counter.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FcUpload } from "react-icons/fc";
import useAuth from "../../StateManager/useAuth";

const Counter = (props) => {
  const {
    timer,
    answers,
    setCurrentQuiz,
    currentQuiz,
    setShowResultModal,
    isPlaying,
    setIsPlaying,
    setIsSubmitted,
  } = useAuth();

  useEffect(() => {}, [currentQuiz]);
  const duration = timer?.duration;

  const showTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return (
        <div className="timer">
          <div className="timer-submitting">
            <FcUpload />
          </div>
        </div>
      );
    }

    const min = Math.floor(remainingTime / 60);
    const second = Math.floor(remainingTime % 60);

    return (
      <div className="timer">
        <div className="value">
          {min} : {second}
        </div>
      </div>
    );
  };

  const handleSubmit = () => {
    console.log(answers);
    setShowResultModal(true);
    setIsSubmitted(true);
  };
  const handleNext = () => {
    if (currentQuiz < timer.count - 1) {
      setCurrentQuiz(currentQuiz + 1);
      console.log("Next Handle");
    } else {
      setIsPlaying(false);
      console.log(answers);
      handleSubmit();
    }
  };

  return (
    <>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        key={currentQuiz}
        colors={["#1961FB", "#5B8AFD", "#FF635C", "#FF3C31"]}
        colorsTime={[duration * 0.75, duration * 0.5, duration * 0.25, 0]}
        onComplete={() => {
          // do your stuff here
          if (timer?.function === "submit") {
            handleSubmit();
          } else if (timer?.function === "next") {
            handleNext();
          }
          return { shouldRepeat: timer?.shouldRepeat, delay: timer.delay }; // repeat animation in 1.5 seconds
        }}
        size={80}
        strokeWidth={8}
        children={showTime}
      />
    </>
  );
};

export default Counter;
