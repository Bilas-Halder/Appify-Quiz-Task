import { useEffect, useState } from "react";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

const useManagingStates = (props) => {
  const [quizzes, setQuizzes] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState({});
  const [showResultModal, setShowResultModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const auth = getAuth();
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);
  const [role, setRole] = useState("");

  const dbURL = "http://localhost:5000";
  // const dbURL = "https://glacial-cliffs-26298.herokuapp.com";

  const updateName = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  // code for email sign in and sign Up
  const signUpUsingEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUsingEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const setUserDataInDB = (nUser) => {
    const newUser = {
      uid: nUser.uid,
      displayName: nUser.displayName,
      email: nUser.email,
      photoURL: nUser.photoURL,
      phoneNumber: nUser.phoneNumber,
      emailVerified: nUser.emailVerified,
      accessToken: nUser.accessToken,
      role: "user",
    };
    console.log("newUser -> ", newUser);

    axios({
      method: "put",
      url: `${dbURL}/users`,
      data: { ...nUser },
    }).then((res) => {
      console.log(res);
    });

    // fetch(`${dbURL}/users`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newUser),
    // })
    //   .then((response) => response.json())
    //   .catch((err) => console.log(err));
  };
  useEffect(() => {
    // if the user is signed In then setting the user
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserDataInDB(currentUser);
      } else if (auth.currentUser) {
        setUser(auth.currentUser);
        setUserDataInDB(auth.currentUser);
      }
      setLoading(false);
    });
  }, [auth, logged]);

  const useAdminRole = () => {
    // useEffect(() => {
    //     fetch(`${dbURL}/users/role/${user.email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setRole(data.role);
    //         })
    // }, []);
  };

  const logOut = (path, navigateTo) => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
        navigateTo(path || "/");
      })
      .finally(setLoading(false));
  };

  return {
    quizzes,
    setQuizzes,
    loading,
    setLoading,
    currentQuiz,
    setCurrentQuiz,
    answers,
    setAnswers,
    timer,
    setTimer,
    showResultModal,
    setShowResultModal,
    isPlaying,
    setIsPlaying,
    isSubmitted,
    setIsSubmitted,

    user,
    logged,
    dbURL,
    role,
    setUser,
    setLogged,
    setUserDataInDB,
    logOut,
    signUpUsingEmail,
    logInUsingEmail,
    updateName,
    setRole,
    useAdminRole,
  };
};

export default useManagingStates;
