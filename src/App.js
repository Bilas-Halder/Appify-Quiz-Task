import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizPage from "./Pages/QuizPage/QuizPage";
import ContextProvider from "./StateManager/ContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import firebaseConfig from "./firebase/firebase_config";
import { initializeApp } from "firebase/app";

initializeApp(firebaseConfig);

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/quizzes" element={<LoginPage />} />
          <Route path="/quizzes/:id" element={<QuizPage />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
