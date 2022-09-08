import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizPage from "./Pages/QuizPage/QuizPage";
import ContextProvider from "./StateManager/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <QuizPage />
    </ContextProvider>
  );
}

export default App;
