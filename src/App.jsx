import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

const App = () => {
  // initializing isLoggedIn state based on localStorage (only happens once)
  const isLoggedInFromStorage = localStorage.getItem("isLoggedIn") === "true";

  // initializing user info in localStorage if he is not present
  if (!localStorage.getItem("userInfo")) {
    const userInfo = {
      email: "antem5297@gmail.com",
      password: "Amiljak.dept2025",
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("isLoggedIn", "false");
  }

  // set isLoggedIn state
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInFromStorage);

  //function that is called inside LoginPage
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    toast.success(`Successfully logged in!`, {
      duration: 3000,
      position: "top-right",
    });
  };

  //function that is called inside Navbar when logout button is clicked
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    toast.success(`Successfully logged out!`, {
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
