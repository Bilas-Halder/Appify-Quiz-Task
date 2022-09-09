import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizPage from "./Pages/QuizPage/QuizPage";
import ContextProvider from "./StateManager/ContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import firebaseConfig from "./firebase/firebase_config";
import { initializeApp } from "firebase/app";
import HomePage from "./Pages/HomePage/HomePage";
import AddQuiz from "./Pages/AddQuiz/AddQuiz";

initializeApp(firebaseConfig);

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/quizzes/:id" element={<QuizPage />} />
          <Route path="/addquiz/" element={<AddQuiz />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
