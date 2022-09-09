import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../StateManager/useAuth";
import "./Header.css";

const Header = (props) => {
  const { logOut, user, role, dbURL, setRole } = useAuth();
  const navigateTo = useNavigate();
  useEffect(() => {
    fetch(`${dbURL}/users/email/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRole(data.role);
      });
  }, [user]);
  return (
    <>
      <div className="w-100" style={{ backgroundColor: "#34465d" }}>
        <Container>
          <Navbar
            expand="lg"
            variant="dark"
            style={{ backgroundColor: "#34465d99" }}
            fixed="top"
          >
            <Container fluid>
              <Navbar.Brand href="#home">
                <div
                  className="logo ms-5"
                  style={{
                    fontSize: "2.5rem",
                  }}
                >
                  QuiZzo
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="my-2 my-lg-0 mx-0 mx-md-auto"
                  style={{ maxHeight: "100px" }}
                >
                  <Nav.Link href="#action1" className="custom-nav-link">
                    All Quizzes
                  </Nav.Link>
                  {user?.email && role !== "admin" ? (
                    <Nav.Link href="#action2" className="custom-nav-link">
                      Attempted Quizzes
                    </Nav.Link>
                  ) : null}
                  {user?.email && role === "admin" ? (
                    <Nav.Link
                      onClick={() => navigateTo("/addquiz")}
                      className="custom-nav-link"
                    >
                      Add Quiz
                    </Nav.Link>
                  ) : null}
                </Nav>

                <div
                  onClick={() => logOut("/login", navigateTo)}
                  className="custom-nav-link logout-nav-link me-5"
                >
                  Logout
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      </div>
    </>
  );
};

export default Header;
