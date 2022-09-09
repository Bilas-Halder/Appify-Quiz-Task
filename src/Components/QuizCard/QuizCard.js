import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./QuizCard.css";

const QuizCard = ({ quiz }) => {
  const navigateTo = useNavigate();
  return (
    <>
      <Card
        style={{
          width: "18rem",
          color: "black",
          borderRadius: "10px",
          height: "100%",
        }}
      >
        <Card.Img
          variant="top"
          src={quiz?.photoURL}
          style={{ borderRadius: "10px" }}
        />
        <Card.Body>
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="">
              <Card.Title>{quiz?.title || "Untitled Quiz"}</Card.Title>

              <Card.Text className="card-body-text my-3">
                {quiz.description}
              </Card.Text>
            </div>
            <div className="quiz-price">
              <span
                style={{
                  backgroundColor:
                    quiz?.price && quiz?.paid ? "#a30707" : "#1a8d1a",
                }}
              >
                {quiz?.price && quiz?.paid ? `Premium` : "Free"}
              </span>
              Price : {quiz?.price && quiz?.paid ? `$${quiz?.price}` : "Free"}
            </div>
            {quiz?.price && quiz?.paid ? (
              <Button
                variant="secondary"
                onClick={() => {
                  alert(`
                      You have to pay $${quiz?.price} to continue

                      We are developing payment process
                                    please wait...`);
                }}
              >
                Enroll
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => navigateTo(`/quizzes/${quiz._id}`)}
              >
                Take Quiz
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default QuizCard;
