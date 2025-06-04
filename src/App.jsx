import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //checking if token is in localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  //functions for handling login and logout
  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <LoginPage handleLogin={handleLogin} />
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
