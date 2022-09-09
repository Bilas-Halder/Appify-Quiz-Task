import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import QuizCard from "../../Components/QuizCard/QuizCard";
import useAuth from "../../StateManager/useAuth";
import "./HomePage.css";

const HomePage = (props) => {
  const [showAttempted, setShowAttempted] = useState(0);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const { dbURL, loading, setLoading, user } = useAuth();
  const navigateTo = useNavigate();
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`${dbURL}/quizzes`)
        .then((response) => {
          const data = response.data;
          console.log("from data -- ", data);
          setAllQuizzes(data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          setLoading(false);
        });
    } else {
      navigateTo("/login");
    }
  }, [showAttempted]);

  return (
    <>
      <div className="all-page-bg">
        <Header />
        <div className="page-title">
          <div className="left-right">
            {showAttempted ? "My Attempted Quizzes" : "All Quizzes"}
          </div>
          {loading ? (
            <div
              style={{ height: "50vh" }}
              className="d-flex w-100 justify-content-center align-items-center"
            >
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <Container className="my-5">
              <Row>
                {allQuizzes?.map((quiz) => {
                  return (
                    <Col
                      xs="12"
                      md="6"
                      lg="4"
                      className="mb-3 d-flex justify-content-center"
                    >
                      <QuizCard quiz={quiz} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
